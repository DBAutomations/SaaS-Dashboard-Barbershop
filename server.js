// netlify/functions/webhook-call.js

const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event) => {
  try {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    // Check authorization header
    const authHeader = event.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== WEBHOOK_SECRET) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid webhook secret' }),
      };
    }

    // Parse incoming JSON payload
    const payload = JSON.parse(event.body);

    // Build row for Supabase insert
    const row = {
      org_id: payload.org_id,
      phone_from: payload.phone_from,
      phone_to: payload.phone_to,
      call_sid: payload.call_sid,
      duration_seconds: payload.duration_seconds ?? 0,
      handled_by_ai: payload.handled_by_ai ?? false,
      forwarded: payload.forwarded ?? false,
      time_to_forward_seconds: payload.time_to_forward_seconds ?? null,
      appointment_booked: payload.appointment_booked ?? false,
      transcript: payload.transcript ?? null,
      metadata: payload.metadata ?? null
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('calls')
      .insert([row])
      .select()
      .single();

    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    // Return the inserted row so n8n can see it
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error', detail: err.message }) };
  }
};

