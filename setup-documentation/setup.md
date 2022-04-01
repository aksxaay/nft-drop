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
