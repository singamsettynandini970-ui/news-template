// Top Navigation Bar templates with 4 variations
// Horizontal, Mega Menu, Dropdown, and Sticky variations
// Implements accessibility and responsive behavior

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Top Navigation Bar template variations
const TOP_NAVIGATION_BAR_TEMPLATES = [
  {
    id: 1,
    name: "Simple Top Bar",
    description: "Clean horizontal top navigation bar",
    style: "minimal" as const,
    code: `import { Phone, Mail, MapPin } from 'lucide-react'

export default function SimpleTopBar() {
  return (
    <div className="w-full bg-accent/50 border-b border-border">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+1234567890" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@example.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@example.com</span>
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="/locations" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <MapPin className="h-4 w-4" />
              <span>Find a Store</span>
            </a>
            <div className="flex items-center gap-2">
              <a href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </a>
              <span className="text-muted-foreground">/</span>
              <a href="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 2,
    name: "Promotional Top Bar",
    description: "Top bar with promotional message and social links",
    style: "modern" as const,
    code: `import { X } from 'lucide-react'
import { useState } from 'react'

export default function PromotionalTopBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex-1" />
          
          <div className="flex items-center gap-2 text-sm">
            <span className="animate-pulse">🎉</span>
            <span className="font-medium">Free shipping on orders over $50!</span>
            <a href="/shop" className="underline hover:no-underline ml-2">
              Shop Now
            </a>
          </div>
          
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
              aria-label="Close promotional banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 3,
    name: "Utility Top Bar",
    description: "Top bar with language, currency, and account options",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { Globe, ChevronDown, User, Heart, ShoppingBag } from 'lucide-react'

export default function UtilityTopBar() {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
  ]

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'JPY', symbol: '¥' },
  ]

  return (
    <div className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          {/* Left Side - Language & Currency */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => { setLanguageOpen(!languageOpen); setCurrencyOpen(false); }}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>English</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {languageOpen && (
                <div className="absolute top-full left-0 mt-1 w-32 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="block w-full px-3 py-1.5 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      onClick={() => setLanguageOpen(false)}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => { setCurrencyOpen(!currencyOpen); setLanguageOpen(false); }}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>USD ($)</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {currencyOpen && (
                <div className="absolute top-full left-0 mt-1 w-28 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      className="block w-full px-3 py-1.5 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      onClick={() => setCurrencyOpen(false)}
                    >
                      {curr.code} ({curr.symbol})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Account & Actions */}
          <div className="flex items-center gap-4">
            <a href="/wishlist" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </a>
            <a href="/cart" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingBag className="h-4 w-4" />
              <span>Cart (0)</span>
            </a>
            <a href="/account" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <User className="h-4 w-4" />
              <span>Account</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 4,
    name: "Social Top Bar",
    description: "Top bar with social links and contact info",
    style: "bold" as const,
    code: `import { Phone, Clock } from 'lucide-react'

export default function SocialTopBar() {
  return (
    <div className="w-full bg-foreground text-background">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          {/* Left Side - Contact Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Call us: +1 (234) 567-890</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Mon-Fri: 9AM - 6PM</span>
            </div>
          </div>

          {/* Right Side - Social Links */}
          <div className="flex items-center gap-3">
            <span className="text-background/70">Follow us:</span>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-background/10 rounded transition-colors" aria-label="Twitter">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.70 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-background/10 rounded transition-colors" aria-label="Facebook">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-background/10 rounded transition-colors" aria-label="Instagram">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-background/10 rounded transition-colors" aria-label="LinkedIn">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  }
]

// Convert to new template variation format
export function createTopNavigationBarPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = TOP_NAVIGATION_BAR_TEMPLATES.map((template) => ({
    id: `top-navigation-bar-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Responsive Design', 'Contact Info', 'Social Links', 'Utility Navigation'],
      useCases: ['Website Header', 'E-commerce', 'Corporate Sites', 'Contact Display'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Typically placed above main header',
        'Contains utility links and contact info',
        'Responsive with mobile considerations',
        'Supports dismissible promotional banners'
      ]
    })
  }))

  return {
    id: 'top-navigation-bar',
    name: 'Top Navigation Bar',
    description: 'Utility bar above main header with contact and social links',
    category: 'navigation',
    variations,
    tags: ['top-bar', 'utility', 'contact', 'social', 'header']
  }
}

// Export the top navigation bar panel
export const TOP_NAVIGATION_BAR_PANEL_WITH_VARIATIONS = createTopNavigationBarPanelWithVariations()
