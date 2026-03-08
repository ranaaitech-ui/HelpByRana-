const { db } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        // Very basic admin auth check via headers (in a real app, use JWT)
        const authHeader = req.headers['authorization'];
        if (authHeader !== 'Bearer YWRtaW46YWRtaW4xMjM=') { // base64 of admin:admin123
            return res.status(401).json({ error: 'Unauthorized Access' });
        }

        const { action, workerId } = req.body; // action = 'verify' or 'reject'

        if (!workerId || !action) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        let updateData = {};
        if (action === 'verify') {
            updateData = { payment_status: 'verified', verified: true };
        } else if (action === 'reject') {
            updateData = { payment_status: 'unpaid', transaction_id: null };
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        const { data, error } = await db
            .from('workers')
            .update(updateData)
            .eq('id', workerId)
            .select();

        if (error) throw error;

        res.status(200).json({ success: true, message: `Payment ${action}ed successfully.` });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
