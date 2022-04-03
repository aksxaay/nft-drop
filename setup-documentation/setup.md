# setup

Here's where I'll be taking y'all through the process
we'll be learning typescript super easily apparently.

Maybe I can collaborate with Wacks to make this an actual drop LMFAO

I fucking ran into this moronic problem again where there's multiple ways to do this.

`npx create-next-app --example with-tailwindcss nft-drop-app`
nvm it's all g

`https://docs.thirdweb.com/react`
SDK that we're using to connect to third-web
metamask login feature allow us to implement this small bit of code, for login/logout functionality.

we're gonna use `yarn` today.
`yarn run dev`

we're gonna barebones it

Sorting TailwindCSS class Auto with Prettier

`npm install -D prettier prettier-plugin-tailwindcss`

`yarn` list all dependencies
`yarn list --depth 0`

`ncu` works with yarn, that's a relief
but we also get to keep the `package.json` file around.
just we have a `yarn.lock`

## **Prettier**

setup `.prettierrc.json` file that tells the project that we use prettier

`npx prettier --check`

> Fogot to run Prettier?

`npx prettier --write pages/`

### Format on Save

added workspace setting

> Default Formatter: Prettier

works, format
now for plugin `prettier-tailwind-css `

```
// prettier.config.js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
}
```

this was required since I'm using `yarn`

`works`
now that I'm all done let's get back to sonny's vid.

Let's try out commit subjects

> added prettier functionality + tailwind class sorting

wait this thing is formatting even `.md` files
had to add `.prettierignore` where `*.md`

which didn't do anything boy wth

>hello

also this file is outside the prettier thing. oh lord

set it globally and now it works good boi.

anyways

so the slug auto does it..
`/nft-drop-app/pages/nft/[id].tsx`
so this can have anything in the browser's path 
`http://localhost:3000/nft/apes`
shows me the output


we're starting with mobile first.

```
background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
```

`lg:min-h-screen`
this property makes it fullscreen the left side part.

`space-y-2`
in between padding elements

`lg:grid`
on large screen we need grid

don't use strong ig, stick to span.

so when I would resize the window I don't want to let it go smaller than a certain amount.

just added

```body {  min-width:600px; }```
and this sorta fixed it? however it isn't true over at the 600px

**Basic Front-end is done** completely static!!

we're moving onto
### third-web
[thirdweb react // documentation](https://docs.thirdweb.com/react)
```
npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers
```

we're using third web as a higher-order component
but in layman's we're basically wrapping the entire application

once we do the wrapping, we can use thirdweb in the entire application now.

just do that stuff, 
change their `ChainId` -> `Rinkeby`
now we're on rinkeby

`_app.tsx`
```
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp

```

all I had to do was import 3 components from `@thirdweb-dev/react` as `useAddress, useDisconnect, useMetamask`

had to call them as methods on a variable.
and then just do an arrow `onClick()` function
on the sign-in button

makes it also display what wallet is currently connected

## Day 3
### sanity.io
we're using sanity.io as the backend cms.
`npm install -g @sanity/ci`
`sanity init --coupon sonny2022` - apparently gives you double of everything to use in sanity.

Which is great lol.

Project Name: `nft-drop-app`
create default dataset configuration

Project output path: `sanity`

`blog` saniy template

we're creating a `.env` file for all sensitive content
actually `.env.local` which does not get picked up by git which is interesting because this is how I lost my first password bruh.


```yarn add next-sanity @sanity/image-url```


```yarn add node-env-file```
for processing env files.


Sanity Studio
>React app that connects to the hosted API with all your blog content
`sanity start`
> sanity start fails to compile hence I cannot get the studio up and running.

damn these schema shits complex.
can't fuck anything up.

bruh I had to remove all other instances / mentions for it to work.


### thirdweb
go to [thirdweb dashboard](https://thirdweb.com/dashboard)
apparently they don't take any fees and I own 100% of the contract, I have no idea what's in it for them.

choose `drop` option.
Deploy -> pay using ethereum

> 0.00123934ETH
Deploy proxy ->  is the function
this what it costs rn


```https://rinkeby.etherscan.io/tx/0x5113ff0b8e5b4c3f27a6fbd026ee4312b93234a1a45165b4c7aea9a361c62469```
this is our first ever deploy

I keep adding in assets, so now I had to drop another item
now triggering the smart contract
`lazy mint`
tx
```https://rinkeby.etherscan.io/tx/0xa5f17c0c1e6c0084cca21c2ec0a5f6d45bc3e2d347ed7c737b57c32d4305ee30```

Claim Phases
```https://rinkeby.etherscan.io/tx/0x2e3fd3450d22cb22522a73daeefc1238149de9fa0743b68c85b7d4a2e6689264```

basically I got it.