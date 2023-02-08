// import { useAccount, useConnect } from "wagmi";
// import { polygonMumbai } from "@wagmi/core/chains";
import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import collectionImg from "./images/hero.png";
import pokeball from "./images/pokeball.png";
import Mint from "./components/Mint";
import NFT from "./components/NFT";

function App() {
  const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_baseURI",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "baseURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "owners",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "safeMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const contrctAddress = "0xa25eFC75BEC98519dEACD3410B1cAa047B5b00e3";
  const [user, setUser] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [API_KEY, setAPIKEY] = useState("");
  const [collectionAdd, setCollectionAdd] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await provider.send("eth_requestAccounts", []);
      const { name, chainId } = await provider.getNetwork();
      console.log(chainId);
      setUser(accounts[0]);
      console.log(accounts[0]);
      if (chainId != 5) switchNetwork();
      setIsConnected(true);
      checkOwner(accounts[0]);
    } else {
      console.log("Install Metamask");
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x5",
                chainName: "Goerli",
                rpcUrls: ["https://goerli.infura.io/v3/"],
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleAccChange = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    setUser(accounts[0]);
  };

  const checkOwner = async (user) => {
    const contract = new ethers.Contract(contrctAddress, abi, provider);

    const owner = await contract.owners(user);
    console.log("Owner:", owner);
    setIsOwner(owner);
  };

  window.ethereum.on("accountsChanged", handleAccChange);

  const mintNFT = async () => {
    console.log(user);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contrctAddress, abi, signer);
    const txn = await contract.safeMint();
    await txn.wait();
  };

  const getNFTs = async () => {
    let nfts;

    const baseURL = `https://eth-goerli.g.alchemy.com/v2/${API_KEY}`;
    console.log(baseURL);
    console.log("getting nfts");

    var requestOptions = {
      method: "get",
    };
    const fetchURL = `${baseURL}/getNFTs/?owner=${user}&contractAddresses%5B%5D=${collectionAdd}`;
    console.log(fetchURL);
    nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    console.log(nfts);
  };

  useEffect(() => {
    setAPIKEY(process.env.REACT_APP_ALCHEMY_API_KEY);

    setCollectionAdd("0xa25eFC75BEC98519dEACD3410B1cAa047B5b00e3");
  }, []);
  useEffect(() => {
    checkOwner(user);
  }, [user]);

  return (
    <div className="App">
      <div className="navbar">
        <h1>PokeNFT</h1>

        {!isConnected ? (
          <button className="connect" onClick={handleConnect}>
            Connect
          </button>
        ) : (
          <button className="connected">
            {user.substring(0, 4) + "..." + user.substring(38)}
          </button>
        )}
      </div>
      <div className="hero">
        <div className="left-side">
          <h1>
            Start your <span style={{ color: "#68B984" }}>Po</span>
            <span style={{ color: "#FC7300" }}>ke</span>
            <span style={{ color: "#85CDFD" }}>mon</span> Journey
          </h1>
          <p>
            Grab your Pokemon and become the next{" "}
            <span style={{ color: "#F94A29" }}>Pokemon World Champion</span>.
            <br />
            Do you have what it takes?
          </p>
          {/* <div className="minBtn">
            <button onClick={mintNFT}>Mint NFT</button>
          </div>
          <div className="fetchBtn">
            <button onClick={() => getNFTs()}>Get NFTs</button>
          </div> */}
        </div>

        <div className="right-side">
          <img className="img" src={collectionImg} alt="" />
        </div>
      </div>
      {!isOwner ? (
        <Mint user={user} />
      ) : (
        <NFT user={user} collectionAdd={collectionAdd} API_KEY={API_KEY} />
      )}

      {/* <div className="mint-section">
        <h1>Choose your Pokemon</h1>
        <div className="pokeball-box">
          <div className="mint-box">
            <img src={pokeball} alt="" />
            <button onClick={mintNFT}>Select Pokemon</button>
          </div>
          <div className="mint-box">
            <img src={pokeball} alt="" />
            <button onClick={mintNFT}>Select Pokemon</button>
          </div>
          <div className="mint-box">
            <img className="pokeball-img" src={pokeball} alt="" />
            <button className="mintBtn" onClick={mintNFT}>
              Select Pokemon
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
