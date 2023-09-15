import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import { upload } from "@spheron/browser-upload";
import "./Upload.css";

function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadLink, setUploadLink] = useState("");
  const [dynamicLink, setDynamicLink] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [bio, setBio] = useState("");

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setProfilePic(selectedFile);
  };
  
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleUpload = async () => {
    if (!profilePic || !bio) {
      alert("Please enter a profile picture and biography");
      return;
    }
  
    // Create the HTML content
    const htmlContent = `
      <html>
        <head>
          <title>User Profile</title>
        </head>
        <body>
          <img src="${URL.createObjectURL(profilePic)}" alt="Profile Picture">
          <p>${bio}</p>
        </body>
      </html>
    `;
  
    // Create a File object representing the HTML file
    const htmlFile = new File([htmlContent], "profile.html", {type : 'text/html'});
  
    // Upload the HTML file to Spheron
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
                <label className="button-con button-53" htmlFor="profilePic">
                  Select Profile Picture
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="w-full h-full"
                    style={{ display: "none" }}
                  />
                </label>
                <div className="flex-1 flex items-center pl-4 text-sm -rotate-2">
                  {profilePic ? profilePic?.name : "No file selected"}
                </div>
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
