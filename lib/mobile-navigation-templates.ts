// Mobile Navigation templates with 4 variations
// Bottom Tab, Drawer, Full Screen, and Floating variations
// Implements touch-friendly and responsive behavior

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Mobile Navigation template variations
const MOBILE_NAVIGATION_TEMPLATES = [
  {
    id: 1,
    name: "Bottom Tab Navigation",
    description: "Fixed bottom navigation bar with tab icons",
    style: "minimal" as const,
    code: `import { useState } from 'react'
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react'

export default function BottomTabNavigation() {
  const [activeTab, setActiveTab] = useState('home')

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'cart', label: 'Cart', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={\`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors \${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }\`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={\`h-5 w-5 \${isActive ? 'fill-current' : ''}\`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}`,
  },
  {
    id: 2,
    name: "Drawer Navigation",
    description: "Slide-out drawer navigation for mobile",
    style: "modern" as const,
    code: `import { useState } from 'react'
import { Menu, X, Home, Info, Briefcase, FolderOpen, Mail, Settings } from 'lucide-react'

export default function DrawerNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Services', href: '/services', icon: Briefcase },
    { label: 'Portfolio', href: '/portfolio', icon: FolderOpen },
    { label: 'Contact', href: '/contact', icon: Mail },
    { label: 'Settings', href: '/settings', icon: Settings }
  ]

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-40 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="text-lg font-bold text-foreground">Brand</span>
          </div>
          
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <nav
        className={\`fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 md:hidden \${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }\`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-white">B</span>
            </div>
            <span className="text-xl font-bold text-foreground">Brand</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <ul className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Get Started
          </button>
        </div>
      </nav>
    </>
  )
}`,
  },
  {
    id: 3,
    name: "Full Screen Navigation",
    description: "Full screen mobile navigation overlay",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function FullScreenNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="text-lg font-bold text-foreground">Brand</span>
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </header>

      {/* Full Screen Overlay */}
      <nav
        className={\`fixed inset-0 bg-background z-50 flex flex-col transition-all duration-300 md:hidden \${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }\`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-white">B</span>
            </div>
            <span className="text-xl font-bold text-foreground">Brand</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <ul className="space-y-6 text-center">
            {menuItems.map((item, index) => (
              <li 
                key={item.href}
                className={\`transform transition-all duration-300 \${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }\`}
                style={{ transitionDelay: \`\${index * 50}ms\` }}
              >
                <a
                  href={item.href}
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium text-lg">
            Get Started
          </button>
        </div>
      </nav>
    </>
  )
}`,
  },
  {
    id: 4,
    name: "Floating Navigation",
    description: "Floating action button with expandable menu",
    style: "bold" as const,
    code: `import { useState } from 'react'
import { Plus, X, Home, Search, Heart, User, Settings } from 'lucide-react'

export default function FloatingNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Search', icon: Search, href: '/search' },
    { label: 'Favorites', icon: Heart, href: '/favorites' },
    { label: 'Profile', icon: User, href: '/profile' },
    { label: 'Settings', icon: Settings, href: '/settings' }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      {/* Menu Items */}
      <nav
        className={\`absolute bottom-16 right-0 transition-all duration-300 \${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }\`}
        role="navigation"
        aria-label="Quick navigation"
      >
        <ul className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <li
                key={item.href}
                className={\`transform transition-all duration-300 \${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }\`}
                style={{ transitionDelay: isOpen ? \`\${index * 50}ms\` : '0ms' }}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-3 justify-end group"
                >
                  <span className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-medium text-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                  <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={\`w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl hover:bg-primary/90 transition-all duration-300 \${
          isOpen ? 'rotate-45' : 'rotate-0'
        }\`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}`,
  }
]

// Convert to new template variation format
export function createMobileNavigationPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = MOBILE_NAVIGATION_TEMPLATES.map((template) => ({
    id: `mobile-navigation-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Touch Friendly', 'Animated Transitions', 'Accessibility', 'Fixed Position'],
      useCases: ['Mobile Apps', 'Responsive Websites', 'PWA Navigation', 'Touch Interfaces'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Optimized for touch interactions',
        'Includes smooth animations',
        'Proper ARIA labels for accessibility',
        'Hidden on desktop (md:hidden)'
      ]
    })
  }))

  return {
    id: 'mobile-navigation',
    name: 'Mobile Navigation',
    description: 'Touch-friendly navigation components for mobile devices',
    category: 'navigation',
    variations,
    tags: ['mobile', 'navigation', 'touch', 'responsive', 'app']
  }
}

// Export the mobile navigation panel
export const MOBILE_NAVIGATION_PANEL_WITH_VARIATIONS = createMobileNavigationPanelWithVariations()
