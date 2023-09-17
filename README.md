# facefables

This app allows NFT communites to easily create profile/biography pages for User's NFTs which can be tied to ENS subdomains.  The idea is that you can name the NFT with a subdomain from the ENS app or other soultion.  The subdomain then follows the nft when bought or sold.  This app will allow the user to create a profile/biography page and easly set it as the default website tied to the subdomain `ENS content record`.

There are two parts of this repo, the client side and server side.  The server side is just one endpoint that is used by the client to get a token to upload the resulting biography website with Spheron.   The client side is is the Facefable app.  It deploys the biography website to IPFS where it can be set as an ENS content record to point the ENS subdomain to the website. 

## **client**

- A react web app that uses [@spheron/browser-upload](https://www.npmjs.com/package/@spheron/browser-upload) to upload the files directly from browser.
- It holds logic that will first send a request to the Backend Service ( which is in the **server** directory ) to get the `uploadToken`, and after it gets the response it will use the token to upload files.

To start the project:

1. execute `npm install`
2. Update the /src/Upload.tsx file with the correct link to the NFT images. These are most likely hosted on IPFS for Ethereum NFTs.  Replace the following placeholder with the correct information https://ipfs.io/ipfs/***NFT-IMAGE-INFO**/
3. execute `npm start`

## **server**

- A express server that has one endpoint `GET: /initiate-upload`, that is used by the **client** project to get the `uploadToken` and to use it to upload data.
- All the logic is in the `index.js`.

To start the project:

1. execute `npm install`
2. create a `.env` file in the root and `SPHERON_TOKEN` variable, with the value of your Spheron API Token. To create the `token` that is used with the `SpheronClient`, follow the instructions in the [DOCS](https://docs.spheron.network/rest-api/#creating-an-access-token). When you are creating the tokens, please choose **web app** type in the dashboard.
3. execute `npm start`

After you start both the `client` and `server`, you can open http://localhost:3000 and upload data to the specified protocol.
