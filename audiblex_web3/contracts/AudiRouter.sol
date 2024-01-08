import "@openzeppelin/contracts/utils/Strings.sol";

contract AudiRouter is ERC721 {
    type Strings for uint256;
    us

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
        uint32 auctionTimeLeft;
        address creator;
        address owner;
        address highestBidder;
        IStakingPool stakingPool;
        bool isOnSale;
    }

    mapping(address => Collateral) collateral;
    
    struct Collateral{
        uint256 index; 
        mapping(uint256 => mapping(bool => bytes32))collateralHash; 
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

    function claim

}



//SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./PriceConverter.sol";

error NotOwner();

contract Crowdfund {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 5 * 1e18; //$5

    uint256 public constant FUND_TARGET = 1e24; //$1 Million

    uint256 public constant FUND_DURATION = 3 weeks;

    address public beneficiaryAccount;
    address public admin;

    address[] public funders;
    mapping(address => bool) sponsor;
    mapping(address => uint256) public addressToAmountFunded;

    uint256 fundBalance;

    event Funded(
        address indexed funder,
        uint256 indexed fundAmountInUsd,
        uint256 indexed fundBalance
    );
    event Withdrawn(
        uint256 indexed unaccountedFunds,
        uint256 indexed fundBalance
    );
    event BeneficiaryAccountChanged(
        address indexed beneficiaryAccount,
        address indexed newBeneficiaryAccount
    );
    event AdminChanged(address indexed oldAddress, address indexed newAddress);

    constructor(address _beneficiary) {
        admin = msg.sender;
        beneficiaryAccount = _beneficiary;
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotOwner();
        _;
    }

    function fund() public payable {
        uint256 fundAmountInUsd = msg.value.getConversionRate();
        require(fundAmountInUsd > MINIMUM_USD, "Value too low");
        require(
            getAccountedFunds() + fundAmountInUsd <= FUND_TARGET,
            "Funding over threshold!"
        );
        require(block.timestamp <= FUND_DURATION, "Auction status: Ended");
        //keep records of funders and the amount funded
        if (!sponsor[msg.sender]) {
            funders.push(msg.sender);
            sponsor[msg.sender] = true;
        }
        addressToAmountFunded[msg.sender] += msg.value;
        fundBalance += msg.value;

        emit Funded(
            msg.sender,
            fundAmountInUsd,
            fundBalance.getConversionRate()
        );
    }

    function withdraw() public onlyAdmin {
        //require(getAccountedFunds() >= FUND_TARGET);
        require(
            block.timestamp >= FUND_DURATION,
            "Auction status: Still Active"
        );

        //payable(beneficiaryAccount).safeTransfer(address(this).balance);

        (bool success, ) = payable(beneficiaryAccount).call{value: address(this).balance}("");

        require(success, "Call failed");

        uint256 fundBalanceInUsd = fundBalance.getConversionRate();
        uint256 unaccountedFundsInUsd = fundBalanceInUsd - getAccountedFunds();

        emit Withdrawn(unaccountedFundsInUsd, fundBalanceInUsd);

        fundBalance = 0;
    }

    //Added receive and fallback functions to ensure successful tx with funders who sent money without the fund function.
    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    //          SETTERS                 //

    function changeBeneficiaryAccount(
        address newBeneficiaryAccount
    ) public onlyAdmin {
        require(newBeneficiaryAccount != address(0), "Invalid address");
        beneficiaryAccount = newBeneficiaryAccount;
        emit BeneficiaryAccountChanged(
            beneficiaryAccount,
            newBeneficiaryAccount
        );
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "Invalid address");

        admin = newAdmin;
        emit AdminChanged(admin, newAdmin);
    }

    //              GETTERS                 //

    function getAccountedFunds() public view returns (uint256) {
        uint256 accountedFunds;

        for (uint256 i; i < funders.length; i++) {
            accountedFunds += addressToAmountFunded[funders[i]];
        }
        return accountedFunds.getConversionRate();
    }

    function getTotalFunders() external view returns (uint256) {
        return funders.length;
    }

    function getFundBalance() public view returns (uint256) {
        return fundBalance.getConversionRate();
    }
}

