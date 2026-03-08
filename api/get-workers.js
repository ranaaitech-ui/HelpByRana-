const { db } = require('./db');

// This API serves the public directory. It securely masks contact info if payment is not verified.
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    try {
        if (!db) throw new Error('DB not connected');

        // Only fetch approved workers for the public directory
        const { data, error } = await db
            .from('workers')
            .select('*')
            .eq('status', 'approved');

        if (error) throw error;

        // Security Layer: Mask phone numbers if payment is not verified
        const safeWorkers = data.map(worker => {
            if (worker.payment_status !== 'verified') {
                worker.phone = 'HIDDEN';
                worker.whatsapp = 'HIDDEN';
            }
            return worker;
        });

        res.status(200).json(safeWorkers);

    } catch (error) {
        console.error('Fetch Workers Error:', error);
        res.status(500).json({ error: error.message });
    }
};
