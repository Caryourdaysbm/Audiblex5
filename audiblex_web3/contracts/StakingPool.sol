//SPDX-License-Identifier: MIT

pragma solidity^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingPool is ERC20 {
    IERC20 public tokenAddress;

    uint256 constant MAX_PERCENTAGE = 10000;
    
    constructor(address _tokenAddress) ERC20("Audiblex-V1", "Audi-V1") {
        tokenAddress = IERC20(_tokenAddress);
    }

    function stake(uint256 _tokenAmount, address _content, uint256 _tokenId) public payable returns(uint256) {
        if(getReserve() == 0){
            token.transferFrom(msg.sender, address(this), _tokenAmount);
        // LP token issued is the exact amount of ethers deposited
        uint256 liquidity = _tokenAmount;
        _mint(msg.sender, liquidity);
        return liquidity;
        } else {
            token.transferFrom(msg.sender, address(this), _tokenAmount);
            uint256 tokenReserve = getReserve();
            // LP token issued is proportional to amount of tokens deposited
            uint256 liquidity = (totalSupply() * _tokenAmount) / tokenReserve;
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
        

        uint256 tokenAmount = (getReserve() * threshold) / totalSupply();

        _burn(msg.sender, _amount);
        token.transfer(tokenAmount);
        
        //Transfer fees to feeManager
        payable(feeManager).transfer(fee);
        return (tokenAmount);
    }

    function getReserve() public view returns(uint256) {
        return token.balanceOf(address(this));
    }

    function getValue() public view returns(uint256) {
        return getReserve().getConversionRate();
    }
}
