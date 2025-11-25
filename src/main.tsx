import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';
import './index.css';
import { WalletProvider } from './contexts/WalletContext';
import { CredentialsProvider } from './contexts/CredentialsContext';
import { Toaster } from 'react-hot-toast';

// Mumbai testnet chainId
const activeChainId = 80001;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider activeChain={activeChainId}>
      <WalletProvider>
        <CredentialsProvider>
          <BrowserRouter>
            <App />
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: '#fff',
                  color: '#1F2937',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </BrowserRouter>
        </CredentialsProvider>
      </WalletProvider>
    </ThirdwebProvider>
  </StrictMode>
);