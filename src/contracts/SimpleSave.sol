// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleSave is Ownable {


    uint public fee = 0.01 ether;
    
    struct Item {
      string firstName;
      string lastName;
      string birthCity;
      string birthCountry;
      string birthDate;
      string deathDate;
      string imageUri;
      string notes;
  }

    mapping(address => Item[]) public items;

    event ItemEvent (        
        string indexed firstName,
        string indexed lastName,
        string indexed birthCity,
        string  firstNameStr,
        string  lastNameStr,
        string  birthCityStr,
        string  birthCountry,
        string  birthDate,
        string  deathDate,
        string imageUri,
        string  notes );

    event TransferEvent(address indexed to, uint256 value);

    constructor() {
    }


    function setFee(uint newFee) public onlyOwner returns (bool) {
        fee = newFee;
        return true;
    }

    function createItem (
        string memory _firstName,
        string memory _lastName,
        string memory _birthCity,
        string memory _birthCountry,
        string memory _birthDate,
        string memory _deathDate,
        string memory _imageUri,
        string memory _notes) public payable {

        require( msg.value == fee,"value should be exact to fee");

        Item memory newItem = Item({
            firstName:_firstName,
            lastName: _lastName,
            birthCity:_birthCity,
            birthCountry:_birthCountry,
            birthDate :_birthDate,
            deathDate:_deathDate,
            imageUri:_imageUri,
            notes:_notes
        });
        items[msg.sender].push(newItem);

        emit  ItemEvent (        
        _firstName,
        _lastName,
        _birthCity,
        _firstName,
        _lastName,
        _birthCity,
        _birthCountry,
        _birthDate,
        _deathDate,
        _imageUri,
        _notes);

    }

    function getAddressItemCount (address _itemOwner) external  view returns(uint) {
        return items[_itemOwner].length;
    }

    function getBalance () external  view onlyOwner returns(uint) {
        return address(this).balance;
    }

    function transfer(
        address _to,
        uint256 _amount
    ) external  onlyOwner {
        require(_to != address(0), "transfer to the zero address");

        require(address(this).balance >= _amount, "transfer amount exceeds balance");

        payable(_to).transfer(_amount);

        emit TransferEvent(_to, _amount);

    }

}