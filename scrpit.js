
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { env } = require('process');
    
    // upload function to send data to database
    async function uploadToPinata() {
      try {
        const pinataSecretApiKey = env.PINATA_SECRET_API_KEY;
        const axios = require('axios');
        const filePath = 'heee.txt';
    
        if (!fs.existsSync(filePath)) {
          throw new Error(`File not found at path: ${filePath}`);
        }
    
        const fileData = fs.readFileSync(filePath);
        const dataBuffer = Buffer.from(fileData);
    
        const formData = new FormData();
        formData.append('file', dataBuffer, { filename: 'heee.txt' });
    
        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${pinataSecretApiKey}`,
            },
          }
        );
    
        console.log('Pinata API Response:', response.data);
    
        // Extract the CID (Content Identifier) from the response
        const cid = response.data.IpfsHash;
        console.log('IPFS CID:', cid);
    
        await readJsonFromIpfs(cid);
    
      } catch (error) {
        console.error('Error calling Pinata API:', error.message);
        if (error.response) {
          console.error('API Response:', error.response.data);
        }
      }
    }
    // Call the function to delete the pinned file from IPFS Pinata
    async function deleteFromPinata(pinataSecretApiKey, cid) {
      try {
        // Call Pinata API to remove the pin
        const deleteResponse = await axios.delete(
          `https://api.pinata.cloud/pinning/unpin/${cid}`,
          {
            headers: {
              Authorization: `Bearer ${pinataSecretApiKey}`,
            },
          }
        );
    
        console.log('Pinata API Delete Response:', deleteResponse.data);
      } catch (error) {
        // Log error (do not throw or handle errors as per your request)
        console.error('Error deleting from Pinata:', error.message);
        if (error.response) {
          console.error('Delete API Response:', error.response.data);
        }
      }
    }
    async function readJsonFromIpfs(cid) {
    
      try {

        const pinataGateway = 'https://gateway.pinata.cloud/ipfs/';
    
        // Fetch the content from IPFS Pinata using the CID
        const response = await axios.get(`${pinataGateway}${cid}`);
        console.log('Pinata API Response:', response.data);
        
       } catch (error) {
         console.error('Error reading from Pinata:', error.message);
         if (error.response) {
           console.error('Read API Response:', error.response.data);
         }
       }
     }
     
      
        uploadToPinata();
    