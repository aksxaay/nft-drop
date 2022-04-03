import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../sanity/typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div>
      <div className="my-5 mx-auto flex min-h-screen max-w-7xl flex-col py-2 px-10 2xl:px-0">
        <Head>
          <title>ºdissonance NFT</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* dissonance HEADER */}
        <h1 className="w-[20rem] cursor-pointer text-xl font-extralight">
          The{' '}
          <span className="font-extrabold underline decoration-purple-600/70">
            ºDISSoNANCE
          </span>{' '}
          Marketplace
        </h1>

        <main className="m-5 rounded-md bg-slate-100 p-10 shadow-xl shadow-purple-400/20">
          <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {collections.map((collection) => (
              <Link href={`/nft/${collection.slug.current}`}>
                <div className="flex cursor-pointer flex-col items-center p-5 transition-all duration-300 hover:scale-[103%]">
                  <img
                    className="h-96 w-[45rem] rounded-2xl object-cover"
                    src={urlFor(collection.mainImage)}
                    alt=""
                  />
                  <div>
                    <h2 className="text-3xl font-medium">{collection.title}</h2>
                    <p className="mt-2 text-sm text-gray-400">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <footer className="h- fixed inset-x-0 bottom-0 mx-auto flex w-full flex-col items-center justify-center border-t bg-cyan-300">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className="font-semibold">ºdissonance</span>{' '}
        </a>
      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
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

  return {
    props: {
      collections,
    },
  }
}
