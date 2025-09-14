// utils/provider.js
export function getEthereumProvider() {
  const provider = window?.ethereum;

  if (!provider) {
    throw new Error("No Ethereum provider detected. Please install MetaMask.");
  }

  // normalize event methods
  if (provider.on && !provider.addListener) {
    provider.addListener = provider.on.bind(provider);
  }

  if (provider.removeListener && !provider.off) {
    provider.off = provider.removeListener.bind(provider);
  }

  if (provider.off && !provider.removeListener) {
    provider.removeListener = provider.off.bind(provider);
  }

  if (provider.addListener && !provider.on) {
    provider.on = provider.addListener.bind(provider);
  }

  return provider;
}
