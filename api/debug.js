module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')

    const hasUrl = !!process.env.SUPABASE_URL;
    const hasKey = !!process.env.SUPABASE_ANON_KEY;

    // We only send booleans and lengths for security, never the actual keys!
    res.status(200).json({
        message: "Debug Check",
        envVars: {
            SUPABASE_URL_EXISTS: hasUrl,
            SUPABASE_ANON_KEY_EXISTS: hasKey,
            SUPABASE_URL_LENGTH: hasUrl ? process.env.SUPABASE_URL.length : 0,
            SUPABASE_ANON_KEY_LENGTH: hasKey ? process.env.SUPABASE_ANON_KEY.length : 0
        },
        nodeVersion: process.version
    });
};
