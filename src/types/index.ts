export interface Story {
  id: string
  title: string
  content: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface GalleryItem {
  id: string
  image_url: string
  caption: string | null
  created_at: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  file_url: string | null
  created_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url: string | null
  live_url: string | null
  image_url: string | null
  featured: boolean
  created_at: string
}
