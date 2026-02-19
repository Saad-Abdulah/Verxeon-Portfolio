/*
  Test script to debug icon update issue
*/

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

async function testIconUpdate() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.error('Missing env vars')
    process.exit(1)
  }

  const supabase = createClient(url, key)
  
  // Get first industry
  const { data: industries, error: fetchError } = await supabase
    .from('services')
    .select('id, name, icon, "order"')
    .limit(1)
  
  if (fetchError) {
    console.error('Error fetching:', fetchError)
    return
  }
  
  if (industries.length === 0) {
    console.log('No industries found')
    return
  }
  
  const industry = industries[0]
  console.log('Before update:', industry)
  
  // Test update with icon
  const { data: updateData, error: updateError } = await supabase
    .from('services')
    .update({ 
      icon: 'FaChartLine',
      "order": 1
    })
    .eq('id', industry.id)
    .select()
  
  if (updateError) {
    console.error('Update error:', updateError)
  } else {
    console.log('After update:', updateData[0])
  }
  
  // Test snake_case conversion
  const snakeCaseData = {
    icon: 'FaChartLine',
    order: 1
  }
  
  console.log('Snake case data:', snakeCaseData)
  
  // Test with snake_case
  const { data: snakeUpdateData, error: snakeUpdateError } = await supabase
    .from('services')
    .update(snakeCaseData)
    .eq('id', industry.id)
    .select()
  
  if (snakeUpdateError) {
    console.error('Snake case update error:', snakeUpdateError)
  } else {
    console.log('Snake case update result:', snakeUpdateData[0])
  }
}

testIconUpdate().catch(console.error)
