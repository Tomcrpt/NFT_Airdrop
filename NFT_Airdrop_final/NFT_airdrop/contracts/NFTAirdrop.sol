// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";



contract HDAirdrop is ERC1155, Ownable, Pausable {

    string public baseURI;
    // to be modified

    uint public constant MAX_GROUP = 5;

    constructor(string memory) ERC1155(baseURI){}

    function mint(uint _group, address[] memory _Addresses) external onlyOwner{
        require(_group < MAX_GROUP, "group out of range");
        for(uint k = 0; k < _Addresses.length; k++) {
            _mint(_Addresses[k], _group, 1, "");
        }
    }

    
    function moduloMint(uint[] memory _groups, uint modulo, string[] memory uri, address[] memory _addressesToAirdropTo) external onlyOwner {
        require(modulo !=0, "modulo can not be 0");
        for(uint k = 0; k < _addressesToAirdropTo.length; k++) {
            setBaseURI(uri[k%modulo]);
            _mint(_addressesToAirdropTo[k], _groups[k], 1, "");
        }
    }

   
    function partnerMint(uint[] memory _groups, uint[] memory _nMints, address[] memory _addressesToAidropTo) external onlyOwner {
        require(_groups.length == _nMints.length && _groups.length == _addressesToAidropTo.length, "array lengths don't match");
        for(uint k = 0; k < _groups.length; k++) {
            require(_groups[k] < MAX_GROUP, "_faction out of range");
            _mint(_addressesToAidropTo[k], _groups[k], _nMints[k], "");
        }
    }

    function setBaseURI(string memory newURI) public onlyOwner{
        baseURI = newURI;
        return;
    }

    function uri(uint256) public view virtual override returns (string memory) {
        return baseURI;
    }

}


