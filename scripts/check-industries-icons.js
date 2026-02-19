/*
  Usage: NODE_ENV=production node scripts/check-industries-icons.js
  Requires env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
*/

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment')
    process.exit(1)
  }

  const supabase = createClient(url, key)
  const { data, error } = await supabase
    .from('services')
    .select('id, name, icon, order, order_index')
    .order('order', { ascending: true })
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching industries:', error)
    process.exit(1)
  }

  console.log('Industries (id | name | icon):')
  for (const row of data || []) {
    console.log(`${row.id} | ${row.name} | ${row.icon ?? '(no icon)'}`)
  }
}

main().catch((e) => {
  console.error('Unexpected error:', e)
  process.exit(1)
})


