#!/usr/bin/env node
/*
  Usage:
  NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... node scripts/set-project-industries.js

  This will set the industry field on specific projects if missing/wrong:
  - "ToolSparx" and "Styleoro - E-Commerce Web App" => "Web Development"
  - "LinkedIn Comments-to-Leads Automation" => "Agents & Automation"
*/

const { createClient } = require('@supabase/supabase-js')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  process.exit(1)
}

const supabase = createClient(url, key)

async function run() {
  const mappings = [
    { match: ['toolsparx'], industry: 'Web Development' },
    { match: ['styleoro', 'e-commerce web app'], industry: 'Web Development' },
    { match: ['linkedin comments-to-leads automation', 'comments-to-leads'], industry: 'Agents & Automation' },
  ]

  // Fetch projects
  const { data: projects, error } = await supabase.from('projects').select('id,title,category')
  if (error) throw error

  const updates = []
  for (const p of projects || []) {
    const title = (p.title || '').toLowerCase()
    const mapping = mappings.find(m => m.match.some(mk => title.includes(mk)))
    if (mapping && p.category !== mapping.industry) {
      updates.push({ id: p.id, category: mapping.industry })
    }
  }

  if (updates.length === 0) {
    console.log('No updates needed. All mapped projects already have correct industry.')
    return
  }

  console.log('Applying updates:', updates)
  for (const u of updates) {
    const { error: updateError } = await supabase.from('projects').update({ category: u.category }).eq('id', u.id)
    if (updateError) throw updateError
  }
  console.log('Done: industries updated for', updates.length, 'project(s).')
}

run().catch((e) => {
  console.error('Failed to set industries:', e)
  process.exit(1)
})


