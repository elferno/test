// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';

contract Token_v1 is ERC20Upgradeable {
    uint256 _test_value;

    function initialize(
        string memory _name,
        string memory _symbol,
        uint256 _new_test_value
    ) public initializer {
        __ERC20_init(_name, _symbol);
        _test_value = _new_test_value;
    }

    function getValue() public view returns (uint256) {
        return _test_value;
    }
}
