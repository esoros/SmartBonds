//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface IUniswapV2Router02 {
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline) 
        external returns (uint[] memory amounts);
}

contract SmartBonds {
    mapping(uint => uint) private listed;
    mapping(uint => bool) private collectionClosed;
    mapping(uint => address) private collectionOwner;
    mapping(uint => uint) private collectioCount;
    mapping(uint => mapping(uint => uint)) collectionData;
    mapping(address => uint) private userNftCount;
    mapping(address => mapping(uint => uint)) userNfts;
    mapping(uint => NFT) nftData;
    uint private totalNftCount = 0;
    uint private collectionCount = 0;
    uint private listedCount = 0;
    IUniswapV2Router02 private _uniswapv2;

    struct NFT {
        uint id;
        string description;
        uint price;
        address token;
        string content;
        string mimetype;
        uint listPrice;
        address listToken;
        address owner;
    }

    constructor(address uniswapv2) {
        _uniswapv2 = IUniswapV2Router02(uniswapv2);
    }
    
    function getYourNFTs() public view returns (NFT[] memory) {
        NFT[] memory result = new NFT[](userNftCount[msg.sender]);
        for(uint i = 0; i < result.length; ++i) {
            result[i] = nftData[userNfts[msg.sender][i]];
        }
        return result;
    }

    function list(uint nftId, uint price, address token) public returns (uint) {
        listedCount += 1;
        listed[listedCount] = nftId;
        nftData[nftId].listPrice = price;
        nftData[nftId].listToken = token;
        return listedCount;
    }

    function getListed() public view returns (NFT[] memory) {
        NFT[] memory result = new NFT[](listedCount);
        for(uint i = 0; i < result.length; ++i) {
            result[i] = nftData[listed[i]];
        }
        return result;
    }

    function purchaseFromMarket(uint nftid, address token) public {
        NFT memory nft = nftData[nftid];
        require(nft.id != 0 &&  nft.owner == address(0));

        if(token == nft.token) {
            IERC20 purchaseToken = IERC20(token);
            require(purchaseToken.allowance(msg.sender, address(this)) >= nft.price, "insufficient token allowance");
            purchaseToken.transferFrom(msg.sender, address(this), nft.price);
        } else {
            address[] memory path = new address[](2);
            path[0] = token;
            path[1] = nft.token;
            _uniswapv2.swapTokensForExactTokens(nft.price, IERC20(token).balanceOf(msg.sender), path, address(this), block.timestamp + 30 seconds);
        }
    }

    function purchaseFromCollection(uint nftid, address token) public {
        NFT memory nft = nftData[nftid];
        require(nft.id != 0 &&  nft.owner == address(0));

        if(token == nft.listToken) {
            IERC20 purchaseToken = IERC20(token);
            require(purchaseToken.allowance(msg.sender, address(this)) >= nft.price, "insufficient token allowance");
            purchaseToken.transferFrom(msg.sender, address(this), nft.price);
        } else {
            address[] memory path = new address[](2);
            path[0] = token;
            path[1] = nft.listToken;
            _uniswapv2.swapTokensForExactTokens(nft.listPrice, IERC20(token).balanceOf(msg.sender), path, address(this), block.timestamp + 30 seconds);
        }
    }

    function createCollection() public returns (uint) {
        uint count = collectionCount++;
        collectionOwner[count] = msg.sender;
        return count;
    }

    function addToCollection(uint collectionId, NFT memory item) public returns (uint) {
        require(msg.sender == collectionOwner[collectionId], "Only owner can add to collection");
        uint nftId = totalNftCount++;
        nftData[nftId] = item;
        return nftId;
    }
 
    function closeCollection(uint collectionId) public returns (uint) {
        collectionClosed[collectionId] = true;
        return collectionId;
    }

    function getCollections() public view returns (uint) {
        return collectionCount;
    }

    function getCollection(uint collectionId) public view returns (NFT[] memory) {
        NFT[] memory result = new NFT[](collectioCount[collectionId]);
        for(uint i = 0; i < result.length; ++i) {
            result[i] = nftData[collectionData[collectionId][i]];
        }
        return result;
    }
}