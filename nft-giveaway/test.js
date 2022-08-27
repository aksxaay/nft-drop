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

wallet.getGasPrice().then((currentGasPrice) => {
  let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
  console.log(`gas_price: ${gas_price} gwei`);
});

let contract = new ethers.Contract(CONTRACT, dissonanceABI, wallet);

// console.log(contract)

(async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  // const decimals = await contract.decimals();
  const totalSupply = await contract.totalSupply();

  console.log(`${symbol} (${name}) total supply is ${totalSupply}`);

  const message = await contract["safeTransferFrom(address,address,uint256)"](SENDER, SENDER, 0);

  console.log("focus", message);
  message.wait().then((status) => {
    console.log(status)
    console.log('approved')
  })
})();

// console.log(someObject.safeTransferFrom)
