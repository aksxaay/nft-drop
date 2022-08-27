const { ethers } = require("ethers");
require("dotenv").config({ debug: true, path: "./.env.local" });
const fs = require("fs");

var dissonanceABI = require("./dissonanceABI.json");

// env variables
PRIVATE_KEY = process.env.PRIVATE_KEY;
INFURA_ID = process.env.INFURA_ID;
SENDER = process.env.SENDER;
CONTRACT = process.env.CONTRACT;

async function send_token(
  contract_address,
  token_id,
  from_address,
  to_address,
  private_key
) {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://rinkeby.infura.io/v3/${INFURA_ID}`
  );
  let wallet = new ethers.Wallet(private_key, provider);
  let walletSigner = wallet.connect(provider);

  fs.writeFile("./json/wallet.json", JSON.dumps, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("wallet.json");
  });

  walletSigner.getGasPrice().then((currentGasPrice) => {
    let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
    console.log(`gas_price: ${gas_price} gwei`);

    if (contract_address) {
      // erc721 abi? import from local json file.
      // json reader helper function
      // console.log("send_abi : >>>> ", dissonanceABI);

      // safeTransferFrom -> Write Functions

      // general token send
      let contract = new ethers.Contract(
        contract_address,
        dissonanceABI,
        walletSigner
      );

      // console.log('Contract', contract)
      contract.owner().then((message) => {
        console.log(message);
        console.log("success");
      });

      console.log(contract.safeTransferFrom);

      contract
        .safeTransferFrom(from_address, to_address, token_id)
        .then((transferResult) => {
          console.dir(transferResult);
          console.log("sent dissonance token");
        });
    } // ether send
    else {
      console.log(`triggered "else condition" bruh`);
      try {
        walletSigner.sendTransaction(tx).then((transaction) => {
          console.dir(transaction);
          alert("Send finished!");
        });
      } catch (error) {
        alert("failed to send!!");
      }
    }
  });
}

send_token(CONTRACT, 0, SENDER, SENDER, PRIVATE_KEY);
