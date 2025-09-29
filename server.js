// api/webhook-call.js  (Vercel / Netlify style)
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // server-only
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET; // set a secret and use in n8n

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Invalid webhook secret' });
  }

  try {
    const payload = req.body;

    // map/validate incoming fields (make adjustments if your n8n keys differ)
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

    const { data, error } = await supabase.from('calls').insert([row]).select().single();
    if (error) {
      console.error('Supabase insert error', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};
