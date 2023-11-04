// Import necessary libraries and components
import React, { useState } from "react";
import { FleekSdk, ApplicationAccessTokenService } from '@fleekxyz/sdk';
import ReactDOMServer from 'react-dom/server';
import ProfileCard from './ProfileCard';
import "./Upload.css";

// Initialize Fleek SDK
const applicationService = new ApplicationAccessTokenService({
    clientId: process.env.REACT_APP_CLIENT_ID!,
});
const fleekSdk = new FleekSdk({ accessTokenService: applicationService });

// Upload component
function Upload() {
    // State hooks
    const [isLoading, setIsLoading] = useState(false);
    const [uploadLink, setUploadLink] = useState("");
    const [nftNumber, setNftNumber] = useState<number | null>(null);
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");

    // Event handlers
    const handleNftNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredNumber = event.target.value ? parseInt(event.target.value) : null;
        setNftNumber(enteredNumber);
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    // Upload handler
    const handleUpload = async () => {
        if (!nftNumber || !bio || !name) {
            alert("Please enter an NFT number, name and biography");
            return;
        }

        // Profile picture URL
        const profilePicUrl = `https://ipfs.io/ipfs/${process.env.REACT_APP_NFT_IMAGE_INFO}/${nftNumber.toString()}.png`;

        // Generate HTML content using renderToString
        const profileCardHtml = ReactDOMServer.renderToString(
            <ProfileCard name={name} bio={bio} profilePicUrl={profilePicUrl} />
        );
    
        const htmlContent = `
            <html>
            <head>
                <title>Profile Page</title>
            </head>
            <body>
                ${profileCardHtml}
            </body>
            </html>
        `;

        // Creating HTML file
        const htmlFile = new File([htmlContent], "index.html", { type: 'text/html' });

        // File array for upload
        const files = [
            { path: htmlFile.name, content: await htmlFile.arrayBuffer() },
        ];

        // Upload to IPFS
        try {
            setIsLoading(true);
            const uploadResult = await fleekSdk.ipfs().addAll(files);
            setUploadLink(`ipfs://${uploadResult[0].cid}`);
        } catch (err) {
            alert(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to reformat link
    const reformatLink = (link: string) => {
        const hash = link.split('//')[1].split('.')[0];
        return `ipfs://${hash}`;
    };

    // Render
    return (
        <div className="App">
            <header className="App-header">
                {isLoading ? (
                    <div className="uploading-text">Uploading...</div>
                ) : (
                    <>
                        <p className="title-text">Face Fables :)</p>
                        <div className="flex-container">
                            <div className="input-container">
                                <label className="styled-label" htmlFor="nftNumber">
                                    Enter NFT Number
                                    <input
                                        id="nftNumber"
                                        type="number"
                                        min="1"
                                        max="9999"
                                        onChange={handleNftNumberChange}
                                        className="styled-input"
                                    />
                                </label>
                                <div className="name-container">
                                    <label className="styled-label" htmlFor="name">Name your NFT:</label>
                                    <input id="name" onChange={handleNameChange} className="styled-input" />
                                </div>
                                <div className="bio-container">
                                    <label className="styled-label" htmlFor="bio">Biography:</label>
                                    <textarea id="bio" onChange={handleBioChange} className="styled-textarea"></textarea>
                                </div>
                            </div>
                            <div className="button-container">
                                <button
                                    className="styled-button"
                                    onClick={handleUpload}
                                >
                                    Upload
                                </button>
                                {uploadLink && (
                                    <a
                                        className="upload-link"
                                        href={reformatLink(uploadLink)}
                                        target="__blank"
                                    >
                                        <b>Copy this link to your subdomain content hash in the ENS app : <br /></b>
                                        {reformatLink(uploadLink)}
                                    </a>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </header>
        </div>
    );
}

export default Upload;
