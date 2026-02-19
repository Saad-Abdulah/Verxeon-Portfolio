# Supabase Setup Guide for DevSol Website

This guide will help you set up Supabase as the backend for your DevSol website, replacing Firebase.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Your DevSol project cloned locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `devsol-website` (or your preferred name)
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. In your project root, you should have `.env.local` file
2. Update the following values with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

Replace:
- `your-project-id` with your actual project ID
- `your_supabase_anon_key_here` with your anon public key
- `your_supabase_service_role_key_here` with your service role key

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql` from your project root
4. Click "Run" to execute the SQL

This will create:
- All necessary tables (projects, services, team_members, blog_posts, contact_submissions, users)
- Row Level Security (RLS) policies
- Storage bucket for images
- Indexes for better performance
- Triggers for automatic timestamp updates

## Step 5: Set Up Storage

1. In your Supabase dashboard, go to **Storage**
2. You should see an `images` bucket (created by the SQL script)
3. If not, create a new bucket named `images` and make it public

## Step 6: Configure Authentication (Optional)

If you want to use Supabase authentication for admin access:

1. Go to **Authentication** > **Settings**
2. Configure your preferred authentication providers (Google, GitHub, etc.)
3. Set up redirect URLs:
   - Add `http://localhost:3000/admin/auth/callback` for development
   - Add `https://yourdomain.com/admin/auth/callback` for production

## Step 7: Install Dependencies

The project already has Supabase dependencies installed, but if you need to reinstall:

```bash
npm install @supabase/supabase-js
```

## Step 8: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/admin` to test the admin dashboard
3. Try creating a project, team member, or blog post to verify everything works

## Step 9: Deploy to Production

When deploying to production:

1. Update your production environment variables with the same Supabase credentials
2. Add your production domain to the allowed origins in Supabase settings
3. Update authentication redirect URLs for production

## Database Schema Overview

### Tables Created:

- **projects**: Store project information
- **services**: Store service/industry information  
- **team_members**: Store team member profiles
- **blog_posts**: Store blog posts and articles
- **contact_submissions**: Store contact form submissions
- **users**: Store admin user information

### Key Features:

- **Row Level Security**: Public read access, authenticated write access
- **Automatic Timestamps**: `created_at` and `updated_at` fields
- **File Storage**: Images stored in Supabase Storage
- **Type Safety**: Full TypeScript support

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check that your environment variables are correct
2. **"Table doesn't exist"**: Make sure you ran the SQL schema script
3. **"Permission denied"**: Check your RLS policies are set up correctly
4. **"Storage bucket not found"**: Ensure the `images` bucket exists and is public

### Getting Help:

- Check the [Supabase Documentation](https://supabase.com/docs)
- Visit the [Supabase Community](https://github.com/supabase/supabase/discussions)
- Review the console logs for detailed error messages

## Migration from Firebase

If you're migrating from Firebase:

1. Export your existing data from Firebase
2. Transform the data to match the new schema (camelCase to snake_case)
3. Import the data into Supabase using the SQL editor or API
4. Update any hardcoded Firebase references in your code

## Security Notes

- Never commit your `.env.local` file to version control
- Use the `anon` key for client-side operations
- Use the `service_role` key only for server-side operations
- Regularly rotate your API keys
- Monitor your Supabase usage and set up billing alerts

## Next Steps

After setup:

1. Test all CRUD operations in the admin dashboard
2. Verify file uploads work correctly
3. Test the public-facing pages
4. Set up monitoring and backups
5. Configure your production deployment

Your DevSol website is now powered by Supabase! 🚀
