// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Token.sol";

interface Itoken{

    function bulkMint(string memory _eventId, uint _totalTickets ) external;
    function safeMint(address to, string memory _state, string memory _lga, string memory _location, uint256 _plotNumber) external ;
    function transfer(address _receiver, uint _totalTickets) external  returns(bool);
    function ticket_owner(uint tokenId) external view returns(address);
    function transferToken( address from, address to, uint256 tokenId) external ;
    function checkId(address _addr) external view returns(uint) ;

}