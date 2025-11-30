import { ethers } from 'ethers';

// Contract address (replace with your deployed contract address)
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

// Initialize contract instance
let contract: ethers.Contract | null = null;
let provider: ethers.providers.Web3Provider | null = null;
let signer: ethers.Signer | null = null;

// Minimal ABI for the functions we need
const EDU_CRED_ABI = [
  'function mintCredential(address,string,string,string,string) external',
  'function getCredential(uint256) external view returns (string,string,string,uint256,string,bool)',
  'function revokeCredential(uint256,string) external',
  'function balanceOf(address) external view returns (uint256)',
  'function tokenOfOwnerByIndex(address,uint256) external view returns (uint256)'
];

// Initialize the contract with provider and signer
export const initContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('Please install MetaMask!');
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    EDU_CRED_ABI,
    signer
  );

  return contract;
};

// Get contract instance
export const getContract = (): ethers.Contract => {
  if (!contract) {
    throw new Error('Contract not initialized. Call initContract() first.');
  }
  return contract;
};

// Mint a new credential
export const mintCredential = async (
  to: string,
  title: string,
  description: string,
  issuer: string,
  ipfsHash: string
): Promise<ethers.ContractReceipt> => {
  const contract = getContract();
  const tx = await contract.mintCredential(to, title, description, issuer, ipfsHash);
  const receipt = await tx.wait();
  return receipt as ethers.ContractReceipt;
};

// Get credential details
export const getCredential = async (tokenId: number) => {
  const contract = getContract();
  const [title, description, issuer, issueDate, ipfsHash, isRevoked] = await contract.getCredential(tokenId);
  return {
    title,
    description,
    issuer,
    issueDate: new Date(issueDate.toNumber() * 1000),
    ipfsHash,
    isRevoked
  };
};

// Revoke a credential
export const revokeCredential = async (tokenId: number, reason: string): Promise<ethers.ContractReceipt> => {
  const contract = getContract();
  const tx = await contract.revokeCredential(tokenId, reason);
  const receipt = await tx.wait();
  return receipt as ethers.ContractReceipt;
};

// Get all tokens owned by an address
export const getTokensByOwner = async (owner: string): Promise<number[]> => {
  const contract = getContract();
  const balance = await contract.balanceOf(owner);
  const tokens: number[] = [];
  
  for (let i = 0; i < balance.toNumber(); i++) {
    const tokenId = await contract.tokenOfOwnerByIndex(owner, i);
    tokens.push(tokenId.toNumber());
  }
  
  return tokens;
};
