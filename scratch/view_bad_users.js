const db = require('../backend/config/database');

async function main() {
    try {
        console.log("Fetching details of bad users...");
        const [users] = await db.execute("SELECT * FROM users");
        
        let badUsers = [];
        for (const u of users) {
            const bal = parseFloat(u.balance);
            if (isNaN(bal) || String(u.balance).includes("-") || String(u.balance).includes(":")) {
                badUsers.push(u);
            }
        }
        
        console.log(`Found ${badUsers.length} bad users:`);
        for (const u of badUsers) {
            console.log(`\nUser ID: ${u.id}, Email: ${u.email}`);
            for (const [key, value] of Object.entries(u)) {
                if (value !== null) {
                    console.log(`  ${key}: ${JSON.stringify(value)}`);
                }
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

main().then(() => process.exit(0));
