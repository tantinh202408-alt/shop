const db = require('../backend/config/database');
const { ensureFinanceTables } = require('../backend/utils/initDatabase');

async function main() {
    try {
        console.log("Running ensureFinanceTables to create coupon tables...");
        await ensureFinanceTables();
        console.log("Finance and coupon tables initialized.");

        // Check if coupons table exists
        const [tables] = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='coupons'");
        if (tables.length > 0) {
            console.log("SUCCESS: coupons table exists in the database.");
            
            // Insert test coupons
            console.log("Inserting test coupons...");
            await db.execute("INSERT OR IGNORE INTO coupons (code, discount_type, discount_value, max_uses) VALUES ('TEST20', 'percent', 20, 100)");
            await db.execute("INSERT OR IGNORE INTO coupons (code, discount_type, discount_value, max_uses) VALUES ('KM50K', 'fixed', 50000, 50)");
            
            const [coupons] = await db.execute("SELECT * FROM coupons");
            console.log("Current coupons in database:", coupons);
        } else {
            console.error("FAIL: coupons table does not exist.");
        }
    } catch (error) {
        console.error("Error bootstrapping database:", error);
    }
}

main().then(() => process.exit(0));
