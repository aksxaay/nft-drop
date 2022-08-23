// import from text file holding addresses
const { ethers } = require("ethers");
require('dotenv').config({debug:true, path:'./.env.local'})


// node providers?
INFURA_ID = process.env.INFURA_ID
console.log(String(INFURA_ID).substring(0,3))

const SENDER = '0x48BF6779fBa7eC911DA7420409A134C4d3Ff5ca7' // my wallet


const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)


const main = async () => {
  // send transaction
  const tx = await wallet.sendTransaction({
    to: SENDER,
    value: ethers.utils.parseEther("0.025")
  })

  // fetch transaction
  await tx.wait()
  return tx
}


main()
  .then(text => {
    console.log('THEN', text)
  })
  .catch(e => {
    console.log('CATCH', e)
  })