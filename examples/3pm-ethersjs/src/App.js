import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { balanceOfAbi } from './abi';

// helper function to connect wallet from metamask
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      throw error.message;
    }
  } else {
    throw new Error('Metamask is not installed');
  }
};

const isOwnedByUser = async (nftAddress, tokenId, walletAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // ask user to sign
    const nonce = 101232412320412; // random number goes here;
    const message =
      'Hello, sign this message to prove you have access to this wallet with the nonce : ' +
      nonce.toString();
    await signer.signMessage(message);

    const contract = new ethers.Contract(nftAddress, balanceOfAbi, signer);

    const balance = await contract.balanceOf(walletAddress, parseInt(tokenId));

    return !balance.isZero();
  } catch (error) {
    throw error.message;
  }
};

const TestNFTOwnership = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [nftAddress, setNftAddress] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    connectWallet().then((res) => setWalletAddress(res));
  }, []);

  const handleClick = () => {
    if (nftAddress && tokenId && walletAddress) {
      isOwnedByUser(nftAddress, tokenId, walletAddress).then((val) => setIsOwned(val));
    }
  };

  return (
    <>
      <div>wallet adress: {walletAddress}</div>
      <div>
        <label htmlFor="nftaddress">nft address</label>
        <input id="nftaddress" onChange={(e) => setNftAddress(e.target.value)} size={50} />
      </div>
      <div>
        <label htmlFor="tokenid">token id</label>
        <input id="tokenid" onChange={(e) => setTokenId(e.target.value)} />
      </div>
      <button onClick={handleClick}>Check ownership</button>
      <div>Owns: {isOwned.toString()}</div>
    </>
  );
};

export default TestNFTOwnership;
