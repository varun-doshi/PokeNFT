import React, { useEffect, useState } from "react";
import "../App.css";

const NFT = ({ user, collectionAdd, API_KEY }) => {
  const [NFTs, setNFT] = useState([]);

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

    if (nfts) {
      console.log("nfts:", nfts);
      setNFT(nfts.ownedNfts);
      console.log("NFTs:", NFTs);
    }
  };

  useEffect(() => {
    getNFTs();
  }, [user]);

  return (
    <div>
      <div className="fetchBtn">
        {/* <button onClick={() => getNFTs()}>Get NFTs</button> */}
      </div>
      <h1>Your Pokemon</h1>
      <div className="poke-card">
        {NFTs?.length &&
          NFTs.map((nft) => {
            return (
              <div>
                <img className="poke-img" src={nft.media[0].gateway} alt="" />
                <p className="poke-title">{nft.title}</p>
                <div className="poke-attributes">
                  <div className="poke-rarity">
                    <p>{nft.metadata.attributes[0].trait_type + ":"}</p>
                    <p>{nft.metadata.attributes[0].value}</p>
                  </div>
                  <div className="poke-type">
                    <p>{nft.metadata.attributes[1].trait_type + ":"}</p>
                    <p>{nft.metadata.attributes[1].value}</p>
                  </div>
                </div>
                <button className="etherscanBtn">
                  <a
                    href={`https://testnets.opensea.io/assets/goerli/${
                      nft.contract.address
                    }/${nft.id.tokenId.slice(-1)}`}
                    target="_blank"
                  >
                    View on Opensea
                  </a>
                </button>
              </div>
            );
          })}
      </div>

      {/* {NFTs?.length && <h1>Hello</h1>} */}
    </div>
  );
};

export default NFT;
