function load(filename) {
  const fs = require("fs");
  var array = fs.readFileSync(filename).toString().trim().split("\n");
  array.sort(() => Math.random() - 0.5)
  return array;
}

// let address_list = load("./address_list.txt");
// console.log(address_list);


async function getSupply(contract){
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  console.log(`${symbol} (${name}) total supply is ${totalSupply}`);

  return totalSupply;
}

module.exports = { load, getSupply };
