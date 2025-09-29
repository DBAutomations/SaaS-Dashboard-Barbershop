const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Only accept POST
    if (event.httpMethod !== 'POST') {
      return { 
        statusCode: 405, 
        headers,
        body: JSON.stringify({ error: 'Method Not Allowed' }) 
      };
    }

    // Get env vars
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    // Check env vars
    console.log('Env vars exist:', {
      SUPABASE_URL: !!SUPABASE_URL,
      SUPABASE_KEY_EXISTS: !!SUPABASE_KEY,
      WEBHOOK_SECRET_EXISTS: !!WEBHOOK_SECRET
    });

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error('Missing Supabase credentials');
      return { 
        statusCode: 500, 
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }) 
      };
    }

    // Initialize Supabase client inside handler
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Authorization check
    const authHeader = event.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== WEBHOOK_SECRET) {
      return { 
        statusCode: 401, 
        headers,
        body: JSON.stringify({ error: 'Invalid webhook secret' }) 
      };
    }

    const payload = JSON.parse(event.body);
    console.log('Received payload:', payload);

    const row = {
      org_id: payload.org_id,
      phone_from: payload.phone_from,
      phone_to: payload.phone_to,
      call_sid: payload.call_sid,
      duration_seconds: payload.duration_seconds ?? 0,
      handled_by_ai: payload.handled_by_ai ?? false,
      forwarded: payload.forwarded ?? false,
      appointment_booked: payload.appointment_booked ?? false,
      transcript: payload.transcript ?? null,
      metadata: payload.metadata ?? null
    };

    console.log('Attempting Supabase insert...');

    // Attempt insert into Supabase
    const { data, error } = await supabase
      .from('calls')
      .insert([row])
      .select()
      .single();

    console.log('Supabase insert data:', data);
    console.log('Supabase insert error:', error);

    if (error) {
      console.error('Supabase error details:', error);
      return { 
        statusCode: 500, 
        headers,
        body: JSON.stringify({ error: error.message, details: error }) 
      };
    }

    return { 
      statusCode: 200, 
      headers,
      body: JSON.stringify({ ok: true, insertedRow: data }) 
    };

  } catch (err) {
    console.error('Function error:', err);
    return { 
      statusCode: 500, 
      headers,
      body: JSON.stringify({ error: 'Server error', detail: err.message }) 
    };
  }
};