## **client**

- A react web app that uses [@spheron/browser-upload](https://www.npmjs.com/package/@spheron/browser-upload) to upload the files directly from browser.
- It holds logic that will first send a request to the Backend Service ( which is in the **server** directory ) to get the `uploadToken`, and after it gets the response it will use the token to upload files.

To start the project:

1. execute `npm install`
2. Update the /src/Upload.tsx file with the correct link to the NFT images. These are most likely hosted on IPFS for Ethereum NFTs.  Replace the following placeholder with the correct information https://ipfs.io/ipfs/***NFT-IMAGE-INFO**/
3. execute `npm start`