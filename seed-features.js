const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const byName = {
  'Web Development': [
    'SaaS Platforms',
    'API & Backend Systems',
    'Custom Web Applications',
    'Performance Optimization',
    'Admin Dashboards & Portals',
    'Real-time Web Apps (Chat, Tracking, etc.)'
  ],
  'App Development': [
    'Native iOS & Android Apps',
    'Cross-Platform Development',
    'Desktop Applications',
    'UI/UX Design',
    'App Store Optimization',
    'Backend Development',
    'Cloud Integration',
    'Maintenance & Support'
  ],
  'AI & ML': [
    'Machine Learning Models',
    'Natural Language Processing',
    'Computer Vision',
    'Predictive Analytics',
    'Chatbots & Virtual Assistants',
    'Data Mining & Analysis',
    'AI Integration',
    'Custom AI Solutions'
  ],
  'Cloud Computing': [
    'Cloud Migration',
    'Infrastructure as a Service (IaaS)',
    'Platform as a Service (PaaS)',
    'Software as a Service (SaaS)',
    'Cloud Security',
    'DevOps & CI/CD',
    'Cloud Monitoring',
    'Cost Optimization'
  ],
  'Agents & Automation': [
    'Process Automation',
    'AI Agents & Bots',
    'Workflow Optimization',
    'Data Processing Automation',
    'Customer Service Automation',
    'Business Process Management',
    'Integration Solutions',
    'Custom Automation Tools'
  ],
  'SEO and Social Media Marketing': [
    'SEO Audits & Strategy',
    'On-Page & Off-Page Optimization',
    'Keyword Research & Analysis',
    'Link Building & Outreach',
    'Social Media Strategy & Campaigns',
    'Social Media Management & Growth',
    'Analytics & Performance Reporting'
  ]
};

(async () => {
  // Ensure features column exists
  try {
    const { error: errCol } = await supabase.rpc('noop');
  } catch (_) {}

  for (const [name, features] of Object.entries(byName)) {
    const { data, error } = await supabase
      .from('services')
      .update({ features })
      .eq('name', name)
      .select('id,name,features');

    if (error) {
      console.error('Failed for', name, error.message);
    } else {
      console.log('Updated', name, data?.[0]?.features?.length || 0, 'features');
    }
  }
})();
