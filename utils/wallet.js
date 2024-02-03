/* eslint-disable no-unused-vars */
import CONFIG from "../config";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import { ethers, utils } from "ethers";

export const connectedChain = async (chainID) => {
  if (window.ethereum) {
    try {
      const chain = await window.ethereum.request({ method: "eth_chainId" });
      if (chain === utils.hexValue(chainID)) {
        return true;
      } else {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(chainID) }],
        });
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
        toast.error(`error in changing the network`);

        return false;
      }
    } catch (error) {
      if (UserRejected(error.message)) {
        return;
      }
      const networkMap = {
        MUMBAI_TESTNET: {
          chainId: utils.hexValue(80001),
          chainName: "Matic(Polygon) Mumbai Testnet",
          nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
          rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        },

        SEPOLIA_TESTNET: {
          chainId: utils.hexValue(11155111),
          chainName: "Sepolia test network",
          nativeCurrency: {
            name: "SepoliaETH",
            symbol: "SepoliaETH",
            decimals: 18,
          },
          rpcUrls: ["https://sepolia.infura.io/v3/"],
          blockExplorerUrls: ["https://sepolia.etherscan.io"],
        },
      };

      if (chainID === 80001) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.MUMBAI_TESTNET],
        });

        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      } else if (chainID === 7001) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.ZetaChain_Testnet],
        });

        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      } else if (chainID === 97) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.BNB_TESTNET],
        });

        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      } else if (chainID === 84531) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.BASE_TESTNET],
        });

        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      } else if (chainID === 43113) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.AVALANCHE_FUJI_TESTNET],
        });

        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      } else if (chainID === 11155111) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.SEPOLIA_TESTNET],
        });

        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
    }
  } else {
    toast.error(
      `🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)`
    );
  }
};

export const UserRejected = (error) => {
  if (error === "User rejected the request.") {
    toast.error("Please connect your wallet again");
    return 1;
  } else {
    return 0;
  }
};
