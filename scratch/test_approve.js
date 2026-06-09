const { processDepositApproval } = require('../backend/services/depositApprovalService');

async function main() {
    try {
        console.log("Attempting to approve deposit request 25...");
        const result = await processDepositApproval(25, {
            approve: true,
            adminNote: "Test approve",
            approvedBy: 1
        });
        console.log("Result:", result);
    } catch (error) {
        console.error("Error occurred during deposit approval:", error);
    }
}

main().then(() => process.exit(0));
