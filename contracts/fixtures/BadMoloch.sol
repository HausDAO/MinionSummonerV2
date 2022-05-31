pragma solidity ^0.8.0;

contract BadMoloch {
  function withdrawBalance(address token, uint256 amount) external {
    require(true); /*Pretend to do something*/
  }
}