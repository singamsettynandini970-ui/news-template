// Mega Menu templates with 4 variations
// Grid, List, Image, and Category variations
// Implements accessibility and responsive behavior

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Mega Menu template variations
const MEGA_MENU_TEMPLATES = [
  {
    id: 1,
    name: "Grid Mega Menu",
    description: "Multi-column grid layout mega menu",
    style: "minimal" as const,
    code: `import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface MenuSection {
  title: string
  links: { label: string; href: string }[]
}

const menuData: Record<string, MenuSection[]> = {
  products: [
    {
      title: 'Categories',
      links: [
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Clothing', href: '/products/clothing' },
        { label: 'Home & Garden', href: '/products/home' },
        { label: 'Sports', href: '/products/sports' },
      ],
    },
    {
      title: 'Featured',
      links: [
        { label: 'New Arrivals', href: '/products/new' },
        { label: 'Best Sellers', href: '/products/best-sellers' },
        { label: 'Sale Items', href: '/products/sale' },
        { label: 'Gift Cards', href: '/products/gift-cards' },
      ],
    },
    {
      title: 'Brands',
      links: [
        { label: 'Apple', href: '/brands/apple' },
        { label: 'Samsung', href: '/brands/samsung' },
        { label: 'Nike', href: '/brands/nike' },
        { label: 'Sony', href: '/brands/sony' },
      ],
    },
  ],
  services: [
    {
      title: 'Consulting',
      links: [
        { label: 'Strategy', href: '/services/strategy' },
        { label: 'Design', href: '/services/design' },
        { label: 'Development', href: '/services/development' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/support/help' },
        { label: 'Documentation', href: '/support/docs' },
        { label: 'Contact', href: '/support/contact' },
      ],
    },
  ],
}

export default function GridMegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <nav className="relative bg-background border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6">
        <ul className="flex items-center gap-8 py-4" role="menubar">
          <li role="none">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Home
            </a>
          </li>
          
          {Object.keys(menuData).map((key) => (
            <li
              key={key}
              className="relative"
              role="none"
              onMouseEnter={() => setActiveMenu(key)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={activeMenu === key}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <ChevronDown className={\`h-4 w-4 transition-transform \${activeMenu === key ? 'rotate-180' : ''}\`} />
              </button>
              
              {activeMenu === key && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-background border border-border rounded-xl shadow-xl p-6 z-50">
                  <div className="grid grid-cols-3 gap-8">
                    {menuData[key].map((section) => (
                      <div key={section.title}>
                        <h3 className="text-sm font-semibold text-foreground mb-3">
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
                </div>
              )}
            </li>
          ))}
          
          <li role="none">
            <a href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              About
            </a>
          </li>
          <li role="none">
            <a href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}`,
  },
  {
    id: 2,
    name: "List Mega Menu",
    description: "Vertical list style mega menu with descriptions",
    style: "modern" as const,
    code: `import { useState } from 'react'
import { ChevronDown, ArrowRight, Zap, Shield, Rocket, Globe } from 'lucide-react'

interface MenuItem {
  icon: any
  label: string
  description: string
  href: string
}

const menuItems: MenuItem[] = [
  {
    icon: Zap,
    label: 'Performance',
    description: 'Optimize your application for speed and efficiency',
    href: '/features/performance',
  },
  {
    icon: Shield,
    label: 'Security',
    description: 'Enterprise-grade security for your data',
    href: '/features/security',
  },
  {
    icon: Rocket,
    label: 'Scalability',
    description: 'Scale seamlessly as your business grows',
    href: '/features/scalability',
  },
  {
    icon: Globe,
    label: 'Global CDN',
    description: 'Deliver content fast, anywhere in the world',
    href: '/features/cdn',
  },
]

export default function ListMegaMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative bg-background border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6">
        <ul className="flex items-center gap-8 py-4" role="menubar">
          <li role="none">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Home
            </a>
          </li>
          
          <li
            className="relative"
            role="none"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              Features
              <ChevronDown className={\`h-4 w-4 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-96 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50">
                <div className="p-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{item.label}</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
                <div className="p-4 bg-accent/50 border-t border-border">
                  <a href="/features" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    View all features
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </li>
          
          <li role="none">
            <a href="/pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Pricing
            </a>
          </li>
          <li role="none">
            <a href="/docs" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Docs
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}`,
  },
  {
    id: 3,
    name: "Image Mega Menu",
    description: "Mega menu with featured images and promotions",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ImageMegaMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    { label: 'Electronics', href: '/shop/electronics' },
    { label: 'Clothing', href: '/shop/clothing' },
    { label: 'Home & Living', href: '/shop/home' },
    { label: 'Sports', href: '/shop/sports' },
    { label: 'Beauty', href: '/shop/beauty' },
  ]

  return (
    <nav className="relative bg-background border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6">
        <ul className="flex items-center gap-8 py-4" role="menubar">
          <li role="none">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Home
            </a>
          </li>
          
          <li
            className="relative"
            role="none"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              Shop
              <ChevronDown className={\`h-4 w-4 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-background border border-border rounded-xl shadow-xl p-6 z-50">
                <div className="grid grid-cols-3 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
                    <ul className="space-y-2">
                      {categories.map((cat) => (
                        <li key={cat.href}>
                          <a
                            href={cat.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {cat.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Featured Image 1 */}
                  <a href="/shop/new-arrivals" className="group">
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">🆕</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white font-medium">New Arrivals</p>
                        <p className="text-white/80 text-sm">Shop the latest</p>
                      </div>
                    </div>
                  </a>
                  
                  {/* Featured Image 2 */}
                  <a href="/shop/sale" className="group">
                    <div className="relative h-48 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">🏷️</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white font-medium">Sale</p>
                        <p className="text-white/80 text-sm">Up to 50% off</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </li>
          
          <li role="none">
            <a href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              About
            </a>
          </li>
          <li role="none">
            <a href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}`,
  },
  {
    id: 4,
    name: "Category Mega Menu",
    description: "Full-width category-focused mega menu",
    style: "bold" as const,
    code: `import { useState } from 'react'
import { ChevronDown, Laptop, Shirt, Home, Dumbbell, Sparkles, Gift } from 'lucide-react'

interface Category {
  id: string
  label: string
  icon: any
  color: string
  subcategories: { label: string; href: string }[]
}

const categories: Category[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    icon: Laptop,
    color: 'from-blue-500 to-blue-600',
    subcategories: [
      { label: 'Smartphones', href: '/electronics/smartphones' },
      { label: 'Laptops', href: '/electronics/laptops' },
      { label: 'Tablets', href: '/electronics/tablets' },
      { label: 'Accessories', href: '/electronics/accessories' },
    ],
  },
  {
    id: 'fashion',
    label: 'Fashion',
    icon: Shirt,
    color: 'from-pink-500 to-pink-600',
    subcategories: [
      { label: 'Men', href: '/fashion/men' },
      { label: 'Women', href: '/fashion/women' },
      { label: 'Kids', href: '/fashion/kids' },
      { label: 'Shoes', href: '/fashion/shoes' },
    ],
  },
  {
    id: 'home',
    label: 'Home & Living',
    icon: Home,
    color: 'from-green-500 to-green-600',
    subcategories: [
      { label: 'Furniture', href: '/home/furniture' },
      { label: 'Decor', href: '/home/decor' },
      { label: 'Kitchen', href: '/home/kitchen' },
      { label: 'Garden', href: '/home/garden' },
    ],
  },
  {
    id: 'sports',
    label: 'Sports',
    icon: Dumbbell,
    color: 'from-orange-500 to-orange-600',
    subcategories: [
      { label: 'Fitness', href: '/sports/fitness' },
      { label: 'Outdoor', href: '/sports/outdoor' },
      { label: 'Team Sports', href: '/sports/team' },
      { label: 'Equipment', href: '/sports/equipment' },
    ],
  },
  {
    id: 'beauty',
    label: 'Beauty',
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600',
    subcategories: [
      { label: 'Skincare', href: '/beauty/skincare' },
      { label: 'Makeup', href: '/beauty/makeup' },
      { label: 'Haircare', href: '/beauty/haircare' },
      { label: 'Fragrance', href: '/beauty/fragrance' },
    ],
  },
  {
    id: 'gifts',
    label: 'Gifts',
    icon: Gift,
    color: 'from-red-500 to-red-600',
    subcategories: [
      { label: 'For Him', href: '/gifts/him' },
      { label: 'For Her', href: '/gifts/her' },
      { label: 'For Kids', href: '/gifts/kids' },
      { label: 'Gift Cards', href: '/gifts/cards' },
    ],
  },
]

export default function CategoryMegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <nav className="relative bg-background border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6">
        <ul className="flex items-center gap-8 py-4" role="menubar">
          <li role="none">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Home
            </a>
          </li>
          
          <li
            className="relative"
            role="none"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => { setIsOpen(false); setActiveCategory(null); }}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              Categories
              <ChevronDown className={\`h-4 w-4 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50">
                <div className="flex">
                  {/* Category Icons */}
                  <div className="w-64 bg-accent/30 p-4 space-y-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon
                      return (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setActiveCategory(cat.id)}
                          className={\`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors \${
                            activeCategory === cat.id
                              ? 'bg-background shadow-sm'
                              : 'hover:bg-background/50'
                          }\`}
                        >
                          <div className={\`p-2 rounded-lg bg-gradient-to-br \${cat.color}\`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{cat.label}</span>
                        </button>
                      )
                    })}
                  </div>
                  
                  {/* Subcategories */}
                  <div className="w-64 p-6">
                    {activeCategory ? (
                      <>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                          {categories.find(c => c.id === activeCategory)?.label}
                        </h3>
                        <ul className="space-y-2">
                          {categories
                            .find(c => c.id === activeCategory)
                            ?.subcategories.map((sub) => (
                              <li key={sub.href}>
                                <a
                                  href={sub.href}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {sub.label}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Hover over a category to see subcategories
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </li>
          
          <li role="none">
            <a href="/deals" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              Deals
            </a>
          </li>
          <li role="none">
            <a href="/new" className="text-sm font-medium text-foreground hover:text-primary transition-colors" role="menuitem">
              New Arrivals
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}`,
  }
]

// Convert to new template variation format
export function createMegaMenuPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = MEGA_MENU_TEMPLATES.map((template) => ({
    id: `mega-menu-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'complex',
      features: ['Multi-column Layout', 'Hover Interactions', 'Accessibility', 'Responsive Design'],
      useCases: ['E-commerce Navigation', 'Large Site Navigation', 'Product Categories', 'Service Menus'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Hover-triggered dropdowns',
        'Proper ARIA labels for accessibility',
        'Supports keyboard navigation',
        'Responsive with mobile fallback'
      ]
    })
  }))

  return {
    id: 'mega-menu',
    name: 'Mega Menu',
    description: 'Large dropdown menus with multiple columns and sections',
    category: 'navigation',
    variations,
    tags: ['mega-menu', 'navigation', 'dropdown', 'e-commerce', 'categories']
  }
}

// Export the mega menu panel
export const MEGA_MENU_PANEL_WITH_VARIATIONS = createMegaMenuPanelWithVariations()
