// Site Map templates with 4 variations
// Tree, Grid, Accordion, and Search variations
// Implements accessibility and responsive behavior

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Site Map template variations
const SITE_MAP_TEMPLATES = [
  {
    id: 1,
    name: "Tree Site Map",
    description: "Hierarchical tree structure site map",
    style: "minimal" as const,
    code: `import { ChevronRight } from 'lucide-react'

interface SiteMapItem {
  label: string
  href: string
  children?: SiteMapItem[]
}

const siteMapData: SiteMapItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Clothing', href: '/products/clothing' },
      { label: 'Home & Garden', href: '/products/home-garden' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Consulting', href: '/services/consulting' },
      { label: 'Support', href: '/services/support' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Team', href: '/about/team' },
      { label: 'History', href: '/about/history' },
      { label: 'Careers', href: '/about/careers' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

function TreeItem({ item, level = 0 }: { item: SiteMapItem; level?: number }) {
  return (
    <li className="space-y-1">
      <a
        href={item.href}
        className={\`flex items-center gap-2 py-1.5 text-sm hover:text-primary transition-colors \${
          level === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'
        }\`}
        style={{ paddingLeft: \`\${level * 16}px\` }}
      >
        {level > 0 && <ChevronRight className="h-3 w-3" />}
        {item.label}
      </a>
      {item.children && (
        <ul className="space-y-1">
          {item.children.map((child) => (
            <TreeItem key={child.href} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function TreeSiteMap() {
  return (
    <nav aria-label="Site map" className="w-full py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Site Map</h2>
      <ul className="space-y-2">
        {siteMapData.map((item) => (
          <TreeItem key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  )
}`,
  },
  {
    id: 2,
    name: "Grid Site Map",
    description: "Multi-column grid layout site map",
    style: "modern" as const,
    code: `interface SiteMapSection {
  title: string
  links: { label: string; href: string }[]
}

const siteMapSections: SiteMapSection[] = [
  {
    title: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Clothing', href: '/products/clothing' },
      { label: 'Home & Garden', href: '/products/home-garden' },
      { label: 'Sports', href: '/products/sports' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Consulting', href: '/services/consulting' },
      { label: 'Support', href: '/services/support' },
      { label: 'Training', href: '/services/training' },
      { label: 'Custom Solutions', href: '/services/custom' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Returns', href: '/returns' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Social Media', href: '/social' },
      { label: 'Community', href: '/community' },
      { label: 'Partners', href: '/partners' },
    ],
  },
]

export default function GridSiteMap() {
  return (
    <nav aria-label="Site map" className="w-full py-8">
      <h2 className="text-2xl font-bold text-foreground mb-8">Site Map</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {siteMapSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}`,
  },
  {
    id: 3,
    name: "Accordion Site Map",
    description: "Collapsible accordion style site map",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SiteMapSection {
  title: string
  links: { label: string; href: string }[]
}

const siteMapSections: SiteMapSection[] = [
  {
    title: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Clothing', href: '/products/clothing' },
      { label: 'Home & Garden', href: '/products/home-garden' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Consulting', href: '/services/consulting' },
      { label: 'Support', href: '/services/support' },
      { label: 'Training', href: '/services/training' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
]

export default function AccordionSiteMap() {
  const [openSections, setOpenSections] = useState<string[]>(['Products'])

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    )
  }

  return (
    <nav aria-label="Site map" className="w-full py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Site Map</h2>
      <div className="space-y-2 max-w-2xl">
        {siteMapSections.map((section) => {
          const isOpen = openSections.includes(section.title)
          return (
            <div
              key={section.title}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full px-4 py-3 bg-accent/50 hover:bg-accent transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-foreground">{section.title}</span>
                <ChevronDown
                  className={\`h-5 w-5 text-muted-foreground transition-transform \${
                    isOpen ? 'rotate-180' : ''
                  }\`}
                />
              </button>
              {isOpen && (
                <ul className="px-4 py-3 space-y-2 bg-background">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}`,
  },
  {
    id: 4,
    name: "Search Site Map",
    description: "Site map with search and filtering",
    style: "bold" as const,
    code: `import { useState, useMemo } from 'react'
import { Search, ExternalLink } from 'lucide-react'

interface SiteMapLink {
  label: string
  href: string
  category: string
  description?: string
}

const allLinks: SiteMapLink[] = [
  { label: 'Home', href: '/', category: 'Main', description: 'Welcome page' },
  { label: 'Products', href: '/products', category: 'Products', description: 'Browse all products' },
  { label: 'Electronics', href: '/products/electronics', category: 'Products', description: 'Electronic devices' },
  { label: 'Clothing', href: '/products/clothing', category: 'Products', description: 'Fashion and apparel' },
  { label: 'Consulting', href: '/services/consulting', category: 'Services', description: 'Expert consulting' },
  { label: 'Support', href: '/services/support', category: 'Services', description: 'Customer support' },
  { label: 'About Us', href: '/about', category: 'Company', description: 'Our story' },
  { label: 'Team', href: '/about/team', category: 'Company', description: 'Meet the team' },
  { label: 'Careers', href: '/careers', category: 'Company', description: 'Job opportunities' },
  { label: 'Contact', href: '/contact', category: 'Support', description: 'Get in touch' },
  { label: 'FAQ', href: '/faq', category: 'Support', description: 'Common questions' },
  { label: 'Privacy Policy', href: '/privacy', category: 'Legal', description: 'Privacy information' },
  { label: 'Terms of Service', href: '/terms', category: 'Legal', description: 'Terms and conditions' },
]

export default function SearchSiteMap() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    return [...new Set(allLinks.map((link) => link.category))]
  }, [])

  const filteredLinks = useMemo(() => {
    return allLinks.filter((link) => {
      const matchesSearch =
        searchQuery === '' ||
        link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === null || link.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const groupedLinks = useMemo(() => {
    return filteredLinks.reduce((acc, link) => {
      if (!acc[link.category]) {
        acc[link.category] = []
      }
      acc[link.category].push(link)
      return acc
    }, {} as Record<string, SiteMapLink[]>)
  }, [filteredLinks])

  return (
    <nav aria-label="Site map" className="w-full py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Site Map</h2>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={\`px-3 py-1.5 text-sm rounded-lg transition-colors \${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent text-foreground hover:bg-accent/80'
            }\`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={\`px-3 py-1.5 text-sm rounded-lg transition-colors \${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-foreground hover:bg-accent/80'
              }\`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-8">
        {Object.entries(groupedLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {category}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="flex-1">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                      {link.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {link.description}
                        </p>
                      )}
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {filteredLinks.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No pages found matching your search.
          </p>
        )}
      </div>
    </nav>
  )
}`,
  }
]

// Convert to new template variation format
export function createSiteMapPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = SITE_MAP_TEMPLATES.map((template) => ({
    id: `site-map-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Responsive Design', 'Accessibility', 'SEO Friendly', 'Organized Structure'],
      useCases: ['Site Navigation', 'SEO', 'User Orientation', 'Footer Content'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Includes proper ARIA labels',
        'SEO-friendly structure',
        'Responsive grid layouts',
        'Supports deep hierarchies'
      ]
    })
  }))

  return {
    id: 'site-map',
    name: 'Site Map',
    description: 'Site map navigation showing all pages and sections',
    category: 'navigation',
    variations,
    tags: ['site-map', 'navigation', 'seo', 'hierarchy', 'footer']
  }
}

// Export the site map panel
export const SITE_MAP_PANEL_WITH_VARIATIONS = createSiteMapPanelWithVariations()
