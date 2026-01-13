// Navigation Menu templates with 4 variations
// Horizontal, Mega Menu, Dropdown, and Sticky navigation variations
// Implements keyboard navigation and ARIA labels
// Adds mobile-responsive behavior

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Navigation Menu template variations
const NAVIGATION_MENU_TEMPLATES = [
  {
    id: 1,
    name: "Horizontal Navigation",
    description: "Clean horizontal navigation with hover effects",
    style: "minimal" as const,
    code: `export default function HorizontalNavigation() {
  return (
    <nav className="w-full bg-background border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-8" role="menubar">
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              Home
            </a>
          </li>
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              About
            </a>
          </li>
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              Services
            </a>
          </li>
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              Portfolio
            </a>
          </li>
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              Blog
            </a>
          </li>
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
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
    name: "Mega Menu Navigation",
    description: "Advanced navigation with dropdown mega menu sections",
    style: "modern" as const,
    code: `import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function MegaMenuNavigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <nav className="w-full bg-background border-b border-border shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-8" role="menubar">
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              Home
            </a>
          </li>
          
          {/* Products Mega Menu */}
          <li 
            className="relative"
            role="none"
            onMouseEnter={() => setActiveMenu('products')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button 
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={activeMenu === 'products'}
              tabIndex={0}
            >
              Products
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {activeMenu === 'products' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-background border border-border rounded-lg shadow-lg p-6 z-50">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Web Development</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          Frontend Tools
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          Backend Services
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          API Management
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Mobile Apps</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          iOS Development
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          Android Development
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          Cross-Platform
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>
          
          {/* Solutions Mega Menu */}
          <li 
            className="relative"
            role="none"
            onMouseEnter={() => setActiveMenu('solutions')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button 
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={activeMenu === 'solutions'}
              tabIndex={0}
            >
              Solutions
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {activeMenu === 'solutions' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg p-6 z-50">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">By Industry</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          E-commerce
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          Healthcare
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          Education
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>
          
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              Pricing
            </a>
          </li>
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
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
    id: 3,
    name: "Dropdown Navigation",
    description: "Navigation with simple dropdown menus",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function DropdownNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  return (
    <nav className="w-full bg-background border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-6" role="menubar">
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              Home
            </a>
          </li>
          
          {/* Services Dropdown */}
          <li className="relative" role="none">
            <button 
              onClick={() => toggleDropdown('services')}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'services'}
              tabIndex={0}
            >
              Services
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {activeDropdown === 'services' && (
              <ul className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50" role="menu">
                <li role="none">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Web Development
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Mobile Apps
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    role="menuitem"
                    tabIndex={0}
                  >
                    UI/UX Design
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Consulting
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          {/* Company Dropdown */}
          <li className="relative" role="none">
            <button 
              onClick={() => toggleDropdown('company')}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'company'}
              tabIndex={0}
            >
              Company
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {activeDropdown === 'company' && (
              <ul className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50" role="menu">
                <li role="none">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    role="menuitem"
                    tabIndex={0}
                  >
                    About Us
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Our Team
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Careers
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    role="menuitem"
                    tabIndex={0}
                  >
                    News
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
              Portfolio
            </a>
          </li>
          <li role="none">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              role="menuitem"
              tabIndex={0}
            >
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
    name: "Sticky Navigation",
    description: "Navigation that sticks to top when scrolling with smooth animations",
    style: "bold" as const,
    code: `import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function StickyNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-background border-b border-border'
      }\`}
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="text-lg font-bold text-foreground">Brand</span>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6" role="menubar">
            <li role="none">
              <a 
                href="#" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
                role="menuitem"
                tabIndex={0}
              >
                Home
              </a>
            </li>
            <li role="none">
              <a 
                href="#" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
                role="menuitem"
                tabIndex={0}
              >
                About
              </a>
            </li>
            <li role="none">
              <a 
                href="#" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
                role="menuitem"
                tabIndex={0}
              >
                Services
              </a>
            </li>
            <li role="none">
              <a 
                href="#" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
                role="menuitem"
                tabIndex={0}
              >
                Portfolio
              </a>
            </li>
            <li role="none">
              <a 
                href="#" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
                role="menuitem"
                tabIndex={0}
              >
                Contact
              </a>
            </li>
          </ul>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium shadow-lg">
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <ul className="space-y-2 pt-4" role="menu">
              <li role="none">
                <a 
                  href="#" 
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  role="menuitem"
                  tabIndex={0}
                >
                  Home
                </a>
              </li>
              <li role="none">
                <a 
                  href="#" 
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  role="menuitem"
                  tabIndex={0}
                >
                  About
                </a>
              </li>
              <li role="none">
                <a 
                  href="#" 
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  role="menuitem"
                  tabIndex={0}
                >
                  Services
                </a>
              </li>
              <li role="none">
                <a 
                  href="#" 
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  role="menuitem"
                  tabIndex={0}
                >
                  Portfolio
                </a>
              </li>
              <li role="none">
                <a 
                  href="#" 
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  role="menuitem"
                  tabIndex={0}
                >
                  Contact
                </a>
              </li>
              <li role="none" className="pt-2">
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}`,
  }
]

// Convert to new template variation format
export function createNavigationMenuPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = NAVIGATION_MENU_TEMPLATES.map((template, index) => ({
    id: `navigation-menu-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Responsive Design', 'Keyboard Navigation', 'ARIA Labels', 'Mobile Menu', 'Hover Effects'],
      useCases: ['Main Navigation', 'Site Menu', 'Product Navigation', 'Service Menu'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons, ...COMMON_DEPENDENCIES.navigation],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Includes proper ARIA labels for accessibility',
        'Supports keyboard navigation',
        'Mobile-responsive with hamburger menu',
        'Smooth hover and focus transitions'
      ]
    })
  }))

  return {
    id: 'navigation-menu',
    name: 'Navigation Menu',
    description: 'Navigation menu with dropdown and mega menu options',
    category: 'navigation',
    variations,
    tags: ['navigation', 'menu', 'dropdown', 'responsive', 'accessible']
  }
}

// Export the converted navigation menu panel
export const NAVIGATION_MENU_PANEL_WITH_VARIATIONS = createNavigationMenuPanelWithVariations()