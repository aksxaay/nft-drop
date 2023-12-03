async function main() {
  const { ethers } = require("ethers");
  require("dotenv").config({ debug: true, path: "./.env.local" });
  const fs = require("fs");
  var dissonanceABI = require("./dissonanceABI2.json");

  let rawdata = fs.readFileSync("./dissonanceABI.json");
  let ABI = JSON.parse(rawdata);

  PRIVATE_KEY = process.env.PRIVATE_KEY;
  INFURA_ID = process.env.INFURA_ID;
  SENDER = process.env.SENDER;
  CONTRACT = process.env.CONTRACT;

  const provider = new ethers.providers.JsonRpcProvider(
    `https://rinkeby.infura.io/v3/${INFURA_ID}`
  );

  let wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  // let walletSigner = wallet.connect(provider);

  wallet.getFeeData().then((currentGasPrice) => {
    let gas_price = ethers.utils.formatUnits(
      currentGasPrice.maxFeePerGas,
      "gwei"
    );
    console.log(`gas_price: ${gas_price} gwei`);
  });

  let contract = new ethers.Contract(CONTRACT, dissonanceABI, wallet);


  const utils = require("./utils");
  let address_list = await utils.load("./address_list.txt");
  console.log(address_list);

  

  async function tx(RECEIVER, tokenId) {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();

    console.log(`${symbol} (${name}) total supply is ${totalSupply}`);

    const message = await contract["safeTransferFrom(address,address,uint256)"](
      SENDER,
      RECEIVER,
      tokenId
    );

    console.log("focus", message);
    message.wait().then((status) => {
      console.log(status);
      console.log("approved");
    });
  }

  // similar to python enumerate
  let tokenAmount = await utils.getSupply(contract);
  address_list.length = tokenAmount

  for (let [index, address] of address_list.entries()) {
    console.log("submitted tx! token:", index,'to', address);
    // tx(address, index);
  }
}

main();
