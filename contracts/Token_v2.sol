// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';

contract Token_v2 is ERC20Upgradeable {
    uint256 public constant testConstant = 2;

    /*
    function initialize(string memory _name, string memory _symbol) public initializer {
        __ERC20_init(_name, _symbol);
    }
    */

    function buyToken() public pure returns (string memory) {
        return 'v.2 - "buyToken" function works!';
    }
}
