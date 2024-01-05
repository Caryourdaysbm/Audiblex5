//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    mapping(address => uint256) lpShare;

    function getPoolBalance() public returns(uint256) {
        return address(this).balance;
    }



pragma solidity^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingPool is ERC20 {
    address public tokenAddress;

    uint256 constant MAX_PERCENTAGE = 10000;
    
    constructor() ERC20("Audiblex-V1", "Audi-V1") {
    }

    function stake(uint256 _tokenAmount, address _content, uint256 _tokenId) public payable returns(uint256) {

        data
        if(getReserve() == 0){
        // LP token issued is the exact amount of ethers deposited
        uint256 liquidity = address(this).balance;
        _mint(msg.sender, liquidity);
        return liquidity;
        } else {
            uint256 ethReserve = address(this).balance - msg.value; //deducts incoming msg.value from reserve

            // LP token issued is proportional to amount of ethers deposited
            uint256 liquidity = (totalSupply() * msg.value) / ethReserve;
            _mint(msg.sender, liquidity);
            return liquidity;
        }
    }

    

    function removeLiquidity(uint256 _amount) public returns(uint256) {
        require(_amount > 0, "invalid amount");

        uint256 numerator = _amount * 9900;
        uint256 denominator = _amount * MAX_PERCENTAGE;
        uint256 threshold = numerator/demoniator;
        uint256 fee = _amount - threshold;
        

        uint256 ethAmount = (address(this).balance * threshold) / totalSupply();

        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(ethAmount);
        
        //Transfer fees to feeManager
        payable(router).transfer(fee);
        return (ethAmount);
    }

    function getReserve() public view returns(uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
}
