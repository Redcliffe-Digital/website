import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { allCaseStudySlugs } from '@/content/case-studies'

export const dynamic = 'force-static'

// trailingSlash is enabled, so emitted URLs end with "/" to match the live paths.
function url(path: string): string {
  return path === '/' ? `${site.url}/` : `${site.url}${path}/`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const pages: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/what-we-do', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/legal/accessibility', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const studyPages = allCaseStudySlugs.map((slug) => ({
    path: `/case-studies/${slug}`,
    priority: 0.7,
    changeFrequency: 'yearly' as const,
  }))

  return [...pages, ...studyPages].map((p) => ({
    url: url(p.path),
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
