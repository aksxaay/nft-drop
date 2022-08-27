## NFT giveaway

Here's where I'll document on

[send tokens using ethers.js](https://ethereum.org/en/developers/tutorials/send-token-etherjs/)

okay manged to send myself 0.025Ξ self transaction.
[tx // rinkeby.etherscan](https://rinkeby.etherscan.io/tx/0xc15210125d4b77c20fb1481d1190bff1724181cb02af9b442363612fcc13009b)


contract that handles dissonance-chan
[rinkeby smart contract / dissonance chan](https://rinkeby.etherscan.io/address/0x74906df8744aeadeb3b480a03f791594a4937a8b#readContract)

I need to figure out which function deals with approvals and how it is sent in the first place.


[send tokens // ethereum official documentation](https://ethereum.org/en/developers/tutorials/send-token-etherjs/)

- Import ethers.js
- Transfer token
- Set gas price according to the network traffic situation



sendToken() function was given in the bottom.

just checked the infura dashboard and shit seems to work interesting.


okay apparently there's something called an interface.
and abi I have to setup.

apparently something called TypeChain which brings typesafety to smart Contract Development or something.

[sending erc-721 using only code // stackoverflow](https://stackoverflow.com/questions/72488060/can-i-send-an-nft-erc-721-to-a-wallet-using-only-code)

- look at the openzeppelin contract
- we need to call the safeTransferFrom method

[safeTransferFrom() method](https://docs.openzeppelin.com/contracts/3.x/api/token/erc721#IERC721-safeTransferFrom-address-address-uint256-bytes-)

it apparently emits a Transfer Event

i have seen 2 instances already. the ABI comes from this .json file inside contracts folder in a hardhat project. I have to find out other ways to obtain this ABI thingy

maybe its in thirdweb maybe it is not.

need to load that abi file and extract the abi file.

```js
abi_file = 'path'
abi = JSON.parse(data)['abi'];
// i guess?
```

interface?

btw contrac.connect(provider / signer)
if you give signer it'll act on behalf of that signer

okay this video / github has provided us information on how to actually pull it off

[yt vid // ethers js smart contract interaction](https://www.youtube.com/watch?v=GPc0t0Swct0)

[basic sample hardhat project](https://github.com/robertipk/EthersJS)
maybe I should be using a framework.

[ethers.js // abi formats](https://docs.ethers.io/v5/api/utils/abi/formats/#abi-formats--human-readable-abi)

also kinda helpful. I can't understand this yet however.


### metamask using etherscan write attempt.

```
0x42842e0e00000000000000000000000048bf6779fba7ec911da7420409a134c4d3ff5ca700000000000000000000000048bf6779fba7ec911da7420409a134c4d3ff5ca70000000000000000000000000000000000000000000000000000000000000000
```

copy raw transaction data?

parameters
```
Parameters:
[
  {
    "type": "address"
  },
  {
    "type": "address"
  },
  {
    "type": "uint256"
  }
]
```

[safeTransferFrom transaction gui](https://rinkeby.etherscan.io/tx/0xe7f22396f72d5dfad323a4385ee4c40d65952f20438aa994dc27d66030a82d4d)


original view
```
0x42842e0e00000000000000000000000048bf6779fba7ec911da7420409a134c4d3ff5ca700000000000000000000000048bf6779fba7ec911da7420409a134c4d3ff5ca70000000000000000000000000000000000000000000000000000000000000000
```

there's a better view out there, I have to find.

we need the entire abi for it to work, some sort of templating that you get only if you compile the smart contract.

[thirdweb sdk // view & interact with contracts.](https://portal.thirdweb.com/dashboard/view-and-interact-with-contracts)

this was exactly what I was looking for.

never mind, found the button for the contract ABI, that is fucking crazy.


apparently there's a huge issue with using js require for some reason

using `require()` somehow has some cachine issues if you alter the js file and unit tests would somehow fail as well.


well bruh look at this.
i had trouble with json fucking imports.

and I have performance issues or something or some fucking shit like that.

Contract variable does sorta contain the functions.

the supply and contract stuff kinda works


```js
let contract = new ethers.Contract(CONTRACT, dissonanceABI, wallet);

// console.log(contract)

(async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  // const decimals = await contract.decimals();
  const totalSupply = await contract.totalSupply();

  console.log(
    `${symbol} (${name}) total supply is ${totalSupply}`
  );
})();
```

for some reason safeTransferFrom is still not a function
the ABI formats are kinda different


[stackoverflow // call contract functions using ethers.js](https://ethereum.stackexchange.com/questions/120817/how-to-call-a-contract-function-method-using-ethersjs)

```js
const abi = [
      "function name() public view returns (string)",
      "function symbol() public view returns (string)",
      "function decimals() public view returns (uint8)",
      "function totalSupply() public view returns (uint256)",
      "function approve(address _spender, uint256 _value) public returns (bool success)"]
```
this what their abi looks like.
okay maybe the fact that I tried to format it was the damn issue.

created `disonanceABI2.json` so that that in-case that was the issue.

[stackoverflow // call contract functions using ethers.js](https://ethereum.stackexchange.com/questions/120817/how-to-call-a-contract-function-method-using-ethersjs)

says other things too
**state-changing contract methods**


overloaded function? like there's a difference?
I was correct it was the fucking spaces that wasn't accepted, but also I need to use the wait function for real.

holy fucking shit this actually worked and I love myself
[successful safeTransferFrom method call // rinkeby.etherscan](https://rinkeby.etherscan.io/tx/0x0148c0a7b9112f7e0aff4900bb7d8d7b9cb5bd3070acd740190fa6a518d8da13)

okay time to commit I guess