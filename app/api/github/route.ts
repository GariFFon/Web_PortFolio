import { NextResponse } from 'next/server'
import { getGithubRepos, formatRepoData } from '@/app/utils/github'

export async function GET() {
  try {
    const username = 'GariFFon'
    const repos = await getGithubRepos(username)
    const formattedRepos = formatRepoData(repos)
    
    return NextResponse.json({ 
      success: true, 
      data: formattedRepos 
    })
  } catch (error) {
    console.error('Error in GitHub API route:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch GitHub repositories' 
    }, { status: 500 })
  }
} 