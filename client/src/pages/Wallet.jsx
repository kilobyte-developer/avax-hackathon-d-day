import React, { useEffect, useState } from "react";
import {
  Plus,
  Download,
  Upload,
  Copy,
  ExternalLink,
  Wallet as WalletIcon,
  Menu,
  X,
} from "lucide-react";
import { getEthereumProvider } from "../lib/provider";

import DashboardSidebar from "../components/DashboardSidebar";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contractConfigEthers";

const Wallet = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("wallet");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dashboardTheme") || "dark";
    }
    return "dark";
  });

  const [connectedAddress, setConnectedAddress] = useState(null);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false);
  const [poolBalance, setPoolBalance] = useState(null);
  const [flightInput, setFlightInput] = useState("");
  const [premiumInput, setPremiumInput] = useState("0.1"); // default AVAX amount (string)
  const [policyIdInput, setPolicyIdInput] = useState("");
  const [txLoading, setTxLoading] = useState(false);
  const [adminAddress, setAdminAddress] = useState(null);
  // State for modals
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showStake, setShowStake] = useState(false);

  // Form states
  const [walletForm, setWalletForm] = useState({ name: "", address: "" });
  const [depositForm, setDepositForm] = useState({
    amount: "",
    currency: "USDC",
  });
  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    currency: "USDC",
    address: "",
  });
  const [stakeForm, setStakeForm] = useState({
    amount: "",
    duration: "30",
    currency: "USDC",
  });

  // Sample wallet options
  const walletOptions = [
    { id: 1, name: "MetaMask", icon: "🦊" },
    { id: 2, name: "WalletConnect", icon: "🔗" },
    { id: 3, name: "Coinbase Wallet", icon: "🏦" },
    { id: 4, name: "Trust Wallet", icon: "🤝" },
    { id: 5, name: "Phantom", icon: "👻" },
  ];

  // Currency options
  const currencyOptions = ["USDC", "USDT", "ETH", "BTC", "BNB"];

  // Stake duration options
  const stakeDurations = [
    { value: "30", label: "30 days" },
    { value: "60", label: "60 days" },
    { value: "90", label: "90 days" },
    { value: "180", label: "180 days" },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("dashboardTheme", newTheme);
  };

  const [transactions] = useState([
    {
      id: 1,
      type: "deposit",
      amount: 1000,
      currency: "USDC",
      status: "completed",
      date: "2024-03-15",
      hash: "0x1234...abcd",
    },
    {
      id: 2,
      type: "payout",
      amount: 250,
      currency: "USDT",
      status: "completed",
      date: "2024-03-10",
      hash: "0x5678...efgh",
    },
    {
      id: 3,
      type: "withdrawal",
      amount: 500,
      currency: "USDC",
      status: "pending",
      date: "2024-03-08",
      hash: "0x9012...ijkl",
    },
  ]);


  // Ask MetaMask to connect and set connected address
async function connectMetaMask() {
  try {
    const provider = getEthereumProvider();

    // get accounts 
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });

    setConnectedAddress(accounts[0]);

    // ✅ always safe to call now
    provider.on("accountsChanged", (accs) => {
      setConnectedAddress(accs[0] || null);
      if (accs[0]) {
        storeConnectedWallet(accs[0]);
      } else {
        localStorage.removeItem("connectedWallet");
      }
    });

    provider.on("chainChanged", () => {
      refreshPoolBalance();
    });

    await ensureFujiNetwork();
  } catch (err) {
    console.error("connectMetaMask:", err);
  }
}

  // Ensure MetaMask is on Avalanche Fuji; prompt user to switch/add network if not
  async function ensureFujiNetwork() {
    if (!window.ethereum) return;
    const desiredChainId = "0xA869"; // 43113 in hex
    try {
      const current = await window.ethereum.request({ method: "eth_chainId" });
      if (current !== desiredChainId) {
        // try to switch
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: desiredChainId }],
        });
      }
    } catch (switchError) {
      // If the chain is not added to MetaMask, request to add it
      if (
        switchError.code === 4902 ||
        /Unrecognized chain/i.test(String(switchError.message))
      ) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: desiredChainId,
                chainName: "Avalanche Fuji C-Chain",
                rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                nativeCurrency: {
                  name: "Avalanche",
                  symbol: "AVAX",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://testnet.snowtrace.io"],
              },
            ],
          });
        } catch (addErr) {
          console.error("add chain error", addErr);
          throw addErr;
        }
      } else {
        console.error("switch chain error", switchError);
        throw switchError;
      }
    }
  }

