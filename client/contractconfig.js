import { parseAbi } from "viem";

export const contractAddress = "0xbB3B13E1A60EAb994d21a42760CA2E1aB6488146";

export const contractABI = parseAbi([
  "function buyPolicy(string flight) payable",
  "function approveClaim(uint policyId)",
  "function getPoolBalance() view returns (uint)"
]);
