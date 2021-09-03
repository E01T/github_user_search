export type users_type = {
  total_count: number
  items: Array<user_type>
}

export type user_type = {
  avatar_url: string | undefined
  bio: string | null
  blog: string
  company: string | null
  created_at: string
  email: string | null
  events_url: string | null
  followers: number
  followers_url: string | null
  following: 0
  following_url: string | null
  gists_url: string | null
  gravatar_id: string
  hireable: boolean | null
  html_url: string
  id: number
  location: string | null
  login: string
  name: string | null
  node_id: string
  organizations_url: string | null
  public_gists: number
  public_repos: number
  received_events_url: string | null
  repos_url: string | null
  site_admin: boolean
  starred_url: string | null
  subscriptions_url: string | null
  twitter_username: string | null
  type: string
  updated_at: string | null
  url: string
}
