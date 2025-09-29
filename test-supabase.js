// test-supabase.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://bpvsvlvdjqenclswinvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdnN2bHZkanFlbmNsc3dpbnZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTA3MDY3NiwiZXhwIjoyMDc0NjQ2Njc2fQ.WxCfp0hrbZFazdkI3v9oblrNnw67sa0E5SznA4lsbzo'
);

(async () => {
  const { data, error } = await supabase.from('orgs').select('*');
  if (error) console.log('ERROR:', error);
  else console.log('DATA:', data);
})();
