import { ConnectButton } from "web3uikit";

export default function Home() {
  return (
    <div>
      <ConnectButton moralisAuth={false} />
    </div>
  );
}
