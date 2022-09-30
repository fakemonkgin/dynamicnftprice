import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState(0);
  const address = useAddress();
  const { contract } = useContract("0x22fC4B8B825014267b03be1995Df41cf5Fb1B387");
  const mint = async() => {
    const signedPayloadReq = await fetch("/api/generate-signature", {
      method: "POST",
      body: JSON.stringify({ address, amount }),
    });

    const { signedPayload } = await signedPayloadReq.json()

    try{
      await contract.erc721.signature.mint(signedPayload);
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ConnectWallet accentColor="lime" colorMode="light" />
      <p>price: 0.01 ETH</p>
      <p>if you mint 2 or more, the price of each NFT will be 0.005 ETH</p>
      <input type="number" onChange={e => setAmount(e.target.value)} value={amount}  />
      <button onClick={mint}>Mint</button>
    </div>
  );
}
