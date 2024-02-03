import { ConnectButton } from "web3uikit";
import { Link as LinkRouter } from "react-router-dom";
// import StakeDetails from "./StakeDetails";

export default function Home() {
  return (
    <div className="flex flex-row p-5">
      <div className="p-4 ">
        <LinkRouter to="/">Home</LinkRouter>
      </div>

      <div className="p-4">
        <LinkRouter to="/stake">Stake</LinkRouter>
      </div>

      <div className="p-4">
        <LinkRouter to="/swap">Swap</LinkRouter>
      </div>

      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
