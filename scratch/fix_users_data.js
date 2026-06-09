const db = require('../backend/config/database');

async function main() {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        console.log("Fetching all users to find affected rows...");
        const [users] = await connection.execute("SELECT * FROM users");
        
        let affectedUsers = [];
        for (const u of users) {
            if (String(u.balance).includes("-") || String(u.balance).includes(":")) {
                affectedUsers.push(u);
            }
        }

        console.log(`Found ${affectedUsers.length} users with corrupted columns.`);

        for (const u of affectedUsers) {
            console.log(`Fixing user ID ${u.id} (${u.email})...`);
            
            // Map the shifted fields back to their correct columns
            const gender = u.cover_image || 'male';
            const balance = parseFloat(u.gender) || 0;
            const role = u.bio || 'user';
            const status = u.contact_info || 'active';
            const created_at = u.phone;
            const updated_at = u.balance;
            const last_login = u.role;
            const register_ip = u.security_lock_reason || null;
            const last_login_ip = u.security_locked_ip || null;

            // Update user record with correct values and clear corrupted fields
            await connection.execute(
                `UPDATE users
                 SET gender = ?,
                     balance = ?,
                     role = ?,
                     status = ?,
                     created_at = ?,
                     updated_at = ?,
                     last_login = ?,
                     register_ip = ?,
                     last_login_ip = ?,
                     cover_image = NULL,
                     bio = NULL,
                     contact_info = NULL,
                     phone = NULL,
                     profile_music_url = NULL,
                     profile_music_title = NULL,
                     frame_url = NULL,
                     security_lock_reason = NULL,
                     security_locked_ip = NULL
                 WHERE id = ?`,
                [
                    gender,
                    balance,
                    role,
                    status,
                    created_at,
                    updated_at,
                    last_login,
                    register_ip,
                    last_login_ip,
                    u.id
                ]
            );
        }

        await connection.commit();
        console.log("Successfully fixed all corrupted users!");
    } catch (error) {
        await connection.rollback();
        console.error("Failed to fix users:", error);
    } finally {
        await connection.release();
    }
}

main().then(() => process.exit(0));
