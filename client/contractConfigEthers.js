// client/src/contractConfigEthers.js
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere"; // replace

// Simple minimal ABI as array of function signatures (works with ethers)
export const CONTRACT_ABI = [
  "function buyPolicy(string flight) payable",
  "function approveClaim(uint256 policyId)",
  "function getPoolBalance() view returns (uint256)",
  "function admin() view returns (address)",
  "event PolicyBought(uint256 indexed policyId, address user, string flight, uint256 premium, uint256 payout)",
  "event ClaimApproved(uint256 indexed policyId, address user, uint256 payout)"
];
