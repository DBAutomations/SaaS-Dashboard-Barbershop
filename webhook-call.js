const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY; // Must be Service Role key
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    // Authorization check
    const authHeader = event.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== WEBHOOK_SECRET) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid webhook secret' }) };
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

    // Attempt insert into Supabase
    const { data, error } = await supabase.from('calls').insert([row]).select().single();

    console.log('Supabase insert data:', data);
    console.log('Supabase insert error:', error);

    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, insertedRow: data }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error', detail: err.message }) };
  }
};
