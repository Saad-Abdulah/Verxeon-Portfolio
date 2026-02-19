const { createClient } = require('@supabase/supabase-js');
const url = 'https://aleoewiycaoovcxwvxuv.supabase.co';
const service = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZW9ld2l5Y2Fvb3ZjeHd2eHV2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUyNzA3NSwiZXhwIjoyMDczMTAzMDc1fQ.fDitvf8wiV9bktMRfZ4Ossp3f7KifHwlS2zG2IzK_mY';
const s = createClient(url, service);

(async () => {
  try {
    let target = null;
    let page = 1;
    const perPage = 1000;
    while (true) {
      const { data, error } = await s.auth.admin.listUsers({ page, perPage });
      if (error) throw error;
      const hit = (data.users || []).find(u => u.email === 'devsol.ai.tech@gmail.com');
      if (hit) { target = hit; break; }
      if ((data.users || []).length < perPage) break;
      page++;
    }
    if (!target) {
      console.error('User not found');
      process.exit(2);
    }
    const { error: updateErr } = await s.auth.admin.updateUserById(target.id, { password: 'devsol.ai.tech@3' });
    if (updateErr) throw updateErr;
    console.log('Password updated for', target.email);
  } catch (e) {
    console.error('Failed:', e);
    process.exit(1);
  }
})();
