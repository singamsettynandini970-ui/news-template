// Navigation Drawer templates with 4 variations
// Left, Right, Overlay, and Push variations
// Implements accessibility and responsive behavior

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Navigation Drawer template variations
const NAVIGATION_DRAWER_TEMPLATES = [
  {
    id: 1,
    name: "Left Navigation Drawer",
    description: "Drawer that slides in from the left side",
    style: "minimal" as const,
    code: `import { useState } from 'react'
import { Menu, X, Home, Info, Briefcase, FolderOpen, Mail, Settings, HelpCircle } from 'lucide-react'

export default function LeftNavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Services', href: '/services', icon: Briefcase },
    { label: 'Portfolio', href: '/portfolio', icon: FolderOpen },
    { label: 'Contact', href: '/contact', icon: Mail },
    { label: 'Settings', href: '/settings', icon: Settings },
    { label: 'Help', href: '/help', icon: HelpCircle },
  ]

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Open navigation drawer"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left Drawer */}
      <nav
        className={\`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out \${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }\`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="text-lg font-bold text-foreground">Brand</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close navigation drawer"
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
                  className="flex items-center gap-3 px-3 py-2.5 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}`,
  },
  {
    id: 2,
    name: "Right Navigation Drawer",
    description: "Drawer that slides in from the right side",
    style: "modern" as const,
    code: `import { useState } from 'react'
import { Menu, X, User, ShoppingBag, Heart, Bell, Settings, LogOut } from 'lucide-react'

export default function RightNavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'My Account', href: '/account', icon: User },
    { label: 'Orders', href: '/orders', icon: ShoppingBag },
    { label: 'Wishlist', href: '/wishlist', icon: Heart },
    { label: 'Notifications', href: '/notifications', icon: Bell, badge: 3 },
    { label: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Open account menu"
        aria-expanded={isOpen}
      >
        <User className="h-6 w-6 text-foreground" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Right Drawer */}
      <nav
        className={\`fixed top-0 right-0 h-full w-72 bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out \${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }\`}
        role="navigation"
        aria-label="Account navigation"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-bold text-foreground">Account</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close account menu"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-lg font-bold text-white">JD</span>
            </div>
            <div>
              <p className="font-medium text-foreground">John Doe</p>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </div>

        <ul className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </nav>
    </>
  )
}`,
  },
  {
    id: 3,
    name: "Overlay Navigation Drawer",
    description: "Full-width overlay drawer with centered content",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

export default function OverlayNavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const menuSections = [
    {
      title: 'Products',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'New Arrivals', href: '/products/new' },
        { label: 'Best Sellers', href: '/products/best-sellers' },
        { label: 'Sale', href: '/products/sale' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
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
  ]

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Open navigation"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>

      {/* Overlay Drawer */}
      <nav
        className={\`fixed inset-0 bg-background z-50 transition-all duration-300 \${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }\`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-white">B</span>
            </div>
            <span className="text-xl font-bold text-foreground">Brand</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {menuSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-lg">{link.label}</span>
                        <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 Brand. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}`,
  },
  {
    id: 4,
    name: "Push Navigation Drawer",
    description: "Drawer that pushes main content aside",
    style: "bold" as const,
    code: `import { useState } from 'react'
import { Menu, X, Home, Layers, Users, BarChart3, Settings, HelpCircle, ChevronRight } from 'lucide-react'

export default function PushNavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('dashboard')

  const menuItems = [
    { id: 'home', label: 'Home', href: '/', icon: Home },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Layers },
    { id: 'team', label: 'Team', href: '/team', icon: Users },
    { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
    { id: 'help', label: 'Help & Support', href: '/help', icon: HelpCircle },
  ]

  return (
    <div className="flex">
      {/* Drawer */}
      <nav
        className={\`fixed top-0 left-0 h-full bg-background border-r border-border z-40 transition-all duration-300 \${
          isOpen ? 'w-64' : 'w-16'
        }\`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-sm font-bold text-white">B</span>
              </div>
              <span className="text-lg font-bold text-foreground">Brand</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={\`p-2 rounded-lg hover:bg-accent transition-colors \${!isOpen ? 'mx-auto' : ''}\`}
            aria-label={isOpen ? 'Collapse navigation' : 'Expand navigation'}
          >
            {isOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  className={\`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors \${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  } \${!isOpen ? 'justify-center' : ''}\`}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && (
                    <>
                      <span className="text-sm font-medium flex-1">{item.label}</span>
                      {isActive && <ChevronRight className="h-4 w-4" />}
                    </>
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* User Section */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area (pushed) */}
      <main
        className={\`flex-1 transition-all duration-300 \${
          isOpen ? 'ml-64' : 'ml-16'
        }\`}
      >
        {/* Your page content goes here */}
      </main>
    </div>
  )
}`,
  }
]

// Convert to new template variation format
export function createNavigationDrawerPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = NAVIGATION_DRAWER_TEMPLATES.map((template) => ({
    id: `navigation-drawer-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Animated Transitions', 'Accessibility', 'Responsive Design', 'Collapsible'],
      useCases: ['App Navigation', 'Dashboard Sidebar', 'Mobile Menu', 'Admin Panel'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Smooth slide animations',
        'Proper ARIA labels for accessibility',
        'Supports keyboard navigation',
        'Backdrop click to close'
      ]
    })
  }))

  return {
    id: 'navigation-drawer',
    name: 'Navigation Drawer',
    description: 'Slide-out navigation drawer for apps and dashboards',
    category: 'navigation',
    variations,
    tags: ['drawer', 'sidebar', 'navigation', 'mobile', 'app']
  }
}

// Export the navigation drawer panel
export const NAVIGATION_DRAWER_PANEL_WITH_VARIATIONS = createNavigationDrawerPanelWithVariations()
