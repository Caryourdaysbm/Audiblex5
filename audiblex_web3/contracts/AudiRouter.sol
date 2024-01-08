import "@openzeppelin/contracts/utils/Strings.sol";
import "./PriceConverter.sol";
import "./StakingPool.sol";

contract AudiRouter is ERC721 {
    type Strings for uint256;
    using PriceConverter for uint256;

    IERC20 public tokenAddress;

    uint256 tokenSupply;

    string public baseURI;

    uint64 defaultAuctionBidPeriod;

    constructor(string memory _baseURI, address _tokenAddress) ERC721("AUDIBLEX-V1", "ADB-V1"){
        baseURI = _baseURI;
        defaultAuctionBidPeriod = 86400; // 1 day
        tokenAddress = IERC20(_tokenAddress);
    }

    //auction rounds should end once after 24hours and transferred to new owner (highest bidder)
    //start whenever newOwner lists again. After transfer, listing is set to false.

    struct Content {
        string title;
        string fileHash;
        string fileType;
        string fileSize;
        uint256 tokenId;
        uint256 value;
        uint32 auctionTimeLeft;
        address creator;
        address owner;
        address highestBidder;
        IStakingPool stakingPool;
        bool isOnSale;
    }

    struct Collateral{
        uint256 index; 
        mapping(uint256 => mapping(bool => bytes32)) collateralHash; 
    }

    mapping(address => Collateral) collateral;    
    mapping(address => (uint256 => Content)) contentRegistry; 
    mapping(address => uint256 ) userContentVolume;
    mapping(uint256 => address) poolRegistry;


    function publish(string _title, string _fileHash, string calldata _fileType, string calldata _fileSize, bool _isOnSale) public return {
        // @dev Make sure the file hash exists
        require(bytes(_fileHash).length != 0);

        // @dev Make sure file type exists
        require(bytes(_fileType).length != 0);

        // @dev Make sure file title exists
        require(bytes(_title).length != 0);

        // @dev Make sure file size is more than 0
        require(bytes(_fileSize).length != 0);

        uint256 fId = userContentVolume[msg.sender];
        uint256 tokenId = tokenSupply;

        IStakingPool pool = new StakingPool(address(tokenAddress));

        contentRegistry[msg.sender][fId] = Content(
            _title,
            _fileHash,
            _fileType,
            _fileSize,
            tokenId,
            0,
            0,
            msg.sender,
            msg.sender,
            address(0),
            pool,
            !_isOnSale            
        );

        mint(msg.sender, tokenId);
        
        //emits event of the published content
        emit Published(
            _title,
            _fileHash, 
            _fileType,
            _fileSize,
            fId,
            tokenId,
            0,
            0,
            msg.sender,
            msg.sender,
            address(0),
            pool,
            !_isOnsale
        );

        userContentVolume[msg.sender] = fId++;
        tokenSupply++;
    }

    function list(uint256 _fileId, address _creator) public return {
        Content memory c = contentRegistry[_creator][_fileId];
        require(!c.isOnSale, "Auction: ON");
        require(c.owner == msg.sender, "Not owner");
        contentRegistry[_creator][_fileId]._isOnSale = true;
    } 

    function claim(uint256 _fileId, address _creator) public return {
        Content memory c = contentRegistry[_creator][_fileId];
        require(!c.isOnSale, "Auction: ON");
        require(c.highestBidder == msg.sender, "Auction: Not Complete");
        contentRegistry[_creator][_fileId].owner = msg.sender;

        transfer(c.tokenId, msg.sender);
        emit Claimed(c);
    } 

    function bid(uint256 _fileId, address _creator,) public payable return {
        Content storage con = contentRegistry[_creator][_fileId];
        //need to add chainlink price configuration -> here
        con.value = contentRegistry[_creator][_fileId].stakingPool.balance();
        
        require(con._isOnSale, "Auction: OFF");
        //need to add chainlink price configuration -> OR here
        require(con.value < msg.value, "Value: too low");
        require(_timeLeft(_creator, _fileId) != 0, "Auction: Ended")

        ///@dev Records time left - Auction time is 24 hrs
        uint32 timeLeft = _timeLeft(_fileId);
        
        Content memory c;
        uint256 userAuctionBids = collateral[msg.sender].index;
            
        for(uint256 i; i < userAuctionBids;){
            (c, uint256 amount) = abi.decode(collateral[msg.sender].collateralHash[i][true], (Content, uint256));

            if(con == c){
                uint256 collat = msg.value - amount;
                bool success = _takeCollateral(collat);
                require(success);
                bytes32 txHash = keccak256(abi.encode(a, msg.value));
                collateral[msg.sender].collateralHash[i][true] = txHash;
                break;
            }

            unchecked{++i;}
        }
        
        bool sent = _takeCollateral(msg.value);
        require(sent);
        bytes32 txHash = keccak256(abi.encode(c, msg.value));
        collateral[msg.sender] = Collateral(
        userAuctionBids, 
        collateralHash[userAuctionBids][true] = txHash
        );
                
        ++collateral[msg.sender].index;

        con.value = msg.value;
        con.highestBidder = msg.sender;

       
        emit NewBidMade( 
            c, 
            timeLeft, 
            msg.value, 
            msg.sender
        );
    
    }  

    function _takeCollateral(uint256 _col) internal payable returns(bool){
        //Pays the fee to the contract
        (bool sent, ) = payable(address(this)).call{
            value: _col,
            gas: 20000
            }("");
        require(sent);
        return true;
    } 

    function withdrawCollateral(uint256 _fileId, address _creator) external returns(bool){
        Content memory con = contentRegistry[_creator][_fileId];
        uint256 userAuctionBids = collateral[msg.sender].index;
            
        for(uint256 i; i < userAuctionBids;){
            (c, uint256 amount) = abi.decode(
                collateral[msg.sender].collateralHash[i][true], (Content, uint256)
            );
                
            if(con == c){
                assert(con.highestBidder != msg.sender);

                collateral[msg.sender].collateralHash[i][false];
                    
                bool success = _payback(amount);
                require(success);

                collateral[msg.sender].collateralHash[i][true] = bytes32(0);

                return true;
            }
            unchecked{++i;}
        }
    }

    function _payback(uint256 _col) internal returns(bool){
        //Pays the fee to the contract
        (bool sent, ) = msg.sender.call{
            value: _col,
            gas: 20000
            }("");
        require(sent);
        return true;
    } 

    function withdrawAllCollateral() external returns(bool){
        uint256 userAuctionBids = collateral[msg.sender].index;

        uint256 ethCol;

        for(uint256 i; i < userAuctionBids;){

            (Content memory c, uint256 amount) = abi.decode(collateral[msg.sender].collateralHash[i][true], (Content, uint256));

            if(c.highestBidder != msg.sender){

                ethCol += amount;
                collateral[msg.sender].collateralHash[i][false];
                collateral[msg.sender].collateralHash[i][true] = bytes32(0);
            }
             
            unchecked{++i;}
        }

        bool success = _payback(ethCol);
        require(success);
        return true;
    }

    function _timeLeft(address _creator, uint256 _fileId) internal returns(uint32) {
        Content storage c = contentRegistry[_creator][_fileId];
        
        //Still skeptical about this comparison
        if(c.auctionTimeLeft < uint32(block.timestamp)){
            c.isOnSale = false;
            
            emit AuctionIsNotActive(c);
        
            return c.auctionTimeLeft = 0;
        } 

        uint32 c.auctionTimeLeft = c.auctionTimeLeft - uint32(block.timestamp);

        return c.auctionTimeLeft;
    }

}

