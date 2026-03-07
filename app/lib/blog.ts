import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type { BlogPost, BlogPostMeta } from './blog-shared'
export { CATEGORY_LABELS } from './blog-shared'

import type { BlogPost, BlogPostMeta } from './blog-shared'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 225))
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: data.title ?? '',
      date: data.date ?? '',
      description: data.description ?? '',
      category: data.category ?? 'seo',
      industry: data.industry ?? 'general',
      author: data.author ?? 'LocalBeacon Team',
      readingTime: calculateReadingTime(content),
    } satisfies BlogPostMeta
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const result = await remark().use(html).process(content)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    description: data.description ?? '',
    category: data.category ?? 'seo',
    industry: data.industry ?? 'general',
    author: data.author ?? 'LocalBeacon Team',
    content: result.toString(),
    readingTime: calculateReadingTime(content),
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  const all = getAllPosts()
  const sameCategory = all.filter(p => p.slug !== currentSlug && p.category === category)
  const others = all.filter(p => p.slug !== currentSlug && p.category !== category)
  return [...sameCategory, ...others].slice(0, limit)
}
