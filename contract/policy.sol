// SPDX-License-Identifier: MIT
//v1.0npm install wagmi
pragma solidity ^0.8.19;

contract TravelInsurance {
    struct Policy {
        uint id;
        address payable user;
        string flight;
        uint premium;
        uint payout;
        bool active;
        bool claimed;
    }

    uint public nextPolicyId;
    address public admin;
    mapping(uint => Policy) public policies;

    event PolicyBought(uint policyId, address user, string flight, uint premium, uint payout);
    event ClaimApproved(uint policyId, address user, uint payout);

    constructor() {
        admin = msg.sender; // whoever deploys becomes admin
    }

    // User buys a policy by sending AVAX
    function buyPolicy(string memory flight) external payable {
        require(msg.value > 0, "Premium required");

        uint payoutAmount = msg.value * 2; // Demo: payout = 2x premium

        policies[nextPolicyId] = Policy({
            id: nextPolicyId,
            user: payable(msg.sender),
            flight: flight,
            premium: msg.value,
            payout: payoutAmount,
            active: true,
            claimed: false
        });

        emit PolicyBought(nextPolicyId, msg.sender, flight, msg.value, payoutAmount);
        nextPolicyId++;
    }

    // Admin approves claim manually
    function approveClaim(uint policyId) external {
        require(msg.sender == admin, "Only admin can approve");
        Policy storage policy = policies[policyId];
        require(policy.active, "Policy not active");
        require(!policy.claimed, "Already claimed");

        policy.claimed = true;
        policy.active = false;

        (bool success, ) = policy.user.call{value: policy.payout}("");
        require(success, "Payout failed");

        emit ClaimApproved(policyId, policy.user, policy.payout);
    }

    // Check contract (liquidity pool) balance
    function getPoolBalance() external view returns (uint) {
        return address(this).balance;
    }
}
