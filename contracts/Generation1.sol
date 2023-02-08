// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Generation1 is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;
    
    mapping(address=>bool) public owners;
    string public baseURI;
    string baseExtension=".json";

    constructor(string memory _baseURI) ERC721("Pokemon", "PKN") {
        baseURI=_baseURI;
    }

    function safeMint() public  {
        require(owners[msg.sender]==false,"You may mint only 1 Pokemon");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        string memory uri=getTokenURI();
        _setTokenURI(tokenId, uri);
        owners[msg.sender]=true;
    }

    function getTokenURI() internal view returns(string memory){
        uint r=random();
        uint idx=r%3;

        return
            bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(
                        baseURI,
                        idx.toString(),
                        baseExtension
                    )
                )
                : "";

    }


     function random() internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp)));
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
