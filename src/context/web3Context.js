import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import { formatUntis, fromBNtoEth, parseUnits } from "../utils/etherUtils";

import { formatBalance } from "../utils/helperUtils";
import { type } from "@testing-library/user-event/dist/type";
import {
  simpleSaveContractAddress,
  simpleSaveAbi,
} from "../contracts/constants";

export const web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState();
  const [userBalance, setUserBalance] = useState();
  const [networkId, setNetworkId] = useState();
  const [isSupportMetaMask, setIsSupportMetaMask] = useState(false);

  let provider;
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  //   else {
  //     provider = new ethers.providers.JsonRpcProvider(
  //       "https://data-seed-prebsc-1-s1.binance.org:8545"
  //     );
  //   }

  const contract = new ethers.Contract(
    simpleSaveContractAddress,
    simpleSaveAbi,
    provider
  );

  const getFee = async () => {
    const fee = await contract.fee();
    return fee;
  };

  const getItem = async (address, order) => {
    const items = await contract.items(address, order);
    return items;
  };

  const getAddressItemCount = async (address) => {
    const count = await contract.getAddressItemCount(address);
    return count;
  };
  const createItem = async (data) => {
    const {
      firstName,
      lastName,
      birthCity,
      birthCountry,
      birthDate,
      deathDate,
      imageUri,
      notes,
    } = data;
    const fee = await getFee();
    const options = { value: fee };
    const tx = await contract
      .connect(provider.getSigner())
      .createItem(
        firstName,
        lastName,
        birthCity,
        birthCountry,
        birthDate,
        deathDate,
        imageUri,
        notes,
        options
      );
    const result = await tx.wait();
    return result;
  };

  const requestAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  const getBalance = async (address) => {
    if (provider) {
      let balance = await provider.getBalance(address);
      return fromBNtoEth(balance);
    }
  };

  const getBlock = async () => {
    const block = await provider.getBlock();
    return block;
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      setIsSupportMetaMask(true);
    } else {
      setIsSupportMetaMask(false);
    }
  };
  const handleStartUp = async () => {
    if (typeof window.ethereum !== "undefined") {
      const acc = await provider.listAccounts();
      if (acc.length > 0) {
        setAccount(acc[0]);
        const balance = await getBalance(acc[0]);
        setUserBalance(balance);
      }
      setNetworkId(window.ethereum.networkVersion);
      window.ethereum.on("chainChanged", function (networkId) {
        // Time to reload your interface with the new networkId
        window.location.reload();
        // setNetworkId(networkId);
      });
      window.ethereum.on("accountsChanged", async function (acc) {
        window.location.reload();
        if (acc.length > 0) {
          // changed account
          // setAccount(acc[0]);
          // const balance = await getBalance(acc[0]);
          // setUserBalance(balance);
        } else {
          // disconnect
          setAccount([]);
        }
      });
    } else {
      const network = await provider.getNetwork();
      setNetworkId(network.chainId);
    }
  };

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await handleStartUp();
    })();

    return () => {};
  }, [account]);

  return (
    <web3Context.Provider
      value={{
        requestAccount,
        account,
        provider,
        networkId,
        isSupportMetaMask,
        userBalance,
        getItem,
        getAddressItemCount,
        createItem,
        getBlock,
      }}
    >
      {children}
    </web3Context.Provider>
  );
};
