const { createClient } = require('@supabase/supabase-js');

// These environment variables will be securely provided by Vercel
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let db;

if (supabaseUrl && supabaseKey) {
    db = createClient(supabaseUrl, supabaseKey);
} else {
    console.error('Missing Supabase Environment Variables');
}

module.exports = { db };
