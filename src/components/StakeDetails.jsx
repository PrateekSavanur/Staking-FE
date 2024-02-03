/* eslint-disable no-unused-vars */
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import StableTokenAbi from "../../constants/StableTokenAbi.json";
import StakingAbi from "../../constants/StakingAbi.json";
import UtilityTokenAbi from "../../constants/UtilityTokenAbi.json";

export default function StakeDetails() {
  const StableTokenAddress = "0xA937A0e48319Ed4360D2410aC44976A091540606";
  const StakingAddress = "0x2344539fD8420314F77466f34B437Be8f0CEF443";
  const UtilityTokenAddress = "0x4F1Ad4d76AC0C3d6150b0De60cfA7e6E46Ea03E1";
  const { account, isWeb3Enabled } = useMoralis();
  const [stBalance, setStBalance] = useState("0");
  const [utBalance, setUtBalance] = useState("0");

  const { runContractFunction: getSTBalance } = useWeb3Contract({
    abi: UtilityTokenAbi,
    contractAddress: UtilityTokenAddress,
    functionName: "balanceOf",
    params: {
      account: account,
    },
  });

  const { runContractFunction: getUTBalance } = useWeb3Contract({
    abi: StableTokenAbi,
    contractAddress: StableTokenAddress,
    functionName: "balanceOf",
    params: {
      account: account,
    },
  });

  useEffect(() => {
    async function updateUIValues() {
      // For Stable tokens
      const stBalanceFromContract = await getSTBalance({
        onError: (error) => console.log(error),
      });
      const stformattedContractBalance = ethers.utils.formatUnits(
        stBalanceFromContract.toString(),
        "ether"
      );
      setStBalance(stformattedContractBalance);
      // For Utility token

      const utBalanceFromContract = await getUTBalance({
        onError: (error) => console.log(error),
      });
      const utformattedContractBalance = ethers.utils.formatUnits(
        utBalanceFromContract.toString(),
        "ether"
      );
      setUtBalance(utformattedContractBalance);
    }
    updateUIValues();
  }, [account, isWeb3Enabled, getSTBalance, getUTBalance]);

  return (
    <div>
      <div>Stable token VLD Balance is {stBalance}</div>
      <div>Utility token SHL Balance is {utBalance}</div>
      <div>Staked amount {}</div>
    </div>
  );
}
