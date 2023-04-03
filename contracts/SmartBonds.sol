//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
contract SmartBonds {
    mapping(address => uint) _count; 
    mapping(address => mapping(uint => uint)) _smartBondOwners;
    mapping(uint => SmartBond) _smartBonds;
    uint _featuredBond; 
    struct SmartBond {
        uint id;
        string data;
        string description;
        address owner;
    }
    
    address _minter;
    address _owner;
    constructor(address minter, address owner) {
        _minter = minter;
        _owner = owner;
    }

    function mint() public view returns (uint) {
        require(msg.sender == _minter, "unable to mint new smart bond");
        return 1;
    }

    function setFeatured() public returns (uint) {
        require(_featuredBond == 0, "featured bond already set");
    }

    function getSmartBond(uint id) public pure returns (SmartBond memory) {
        return SmartBond(0, "", "", address(0));
    }

    function getSmartBonds(address user) public pure returns (SmartBond [] memory) {
        return new SmartBond[](0);
    }

    function listSmartBond() public pure returns (uint) {
        return 0;
    }

    function getListedSmartBonds() public pure returns (uint) {

    }

    function featuredBond() public pure returns (uint) {
        return 0;
    }

    //bonding mechanism -> only featured bonds can be bid on, with this as the origial owner
    function bid() public pure returns (uint) {

    }

    function bidEnds() public pure returns (uint) {

    }

    function highestBid() public pure returns (uint) {

    }

    function winner() public pure returns (address) {

    }

    function redeem() public pure returns (uint) {
        //if featured, then all the money goes to us
    }
}