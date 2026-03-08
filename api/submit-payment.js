const { db } = require('./db');

module.exports = async (req, res) => {
    // Enable CORS for development
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { workerId, transactionId } = req.body;

        if (!workerId || !transactionId) {
            return res.status(400).json({ error: 'Worker ID and Transaction ID are required' });
        }

        // 1. Check if Supabase is connected
        if (!db) {
            return res.status(500).json({ error: 'Database connection failed' });
        }

        // 2. Perform the update in Supabase
        const { data, error } = await db
            .from('workers')
            .update({
                payment_status: 'pending',
                transaction_id: transactionId
            })
            .eq('id', workerId)
            .select();

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: 'Payment submitted for verification',
            data
        });

    } catch (error) {
        console.error('Submit Payment Error:', error);
        res.status(500).json({ error: error.message });
    }
};
