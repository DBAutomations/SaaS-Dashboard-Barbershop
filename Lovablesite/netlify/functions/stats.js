// netlify/functions/stats.js
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // server-only
const DEFAULT_ORG_ID = process.env.DEFAULT_ORG_ID || null;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event) => {
  try {
    // Read query params
    const params = event.queryStringParameters || {};
    const orgId = params.orgId || DEFAULT_ORG_ID;
    const rangeDays = parseInt(params.rangeDays || '30', 10);

    if (!orgId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'orgId is required' }) };
    }

    const sinceDate = new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000).toISOString();

    // Fetch calls within range
    const { data: calls, error: callsErr } = await supabase
      .from('calls')
      .select('*')
      .eq('org_id', orgId)
      .gte('created_at', sinceDate);

    if (callsErr) {
      return { statusCode: 500, body: JSON.stringify({ error: callsErr.message }) };
    }

    // Compute aggregates (server-side)
    let total_calls = calls.length;
    let time_saved_seconds = 0;
    let appointments_booked = 0;
    let forwarded_count = 0;
    let ai_handled_count = 0;

    for (const c of calls) {
      if (c.handled_by_ai) {
        time_saved_seconds += (c.duration_seconds || 0);
        ai_handled_count++;
      } else if (c.forwarded) {
        time_saved_seconds += (c.time_to_forward_seconds || 0);
        forwarded_count++;
      }
      if (c.appointment_booked) appointments_booked++;
    }

    const hours_saved = time_saved_seconds / 3600;

    // Read org rate for cost estimate (optional)
    let receptionist_hourly_rate = 0;
    const { data: orgRow, error: orgErr } = await supabase
      .from('orgs')
      .select('receptionist_hourly_rate')
      .eq('id', orgId)
      .single();

    if (!orgErr && orgRow) receptionist_hourly_rate = parseFloat(orgRow.receptionist_hourly_rate || 0);
    const cost_savings = +(hours_saved * receptionist_hourly_rate).toFixed(2);

    return {
      statusCode: 200,
      body: JSON.stringify({
        total_calls,
        time_saved_seconds,
        hours_saved,
        appointments_booked,
        ai_handled_count,
        forwarded_count,
        receptionist_hourly_rate,
        cost_savings,
        rangeDays
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
