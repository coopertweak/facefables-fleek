import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import { upload } from "@spheron/browser-upload";
import "./Upload.css";

function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadLink, setUploadLink] = useState("");
  const [dynamicLink, setDynamicLink] = useState("");
  const [nftNumber, setNftNumber] = useState<number | null>(null);
  const [bio, setBio] = useState("");

  const handleNftNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredNumber = event.target.value ? parseInt(event.target.value) : null;
    setNftNumber(enteredNumber);
  };
  
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleUpload = async () => {
    if (!nftNumber || !bio) {
      alert("Please enter an NFT number and biography");
      return;
    }
  
    const profilePicUrl = `https://ipfs.io/ipfs/bafybeig4wbzss3rqa35epeiq54ibax5u7mfakswgweasgeqjnw7az5h7ou/${nftNumber.toString().padStart(4, '0')}.png`;
  
    const htmlContent = `
      <html>
        <head>
          <title>User Profile</title>
        </head>
        <body>
          <img src="${profilePicUrl}" alt="Profile Picture">
          <p>${bio}</p>
        </body>
      </html>
    `;
  
    const htmlFile = new File([htmlContent], "profile.html", {type : 'text/html'});
  
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8111/initiate-upload");
      const responseJson = await response.json();
      const uploadResult = await upload([htmlFile], {
        token: responseJson.uploadToken,
      });
  
      setUploadLink(uploadResult.protocolLink);
      setDynamicLink(uploadResult.dynamicLinks[0]);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
  
        {isLoading ? (
          <>Uploading...</>
        ) : (
          <>
            <p>Upload Content to IPFS</p>
            <div className="flex gap-32">
              <div className="">
                <label className="button-con button-53" htmlFor="nftNumber">
                  Enter NFT Number
                  <input
                    id="nftNumber"
                    type="number"
                    min="1"
                    max="9999"
                    onChange={handleNftNumberChange}
                    className="w-full h-full"
                  />
                </label>
                <div>
                  <label htmlFor="bio">Biography:</label>
                  <textarea id="bio" onChange={handleBioChange}></textarea>
                </div>
              </div>
              <div className="flex flex-col">
                <button
                  className="button-con button-53 h-12"
                  onClick={handleUpload}
                >
                  Upload
                </button>
                {uploadLink && (
                  <a
                    className="text-sm mt-4 -rotate-2"
                    href={uploadLink}
                    target="__blank"
                  >
                    {uploadLink}
                  </a>
                )}
                {dynamicLink && (
                  <a
                    className="text-sm mt-4 -rotate-2"
                    href={`https://${dynamicLink}`}
                    target="__blank"
                  >
                    {dynamicLink}
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
