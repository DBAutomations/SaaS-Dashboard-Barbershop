const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://bpvsvlvdjqenclswinvv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdnN2bHZkanFlbmNsc3dpbnZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTA3MDY3NiwiZXhwIjoyMDc0NjQ2Njc2fQ.WxCfp0hrbZFazdkI3v9oblrNnw67sa0E5SznA4lsbzo';
const WEBHOOK_SECRET = 'd9b1f2e7-3b1c-4f6a-8b6c-123456789abc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const app = express();
app.use(express.json());

app.post('/webhook-call', async (req, res) => {
  // skip secret check for now
  try {
    const { data, error } = await supabase.from('calls').insert([{
      org_id: '7fe8df40-eb8c-4803-8955-67c0700c49bb',
      phone_from: '+31612345678',
      phone_to: '+31201234567',
      call_sid: 'tw-test',
      duration_seconds: 60,
      handled_by_ai: true,
      forwarded: false,
      time_to_forward_seconds: null,
      appointment_booked: true,
      transcript: 'Test call',
      metadata: { test: true }
    }]).select().single();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true, id: data.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(8888, () => console.log('Server running on http://localhost:8888/webhook-call'));
