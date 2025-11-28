// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title EduCredToken
 * @dev ERC721 token representing educational credentials
 */
contract EduCredToken is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Struct to store credential metadata
    struct Credential {
        string title;
        string description;
        string issuer;
        uint256 issueDate;
        string ipfsHash;
        bool isRevoked;
    }

    // Mapping from token ID to credential details
    mapping(uint256 => Credential) private _credentials;

    // Events
    event CredentialMinted(
        uint256 indexed tokenId,
        address indexed to,
        string title,
        string ipfsHash
    );
    event CredentialRevoked(uint256 indexed tokenId, string reason);

    constructor() ERC721("EduCred Token", "EDUCT") Ownable(msg.sender) {}

    /**
     * @dev Mints a new credential token
     */
    function mintCredential(
        address to,
        string memory title,
        string memory description,
        string memory issuer,
        string memory ipfsHash
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        
        _credentials[tokenId] = Credential({
            title: title,
            description: description,
            issuer: issuer,
            issueDate: block.timestamp,
            ipfsHash: ipfsHash,
            isRevoked: false
        });

        emit CredentialMinted(tokenId, to, title, ipfsHash);
        return tokenId;
    }

    /**
     * @dev Revokes a credential
     */
    function revokeCredential(uint256 tokenId, string memory reason) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _credentials[tokenId].isRevoked = true;
        emit CredentialRevoked(tokenId, reason);
    }

    /**
     * @dev Returns credential details
     */
    function getCredential(uint256 tokenId) public view returns (
        string memory title,
        string memory description,
        string memory issuer,
        uint256 issueDate,
        string memory ipfsHash,
        bool isRevoked
    ) {
        require(_exists(tokenId), "Token does not exist");
        Credential memory credential = _credentials[tokenId];
        return (
            credential.title,
            credential.description,
            credential.issuer,
            credential.issueDate,
            credential.ipfsHash,
            credential.isRevoked
        );
    }

    /**
     * @dev Override to check if credential is revoked before transfer
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        require(!_credentials[tokenId].isRevoked, "Credential is revoked");
        return super._update(to, tokenId, auth);
    }
}
