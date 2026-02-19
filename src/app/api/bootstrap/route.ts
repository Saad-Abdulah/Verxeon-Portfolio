import { NextResponse } from 'next/server'
import { getProjects, getIndustries, getTeamMembers, getBlogPosts } from '@/lib/appwrite'

export async function GET() {
  try {
    const [projects, industries, team, blogs] = await Promise.all([
      getProjects().catch(() => []),
      getIndustries().catch(() => []),
      getTeamMembers().catch(() => []),
      getBlogPosts().catch(() => []),
    ])

    return NextResponse.json({ projects, industries, team, blogs }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ projects: [], industries: [], team: [], blogs: [], error: 'bootstrap_failed' }, { status: 200 })
  }
} 