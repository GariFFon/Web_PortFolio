import axios from 'axios'

interface GithubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string | null
  topics: string[]
  language: string
  stargazers_count: number
  forks_count: number
  fork: boolean
}

/**
 * Fetch repositories from GitHub API
 */
export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};
    
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers,
      params: {
        sort: 'updated',
        per_page: 20
      }
    })
    
    return response.data.filter((repo: GithubRepo) => !repo.fork)
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    return []
  }
}

/**
 * Format the repository data for display
 */
export function formatRepoData(repos: GithubRepo[]) {
  return repos.map(repo => ({
    id: repo.id,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'No description provided',
    technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
    github: repo.html_url,
    demo: repo.homepage || '',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    image: `/projects/${repo.name.toLowerCase().replace(/_/g, '-')}.png`
  }))
}

/**
 * Get GitHub user profile data
 */
export async function getGithubProfile(username: string) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`)
    return response.data
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    return null
  }
} 