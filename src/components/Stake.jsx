/* eslint-disable no-unused-vars */
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import StableTokenAbi from "../../constants/StableTokenAbi.json";
import StakingAbi from "../../constants/StakingAbi.json";
import UtilityTokenAbi from "../../constants/UtilityTokenAbi.json";

export default function Stake() {
  const { runContractFunction } = useWeb3Contract();
  const { isWeb3Enabled, account } = useMoralis();
  const [stakedBalance, setStakedBalance] = useState("0");

  const StableTokenAddress = "0xA937A0e48319Ed4360D2410aC44976A091540606";
  const StakingAddress = "0x2344539fD8420314F77466f34B437Be8f0CEF443";
  const UtilityTokenAddress = "0x4F1Ad4d76AC0C3d6150b0De60cfA7e6E46Ea03E1";

  let approveOptions = {
    abi: UtilityTokenAbi,
    contractAddress: UtilityTokenAddress,
    functionName: "approve",
    gasLimit: 500000,
    chainId: "0xaa36a7",
  };

  let stakeOptions = {
    abi: StakingAbi,
    contractAddress: StakingAddress,
    functionName: "stake",
    gasLimit: 500000,
    chainId: "0xaa36a7",
  };

  const { runContractFunction: getStakedBalance } = useWeb3Contract({
    abi: StakingAbi,
    contractAddress: StakingAddress,
    functionName: "s_balances",
    params: {
      account: account,
    },
  });

  async function handleStakeSubmit(data) {
    const amountToApprove = data?.data[0]?.inputResult;

    const parsedAmount = ethers.utils
      .parseUnits(amountToApprove, "ether")
      .toString();

    approveOptions.params = {
      value: parsedAmount,
      spender: StakingAddress,
    };

    console.log("Approving......");

    const tx = await runContractFunction({
      params: approveOptions,
      onError: (error) => {
        // console.log(error.message);
        if (
          error.message ===
          "MetaMask Tx Signature: User denied transaction signature."
        ) {
          return;
        }
      },
      onSuccess: () => {
        handleApproveSuccess(approveOptions.params.value);
      },
    });
  }

  async function handleApproveSuccess(amountToStakeFormatted) {
    console.log(amountToStakeFormatted);
    stakeOptions.params = {
      amount: amountToStakeFormatted,
    };

    // console.log(stakeOptions);

    console.log(`staking  ${stakeOptions.params.amount}`);

    const tx = await runContractFunction({
      params: stakeOptions,
      onError: (error) => console.log(`It is ${error}`),
    });

    console.log("Transaction has been confirmed by 1 block");
  }

  useEffect(() => {
    async function updateUIValues() {
      // For Stable tokens
      const stBalanceFromContract = await getStakedBalance({
        onError: (error) => console.log(error),
      });
      const stformattedContractBalance = ethers.utils.formatUnits(
        stBalanceFromContract.toString(),
        "ether"
      );
      setStakedBalance(stformattedContractBalance);
    }
    updateUIValues();
  }, [getStakedBalance]);

  return (
    <div>
      <Form
        onSubmit={handleStakeSubmit}
        buttonConfig={{
          theme: "primary",
          text: "Stake",
          disabled: false,
        }}
        data={[
          {
            name: "Stake Amount",
            type: "number",
            inputWidth: "50%",
            value: "inputResult",
            key: "inputResult",
          },
        ]}
        title="Staking"
      />
      <div> Staked Amount is {stakedBalance}</div>
    </div>
  );
}
