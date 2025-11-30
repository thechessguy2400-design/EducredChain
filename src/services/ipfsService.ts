import { NFTStorage, File } from 'nft.storage';

// Use Vite's environment variables (VITE_ prefix is required)
const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY || '';

if (!NFT_STORAGE_KEY) {
  console.warn('NFT_STORAGE_KEY is not set. IPFS functionality will be limited.');
}

// Create an NFT.Storage client
const client = NFT_STORAGE_KEY ? new NFTStorage({ token: NFT_STORAGE_KEY }) : null;

/**
 * Upload a file to IPFS using NFT.Storage
 * @param file The file to upload
 * @returns The IPFS hash of the uploaded file
 */
export const uploadToIPFS = async (file: File): Promise<string> => {
  if (!client) {
    throw new Error('NFT.Storage client not initialized. Please set VITE_NFT_STORAGE_KEY in your .env file.');
  }

  try {
    const metadata = await client.store({
      name: file.name,
      description: 'Educational credential document',
      image: file,
    });
    
    // Return the IPFS hash (CID)
    return metadata.url.replace('ipfs://', '');
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload to IPFS. Please check your connection and try again.');
  }
};

/**
 * Retrieve a file from IPFS
 * @param cid The IPFS content identifier (CID)
 * @returns The file data
 */
export const retrieveFromIPFS = async (cid: string): Promise<ArrayBuffer> => {
  try {
    // Use a public IPFS gateway
    const gatewayUrl = `https://ipfs.io/ipfs/${cid}`;
    const response = await fetch(gatewayUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }
    
    return await response.arrayBuffer();
  } catch (error) {
    console.error('Error retrieving from IPFS:', error);
    throw new Error('Failed to retrieve file from IPFS. The content may not be available.');
  }
};

// Helper function to create a File object from a buffer
export const bufferToFile = (buffer: ArrayBuffer, filename: string, mimeType: string): File => {
  return new File([buffer], filename, { type: mimeType });
};