function storeConnectedWallet(connectedAddress) {
  if (!connectedAddress) return;

  const walletType = window.ethereum?.isMetaMask ? "MetaMask" : "Trust Wallet";
  const walletIcon =
    walletType === "MetaMask"
      ? "🦊" // replace with actual icon URL
      : "🦁";

  const wallet = {
    name: walletType,
    icon: walletIcon,
    address: connectedAddress,
  };

  localStorage.setItem("connectedWallet", JSON.stringify(wallet));
}

useEffect(() => {
  if (connectedAddress) {
    storeConnectedWallet(connectedAddress);
  }

  const stored = localStorage.getItem("connectedWallet");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.address) {
        setConnectedAddress(parsed.address);
      }
    } catch (err) {
      console.error("Invalid JSON in localStorage:", stored, err);
      localStorage.removeItem("connectedWallet"); // cleanup bad data
    }
  }
}, [connectedAddress]);


  

  // Get ethers provider + signer
  function getProviderAndSigner() {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6
    const signer = provider.getSigner();
    return { provider, signer };
  }

  // Create contract instance connected to signer (for write txs)
  async function getContractWithSigner() {
    const { signer } = getProviderAndSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, await signer);
  }

  // Create contract instance read-only (connected to provider)
  async function getContractProvider() {
    const { provider } = getProviderAndSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }

  // Buy a policy: flight string + premium string (like "0.1")
  async function buyPolicyOnChain() {
    if (!flightInput) return alert("Enter flight ID");
    if (!premiumInput) return alert("Enter premium amount in AVAX (e.g., 0.1)");
    try {
      setTxLoading(true);
      await ensureFujiNetwork();
      const contract = await getContractWithSigner();
      const value = ethers.parseEther(premiumInput); // BigInt
      const tx = await contract.buyPolicy(flightInput, { value });
      console.log("tx hash:", tx.hash);
      // wait for miner
      await tx.wait();
      alert("Policy purchased — tx mined: " + tx.hash);
      // refresh pool
      await refreshPoolBalance();
    } catch (err) {
      console.error("buyPolicyOnChain:", err);
      alert(err?.message || "Buy failed");
    } finally {
      setTxLoading(false);
    }
  }

  // Admin approves claim
  async function approveClaimOnChain() {
    if (policyIdInput === "") return alert("Enter policy ID");
    try {
      setTxLoading(true);
      await ensureFujiNetwork();
      const contract = await getContractWithSigner();
      const tx = await contract.approveClaim(Number(policyIdInput));
      await tx.wait();
      alert("Claim approved — tx mined: " + tx.hash);
      await refreshPoolBalance();
    } catch (err) {
      console.error("approveClaimOnChain:", err);
      alert(err?.message || "Approve failed");
    } finally {
      setTxLoading(false);
    }
  }

  // Get on-chain pool balance and admin address
  async function refreshPoolBalance() {
    try {
      const contract = await getContractProvider();
      const bal = await contract.getPoolBalance(); // BigInt
      setPoolBalance(ethers.formatEther(bal)); // string
      // fetch admin address
      const adm = await contract.admin();
      setAdminAddress(adm);
    } catch (err) {
      console.error("refreshPoolBalance:", err);
    }
  }
  useEffect(() => {
    setIsMetaMaskAvailable(Boolean(window.ethereum));
    // try to auto-refresh pool balance (if metamask present)
    if (window.ethereum) {
      refreshPoolBalance().catch(console.error);
      // optionally, set interval refresh every 12s
      const id = setInterval(
        () => refreshPoolBalance().catch(console.error),
        12000
      );
      return () => clearInterval(id);
    }
  }, []);


  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Form handlers


  const handleDeposit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to your backend
    alert(`Depositing ${depositForm.amount} ${depositForm.currency}`);
    setDepositForm({ amount: "", currency: "USDC" });
    setShowDeposit(false);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    // In a real app, this would connect to your backend
    alert(
      `Withdrawing ${withdrawForm.amount} ${withdrawForm.currency} to ${withdrawForm.address}`
    );
    setWithdrawForm({ amount: "", currency: "USDC", address: "" });
    setShowWithdraw(false);
  };

  const handleStake = (e) => {
    e.preventDefault();
    // In a real app, this would connect to your backend
    alert(
      `Staking ${stakeForm.amount} ${stakeForm.currency} for ${stakeForm.duration} days`
    );
    setStakeForm({ amount: "", duration: "30", currency: "USDC" });
    setShowStake(false);
  };

  // Theme-specific classes
  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";
  const LIGHT_MAIN_TEXT = "text-[#38537a]";

  // Modal component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className={`rounded-2xl p-6 max-w-md w-full ${
            theme === "light"
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
              : "bg-slate-800 border-slate-700"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`text-xl font-semibold ${
                theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
              }`}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`p-1 rounded-full ${
                theme === "light" ? "hover:bg-gray-200" : "hover:bg-slate-700"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen flex ${
        theme === "light"
          ? "bg-gradient-to-br from-[#F3F6F9] via-[#e8eef3] to-[#F3F6F9] text-[#38537a]"
          : "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white"
      }`}
    >
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Main Content */}
      <div className="flex-1 py-8 px-6 lg:ml-0">
        <div className="max-w-6xl mx-auto">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className={`lg:hidden mb-6 p-2 rounded-lg ${
              theme === "light"
                ? "bg-[#e6ecf3] border border-[#d2d7dd] text-[#38537a]"
                : "bg-slate-800/50 border border-slate-700/50 text-blue-300"
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="mb-8">
            <h1 className="text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
              Wallet
            </h1>
            <p
              className={theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-200"}
            >
              Manage your connected wallets and transaction history
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Wallet Content */}
            <div className="lg:col-span-2">
              {/* Connected Wallets */}
              <div
                className={`rounded-2xl p-6 border backdrop-blur-sm mb-8 ${
                  theme === "light"
                    ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-6 ${
                    theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
                  }`}
                >
                  Connected Wallets
                </h2>
                <div className="space-y-4">
{/* show actual connected wallets which is storing in local storage show wallet address*/}
                  {connectedAddress ? (
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="text-3xl">🦊</span>
                      </div>
                      <div>
                        <p className="text-lg text-white-500">{formatAddress(connectedAddress)}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No connected wallets</p>
                  )}
                  </div>

                <button
                  onClick={() => connectMetaMask()}
                  className={`w-full mt-4 py-3 rounded-lg border transition-colors flex items-center justify-center space-x-2 ${
                    theme === "light"
                      ? "bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]"
                      : "bg-slate-700/30 border-slate-600/30 text-blue-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Wallet</span>
                </button>
              </div>

              {/* Transaction History */}
              <div
                className={`rounded-2xl p-6 border backdrop-blur-sm ${
                  theme === "light"
                    ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-6 ${
                    theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
                  }`}
                >
                  Transaction History
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr
                        className={`border-b ${
                          theme === "light"
                            ? "border-[#e3e6ea]"
                            : "border-slate-600/30"
                        }`}
                      >
                        <th
                          className={`text-left pb-4 ${
                            theme === "light"
                              ? LIGHT_LABEL_TEXT
                              : "text-blue-300"
                          }`}
                        >
                          Date
                        </th>
                        <th
                          className={`text-left pb-4 ${
                            theme === "light"
                              ? LIGHT_LABEL_TEXT
                              : "text-blue-300"
                          }`}
                        >
                          Type
                        </th>
                        <th
                          className={`text-left pb-4 ${
                            theme === "light"
                              ? LIGHT_LABEL_TEXT
                              : "text-blue-300"
                          }`}
                        >
                          Amount
                        </th>
                        <th
                          className={`text-left pb-4 ${
                            theme === "light"
                              ? LIGHT_LABEL_TEXT
                              : "text-blue-300"
                          }`}
                        >
                          Status
                        </th>
                        <th
                          className={`text-left pb-4 ${
                            theme === "light"
                              ? LIGHT_LABEL_TEXT
                              : "text-blue-300"
                          }`}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className={`border-b ${
                            theme === "light"
                              ? "border-[#e3e6ea] hover:bg-[#F3F6F9]"
                              : "border-slate-600/20 hover:bg-slate-700/20"
                          }`}
                        >
                          <td
                            className={`py-4 ${
                              theme === "light" ? LIGHT_MAIN_TEXT : "text-white"
                            }`}
                          >
                            {transaction.date}
                          </td>
                          <td className="py-4">
                            <span
                              className={`capitalize ${
                                transaction.type === "deposit"
                                  ? "text-green-400"
                                  : transaction.type === "withdrawal"
                                  ? "text-blue-400"
                                  : "text-red-400"
                              }`}
                            >
                              {transaction.type}
                            </span>
                          </td>
                          <td className="py-4">
                            <span
                              className={
                                transaction.type === "deposit"
                                  ? "text-green-400"
                                  : transaction.type === "withdrawal"
                                  ? "text-blue-400"
                                  : "text-red-400"
                              }
                            >
                              {transaction.type === "deposit" ? "+" : "-"}
                              {formatCurrency(transaction.amount)}
                            </span>
                            <span
                              className={`text-sm ml-1 ${
                                theme === "light"
                                  ? LIGHT_LABEL_TEXT
                                  : "text-blue-300"
                              }`}
                            >
                              {transaction.currency}
                            </span>
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === "completed"
                                  ? theme === "light"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-green-400/10 text-green-400"
                                  : theme === "light"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-yellow-400/10 text-yellow-400"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <a
                              href={`https://etherscan.io/tx/${transaction.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-sm transition-colors flex items-center space-x-1 ${
                                theme === "light"
                                  ? "text-blue-600 hover:text-blue-700"
                                  : "text-blue-400 hover:text-blue-300"
                              }`}
                            >
                              <span>View</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-8">
              {/* Balance Summary */}
              <div
                className={`rounded-2xl p-6 border backdrop-blur-sm ${
                  theme === "light"
                    ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-6 ${
                    theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
                  }`}
                >
                  Balance Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span
                      className={
                        theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
                      }
                    >
                      Total Balance
                    </span>
                    <span
                      className={`font-semibold ${
                        theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
                      }`}
                    >
                      {formatCurrency(3245.8)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={
                        theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
                      }
                    >
                      Available
                    </span>
                    <span
                      className={
                        theme === "light" ? LIGHT_MAIN_TEXT : "text-white"
                      }
                    >
                      {formatCurrency(2845.8)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={
                        theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
                      }
                    >
                      Staked
                    </span>
                    <span
                      className={
                        theme === "light" ? LIGHT_MAIN_TEXT : "text-white"
                      }
                    >
                      {formatCurrency(400.0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={
                        theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
                      }
                    >
                      Total Earned
                    </span>
                    <span className="text-green-400">
                      {formatCurrency(245.8)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div
                className={`rounded-2xl p-6 border backdrop-blur-sm ${
                  theme === "light"
                    ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-6 ${
                    theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
                  }`}
                >
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  {/* connect metamask */}
                  {isMetaMaskAvailable && !connectedAddress && (
                    <button
                      onClick={connectMetaMask}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                        theme === "light"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <WalletIcon className="w-5 h-5" />
                      <span>Connect MetaMask</span>
                    </button>
                  )}
                  {isMetaMaskAvailable && connectedAddress && (
                    <div
                      className={`p-3 rounded-xl border ${
                        theme === "light"
                          ? "bg-[#e6ecf3] border-[#d2d7dd] text-blue-600"
                          : "bg-slate-700/30 border-slate-600/30 text-blue-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={
                            theme === "light" ? LIGHT_MAIN_TEXT : "text-white"
                          }
                        >
                          Connected:
                        </span>
                        <button
                          onClick={() => 
                          {
                            setConnectedAddress(null);
                            localStorage.removeItem("connectedWallet");
                          }
                          }
                          className={`p-1 rounded-full ${
                            theme === "light"
                              ? "hover:bg-gray-200"
                              : "hover:bg-slate-700"
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div
                        className={`text-sm break-all ${
                          theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
                        }`}
                      >
                        {formatAddress(connectedAddress)}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block mb-1">Flight ID</label>
                    <input
                      type="text"
                      value={flightInput}
                      onChange={(e) => setFlightInput(e.target.value)}
                      placeholder="AI202"
                      className="w-full p-2 rounded-lg border mb-2"
                    />

                    <label className="block mb-1">Premium (AVAX)</label>
                    <input
                      type="text"
                      value={premiumInput}
                      onChange={(e) => setPremiumInput(e.target.value)}
                      placeholder="0.1"
                      className="w-full p-2 rounded-lg border mb-2"
                    />

                    <button
                      onClick={buyPolicyOnChain}
                      disabled={txLoading}
                      className="w-full py-2 rounded-lg bg-blue-600 text-white"
                    >
                      {txLoading ? "Processing..." : "Buy Policy"}
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pool Balance (on-chain)</span>
                    <span className="font-semibold">
                      {poolBalance ?? "Loading..."} AVAX
                    </span>
                  </div>

                  <button
                    onClick={() => setShowDeposit(true)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                      theme === "light"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Download className="w-5 h-5" />
                    <span>Deposit Funds</span>
                  </button>
                  <button
                    onClick={() => setShowWithdraw(true)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-colors ${
                      theme === "light"
                        ? "bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]"
                        : "bg-slate-700/30 border-slate-600/30 text-blue-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <Upload className="w-5 h-5" />
                    <span>Withdraw</span>
                  </button>
                  <button
                    onClick={() => setShowStake(true)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-colors ${
                      theme === "light"
                        ? "bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]"
                        : "bg-slate-700/30 border-slate-600/30 text-blue-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <WalletIcon className="w-5 h-5" />
                    <span>Stake Assets</span>
                  </button>
                </div>
              </div>

              {/* Supported Networks */}
              <div
                className={`rounded-2xl p-6 border backdrop-blur-sm ${
                  theme === "light"
                    ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-6 ${
                    theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
                  }`}
                >
                  Supported Networks
                </h2>
                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      theme === "light" ? "bg-[#F3F6F9]" : "bg-slate-700/30"
                    }`}
                  >
                    <span
                      className={
                        theme === "light" ? LIGHT_MAIN_TEXT : "text-white"
                      }
                    >
                      BNB Chain
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      theme === "light" ? "bg-[#F3F6F9]" : "bg-slate-700/30"
                    }`}
                  >
                    <span
                      className={
                        theme === "light" ? LIGHT_MAIN_TEXT : "text-white"
                      }
                    >
                      Ethereum
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      theme === "light" ? "bg-[#F3F6F9]" : "bg-slate-700/30"
                    }`}
                  >
                    <span
                      className={
                        theme === "light" ? LIGHT_MAIN_TEXT : "text-white"
                      }
                    >
                      Polygon
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      theme === "light" ? "bg-[#F3F6F9]" : "bg-slate-700/30"
                    }`}
                  >
                    <span
                      className={
                        theme === "light" ? LIGHT_MAIN_TEXT : "text-white"
                      }
                    >
                      Arbitrum
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Deposit Modal */}
      <Modal
        isOpen={showDeposit}
        onClose={() => setShowDeposit(false)}
        title="Deposit Funds"
      >
        <form onSubmit={handleDeposit}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Amount
            </label>
            <input
              type="number"
              value={depositForm.amount}
              onChange={(e) =>
                setDepositForm({ ...depositForm, amount: e.target.value })
              }
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`w-full p-3 rounded-lg border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-700"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className={`block mb-2 ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Currency
            </label>
            <select
              value={depositForm.currency}
              onChange={(e) =>
                setDepositForm({ ...depositForm, currency: e.target.value })
              }
              className={`w-full p-3 rounded-lg border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-700"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
              required
            >
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowDeposit(false)}
              className={`flex-1 py-2 rounded-lg font-medium ${
                theme === "light"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Deposit
            </button>
          </div>
        </form>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        isOpen={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        title="Withdraw Funds"
      >
        <form onSubmit={handleWithdraw}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Amount
            </label>
            <input
              type="number"
              value={withdrawForm.amount}
              onChange={(e) =>
                setWithdrawForm({ ...withdrawForm, amount: e.target.value })
              }
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`w-full p-3 rounded-lg border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-700"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Currency
            </label>
            <select
              value={withdrawForm.currency}
              onChange={(e) =>
                setWithdrawForm({ ...withdrawForm, currency: e.target.value })
              }
              className={`w-full p-3 rounded-lg border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-700"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
              required
            >
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              className={`block mb-2 ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Destination Address
            </label>
            <input
              type="text"
              value={withdrawForm.address}
              onChange={(e) =>
                setWithdrawForm({ ...withdrawForm, address: e.target.value })
              }
              placeholder="0x..."
              className={`w-full p-3 rounded-lg border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-700"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
              required
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowWithdraw(false)}
              className={`flex-1 py-2 rounded-lg font-medium ${
                theme === "light"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Withdraw
            </button>
          </div>
        </form>
      </Modal>

      {/* Stake Modal */}
      <Modal
        isOpen={showStake}
        onClose={() => setShowStake(false)}
        title="Stake Assets"
      >
        <form onSubmit={handleStake}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Amount to Stake
            </label>
            <input
              type="number"
              value={stakeForm.amount}
              onChange={(e) =>
                setStakeForm({ ...stakeForm, amount: e.target.value })
              }
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`w-full p-3 rounded-lg border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-700"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Currency
            </label>
            <select
              value={stakeForm.currency}
              onChange={(e) =>
                setStakeForm({ ...stakeForm, currency: e.target.value })
              }
              className={`w-full p-3 rounded-lg border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-700"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
              required
            >
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              className={`block mb-2 ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Stake Duration
            </label>
            <select
              value={stakeForm.duration}
              onChange={(e) =>
                setStakeForm({ ...stakeForm, duration: e.target.value })
              }
              className={`w-full p-3 rounded-lg border ${
                theme === "light"
                  ? "bg-white border-gray-300 text-gray-700"
                  : "bg-slate-700 border-slate-600 text-white"
              }`}
              required
            >
              {stakeDurations.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowStake(false)}
              className={`flex-1 py-2 rounded-lg font-medium ${
                theme === "light"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Stake
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Wallet;
