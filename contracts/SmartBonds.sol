//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
contract SmartBonds {
    uint _smartBondCount = 0;
    mapping(uint => SmartBond) _smartBonds;
    struct SmartBond {
        uint id;
        address owner;
    }

    function purchase() public returns (uint) {
        uint result = _smartBondCount;
        _smartBonds[_smartBondCount++] = SmartBond(result, msg.sender);
        return result;
    }

    function getSmartBond(uint id) public view returns (SmartBond memory) {
        SmartBond memory bond =  _smartBonds[id];
        if(bond.owner == address(0)) {
            revert("unable to find bond");
        } else {
            return bond;
        }
    }
}