# Pinata IPFS File Uploader

This Node.js script allows you to upload files to IPFS using Pinata API.

## Installation

1. Clone the repository:

git clone https://github.com/vrathikshenoy/ipfs_storage.git

2. Install dependencies:

npm install axios fs form-data

## Usage

1. Set up environment variables:
    - PINATA_SECRET_API_KEY: Your Pinata secret API key.

2. Modify the `filePath` variable in the script to specify the file you want to upload.

3. Run the script:

node script.js

## Functions

### `uploadToPinata()`

This function uploads the specified file to IPFS using Pinata API. It performs the following steps:

1. Reads the file from the specified path.
2. Constructs a multipart form data object.
3. Sends a POST request to Pinata API to pin the file to IPFS.
4. Logs the API response and the IPFS CID.

### `deleteFromPinata(pinataSecretApiKey, cid)`

This function deletes a pinned file from IPFS Pinata. It takes two parameters:

- `pinataSecretApiKey`: Your Pinata secret API key.
- `cid`: The Content Identifier (CID) of the file to delete.

### `readJsonFromIpfs(cid)`

This function reads JSON content from IPFS Pinata using the provided CID. It retrieves the content and logs the API response.

## Example

const { env } = require('process');
const uploadToPinata = require('./uploadToPinata');

// Set up environment variable
env.PINATA_SECRET_API_KEY = 'your_pinata_secret_api_key';

// Call upload function
uploadToPinata();

## License

This project is licensed under the MIT License - see the LICENSE file for details.
