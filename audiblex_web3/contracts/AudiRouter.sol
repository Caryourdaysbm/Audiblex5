import "@openzeppelin/contracts/utils/Strings.sol";

contract AudiRouter is ERC721 {
    type Strings for uint256;

    uint256 tokenSupply;

    string public baseURI;

    uint64 defaultAuctionBidPeriod;

    constructor(string memory _baseURI) ERC721("AUDIBLEX-V1", "ADB-V1"){
        baseURI = _baseURI;
        defaultAuctionBidPeriod = 86400; // 1 day
    }

    struct Content {
        string title;
        string fileHash;
        string fileType;
        string fileSize;
        uint256 tokenId;
        uint256 value;
        address creator;
        address owner;
        IStakingPool stakingPool;
        bool isOnSale;
    }

    //auction rounds should end once after 24hours and transferred to new owner (highest bidder)
    //start whenever newOwner lists again. After transfer, listing is set to false.

    struct Auction {
        string title;
        string fileHash;
        string fileType;
        string fileSize;
        uint256 tokenId;
        bool isOnSale;
    }

    mapping(address => (uint256 => Content)) contentRegistry; 
    mapping(address => uint256 ) userContentVolume;
    mapping(uint256 => address) poolRegistry;


    function publish(string _title, string _fileHash, string calldata _fileType, string calldata _fileSize, bool _isOnSale) public return {
        // @dev Make sure the file hash exists
        require(bytes(_fileHash).length > 0);

        // @dev Make sure file type exists
        require(bytes(_fileType).length > 0);

        // @dev Make sure file title exists
        require(bytes(_title).length > 0);

        // @dev Make sure file size is more than 0
        require(bytes(_fileSize).length > 0);

        uint256 fId = userContentVolume[msg.sender];
        uint256 tokenId = tokenSupply;

        IStakingPool pool = new StakingPool();

        contentRegistry[msg.sender][fId] = Content(
            _title,
            _fileHash,
            _fileType,
            _fileSize,
            tokenId,
            0,
            msg.sender,
            msg.sender,
            pool,
            !_isOnSale            
        );

        mint(msg.sender, tokenId);
        
        //emits event of the policy added
        emit Published(
            _title,
            _fileHash, 
            _fileType,
            _fileSize,
            fId,
            tokenId,
            0,
            msg.sender,
            msg.sender,
            pool,
            !_isOnsale
        );

        userContentVolume[msg.sender] = fId++;
        tokenSupply++;
    }

    function list(uint256 _fileId, address _creator) public return {
        Content memory c = contentRegistry[_creator][_fileId];
        require(!c.isOnSale, "Auction: ON");
        require(c.owner == msg.sender, "Not owner" )
       // uint256 tokenId = contentRegistry[msg.sender][_fileId].tokenId;
        contentRegistry[_creator][_fileId]._isOnSale = true;
    } 

    function bid(uint256 _fileId, address _creator,) public payable return {
        Content storage c = contentRegistry[_creator][_fileId];
        //need to add chainlink price configuration -> here
        c.value = contentRegistry[_creator][_fileId].stakingPool.balance();
        require(c._isOnSale, "Auction: OFF");
        //need to add chainlink price configuration -> OR here
        require(c.value < msg.value, "Value: too low");

    }
}