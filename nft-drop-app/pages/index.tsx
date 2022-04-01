import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      <Head>
        <title>ºdissonance NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl text-red-500">deekay NFT DROP</h1>

      <footer className="flex h-24 w-full items-center justify-center border-t bg-sky-600 px-4">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <strong>ºdissonance</strong>{' '}
        </a>
      </footer>
    </div>
  )
}

export default Home
