// Breadcrumb Panel templates with 4 variations
// Simple, Icon, Dropdown, and Hierarchical variations
// Implements accessibility and responsive behavior

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Breadcrumb template variations
const BREADCRUMB_TEMPLATES = [
  {
    id: 1,
    name: "Simple Breadcrumb",
    description: "Clean, minimal breadcrumb with text separators",
    style: "minimal" as const,
    code: `import { ChevronRight } from 'lucide-react'

export default function SimpleBreadcrumb() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Smartphones', href: '/products/electronics/smartphones', current: true }
  ]

  return (
    <nav aria-label="Breadcrumb" className="w-full py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" aria-hidden="true" />
            )}
            {item.current ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}`,
  },
  {
    id: 2,
    name: "Icon Breadcrumb",
    description: "Breadcrumb with icons for each level",
    style: "modern" as const,
    code: `import { Home, ChevronRight, Package, Cpu, Smartphone } from 'lucide-react'

export default function IconBreadcrumb() {
  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Products', href: '/products', icon: Package },
    { label: 'Electronics', href: '/products/electronics', icon: Cpu },
    { label: 'Smartphones', href: '/products/electronics/smartphones', icon: Smartphone, current: true }
  ]

  return (
    <nav aria-label="Breadcrumb" className="w-full py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" aria-hidden="true" />
              )}
              {item.current ? (
                <span className="flex items-center gap-1.5 text-foreground font-medium bg-accent px-3 py-1.5 rounded-lg" aria-current="page">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-accent"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}`,
  },
  {
    id: 3,
    name: "Dropdown Breadcrumb",
    description: "Breadcrumb with dropdown for collapsed items",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { ChevronRight, ChevronDown, MoreHorizontal } from 'lucide-react'

export default function DropdownBreadcrumb() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const allItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Mobile Devices', href: '/products/electronics/mobile' },
    { label: 'Smartphones', href: '/products/electronics/mobile/smartphones' },
    { label: 'iPhone 15 Pro', href: '/products/electronics/mobile/smartphones/iphone-15-pro', current: true }
  ]

  // Show first, collapsed middle, and last two items
  const firstItem = allItems[0]
  const collapsedItems = allItems.slice(1, -2)
  const lastItems = allItems.slice(-2)

  return (
    <nav aria-label="Breadcrumb" className="w-full py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {/* First Item */}
        <li className="flex items-center">
          <a
            href={firstItem.href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {firstItem.label}
          </a>
        </li>

        {/* Collapsed Items Dropdown */}
        {collapsedItems.length > 0 && (
          <li className="flex items-center relative">
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" aria-hidden="true" />
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <MoreHorizontal className="h-4 w-4" />
              <ChevronDown className={\`h-3 w-3 transition-transform \${isDropdownOpen ? 'rotate-180' : ''}\`} />
            </button>
            
            {isDropdownOpen && (
              <ul className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
                {collapsedItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}

        {/* Last Items */}
        {lastItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" aria-hidden="true" />
            {item.current ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}`,
  },
  {
    id: 4,
    name: "Hierarchical Breadcrumb",
    description: "Breadcrumb with visual hierarchy and background styling",
    style: "bold" as const,
    code: `import { Home, ChevronRight } from 'lucide-react'

export default function HierarchicalBreadcrumb() {
  const items = [
    { label: 'Home', href: '/', isHome: true },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Smartphones', href: '/products/electronics/smartphones', current: true }
  ]

  return (
    <nav aria-label="Breadcrumb" className="w-full py-4">
      <div className="bg-accent/50 rounded-xl p-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <div className="flex items-center justify-center w-6 h-6 mx-1">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
              )}
              {item.current ? (
                <span 
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg shadow-sm"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.isHome ? (
                <a
                  href={item.href}
                  className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-lg hover:bg-accent transition-colors shadow-sm"
                  aria-label="Home"
                >
                  <Home className="h-5 w-5 text-foreground" />
                </a>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 rounded-lg transition-colors shadow-sm"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}`,
  }
]

// Convert to new template variation format
export function createBreadcrumbPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = BREADCRUMB_TEMPLATES.map((template) => ({
    id: `breadcrumb-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Responsive Design', 'Accessibility', 'Keyboard Navigation', 'SEO Friendly'],
      useCases: ['Page Navigation', 'Site Hierarchy', 'E-commerce Categories', 'Content Organization'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Includes proper ARIA labels',
        'Supports keyboard navigation',
        'SEO-friendly with proper markup',
        'Responsive with wrapping support'
      ]
    })
  }))

  return {
    id: 'breadcrumb-panel',
    name: 'Breadcrumb Panel',
    description: 'Navigation breadcrumb showing page hierarchy',
    category: 'navigation',
    variations,
    tags: ['breadcrumb', 'navigation', 'hierarchy', 'accessible']
  }
}

// Export the breadcrumb panel
export const BREADCRUMB_PANEL_WITH_VARIATIONS = createBreadcrumbPanelWithVariations()
