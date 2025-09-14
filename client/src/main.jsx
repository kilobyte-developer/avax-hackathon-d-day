import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { avalancheFuji } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'Travel Insurance MVP',
  projectId: 'demo',
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http('https://api.avax-test.network/ext/bc/C/rpc'),
  },
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
