// Hamburger Menu templates with 4 variations
// Slide, Overlay, Push, and Accordion variations
// Implements mobile-responsive behavior and accessibility

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Hamburger Menu template variations
const HAMBURGER_MENU_TEMPLATES = [
  {
    id: 1,
    name: "Slide Hamburger Menu",
    description: "Menu that slides in from the side",
    style: "minimal" as const,
    code: `import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function SlideHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Open menu"
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

      {/* Slide Menu */}
      <div
        className={\`fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out \${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }\`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
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
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <nav className="p-4" role="navigation" aria-label="Main navigation">
          <ul className="space-y-2">
            <li>
              <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}`,
  },
  {
    id: 2,
    name: "Overlay Hamburger Menu",
    description: "Full-screen overlay menu with centered navigation",
    style: "modern" as const,
    code: `import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function OverlayHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>

      {/* Full Screen Overlay */}
      <div
        className={\`fixed inset-0 bg-background z-50 flex flex-col transition-all duration-300 \${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }\`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
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
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Centered Navigation */}
        <nav className="flex-1 flex items-center justify-center" role="navigation" aria-label="Main navigation">
          <ul className="space-y-6 text-center">
            <li>
              <a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}`,
  },
  {
    id: 3,
    name: "Push Hamburger Menu",
    description: "Menu that pushes the main content aside",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function PushHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={\`transition-transform duration-300 \${isOpen ? 'translate-x-64' : 'translate-x-0'}\`}>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>

      {/* Push Menu */}
      <div
        className={\`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 transform transition-transform duration-300 \${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }\`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-bold text-foreground">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <nav className="p-4" role="navigation" aria-label="Main navigation">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                <span className="text-lg">🏠</span>
                Home
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                <span className="text-lg">ℹ️</span>
                About
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                <span className="text-lg">⚙️</span>
                Services
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                <span className="text-lg">📁</span>
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                <span className="text-lg">📧</span>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            Get Started
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}`,
  },
  {
    id: 4,
    name: "Accordion Hamburger Menu",
    description: "Menu with expandable accordion sections",
    style: "bold" as const,
    code: `import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function AccordionHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Accordion Menu */}
      <div
        className={\`fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 \${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }\`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-border bg-accent/50">
          <span className="text-lg font-bold text-foreground">Navigation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100%-64px)]" role="navigation" aria-label="Main navigation">
          <ul className="space-y-2">
            <li>
              <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                Home
              </a>
            </li>

            {/* Services Accordion */}
            <li>
              <button
                onClick={() => toggleSection('services')}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                aria-expanded={expandedSection === 'services'}
              >
                Services
                <ChevronDown className={\`h-4 w-4 transition-transform \${expandedSection === 'services' ? 'rotate-180' : ''}\`} />
              </button>
              {expandedSection === 'services' && (
                <ul className="ml-4 mt-2 space-y-1 border-l-2 border-border pl-4">
                  <li>
                    <a href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Mobile Apps
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      UI/UX Design
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Products Accordion */}
            <li>
              <button
                onClick={() => toggleSection('products')}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                aria-expanded={expandedSection === 'products'}
              >
                Products
                <ChevronDown className={\`h-4 w-4 transition-transform \${expandedSection === 'products' ? 'rotate-180' : ''}\`} />
              </button>
              {expandedSection === 'products' && (
                <ul className="ml-4 mt-2 space-y-1 border-l-2 border-border pl-4">
                  <li>
                    <a href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Analytics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Automation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Integration
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}`,
  }
]

// Convert to new template variation format
export function createHamburgerMenuPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = HAMBURGER_MENU_TEMPLATES.map((template) => ({
    id: `hamburger-menu-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Mobile Responsive', 'Animated Transitions', 'Accessibility', 'Touch Friendly'],
      useCases: ['Mobile Navigation', 'Responsive Menu', 'Side Navigation', 'App Menu'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Includes smooth slide/fade animations',
        'Supports keyboard navigation',
        'Proper ARIA labels for accessibility',
        'Touch-friendly for mobile devices'
      ]
    })
  }))

  return {
    id: 'hamburger-menu',
    name: 'Hamburger Menu',
    description: 'Mobile-friendly hamburger menu with various animation styles',
    category: 'navigation',
    variations,
    tags: ['hamburger', 'mobile', 'menu', 'navigation', 'responsive']
  }
}

// Export the hamburger menu panel
export const HAMBURGER_MENU_PANEL_WITH_VARIATIONS = createHamburgerMenuPanelWithVariations()
