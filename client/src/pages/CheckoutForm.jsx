import React, { useState, useEffect} from "react";
import axios from "axios";
import { Shield, ArrowRight, Upload, CreditCard, Coins } from "lucide-react";
import DashboardSidebar from "../components/DashboardSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contractConfigEthers";

// Cloudinary configuration
const CLOUDINARY_CONFIG = {
  cloudName: "dj6mlh67u",
  uploadPreset: "defi_project",
  apiKey: "qkZYxhg0a90ZVShzhHv3GbptxNo",
};

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    flightNumber: "",
    bookingDate: "",
    returnDate: "",
    ticketFile: null,
  });

  const [uploading, setUploading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("store");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dashboardTheme") || "dark";
    }
    return "dark";
  });
  const [paymentMethod, setPaymentMethod] = useState("crypto");
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [poolBalance, setPoolBalance] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [txLoading, setTxLoading] = useState(false);

  const navigate = useNavigate();

  // Check if wallet is already connected and get package details
  useEffect(() => {
    checkWalletConnection();
    getSelectedPackage();
  }, []);

  // Get selected package from localStorage
  const getSelectedPackage = () => {
    const storedPackage = localStorage.getItem("selectedPackage");
    if (storedPackage) {
      try {
        const pkg = JSON.parse(storedPackage);
        setSelectedPackage(pkg);
        console.log("Selected package:", pkg);
      } catch (error) {
        console.error("Error parsing package:", error);
        alert("Invalid package data. Please select a package again.");
        navigate("/dashboard/store");
      }
    } else {
      alert("No package selected. Please select a package first.");
      navigate("/dashboard/store");
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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

  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask to use crypto payments");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWalletConnected(true);
        // Store full address for transactions, display shortened version
        const fullAddress = accounts[0];
        const shortenedAddress = `${fullAddress.substring(0, 6)}...${fullAddress.substring(fullAddress.length - 4)}`;
        setWalletAddress(shortenedAddress);
        // Store full address in a ref or separate state if needed for transactions
        localStorage.setItem("walletAddress", fullAddress);
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      alert("Failed to connect wallet");
    }
  };

  // Check if wallet is already connected
  const checkWalletConnection = async () => {
    if (typeof window.ethereum === "undefined") return;

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setWalletConnected(true);
        const fullAddress = accounts[0];
        const shortenedAddress = `${fullAddress.substring(0, 6)}...${fullAddress.substring(fullAddress.length - 4)}`;
        setWalletAddress(shortenedAddress);
        localStorage.setItem("walletAddress", fullAddress);
      }
    } catch (error) {
      console.error("Wallet check error:", error);
    }
  };

  // Upload file to Cloudinary using unsigned upload
  const uploadToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
    uploadData.append("cloud_name", CLOUDINARY_CONFIG.cloudName);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`,
        uploadData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("File upload failed");
    }
  };

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

  // Get ethers provider + signer
  function getProviderAndSigner() {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
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

  async function refreshPoolBalance() {
    try {
      const contract = await getContractProvider();
      const bal = await contract.getPoolBalance();
      setPoolBalance(ethers.formatEther(bal));
      const adm = await contract.admin();
      setAdminAddress(adm);
    } catch (err) {
      console.error("refreshPoolBalance:", err);
    }
  }

  useEffect(() => {
    setIsMetaMaskAvailable(Boolean(window.ethereum));
    if (window.ethereum) {
      refreshPoolBalance().catch(console.error);
      const id = setInterval(
        () => refreshPoolBalance().catch(console.error),
        12000
      );
      return () => clearInterval(id);
    }
  }, []);

  // Process crypto payment - fixed version
  const processCryptoPayment = async () => {
    if (!walletConnected) {
      alert("Please connect your wallet first");
      return false;
    }
    
    if (!selectedPackage) {
      alert("No insurance package selected");
      return false;
    }

    setTxLoading(true);
    try {
      await ensureFujiNetwork();
      const contract = await getContractWithSigner();
      
      // Use the actual premium from the selected package
      const premiumAmount = selectedPackage.premium || "0.01"; // Default to 0.01 if not specified
      const value = ethers.parseEther(premiumAmount.toString());
      
      // Use the flight number from the form
      const flightNumber = formData.flightNumber;
      
      const tx = await contract.buyPolicy(flightNumber, { value });
      console.log("Transaction hash:", tx.hash);
      
      // Wait for transaction to be mined
      await tx.wait();
      console.log("Transaction confirmed");
      
      // Refresh pool balance
      await refreshPoolBalance();
      
      return true;
    } catch (err) {
      console.error("Payment error:", err);
      alert(err?.message || "Payment failed");
      return false;
    } finally {
      setTxLoading(false);
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === "crypto" && !walletConnected) {
      alert("Please connect your wallet to proceed with crypto payment");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload ticket to Cloudinary
      let ticketUrl = "";
      if (formData.ticketFile) {
        ticketUrl = await uploadToCloudinary(formData.ticketFile);
      }

      // 2. Process payment
      setProcessingPayment(true);
      let paymentSuccess = false;
      
      if (paymentMethod === "crypto") {
        paymentSuccess = await processCryptoPayment();
      } 

      if (!paymentSuccess) {
        throw new Error("Payment processing failed");
      }

      // 3. Prepare and store checkout data
      const checkoutData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        flightNumber: formData.flightNumber,
        bookingDate: formData.bookingDate,
        returnDate: formData.returnDate,
        selectedPackage: selectedPackage,
        ticketUrl: ticketUrl,
        paymentMethod: paymentMethod,
        walletAddress: paymentMethod === "crypto" ? localStorage.getItem("walletAddress") : null,
        paymentDate: new Date().toISOString(),
        status: "completed"
      };

      // Store in localStorage
      const existingCheckouts = JSON.parse(localStorage.getItem("checkoutHistory") || "[]");
      existingCheckouts.push(checkoutData);
      localStorage.setItem("checkoutHistory", JSON.stringify(existingCheckouts));
      
      // Also store the latest checkout separately for easy access
      localStorage.setItem("latestCheckout", JSON.stringify(checkoutData));

      alert("Checkout successful!");
      navigate("/dashboard/store");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong: " + err.message);
    } finally {
      setUploading(false);
      setProcessingPayment(false);
      setUploadProgress(0);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPEG, PNG, or PDF file");
      return;
    }
    
    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }
    
    setFormData({ ...formData, ticketFile: file });
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

      {/* Main Checkout Form */}
      <div className="flex-1 py-8 px-6 lg:ml-0 flex items-center justify-center">
        <div
          className={`relative w-full max-w-lg rounded-2xl border backdrop-blur-sm p-6 shadow-xl ${
            theme === "light"
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER}`
              : "bg-slate-800 border border-slate-700"
          }`}
        >
          <h2
            className={`text-2xl font-semibold mb-6 ${
              theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
            }`}
          >
            Flight Checkout
          </h2>

          {/* Display selected package info */}
          {selectedPackage && (
            <div className={`mb-4 p-3 rounded-lg ${theme === "light" ? "bg-blue-50" : "bg-slate-700"}`}>
              <h3 className="font-semibold">Selected Package:</h3>
              <p>{selectedPackage.name} - {selectedPackage.premium} AVAX</p>
              <p className="text-sm">{selectedPackage.description}</p>
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className={`text-lg font-medium mb-3 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>
              Payment Method
            </h3>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("crypto")}
                className={`flex items-center px-4 py-2 rounded-lg border ${
                  paymentMethod === "crypto"
                    ? "bg-blue-600 text-white border-blue-600"
                    : theme === "light"
                    ? "bg-white text-gray-700 border-gray-300"
                    : "bg-slate-700 text-white border-slate-600"
                }`}
              >
                <Coins className="w-5 h-5 mr-2" />
                Crypto
              </button>
            </div>

            {/* Wallet Connection for Crypto */}
            {paymentMethod === "crypto" && (
              <div className="mt-4">
                {!walletConnected ? (
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center"
                  >
                    <Coins className="w-5 h-5 mr-2" />
                    Connect Wallet
                  </button>
                ) : (
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg inline-flex items-center">
                    <Coins className="w-5 h-5 mr-2" />
                    Connected: {walletAddress}
                  </div>
                )}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />
            <input
              type="text"
              name="flightNumber"
              placeholder="Flight Number"
              value={formData.flightNumber}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block mb-1 ${
                    theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
                  }`}
                >
                  Date of Booking
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${
                    theme === "light"
                      ? "border-[#E2E8F0]"
                      : "border-slate-700 bg-slate-900 text-white"
                  }`}
                  required
                />
              </div>
              <div>
                <label
                  className={`block mb-1 ${
                    theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
                  }`}
                >
                  Date of Return
                </label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${
                    theme === "light"
                      ? "border-[#E2E8F0]"
                      : "border-slate-700 bg-slate-900 text-white"
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label
                className={`block mb-1 ${
                  theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
                }`}
              >
                Upload Ticket (Photo or PDF)
              </label>
              <div className="flex items-center space-x-2">
                <label
                  className={`flex-1 p-3 rounded-xl border cursor-pointer ${
                    theme === "light"
                      ? "border-[#E2E8F0] bg-white"
                      : "border-slate-700 bg-slate-900 text-white"
                  }`}
                >
                  <Upload className="w-5 h-5 inline mr-2" />
                  {formData.ticketFile ? formData.ticketFile.name : "Choose file"}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    required
                  />
                </label>
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1">Uploading: {uploadProgress}%</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
              disabled={uploading || processingPayment || txLoading || (paymentMethod === "crypto" && !walletConnected)}
            >
              {(processingPayment || txLoading) ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>
                    {paymentMethod === "crypto" ? `Pay ${selectedPackage?.premium || '0'} AVAX` : "Pay with Card"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;