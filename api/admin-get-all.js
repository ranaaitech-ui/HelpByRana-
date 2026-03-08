const { db } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    try {
        const authHeader = req.headers['authorization'];
        if (authHeader !== 'Bearer YWRtaW46YWRtaW4xMjM=') {
            return res.status(401).json({ error: 'Unauthorized Access' });
        }

        if (!db) throw new Error('DB not connected');

        const { data, error } = await db
            .from('workers')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
