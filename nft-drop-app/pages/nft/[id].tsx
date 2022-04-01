import React from 'react'

function NFTDropPage() {
  return (
    <div className=" flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* LEFT */}
      <div className="bg-gradient-to-br from-cyan-100 to-green-300 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-72 lg:w-72"
              src="https://assets-global.website-files.com/5f973c970bea5548ad4287ef/61e70d05f3c7146ab79e66bb_ethereum-eth.svg"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-black">H1 Ether</h1>
            <h2>A collection or cringe I live and breathe Linux</h2>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div>
        {/* Header */}

        {/* Content */}

        {/* Mint Button */}
        <div></div>
      </div>
    </div>
  )
}

export default NFTDropPage
