import React, { useState } from 'react';
import { Plus, Copy, ExternalLink, Wallet as WalletIcon, AlertCircle, CheckCircle, Edit, Trash2 } from 'lucide-react';

const WalletManagement = ({ 
  theme, 
  connectedWallets, 
  setConnectedWallets,
  verificationForm,
  showAddWallet,
  setShowAddWallet 
}) => {
  const [walletForm, setWalletForm] = useState({ 
    name: '', 
    address: '', 
    network: 'ethereum' 
  });
  const [showChangeRequest, setShowChangeRequest] = useState(false);
  const [changeRequestForm, setChangeRequestForm] = useState({
    currentWalletId: '',
    newName: '',
    newAddress: '',
    newNetwork: 'ethereum',
    reason: ''
  });
  const [walletChangeRequests, setWalletChangeRequests] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('walletChangeRequests');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const walletOptions = [
    { id: 1, name: 'MetaMask', icon: '🦊' },
    { id: 2, name: 'WalletConnect', icon: '🔗' },
    { id: 3, name: 'Coinbase Wallet', icon: '🏦' },
    { id: 4, name: 'Trust Wallet', icon: '🤝' },
    { id: 5, name: 'Phantom', icon: '👻' }
  ];

  const networkOptions = [
    { value: 'ethereum', label: 'Ethereum', icon: 'Ξ' },
    { value: 'bsc', label: 'BNB Chain', icon: 'BNB' },
    { value: 'polygon', label: 'Polygon', icon: 'MATIC' },
    { value: 'arbitrum', label: 'Arbitrum', icon: 'ARB' },
    { value: 'avalanche', label: 'Avalanche', icon: 'AVAX' }
  ];

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const validateWalletAddress = (address, network) => {
    // Basic validation patterns for different networks
    const patterns = {
      ethereum: /^0x[a-fA-F0-9]{40}$/,
      bsc: /^0x[a-fA-F0-9]{40}$/,
      polygon: /^0x[a-fA-F0-9]{40}$/,
      arbitrum: /^0x[a-fA-F0-9]{40}$/,
      avalanche: /^0x[a-fA-F0-9]{40}$/
    };

    return patterns[network]?.test(address) || false;
  };

  const handleAddWallet = (e) => {
    e.preventDefault();
    
    // Check if user is verified
    if (!verificationForm.verified) {
      alert("Please complete document verification before adding a wallet.");
      return;
    }

    // Check if user already has a wallet
    if (connectedWallets.length > 0) {
      alert("You can only have one wallet. Please request a wallet change if you need to update your wallet.");
      return;
    }

    // Validate wallet address
    if (!validateWalletAddress(walletForm.address, walletForm.network)) {
      alert("Please enter a valid wallet address for the selected network.");
      return;
    }

    const newWallet = {
      id: Date.now(),
      name: walletForm.name,
      address: walletForm.address,
      network: walletForm.network,
      balance: 0,
      isConnected: true,
      addedAt: new Date().toISOString(),
      status: 'active'
    };
    
    setConnectedWallets([newWallet]);
    setWalletForm({ name: '', address: '', network: 'ethereum' });
    setShowAddWallet(false);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('connectedWallets', JSON.stringify([newWallet]));
    }
    
    alert("Wallet added successfully!");
  };

  const handleWalletChangeRequest = (e) => {
    e.preventDefault();
    
    if (!validateWalletAddress(changeRequestForm.newAddress, changeRequestForm.newNetwork)) {
      alert("Please enter a valid wallet address for the selected network.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...changeRequestForm,
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    const updatedRequests = [...walletChangeRequests, newRequest];
    setWalletChangeRequests(updatedRequests);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('walletChangeRequests', JSON.stringify(updatedRequests));
    }

    setShowChangeRequest(false);
    setChangeRequestForm({
      currentWalletId: '',
      newName: '',
      newAddress: '',
      newNetwork: 'ethereum',
      reason: ''
    });
    
    alert("Wallet change request submitted! It will be reviewed by an admin.");

    // Simulate admin approval after 8 seconds for demo
    setTimeout(() => {
      const approvedRequests = updatedRequests.map(req => 
        req.id === newRequest.id ? { ...req, status: 'approved' } : req
      );
      setWalletChangeRequests(approvedRequests);
      
      // Update the wallet
      const updatedWallets = connectedWallets.map(wallet => 
        wallet.id.toString() === newRequest.currentWalletId
          ? {
              ...wallet,
              name: newRequest.newName,
              address: newRequest.newAddress,
              network: newRequest.newNetwork,
              updatedAt: new Date().toISOString()
            }
          : wallet
      );
      setConnectedWallets(updatedWallets);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('walletChangeRequests', JSON.stringify(approvedRequests));
        localStorage.setItem('connectedWallets', JSON.stringify(updatedWallets));
      }
      
      alert("Your wallet change request has been approved!");
    }, 8000);
  };

  const openChangeRequest = (wallet) => {
    setChangeRequestForm({
      currentWalletId: wallet.id.toString(),
      newName: wallet.name,
      newAddress: wallet.address,
      newNetwork: wallet.network,
      reason: ''
    });
    setShowChangeRequest(true);
  };

  const getPendingRequest = (walletId) => {
    return walletChangeRequests.find(req => 
      req.currentWalletId === walletId.toString() && req.status === 'pending'
    );
  };

  // Theme-specific classes
  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";
  const LIGHT_MAIN_TEXT = "text-[#38537a]";

  return (
    <div className="space-y-6">
      {/* Connected Wallets */}
      <div className={`rounded-2xl p-6 border backdrop-blur-sm ${
        theme === 'light' 
          ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
          : 'bg-slate-800/50 border-slate-700/50'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
            Connected Wallet
          </h2>
          {verificationForm?.verified && connectedWallets.length === 0 && (
            <button 
              onClick={() => setShowAddWallet(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'light' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Wallet</span>
            </button>
          )}
        </div>
        
        {connectedWallets.length > 0 ? (
          <div className="space-y-4">
            {connectedWallets.map((wallet) => {
              const pendingRequest = getPendingRequest(wallet.id);
              return (
                <div key={wallet.id} className={`rounded-xl p-4 border ${
                  theme === 'light' 
                    ? 'bg-[#F3F6F9] border-[#e3e6ea]' 
                    : 'bg-slate-700/30 border-slate-600/30'
                }`}>
                  {/* Pending Change Request Banner */}
                  {pendingRequest && (
                    <div className={`mb-4 p-3 rounded-lg ${
                      theme === 'light' 
                        ? 'bg-yellow-50 border border-yellow-200' 
                        : 'bg-yellow-900/30 border border-yellow-700/50'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className={`w-4 h-4 ${
                          theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          theme === 'light' ? 'text-yellow-800' : 'text-yellow-300'
                        }`}>
                          Wallet change request pending admin approval
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        theme === 'light' ? 'bg-blue-100' : 'bg-blue-600/20'
                      }`}>
                        <WalletIcon className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                          {wallet.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                            {formatAddress(wallet.address)}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            theme === 'light' ? 'bg-gray-200 text-gray-600' : 'bg-slate-600 text-slate-300'
                          }`}>
                            {networkOptions.find(n => n.value === wallet.network)?.label || wallet.network}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                      wallet.isConnected 
                        ? theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-400/10 text-green-400'
                        : theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-400/10 text-gray-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${wallet.isConnected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span className="text-sm">{wallet.isConnected ? 'Connected' : 'Disconnected'}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Balance</div>
                      <div className={`font-semibold text-xl ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                        {formatCurrency(wallet.balance)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyAddress(wallet.address)}
                        className={`p-2 rounded-lg transition-colors ${
                          theme === 'light' 
                            ? 'bg-[#e6ecf3] text-blue-600 hover:bg-[#dee2e6]' 
                            : 'bg-slate-600/50 text-blue-300 hover:text-white hover:bg-slate-600/30'
                        }`}
                        title="Copy Address"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://etherscan.io/address/${wallet.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-colors ${
                          theme === 'light' 
                            ? 'bg-[#e6ecf3] text-blue-600 hover:bg-[#dee2e6]' 
                            : 'bg-slate-600/50 text-blue-300 hover:text-white hover:bg-slate-600/30'
                        }`}
                        title="View on Explorer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openChangeRequest(wallet)}
                        disabled={!!pendingRequest}
                        className={`p-2 rounded-lg transition-colors ${
                          pendingRequest
                            ? theme === 'light'
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            : theme === 'light'
                              ? 'bg-[#e6ecf3] text-blue-600 hover:bg-[#dee2e6]'
                              : 'bg-slate-600/50 text-blue-300 hover:text-white hover:bg-slate-600/30'
                        }`}
                        title="Request Wallet Change"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {wallet.addedAt && (
                    <div className={`text-xs ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                      Added on {new Date(wallet.addedAt).toLocaleDateString()}
                      {wallet.updatedAt && (
                        <span> • Updated on {new Date(wallet.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`py-12 text-center rounded-xl ${
            theme === 'light' 
              ? 'bg-[#F3F6F9] border-[#e3e6ea]' 
              : 'bg-slate-700/30 border-slate-600/30'
          }`}>
            <WalletIcon className={`w-12 h-12 mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-medium mb-2 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
              No Wallet Connected
            </h3>
            <p className={`mb-4 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
              {verificationForm?.verified 
                ? "Add your wallet to get started" 
                : "Complete verification to add a wallet"}
            </p>
            {verificationForm?.verified ? (
              <button 
                onClick={() => setShowAddWallet(true)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  theme === 'light' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Add Wallet
              </button>
            ) : (
              <button 
                disabled
                className={`px-4 py-2 rounded-lg font-medium cursor-not-allowed ${
                  theme === 'light' 
                    ? 'bg-gray-300 text-gray-500' 
                    : 'bg-slate-600 text-slate-400'
                }`}
              >
                Verify Identity First
              </button>
            )}
          </div>
        )}
      </div>

      {/* Change Requests History */}
      {walletChangeRequests.length > 0 && (
        <div className={`rounded-2xl p-6 border backdrop-blur-sm ${
          theme === 'light' 
            ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
            : 'bg-slate-800/50 border-slate-700/50'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
            Change Requests
          </h2>
          <div className="space-y-4">
            {walletChangeRequests.map((request) => (
              <div key={request.id} className={`rounded-xl p-4 border ${
                theme === 'light' 
                  ? 'bg-[#F3F6F9] border-[#e3e6ea]' 
                  : 'bg-slate-700/30 border-slate-600/30'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                      Wallet Change Request
                    </h4>
                    <p className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                    request.status === 'approved'
                      ? theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-400/10 text-green-400'
                      : request.status === 'rejected'
                        ? theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-400/10 text-red-400'
                        : theme === 'light' ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-400/10 text-yellow-400'
                  }`}>
                    {request.status === 'approved' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm capitalize">{request.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className={`font-medium ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                      New Address:
                    </span>
                    <p className={theme === 'light' ? LIGHT_MAIN_TEXT : 'text-white'}>
                      {formatAddress(request.newAddress)}
                    </p>
                  </div>
                  <div>
                    <span className={`font-medium ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                      Network:
                    </span>
                    <p className={theme === 'light' ? LIGHT_MAIN_TEXT : 'text-white'}>
                      {networkOptions.find(n => n.value === request.newNetwork)?.label}
                    </p>
                  </div>
                  {request.reason && (
                    <div className="md:col-span-2">
                      <span className={`font-medium ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                        Reason:
                      </span>
                      <p className={theme === 'light' ? LIGHT_MAIN_TEXT : 'text-white'}>
                        {request.reason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Wallet Modal */}
      {showAddWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-6 max-w-md w-full ${
            theme === 'light' 
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
              : 'bg-slate-800 border-slate-700'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                Add Wallet
              </h3>
              <button 
                onClick={() => setShowAddWallet(false)}
                className={`p-1 rounded-full ${
                  theme === 'light' 
                    ? 'hover:bg-gray-200' 
                    : 'hover:bg-slate-700'
                }`}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddWallet} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                }`}>
                  Wallet Name
                </label>
                <select
                  value={walletForm.name}
                  onChange={(e) => setWalletForm({...walletForm, name: e.target.value})}
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'light'
                      ? 'bg-white border-[#d2d7dd] text-[#38537a] focus:border-blue-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                >
                  <option value="">Select wallet type</option>
                  {walletOptions.map(option => (
                    <option key={option.id} value={option.name}>
                      {option.name} {option.icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                }`}>
                  Network
                </label>
                <select
                  value={walletForm.network}
                  onChange={(e) => setWalletForm({...walletForm, network: e.target.value})}
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'light'
                      ? 'bg-white border-[#d2d7dd] text-[#38537a] focus:border-blue-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  {networkOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({option.icon})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                }`}>
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={walletForm.address}
                  onChange={(e) => setWalletForm({...walletForm, address: e.target.value})}
                  placeholder="0x..."
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'light'
                      ? 'bg-white border-[#d2d7dd] text-[#38537a] focus:border-blue-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddWallet(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium border transition-colors ${
                    theme === 'light'
                      ? 'border-[#d2d7dd] text-[#6782a0] hover:bg-gray-50'
                      : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    theme === 'light' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Add Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Request Modal */}
      {showChangeRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-6 max-w-md w-full ${
            theme === 'light' 
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
              : 'bg-slate-800 border-slate-700'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                Request Wallet Change
              </h3>
              <button 
                onClick={() => setShowChangeRequest(false)}
                className={`p-1 rounded-full ${
                  theme === 'light' 
                    ? 'hover:bg-gray-200' 
                    : 'hover:bg-slate-700'
                }`}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleWalletChangeRequest} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                }`}>
                  New Wallet Name
                </label>
                <select
                  value={changeRequestForm.newName}
                  onChange={(e) => setChangeRequestForm({...changeRequestForm, newName: e.target.value})}
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'light'
                      ? 'bg-white border-[#d2d7dd] text-[#38537a] focus:border-blue-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                >
                  {walletOptions.map(option => (
                    <option key={option.id} value={option.name}>
                      {option.name} {option.icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                }`}>
                  New Network
                </label>
                <select
                  value={changeRequestForm.newNetwork}
                  onChange={(e) => setChangeRequestForm({...changeRequestForm, newNetwork: e.target.value})}
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'light'
                      ? 'bg-white border-[#d2d7dd] text-[#38537a] focus:border-blue-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  {networkOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({option.icon})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                }`}>
                  New Wallet Address
                </label>
                <input
                  type="text"
                  value={changeRequestForm.newAddress}
                  onChange={(e) => setChangeRequestForm({...changeRequestForm, newAddress: e.target.value})}
                  placeholder="0x..."
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'light'
                      ? 'bg-white border-[#d2d7dd] text-[#38537a] focus:border-blue-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                }`}>
                  Reason for Change
                </label>
                <textarea
                  value={changeRequestForm.reason}
                  onChange={(e) => setChangeRequestForm({...changeRequestForm, reason: e.target.value})}
                  placeholder="Please explain why you need to change your wallet..."
                  rows={3}
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'light'
                      ? 'bg-white border-[#d2d7dd] text-[#38537a] focus:border-blue-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowChangeRequest(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium border transition-colors ${
                    theme === 'light'
                      ? 'border-[#d2d7dd] text-[#6782a0] hover:bg-gray-50'
                      : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    theme === 'light' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletManagement;