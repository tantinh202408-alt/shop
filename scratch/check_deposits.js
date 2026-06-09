const db = require('../backend/config/database');

async function main() {
    try {
        console.log("Checking transactions for reference_id = 25...");
        const [txs] = await db.execute("SELECT * FROM transactions WHERE reference_id = 25");
        console.log("Transactions with reference_id = 25:", txs);

        console.log("Checking all transactions...");
        const [allTxs] = await db.execute("SELECT * FROM transactions ORDER BY id DESC LIMIT 5");
        console.log("Last 5 transactions:", allTxs);
    } catch (error) {
        console.error("Error:", error);
    }
}

main().then(() => process.exit(0));
