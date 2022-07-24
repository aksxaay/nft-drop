import React, { useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import Link from 'next/link'
import { BigNumber } from 'ethers'
import { Collection } from '../../sanity/typings'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  collection: Collection
}

function NFTDropPage({ collection }: Props) {
  // console.log('collection' + JSON.stringify(collection))
  const [claimedSuppy, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [priceInEth, setpriceInEth] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  // thridweb drop contract
  const nftDrop = useNFTDrop(collection.address)

  // AUTH
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  // console.log('address=', address)
  // ---

  useEffect(() => {
    if (!nftDrop) return
    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()
      setpriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }
    fetchPrice()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return
    const fetchNFTDropData = async () => {
      setLoading(true)

      // console.log('before claimed')
      const claimed = await nftDrop.getAllClaimed()
      // console.log('claimed' + claimed)
      const total = await nftDrop.totalSupply()
      // console.log('total' + total)
      setClaimedSupply(claimed.length)
      setTotalSupply(total)

      setLoading(false)
    }
    fetchNFTDropData()
  }, [nftDrop])

  // Mint Function
  const mintNFT = () => {
    if (!nftDrop || !address) return

    // how many unique NFTs
    // TODO: implement a custom button for different amount of NFTs
    const quantity = 1

    setLoading(true)
    const notification = toast.loading('Minting..', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt // tx receipt
        const claimedTokenId = tx[0].id // id of NFT
        const claimedNFT = await tx[0].data() // claimed NFT metadata

        toast('HOORAY.. You Successfully Minted', {
          duration: 8000,
          style: {
            background: 'white',
            color: 'green',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })

        // notification
      })
      .catch((err) => {
        console.log(err)
        toast('Whoops... Something went wrong!', {
          style: {
            background: 'red',
            color: 'green',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className=" flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Toaster position="bottom-center" />

      {/* LEFT */}
      <div className="bg-gradient-to-br from-cyan-100 to-purple-300 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-purple-300 to-pink-600 p-2">
            {/* preview image replacement */}
            <img
              className="w-44 rounded-xl object-cover lg:h-72 lg:w-72"
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
            {/* <img
              className="w-44 rounded-xl object-cover lg:h-72 lg:w-72"
              src="https://assets-global.website-files.com/5f973c970bea5548ad4287ef/61e70d05f3c7146ab79e66bb_ethereum-eth.svg"
              alt=""
            /> */}
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
          <Link href="/">
            <h1 className="w-[20rem] cursor-pointer text-xl font-extralight">
              <span className="font-extrabold">º</span>
              <span className="font-extrabold underline decoration-purple-600/70">
                DISSoNANCE
              </span>{' '}
              Marketplace
            </h1>
          </Link>
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
              src={urlFor(collection.mainImage).url()}
              alt=""
            />
          </section>
          <hr className="my-4 border" />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>

          {/* loading animation */}
          {loading ? (
            <p className="animate-pulse pt-2 text-sm text-green-500">
              Loading Supply Count...
            </p>
          ) : (
            <p className="mt-2 text-sm text-green-500 lg:text-xl">
              {claimedSuppy} / {totalSupply?.toString()} NFT's claimed
            </p>
          )}

          {loading && (
            <img
              className="h-40 w-40 object-contain"
              src="https://cdn.dribbble.com/users/765253/screenshots/2540865/media/0b4964cb75da7968f8feabba4d481c39.gif"
              alt="loading-animation"
            />
          )}
        </div>
        {/* Mint Button */}

        <button
          onClick={mintNFT}
          disabled={
            loading || claimedSuppy === totalSupply?.toNumber() || !address
          }
          className="m-5 h-16 rounded-full bg-cyan-700 text-white disabled:bg-gray-400"
        >
          {loading ? (
            <>Loading</>
          ) : claimedSuppy === totalSupply?.toNumber() ? (
            <>SOLD OUT!</>
          ) : !address ? (
            <>Sign in to Mint :D</>
          ) : (
            <>
              Mint NFT <span className="font-bold">({priceInEth} ΞTH)</span>
            </>
          )}
        </button>
        <div></div>
      </div>
    </div>
  )
}

export default NFTDropPage

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
     asset
  },
  previewImage {
    asset
  },
  slug {
    current
  },
  creator-> {
    _id,
    name,
    address,
    slug {
    current
  },
  },
  
  }`
  const collections = await sanityClient.fetch(query)
  // console.log('collections', collections)

  // Get the paths we want to pre-render based on posts
  const paths = collections.map((collection: { _id: any }) => ({
    params: { id: collection._id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    // : [
    //   {
    //     params: { postId: '1' },
    //   },
    //   {
    //     params: { postId: '2' },
    //   },
    //   {
    //     params: { postId: '3' },
    //   },
    // ]
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
     asset
  },
  previewImage {
    asset
  },
  slug {
    current
  },
  creator-> {
    _id,
    name,
    address,
    slug {
    current
  },
  },
  
  }`
  const collection = await sanityClient.fetch(query, {
    // params? as optional (typescript)
    id: params?.id,
  })

  // 404 page
  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
