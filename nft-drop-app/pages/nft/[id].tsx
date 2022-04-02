import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

function NFTDropPage() {
  // AUTH
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  console.log('address=', address)

  // ---

  return (
    <div className=" flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* LEFT */}
      <div className="bg-gradient-to-br from-cyan-100 to-green-300 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-full bg-gradient-to-br from-purple-300 to-pink-600 p-5">
            <img
              className="w-44 rounded-xl object-cover lg:h-72 lg:w-72"
              src="https://assets-global.website-files.com/5f973c970bea5548ad4287ef/61e70d05f3c7146ab79e66bb_ethereum-eth.svg"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-black">Ξther</h1>
            <h2>A collection or cringe I live and breathe Linux</h2>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="w-[20rem] cursor-pointer text-xl font-extralight">
            The{' '}
            <span className="font-extrabold underline decoration-purple-600/70">
              ºDISSoNANCE
            </span>{' '}
            Marketplace
          </h1>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="lg-py:3 rounded-full bg-purple-500 px-4 py-2 text-sm font-bold text-white lg:px-5 lg:text-base"
          >
            {address
              ? String.fromCharCode(10687) + ' ' + 'Connected'
              : 'Sign In'}
          </button>
        </header>

        <hr className="my-4 border" />
        {address && (
          <p className="text-center text-sm text-purple-500">
            You're logged in with wallet{' '}
            <span className="font-semibold">
              {address.substring(0, 5)}...
              {address.substring(address.length - 5)}
            </span>
          </p>
        )}

        {/* Content */}
        <div className="flex flex-col items-center space-y-3 text-center lg:justify-center lg:space-y-2">
          <section className="container flex h-40 flex-col items-center justify-center lg:h-80">
            <img
              className="h-full rounded-[5em] object-cover p-4 lg:h-full lg:w-full lg:p-10"
              src="https://pbs.twimg.com/profile_banners/1245612768859811844/1637764821/600x200"
              alt=""
            />
          </section>
          <hr className="my-4 border" />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            Hoodie Gang
          </h1>
          <p className="mt-2 text-sm text-green-500 lg:text-xl">
            13/25 NFTs claimed
          </p>
        </div>

        {/* Mint Button */}
        <button className="m-5 h-16 rounded-full bg-cyan-700 text-white">
          Mint NFT <span className="font-bold">(0.01 ΞTH)</span>
        </button>
        <div></div>
      </div>
    </div>
  )
}

export default NFTDropPage
