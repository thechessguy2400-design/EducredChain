import React, { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { Wallet, Loader2, AlertCircle, Check, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface WalletButtonProps {
  isMobile?: boolean;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ isMobile = false }) => {
  const { 
    address, 
    isConnecting, 
    connectWallet, 
    disconnectWallet, 
    isMetaMaskInstalled,
    error,
    chainId
  } = useWallet();
  const [isCopied, setIsCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const getNetworkName = (chainId: string | null) => {
    switch (chainId) {
      case '0x1': return 'Ethereum Mainnet';
      case '0x13881': return 'Mumbai Testnet';
      case '0x89': return 'Polygon Mainnet';
      default: return 'Unknown Network';
    }
  };

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    toast.success('Address copied to clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowMenu(false);
    toast.success('Wallet disconnected');
  };

  if (!isMetaMaskInstalled) {
    return (
      <a
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isMobile ? 'w-full justify-center' : ''}`}
      >
        <Wallet className="w-4 h-4" />
        Install MetaMask
      </a>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm text-red-700 bg-red-100 rounded-lg">
        <AlertCircle className="w-4 h-4" />
        <span>Connection Error</span>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <button
        type="button"
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg cursor-not-allowed ${isMobile ? 'w-full justify-center' : ''}`}
        disabled
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        Connecting...
      </button>
    );
  }

  if (address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="font-mono">{formatAddress(address)}</span>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="p-2">
              <div className="px-3 py-2 text-xs text-gray-500">
                Connected with MetaMask
              </div>
              <div className="px-3 py-1 text-sm font-medium text-gray-900">
                {formatAddress(address)}
              </div>
              <div className="px-3 py-1 text-xs text-gray-500">
                {getNetworkName(chainId)}
              </div>
              <div className="mt-2 border-t border-gray-100"></div>
              <div className="py-1">
                <button
                  onClick={handleCopyAddress}
                  className="flex w-full items-center px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Address
                    </>
                  )}
                </button>
                <a
                  href={`https://mumbai.polygonscan.com/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </a>
              </div>
              <div className="border-t border-gray-100"></div>
              <div className="py-1">
                <button
                  onClick={handleDisconnect}
                  className="flex w-full items-center px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isMobile ? 'w-full justify-center' : ''}`}
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </button>
  );
};

export default WalletButton;
