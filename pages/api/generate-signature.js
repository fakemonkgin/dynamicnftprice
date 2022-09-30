
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const handler = async (req,res) => { 
    const { address, amount } = JSON.parse(req.body);

    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

    const contract = await sdk.getContract("0x22fC4B8B825014267b03be1995Df41cf5Fb1B387");

    const price = amount >= 2 ? 0.005 : 0.01;

    try {
        const signedPayload = await contract.erc721.signature.generate({
            to: address,
            price,
            quantity: amount,
        })
        return res.status(200).json({signedPayload});
    } catch(error) {
        console.error(error);
        return res.status(500).json({error});
    }
}   

export default handler