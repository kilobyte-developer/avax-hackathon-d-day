import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking for wallet connection:", error);
        }
      }
    };
    checkWalletConnection();
  }, []);

  const login = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const message = "Please sign this message to log in to NFTicket.";
        await signer.signMessage(message);
        setAccount(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error("Login failed:", error);
        return null;
      }
    } else {
      alert("Please install MetaMask!");
      return null;
    }
  };

  const logout = () => {
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ account, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
