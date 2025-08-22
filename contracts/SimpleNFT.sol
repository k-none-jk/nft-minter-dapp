// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleNFT {
    string public name = "SimpleNFT";
    string public symbol = "SNFT";

    uint256 public totalSupply;

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    function mint() public {
        totalSupply++;
        uint256 newTokenId = totalSupply;
        ownerOf[newTokenId] = msg.sender;
        balanceOf[msg.sender]++;
        emit Transfer(address(0), msg.sender, newTokenId);
    }
}
