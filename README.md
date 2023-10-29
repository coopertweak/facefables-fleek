# facefables

This app allows NFT communites to easily create profile/biography pages for User's NFTs which can be tied to ENS subdomains.  The idea is that you can name the NFT with a subdomain from the ENS app or other soultion.  The subdomain then follows the nft when bought or sold.  This app will allow the user to create a profile/biography page and easly set it as the default website tied to the subdomain `ENS content record` at https://app.ens.domains/.


## **Setup**

You must first create an .env file in with:

REACT_APP_NFT_IMAGE_INFO='your-nft-ipfs-hash'

REACT_APP_CLIENT_ID='fleek-client-id'

The 'your-nft-ipfs-hash' is just the hash value alone without ipfs:// or any other url information.  
The fleek-client-id is the Application Access Token from fleek.xyz (https://docs.fleek.xyz/docs/SDK)

1. execute `npm install`
2. execute `npm start`

After you start the `client`, you can open http://localhost:3000 
