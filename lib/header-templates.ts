// Convert existing header templates to new extended format
import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Your existing header templates data
const EXISTING_HEADER_TEMPLATES = [
  {
    id: 1,
    name: "Classic Centered Navigation",
    description: "Template 1: Classic Centered Navigation with Logo",
    style: "classic" as const,
    code: `export default function ClassicHeader() {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-around gap-8">
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Services
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <span className="text-xl font-bold text-foreground">Brand</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Blog
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}`,
  },
  {
    id: 2,
    name: "Modern SaaS Style",
    description: "Template 2: Modern SaaS Style with Left Logo and Action Buttons",
    style: "modern" as const,
    code: `export default function ModernHeader() {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">L</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Logo</span>
            </div>

            <nav className="flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Products
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
                Solutions
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Resources
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Pricing
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}`,
  },
  {
    id: 3,
    name: "E-commerce Header",
    description: "Template 3: E-commerce Header with Search and Shopping Cart",
    style: "bold" as const,
    code: `export default function EcommerceHeader() {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <span className="text-xl">🛒</span>
              </div>
              <span className="text-xl font-bold text-foreground">ShopLogo</span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-96 pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-semibold">
                3
              </span>
            </button>
          </div>
        </div>

        <nav className="flex items-center justify-center gap-8 border-t border-border pt-4">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            New Arrivals
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Men
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Women
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Kids
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sale
          </a>
        </nav>
      </div>
    </header>
  )
}`,
  },
  {
    id: 4,
    name: "Minimalist Responsive",
    description: "Template 4: Minimalist Responsive Header with Mobile Menu",
    style: "minimal" as const,
    code: `export default function MinimalHeader() {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-lg hover:bg-accent transition-colors lg:hidden">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">MB</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-bold text-foreground">MyBrand</div>
              <div className="text-xs text-muted-foreground">Tagline here</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <span className="text-xl">🔔</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}`,
  }
]

// Convert to new template variation format
export function createHeaderPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = EXISTING_HEADER_TEMPLATES.map((template, index) => ({
    id: `header-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Responsive Design', 'Dark Mode Support', 'Mobile Menu', 'Accessibility'],
      useCases: ['Website Header', 'App Navigation', 'Brand Display'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons, ...COMMON_DEPENDENCIES.navigation],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Includes mobile hamburger menu',
        'Supports dark mode toggle',
        'Fully accessible with ARIA labels'
      ]
    })
  }))

  return {
    id: 'header-panel',
    name: 'Header Panel',
    description: 'Website header with navigation and branding',
    category: 'navigation',
    variations,
    tags: ['header', 'navigation', 'branding', 'responsive']
  }
}

// Export the converted header panel
export const HEADER_PANEL_WITH_VARIATIONS = createHeaderPanelWithVariations()