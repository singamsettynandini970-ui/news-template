"use client"

import { useState, useEffect } from "react"
import {
  Sparkles,
  Moon,
  Sun,
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Bell,
  Heart,
  Copy,
  Check,
  Globe,
  TrendingUp,
  X,
  Home,
  Package,
  Cpu,
  Smartphone,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  Loader2,
  MapPin,
  Grid,
  List,
  FolderTree,
  ExternalLink,
  Mic,
  Play,
  AlertCircle,
  Accessibility,
  Expand,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NewsTemplateLanding } from "./news-template-landing"
import type { ExtendedPanel } from "@/lib/template-registry"
import { TEMPLATE_REGISTRY } from "@/lib/template-data"

interface TemplatePreviewProps {
  selectedItem: string | null
}

// Helper function to find panel by name across all categories
function findPanelByName(name: string): ExtendedPanel | undefined {
  for (const category of TEMPLATE_REGISTRY.categories) {
    const panel = category.panels.find(p => p.name === name)
    if (panel) return panel
  }
  return undefined
}

const headerTemplates = [
  {
    id: 1,
    name: "Classic Centered Navigation",
    description: "Template 1: Classic Centered Navigation with Logo",
    code: `export default function ClassicHeader() {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-around gap-8">
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Services</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <span className="text-xl font-bold text-foreground">Brand</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Blog</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</a>
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
    code: `export default function ModernHeader() { /* ... */ }`,
  },
  {
    id: 3,
    name: "E-commerce Header",
    description: "Template 3: E-commerce Header with Search and Shopping Cart",
    code: `export default function EcommerceHeader() { /* ... */ }`,
  },
  {
    id: 4,
    name: "Minimalist Responsive",
    description: "Template 4: Minimalist Responsive Header with Mobile Menu",
    code: `export default function MinimalHeader() { /* ... */ }`,
  },
  {
    id: 5,
    name: "News Portal Header",
    description: "Template 5: News Portal Header with Multi-level Navigation",
    code: `export default function NewsHeader() { /* ... */ }`,
  },
]

export function TemplatePreview({ selectedItem }: TemplatePreviewProps) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [viewingCode, setViewingCode] = useState<string | null>(null)
  const [showCustomization, setShowCustomization] = useState(false)
  const [customization, setCustomization] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    accentColor: "#ec4899",
    fontFamily: "system",
  })

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    setSelectedTemplate(null)
  }, [selectedItem])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const copyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      } catch (fallbackErr) {
        console.error("Failed to copy code:", fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const generateCustomizedCode = (code: string): string => {
    let customizedCode = code
    
    // Replace color tokens with custom colors
    customizedCode = customizedCode.replace(
      /from-primary/g,
      `from-[${customization.primaryColor}]`
    )
    customizedCode = customizedCode.replace(
      /to-primary/g,
      `to-[${customization.primaryColor}]`
    )
    customizedCode = customizedCode.replace(
      /bg-primary/g,
      `bg-[${customization.primaryColor}]`
    )
    customizedCode = customizedCode.replace(
      /text-primary/g,
      `text-[${customization.primaryColor}]`
    )
    
    // Add font family if not system default
    if (customization.fontFamily !== "system") {
      const fontMap: Record<string, string> = {
        serif: "font-serif",
        mono: "font-mono",
        sans: "font-sans",
      }
      customizedCode = customizedCode.replace(
        /className="/g,
        `className="${fontMap[customization.fontFamily] || ""} `
      )
    }
    
    return customizedCode
  }

  // ============ BREADCRUMB LIVE PREVIEWS ============
  const BreadcrumbSimplePreview = () => (
    <nav aria-label="Breadcrumb" className="w-full py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li className="flex items-center">
          <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">Home</a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">Products</a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">Electronics</a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <span className="text-foreground font-medium">Smartphones</span>
        </li>
      </ol>
    </nav>
  )

  const BreadcrumbIconPreview = () => (
    <nav aria-label="Breadcrumb" className="w-full py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li className="flex items-center">
          <a href="#" className="flex items-center gap-1.5 text-foreground font-medium hover:text-primary px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
            <Home className="h-4 w-4" />Home
          </a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <a href="#" className="flex items-center gap-1.5 text-foreground font-medium hover:text-primary px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
            <Package className="h-4 w-4" />Products
          </a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <a href="#" className="flex items-center gap-1.5 text-foreground font-medium hover:text-primary px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
            <Cpu className="h-4 w-4" />Electronics
          </a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <span className="flex items-center gap-1.5 text-foreground font-medium bg-accent px-3 py-1.5 rounded-lg">
            <Smartphone className="h-4 w-4" />Smartphones
          </span>
        </li>
      </ol>
    </nav>
  )

  const BreadcrumbDropdownPreview = () => (
    <nav aria-label="Breadcrumb" className="w-full py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li className="flex items-center">
          <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">Home</a>
        </li>
        <li className="flex items-center relative">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <button className="flex items-center gap-1 px-2 py-1 text-foreground font-medium hover:text-primary hover:bg-accent rounded-md transition-colors">
            <MoreHorizontal className="h-4 w-4" />
            <ChevronDown className="h-3 w-3" />
          </button>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">Smartphones</a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-foreground mx-2" />
          <span className="text-foreground font-medium">iPhone 15 Pro</span>
        </li>
      </ol>
    </nav>
  )

  const BreadcrumbHierarchicalPreview = () => (
    <nav aria-label="Breadcrumb" className="w-full py-4">
      <div className="bg-accent/50 rounded-xl p-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          <li className="flex items-center">
            <a href="#" className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-lg hover:bg-accent transition-colors shadow-sm">
              <Home className="h-5 w-5 text-foreground" />
            </a>
          </li>
          <li className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 mx-1">
              <ChevronRight className="h-4 w-4 text-foreground" />
            </div>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-foreground font-medium hover:text-primary hover:border-primary/50 rounded-lg transition-colors shadow-sm">
              Products
            </a>
          </li>
          <li className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 mx-1">
              <ChevronRight className="h-4 w-4 text-foreground" />
            </div>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-foreground font-medium hover:text-primary hover:border-primary/50 rounded-lg transition-colors shadow-sm">
              Electronics
            </a>
          </li>
          <li className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 mx-1">
              <ChevronRight className="h-4 w-4 text-foreground" />
            </div>
            <span className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg shadow-sm">
              Smartphones
            </span>
          </li>
        </ol>
      </div>
    </nav>
  )
  // ============ HAMBURGER MENU LIVE PREVIEWS ============
  const HamburgerSlidePreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Slide Menu</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-bold text-foreground">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">About</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Services</a>
          </nav>
        </div>
      </div>
    )
  }

  const HamburgerOverlayPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Full-Screen Overlay</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="text-xl font-bold text-foreground">Menu</span>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>
            <nav className="flex-1 flex items-center justify-center">
              <ul className="space-y-6 text-center">
                <li><a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">Services</a></li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    )
  }

  const HamburgerPushPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Click to push content aside</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-bold text-foreground">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">About</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Services</a>
          </nav>
        </div>
      </div>
    )
  }

  const HamburgerAccordionPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [expandedSection, setExpandedSection] = useState<string | null>(null)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Accordion Menu</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-border bg-accent/50">
            <span className="text-lg font-bold text-foreground">Navigation</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <button onClick={() => setExpandedSection(expandedSection === 'services' ? null : 'services')} className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'services' && (
              <ul className="ml-4 space-y-1 border-l-2 border-border pl-4">
                <li><a href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Web Dev</a></li>
                <li><a href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Mobile</a></li>
              </ul>
            )}
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">About</a>
          </nav>
        </div>
      </div>
    )
  }

  // ============ PAGINATION LIVE PREVIEWS ============
  const PaginationNumbersPreview = () => (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 p-4">
      <button className="p-2 rounded-lg hover:bg-accent transition-colors">
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">1</button>
      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">2</button>
      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground transition-colors">3</button>
      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">4</button>
      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">5</button>
      <span className="px-2 text-muted-foreground">...</span>
      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">10</button>
      <button className="p-2 rounded-lg hover:bg-accent transition-colors">
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>
    </nav>
  )

  const PaginationArrowsPreview = () => (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4 p-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors group">
        <ArrowLeft className="h-4 w-4 text-foreground group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium text-foreground">Previous</span>
      </button>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Page</span>
        <span className="px-3 py-1 bg-accent rounded-lg text-sm font-medium text-foreground">3</span>
        <span className="text-sm text-muted-foreground">of 10</span>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors group">
        <span className="text-sm font-medium">Next</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </nav>
  )

  const PaginationLoadMorePreview = () => (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">20</span> of{' '}
          <span className="font-medium text-foreground">100</span> items
        </p>
      </div>
      <div className="w-full max-w-xs h-2 bg-accent rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: '20%' }} />
      </div>
      <button className="flex items-center gap-2 px-6 py-3 bg-background border border-border rounded-lg hover:bg-accent transition-colors">
        <span className="text-sm font-medium">Load More</span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  )

  const PaginationInfiniteScrollPreview = () => (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">20 of 100 loaded</span>
          <span className="text-sm font-medium text-foreground">20%</span>
        </div>
        <div className="h-1.5 bg-accent rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500" style={{ width: '20%' }} />
        </div>
      </div>
      <div className="flex items-center gap-3 px-6 py-3 bg-accent/50 rounded-xl">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm font-medium text-foreground">Loading more items...</span>
      </div>
    </div>
  )

  // ============ FOOTER LIVE PREVIEWS ============
  const FooterSimplePreview = () => (
    <footer className="w-full bg-background border-t border-border">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="text-lg font-bold text-foreground">Brand</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )

  const FooterMultiColumnPreview = () => (
    <footer className="w-full bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-sm font-bold text-white">B</span>
              </div>
              <span className="text-lg font-bold text-foreground">Brand</span>
            </div>
            <p className="text-sm text-muted-foreground">Building amazing products for the modern web.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
            </nav>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )

  const FooterNewsletterPreview = () => (
    <footer className="w-full bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-2xl font-bold text-foreground">Stay Updated</h3>
          <p className="text-muted-foreground max-w-md mx-auto">Get the latest updates delivered to your inbox weekly.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">Subscribe</button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )

  const FooterSocialPreview = () => (
    <footer className="w-full bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">B</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Brand</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Join our community of creators and innovators.</p>
          <div className="flex items-center justify-center gap-4">
            <button className="p-3 rounded-xl bg-accent hover:bg-accent/80 transition-colors"><Globe className="h-6 w-6 text-muted-foreground" /></button>
            <button className="p-3 rounded-xl bg-accent hover:bg-accent/80 transition-colors"><Globe className="h-6 w-6 text-muted-foreground" /></button>
            <button className="p-3 rounded-xl bg-accent hover:bg-accent/80 transition-colors"><Globe className="h-6 w-6 text-muted-foreground" /></button>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Brand. Made with ❤️ for the community.</p>
        </div>
      </div>
    </footer>
  )

  // ============ MOBILE NAVIGATION LIVE PREVIEWS ============
  const MobileNavigationBottomTabPreview = () => (
    <nav className="flex items-center justify-around p-4 border-t border-border bg-background">
      <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors">
        <Home className="h-6 w-6 text-primary" />
        <span className="text-xs text-foreground font-medium">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors">
        <Search className="h-6 w-6 text-foreground" />
        <span className="text-xs text-foreground font-medium">Search</span>
      </button>
      <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors">
        <Heart className="h-6 w-6 text-foreground" />
        <span className="text-xs text-foreground font-medium">Saved</span>
      </button>
      <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors">
        <User className="h-6 w-6 text-foreground" />
        <span className="text-xs text-foreground font-medium">Profile</span>
      </button>
    </nav>
  )

  const MobileNavigationDrawerPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Swipe from left to open drawer</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-bold text-foreground">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">About</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Services</a>
          </nav>
        </div>
      </div>
    )
  }

  const MobileNavigationFullScreenPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Click to open full-screen menu</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="text-xl font-bold text-foreground">Menu</span>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>
            <nav className="flex-1 flex items-center justify-center">
              <ul className="space-y-6 text-center">
                <li><a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-3xl font-bold text-foreground hover:text-primary transition-colors">Services</a></li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    )
  }

  const MobileNavigationFloatingPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center justify-center p-8">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed bottom-8 right-8 bg-background border border-border rounded-lg shadow-lg z-50 transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <nav className="p-4 space-y-2 w-48">
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">About</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Services</a>
          </nav>
        </div>
      </div>
    )
  }

  // ============ SKIP LINKS LIVE PREVIEWS ============
  const SkipLinksBasicPreview = () => (
    <div className="p-4 space-y-2">
      <a href="#main" className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        Skip to main content
      </a>
      <a href="#nav" className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        Skip to navigation
      </a>
    </div>
  )

  const SkipLinksEnhancedPreview = () => (
    <div className="p-4 space-y-2">
      <a href="#main" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        <span>⬇️</span>
        Skip to main content
      </a>
      <a href="#nav" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        <span>📋</span>
        Skip to navigation
      </a>
      <a href="#search" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        <span>🔍</span>
        Skip to search
      </a>
    </div>
  )

  const SkipLinksKeyboardPreview = () => (
    <div className="p-4 space-y-2">
      <div className="px-4 py-2 bg-accent rounded-lg text-sm text-muted-foreground">
        Press <kbd className="px-2 py-1 bg-background border border-border rounded">Tab</kbd> to navigate skip links
      </div>
      <a href="#main" className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        Skip to main content
      </a>
    </div>
  )

  const SkipLinksScreenReaderPreview = () => (
    <div className="p-4 space-y-2">
      <div className="px-4 py-2 bg-accent rounded-lg text-sm text-muted-foreground">
        Screen reader optimized skip links
      </div>
      <a href="#main" className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors sr-only focus:not-sr-only">
        Skip to main content
      </a>
    </div>
  )

  // ============ SITE MAP LIVE PREVIEWS ============
  const SiteMapTreePreview = () => (
    <div className="p-4 space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <span>📄</span>
        <a href="#" className="text-primary hover:underline font-medium">Home</a>
      </div>
      <div className="ml-4 space-y-2 border-l border-border pl-4">
        <div className="flex items-center gap-2">
          <span>📁</span>
          <a href="#" className="text-primary hover:underline font-medium">Products</a>
        </div>
        <div className="ml-4 space-y-2 border-l border-border pl-4">
          <div className="flex items-center gap-2">
            <span>📄</span>
            <a href="#" className="text-primary hover:underline font-medium">Electronics</a>
          </div>
          <div className="flex items-center gap-2">
            <span>📄</span>
            <a href="#" className="text-primary hover:underline font-medium">Clothing</a>
          </div>
        </div>
      </div>
    </div>
  )

  const SiteMapGridPreview = () => (
    <div className="p-4 grid grid-cols-2 gap-4 text-sm">
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Products</h3>
        <a href="#" className="block text-primary hover:underline font-medium">Electronics</a>
        <a href="#" className="block text-primary hover:underline font-medium">Clothing</a>
        <a href="#" className="block text-primary hover:underline font-medium">Books</a>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Company</h3>
        <a href="#" className="block text-primary hover:underline font-medium">About</a>
        <a href="#" className="block text-primary hover:underline font-medium">Contact</a>
        <a href="#" className="block text-primary hover:underline font-medium">Careers</a>
      </div>
    </div>
  )

  const SiteMapAccordionPreview = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null)
    return (
      <div className="p-4 space-y-2 text-sm">
        <button onClick={() => setExpandedSection(expandedSection === 'products' ? null : 'products')} className="w-full flex items-center justify-between px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
          <span className="font-medium text-foreground">Products</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'products' ? 'rotate-180' : ''}`} />
        </button>
        {expandedSection === 'products' && (
          <div className="ml-4 space-y-1 border-l border-border pl-4">
            <a href="#" className="block text-primary hover:underline font-medium">Electronics</a>
            <a href="#" className="block text-primary hover:underline font-medium">Clothing</a>
          </div>
        )}
        <button onClick={() => setExpandedSection(expandedSection === 'company' ? null : 'company')} className="w-full flex items-center justify-between px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
          <span className="font-medium text-foreground">Company</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'company' ? 'rotate-180' : ''}`} />
        </button>
        {expandedSection === 'company' && (
          <div className="ml-4 space-y-1 border-l border-border pl-4">
            <a href="#" className="block text-primary hover:underline font-medium">About</a>
            <a href="#" className="block text-primary hover:underline font-medium">Contact</a>
          </div>
        )}
        <button onClick={() => setExpandedSection(expandedSection === 'support' ? null : 'support')} className="w-full flex items-center justify-between px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
          <span className="font-medium text-foreground">Support</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'support' ? 'rotate-180' : ''}`} />
        </button>
        {expandedSection === 'support' && (
          <div className="ml-4 space-y-1 border-l border-border pl-4">
            <a href="#" className="block text-primary hover:underline font-medium">Help</a>
            <a href="#" className="block text-primary hover:underline font-medium">FAQ</a>
          </div>
        )}
      </div>
    )
  }

  const SiteMapSearchPreview = () => (
    <div className="p-4 space-y-4">
      <div className="relative">
        <input type="text" placeholder="Search site..." className="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-2 text-sm">
        <a href="#" className="block text-primary hover:underline">Products</a>
        <a href="#" className="block text-primary hover:underline">About Us</a>
        <a href="#" className="block text-primary hover:underline">Contact</a>
      </div>
    </div>
  )

  // ============ NAVIGATION DRAWER LIVE PREVIEWS ============
  const NavigationDrawerLeftPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Click to open left drawer</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-bold text-foreground">Navigation</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Products</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Services</a>
          </nav>
        </div>
      </div>
    )
  }

  const NavigationDrawerRightPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center justify-end gap-4 p-4">
          <span className="text-sm text-foreground font-medium">Click to open right drawer</span>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed top-0 right-0 h-full w-72 bg-background border-l border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
            <span className="text-lg font-bold text-foreground">Navigation</span>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Products</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Services</a>
          </nav>
        </div>
      </div>
    )
  }

  const NavigationDrawerOverlayPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Click to open overlay drawer</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-border bg-accent/50">
            <span className="text-lg font-bold text-foreground">Navigation</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Products</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Services</a>
          </nav>
        </div>
      </div>
    )
  }

  const NavigationDrawerPushPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <span className="text-sm text-foreground font-medium">Click to push drawer</span>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-bold text-foreground">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Home</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Products</a>
            <a href="#" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Services</a>
          </nav>
        </div>
      </div>
    )
  }

  // ============ MEGA MENU LIVE PREVIEWS ============
  const MegaMenuGridPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="p-4 space-y-2">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent rounded-lg transition-colors font-medium">
            Products <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-accent rounded-lg text-sm">
              <a href="#" className="text-primary hover:underline font-medium">Electronics</a>
              <a href="#" className="text-primary hover:underline font-medium">Clothing</a>
              <a href="#" className="text-primary hover:underline font-medium">Books</a>
            </div>
          )}
        </div>
      </div>
    )
  }

  const MegaMenuListPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="p-4 space-y-2">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent rounded-lg transition-colors font-medium">
            Products <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="p-4 bg-accent rounded-lg space-y-2 text-sm">
              <a href="#" className="block text-primary hover:underline font-medium">Electronics</a>
              <a href="#" className="block text-primary hover:underline font-medium">Clothing</a>
              <a href="#" className="block text-primary hover:underline font-medium">Books</a>
            </div>
          )}
        </div>
      </div>
    )
  }

  const MegaMenuImagePreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="p-4 space-y-2">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent rounded-lg transition-colors font-medium">
            Products <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-accent rounded-lg">
              <div className="h-24 bg-background rounded-lg flex items-center justify-center text-sm text-foreground font-medium">Product Image</div>
              <div className="h-24 bg-background rounded-lg flex items-center justify-center text-sm text-foreground font-medium">Product Image</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const MegaMenuCategoryPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <div className="p-4 space-y-2">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent rounded-lg transition-colors font-medium">
            Products <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="p-4 bg-accent rounded-lg space-y-3 text-sm">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Electronics</h4>
                <a href="#" className="block text-primary hover:underline font-medium">Phones</a>
                <a href="#" className="block text-primary hover:underline font-medium">Laptops</a>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Clothing</h4>
                <a href="#" className="block text-primary hover:underline font-medium">Men</a>
                <a href="#" className="block text-primary hover:underline font-medium">Women</a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ============ TOP NAVIGATION BAR LIVE PREVIEWS ============
  const TopNavSimplePreview = () => (
    <nav className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Services</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Sign In</button>
        <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Get Started</button>
      </div>
    </nav>
  )

  const TopNavPromotionalPreview = () => (
    <div className="space-y-2">
      <div className="bg-primary/10 px-4 py-2 text-center text-sm text-primary font-medium">
        🎉 Special offer: 50% off this week only!
      </div>
      <nav className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Products</a>
        </div>
      </nav>
    </div>
  )

  const TopNavUtilityPreview = () => (
    <nav className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Search className="h-5 w-5" /></button>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Globe className="h-5 w-5" /></button>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Bell className="h-5 w-5" /></button>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><User className="h-5 w-5" /></button>
      </div>
    </nav>
  )

  const TopNavSocialPreview = () => (
    <nav className="flex items-center justify-between p-4 border-b border-border">
      <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Globe className="h-5 w-5" /></button>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Globe className="h-5 w-5" /></button>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Globe className="h-5 w-5" /></button>
      </div>
    </nav>
  )

  // ============ SEARCH PANEL LIVE PREVIEWS ============
  const SearchSimplePreview = () => (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )

  const SearchAdvancedPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <button className="px-3 py-1 text-xs bg-accent text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">Category</button>
        <button className="px-3 py-1 text-xs bg-accent text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">Date</button>
        <button className="px-3 py-1 text-xs bg-accent text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">Price</button>
      </div>
    </div>
  )

  const SearchAutocompletePreview = () => (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 border border-border rounded-lg bg-background overflow-hidden">
        <div className="px-4 py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer text-sm transition-colors">Search result 1</div>
        <div className="px-4 py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer text-sm transition-colors">Search result 2</div>
        <div className="px-4 py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer text-sm transition-colors">Search result 3</div>
      </div>
    </div>
  )

  const SearchVoicePreview = () => (
    <div className="w-full max-w-md">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Mic className="h-4 w-4" />
        </button>
      </div>
    </div>
  )

  // ============ LOGIN PANEL LIVE PREVIEWS ============
  const LoginModalPreview = () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sign In</h3>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Email</label>
        <input type="email" placeholder="your@email.com" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Password</label>
        <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Sign In</button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
        <div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground">Or continue with</span></div>
      </div>
      <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium">Google</button>
    </div>
  )

  const LoginPagePreview = () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mt-2">Sign in to your account</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <input type="email" placeholder="your@email.com" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">Sign In</button>
      </div>
    </div>
  )

  const LoginSocialPreview = () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">Sign In</h3>
      </div>
      <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium flex items-center justify-center gap-2">
        <Globe className="h-4 w-4" /> Google
      </button>
      <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium flex items-center justify-center gap-2">
        <Globe className="h-4 w-4" /> Facebook
      </button>
      <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium flex items-center justify-center gap-2">
        <Globe className="h-4 w-4" /> GitHub
      </button>
    </div>
  )

  const LoginTwoFactorPreview = () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">Verify Your Identity</h3>
        <p className="text-xs text-muted-foreground mt-1">Enter the code from your authenticator app</p>
      </div>
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <input key={i} type="text" maxLength={1} className="w-10 h-10 border border-border rounded-lg bg-background text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        ))}
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Verify</button>
    </div>
  )

  // ============ HERO SECTION LIVE PREVIEWS ============
  const HeroImagePreview = () => (
    <div className="w-full h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Welcome to Our Site</h1>
        <p className="text-muted-foreground">Discover amazing content</p>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Get Started</button>
      </div>
    </div>
  )

  const HeroVideoPreview = () => (
    <div className="w-full h-48 bg-gradient-to-b from-primary/30 to-accent/30 rounded-lg flex items-center justify-center">
      <div className="text-center space-y-4">
        <Play className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-2xl font-bold text-foreground">Watch Our Story</h1>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Play Video</button>
      </div>
    </div>
  )

  const HeroGradientPreview = () => (
    <div className="w-full h-48 bg-gradient-to-r from-primary via-accent to-primary rounded-lg flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary-foreground">Build Amazing Things</h1>
        <p className="text-primary-foreground/80">Start your journey today</p>
        <button className="px-6 py-2 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors">Learn More</button>
      </div>
    </div>
  )

  const HeroSplitPreview = () => (
    <div className="w-full h-48 flex rounded-lg overflow-hidden">
      <div className="flex-1 bg-gradient-to-r from-primary/20 to-transparent flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Left Content</h1>
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-l from-accent/20 to-transparent flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Right Content</h1>
        </div>
      </div>
    </div>
  )

  // ============ CARD LAYOUT LIVE PREVIEWS ============
  const CardBasicPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground">Card Title</h3>
        <p className="text-sm text-muted-foreground">This is a basic card with simple content and styling.</p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Learn More</button>
      </div>
    </div>
  )

  const CardImagePreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-32 bg-gradient-to-br from-primary/30 to-accent/30"></div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground">Card with Image</h3>
        <p className="text-sm text-muted-foreground">Featured image at the top</p>
      </div>
    </div>
  )

  const CardActionPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground">Interactive Card</h3>
        <p className="text-sm text-muted-foreground">Card with action buttons</p>
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Accept</button>
          <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Decline</button>
        </div>
      </div>
    </div>
  )

  const CardHoverPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all group cursor-pointer">
      <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/40 group-hover:to-accent/40 transition-colors"></div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Hover Card</h3>
        <p className="text-sm text-muted-foreground">Hover to see effects</p>
      </div>
    </div>
  )

  // ============ MODAL DIALOG LIVE PREVIEWS ============
  const ModalBasicPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Modal Title</h2>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">This is a basic modal dialog with content.</p>
      </div>
      <div className="p-4 border-t border-border flex gap-2 justify-end">
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Cancel</button>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Confirm</button>
      </div>
    </div>
  )

  const ModalFormPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Create New Item</h2>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Name</label>
          <input type="text" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Description</label>
          <textarea rows={3} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"></textarea>
        </div>
      </div>
      <div className="p-4 border-t border-border flex gap-2 justify-end">
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Cancel</button>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Create</button>
      </div>
    </div>
  )

  const ModalConfirmationPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card overflow-hidden">
      <div className="p-4 text-center space-y-3">
        <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
        <h2 className="font-semibold text-foreground">Confirm Action</h2>
        <p className="text-sm text-muted-foreground">Are you sure you want to proceed?</p>
      </div>
      <div className="p-4 border-t border-border flex gap-2 justify-end">
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Cancel</button>
        <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm">Delete</button>
      </div>
    </div>
  )

  const ModalFullScreenPreview = () => (
    <div className="w-full h-48 border border-border rounded-lg bg-card overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Full Screen Modal</h2>
        <X className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <p className="text-sm text-muted-foreground">Full screen modal content goes here</p>
      </div>
    </div>
  )

  // ============ CONTACT FORM LIVE PREVIEWS ============
  const ContactFormSimplePreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Name</label>
        <input type="text" placeholder="Your name" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Email</label>
        <input type="email" placeholder="your@email.com" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Message</label>
        <textarea rows={3} placeholder="Your message..." className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"></textarea>
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Send Message</button>
    </div>
  )

  const ContactFormMultiStepPreview = () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-1">
        <div className="flex-1 h-1 bg-primary rounded-full"></div>
        <div className="flex-1 h-1 bg-border rounded-full"></div>
        <div className="flex-1 h-1 bg-border rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Name</label>
          <input type="text" placeholder="Your name" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Email</label>
          <input type="email" placeholder="your@email.com" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Back</button>
        <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Next</button>
      </div>
    </div>
  )

  const ContactFormFloatingPreview = () => (
    <div className="w-full max-w-md space-y-4">
      <div className="relative">
        <input type="text" placeholder=" " className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary peer text-sm" />
        <label className="absolute left-3 top-2 text-xs text-muted-foreground bg-background px-1 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary transition-all">Name</label>
      </div>
      <div className="relative">
        <input type="email" placeholder=" " className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary peer text-sm" />
        <label className="absolute left-3 top-2 text-xs text-muted-foreground bg-background px-1 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary transition-all">Email</label>
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Send</button>
    </div>
  )

  const ContactFormInlinePreview = () => (
    <div className="w-full max-w-md space-y-2">
      <div className="flex gap-2">
        <input type="email" placeholder="your@email.com" className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Send</button>
      </div>
      <textarea rows={2} placeholder="Your message..." className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"></textarea>
    </div>
  )

  // ============ LANGUAGE SELECTOR LIVE PREVIEWS ============
  const LanguageSelectorDropdownPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="w-full max-w-xs">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors flex items-center justify-between text-sm">
          <span>English</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-48 border border-border rounded-lg bg-card shadow-lg z-10">
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">English</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Spanish</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">French</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">German</button>
          </div>
        )}
      </div>
    )
  }

  const LanguageSelectorFlagPreview = () => (
    <div className="w-full max-w-xs flex gap-2">
      <button className="px-3 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">🇺🇸 EN</button>
      <button className="px-3 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">🇪🇸 ES</button>
      <button className="px-3 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">🇫🇷 FR</button>
      <button className="px-3 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">🇩🇪 DE</button>
    </div>
  )

  const LanguageSelectorModalPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Select Language</button>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-sm w-full mx-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">Choose Language</h2>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">English</button>
                <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">Spanish</button>
                <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">French</button>
                <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">German</button>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-full mt-4 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors text-sm">Close</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const LanguageSelectorInlinePreview = () => (
    <div className="w-full max-w-xs flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Language:</span>
      <button className="px-3 py-1 text-xs bg-accent text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">EN</button>
      <button className="px-3 py-1 text-xs bg-accent text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">ES</button>
      <button className="px-3 py-1 text-xs bg-accent text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">FR</button>
    </div>
  )

  // ============ LOCATION SELECTOR LIVE PREVIEWS ============
  const LocationSelectorMapPreview = () => (
    <div className="w-full max-w-md h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-border">
      <div className="text-center">
        <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
        <p className="text-sm text-foreground">Select location on map</p>
      </div>
    </div>
  )

  const LocationSelectorDropdownPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="w-full max-w-xs">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors flex items-center justify-between text-sm">
          <span>New York</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-48 border border-border rounded-lg bg-card shadow-lg z-10">
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">New York</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Los Angeles</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Chicago</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Houston</button>
          </div>
        )}
      </div>
    )
  }

  const LocationSelectorAutocompletePreview = () => (
    <div className="w-full max-w-md">
      <input type="text" placeholder="Search location..." className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      <div className="mt-2 border border-border rounded-lg bg-background overflow-hidden">
        <div className="px-4 py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer text-sm transition-colors">New York, USA</div>
        <div className="px-4 py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer text-sm transition-colors">New Delhi, India</div>
        <div className="px-4 py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer text-sm transition-colors">Newcastle, UK</div>
      </div>
    </div>
  )

  const LocationSelectorGeolocationPreview = () => (
    <div className="w-full max-w-xs space-y-3">
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm">
        <MapPin className="h-4 w-4" />
        Use My Location
      </button>
      <div className="p-3 bg-accent/50 rounded-lg text-sm text-foreground">
        📍 Current: San Francisco, CA
      </div>
    </div>
  )

  // ============ NOTIFICATION PANEL LIVE PREVIEWS ============
  const NotificationPanelToastPreview = () => (
    <div className="w-full max-w-md space-y-2">
      <div className="p-3 bg-accent text-accent-foreground rounded-lg text-sm flex items-center justify-between">
        <span>✓ Operation completed successfully</span>
        <X className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
      </div>
      <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm flex items-center justify-between">
        <span>✕ An error occurred</span>
        <X className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
      </div>
    </div>
  )

  const NotificationPanelBannerPreview = () => (
    <div className="w-full space-y-2">
      <div className="p-4 bg-primary/10 border-l-4 border-primary text-foreground text-sm">
        📢 New update available. Please refresh to get the latest version.
      </div>
      <div className="p-4 bg-accent/10 border-l-4 border-accent text-foreground text-sm">
        ℹ️ Maintenance scheduled for tonight at 2 AM.
      </div>
    </div>
  )

  const NotificationPanelDropdownPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="w-full max-w-xs">
        <button onClick={() => setIsOpen(!isOpen)} className="relative px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-64 border border-border rounded-lg bg-card shadow-lg z-10">
            <div className="p-3 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="p-3 border-b border-border hover:bg-accent transition-colors cursor-pointer">
                <p className="text-sm text-foreground">New message from John</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="p-3 border-b border-border hover:bg-accent transition-colors cursor-pointer">
                <p className="text-sm text-foreground">Your order shipped</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const NotificationPanelSidebarPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <h3 className="font-semibold text-foreground">Notifications</h3>
      </div>
      <div className="space-y-2 p-4">
        <div className="p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
          <p className="text-sm font-medium text-foreground">New message</p>
          <p className="text-xs text-muted-foreground">Just now</p>
        </div>
        <div className="p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
          <p className="text-sm font-medium text-foreground">Update available</p>
          <p className="text-xs text-muted-foreground">5 minutes ago</p>
        </div>
      </div>
    </div>
  )

  // ============ USER ACCOUNT LIVE PREVIEWS ============
  const UserAccountDropdownPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="w-full max-w-xs">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            John Doe
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-48 border border-border rounded-lg bg-card shadow-lg z-10">
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Profile</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Settings</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Sign Out</button>
          </div>
        )}
      </div>
    )
  }

  const UserAccountProfileCardPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card p-4 text-center">
      <div className="h-16 w-16 rounded-full bg-primary mx-auto mb-3"></div>
      <h3 className="font-semibold text-foreground">John Doe</h3>
      <p className="text-xs text-muted-foreground">john@example.com</p>
      <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Edit Profile</button>
    </div>
  )

  const UserAccountSettingsPreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
        <span className="text-sm text-foreground">Email Notifications</span>
        <input type="checkbox" defaultChecked className="h-4 w-4" />
      </div>
      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
        <span className="text-sm text-foreground">Dark Mode</span>
        <input type="checkbox" className="h-4 w-4" />
      </div>
      <button className="w-full px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors text-sm">Change Password</button>
    </div>
  )

  const UserAccountDashboardPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card overflow-hidden">
      <div className="p-4 bg-primary/10 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary"></div>
          <div>
            <h3 className="font-semibold text-foreground">John Doe</h3>
            <p className="text-xs text-muted-foreground">Premium Member</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent rounded-lg transition-colors">My Orders</button>
        <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent rounded-lg transition-colors">Saved Items</button>
        <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent rounded-lg transition-colors">Account Settings</button>
      </div>
    </div>
  )

  // ============ THEME SWITCHER LIVE PREVIEWS ============
  const ThemeSwitcherTogglePreview = () => (
    <div className="w-full max-w-xs flex items-center gap-3">
      <Sun className="h-4 w-4 text-foreground" />
      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-accent">
        <span className="inline-block h-4 w-4 transform rounded-full bg-background ml-1 transition-transform"></span>
      </button>
      <Moon className="h-4 w-4 text-foreground" />
    </div>
  )

  const ThemeSwitcherDropdownPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="w-full max-w-xs">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors flex items-center justify-between text-sm">
          <span>Light</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-48 border border-border rounded-lg bg-card shadow-lg z-10">
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2">
              <Sun className="h-4 w-4" /> Light
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2">
              <Moon className="h-4 w-4" /> Dark
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2">
              <Smartphone className="h-4 w-4" /> Auto
            </button>
          </div>
        )}
      </div>
    )
  }

  const ThemeSwitcherSliderPreview = () => (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Theme</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-lg">Light</button>
          <button className="px-3 py-1 text-xs border border-border text-foreground rounded-lg hover:bg-accent transition-colors">Dark</button>
        </div>
      </div>
      <input type="range" min="0" max="100" className="w-full" />
    </div>
  )

  const ThemeSwitcherAutoPreview = () => (
    <div className="w-full max-w-xs p-4 border border-border rounded-lg bg-accent/50">
      <div className="flex items-center gap-2 mb-2">
        <Smartphone className="h-4 w-4 text-foreground" />
        <span className="text-sm font-medium text-foreground">Auto Theme</span>
      </div>
      <p className="text-xs text-muted-foreground">Automatically switch based on system settings</p>
    </div>
  )

  // ============ ACCESSIBILITY CONTROLS LIVE PREVIEWS ============
  const AccessibilityControlsToolbarPreview = () => (
    <div className="w-full max-w-md flex gap-2 p-3 border border-border rounded-lg bg-accent/50">
      <button className="px-3 py-2 text-xs bg-background border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">A+</button>
      <button className="px-3 py-2 text-xs bg-background border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">A-</button>
      <button className="px-3 py-2 text-xs bg-background border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">High Contrast</button>
      <button className="px-3 py-2 text-xs bg-background border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Dyslexia Font</button>
    </div>
  )

  const AccessibilityControlsMenuPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="w-full max-w-xs">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors flex items-center justify-between text-sm">
          <span>Accessibility</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-48 border border-border rounded-lg bg-card shadow-lg z-10">
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Increase Font Size</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">High Contrast Mode</button>
            <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Dyslexia-Friendly Font</button>
          </div>
        )}
      </div>
    )
  }

  const AccessibilityControlsFloatingPreview = () => (
    <div className="fixed bottom-4 right-4 p-3 border border-border rounded-lg bg-card shadow-lg">
      <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        <Accessibility className="h-5 w-5" />
      </button>
    </div>
  )

  const AccessibilityControlsInlinePreview = () => (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center justify-between p-2 border border-border rounded-lg">
        <span className="text-sm text-foreground">Font Size</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 text-xs border border-border rounded hover:bg-primary hover:text-primary-foreground transition-colors">-</button>
          <button className="px-2 py-1 text-xs border border-border rounded hover:bg-primary hover:text-primary-foreground transition-colors">+</button>
        </div>
      </div>
      <div className="flex items-center justify-between p-2 border border-border rounded-lg">
        <span className="text-sm text-foreground">High Contrast</span>
        <input type="checkbox" className="h-4 w-4" />
      </div>
    </div>
  )

  // ============ HEADER PANEL LIVE PREVIEWS ============
  const HeaderClassicPreview = () => (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary"></div>
          <span className="font-bold text-foreground">Brand</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">About</a>
          <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">Services</a>
        </nav>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Sign In</button>
      </div>
    </header>
  )

  const HeaderModernPreview = () => (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-lg text-foreground">Brand</span>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Search className="h-5 w-5 text-foreground" /></button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Bell className="h-5 w-5 text-foreground" /></button>
          </div>
          <button className="p-2 rounded-lg hover:bg-accent transition-colors"><User className="h-5 w-5 text-foreground" /></button>
        </div>
      </div>
    </header>
  )

  const HeaderMinimalPreview = () => (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-foreground">Brand</span>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">Docs</a>
          <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  )

  const HeaderPromoPreview = () => (
    <div className="w-full space-y-0">
      <div className="bg-primary/10 px-6 py-2 text-center text-xs text-primary font-medium">
        🎉 Limited time offer: Get 50% off today!
      </div>
      <header className="w-full bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-foreground">Brand</span>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Shop Now</button>
        </div>
      </header>
    </div>
  )

  // ============ NAVIGATION MENU LIVE PREVIEWS ============
  const NavigationMenuHorizontalPreview = () => (
    <nav className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center gap-8">
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Products</a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Services</a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</a>
      </div>
    </nav>
  )

  const NavigationMenuVerticalPreview = () => (
    <nav className="w-full max-w-xs bg-background border border-border rounded-lg p-4 space-y-2">
      <a href="#" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">Home</a>
      <a href="#" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">Products</a>
      <a href="#" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">Services</a>
      <a href="#" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">About</a>
    </nav>
  )

  const NavigationMenuTabsPreview = () => (
    <div className="w-full border-b border-border">
      <div className="flex gap-1 px-6 py-3">
        <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-t-lg">Home</button>
        <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-t-lg transition-colors">Products</button>
        <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-t-lg transition-colors">Services</button>
      </div>
    </div>
  )

  const NavigationMenuBreadcrumbPreview = () => (
    <nav className="w-full px-6 py-3 text-sm">
      <ol className="flex items-center gap-2">
        <li><a href="#" className="text-foreground hover:text-primary transition-colors">Home</a></li>
        <li className="text-muted-foreground">/</li>
        <li><a href="#" className="text-foreground hover:text-primary transition-colors">Products</a></li>
        <li className="text-muted-foreground">/</li>
        <li className="text-foreground">Electronics</li>
      </ol>
    </nav>
  )

  // ============ LIST DISPLAY LIVE PREVIEWS ============
  const ListDisplaySimplePreview = () => (
    <div className="w-full max-w-md space-y-2">
      <div className="p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
        <p className="text-sm font-medium text-foreground">Item 1</p>
        <p className="text-xs text-muted-foreground">Description for item 1</p>
      </div>
      <div className="p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
        <p className="text-sm font-medium text-foreground">Item 2</p>
        <p className="text-xs text-muted-foreground">Description for item 2</p>
      </div>
      <div className="p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
        <p className="text-sm font-medium text-foreground">Item 3</p>
        <p className="text-xs text-muted-foreground">Description for item 3</p>
      </div>
    </div>
  )

  const ListDisplayBulletPreview = () => (
    <div className="w-full max-w-md space-y-2">
      <ul className="space-y-2">
        <li className="flex items-start gap-3">
          <span className="text-primary font-bold">•</span>
          <span className="text-sm text-foreground">First item in the list</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-primary font-bold">•</span>
          <span className="text-sm text-foreground">Second item in the list</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-primary font-bold">•</span>
          <span className="text-sm text-foreground">Third item in the list</span>
        </li>
      </ul>
    </div>
  )

  const ListDisplayNumberedPreview = () => (
    <div className="w-full max-w-md space-y-2">
      <ol className="space-y-2">
        <li className="flex items-start gap-3">
          <span className="text-primary font-bold">1.</span>
          <span className="text-sm text-foreground">First step</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-primary font-bold">2.</span>
          <span className="text-sm text-foreground">Second step</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-primary font-bold">3.</span>
          <span className="text-sm text-foreground">Third step</span>
        </li>
      </ol>
    </div>
  )

  const ListDisplayIconPreview = () => (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent transition-colors">
        <Home className="h-5 w-5 text-primary" />
        <span className="text-sm text-foreground">Home</span>
      </div>
      <div className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent transition-colors">
        <Search className="h-5 w-5 text-primary" />
        <span className="text-sm text-foreground">Search</span>
      </div>
      <div className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent transition-colors">
        <User className="h-5 w-5 text-primary" />
        <span className="text-sm text-foreground">Profile</span>
      </div>
    </div>
  )

  // ============ TABLE DISPLAY LIVE PREVIEWS ============
  const TableDisplayBasicPreview = () => (
    <div className="w-full max-w-2xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-2 text-left font-semibold text-foreground">Name</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Email</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border hover:bg-accent transition-colors">
            <td className="px-4 py-2 text-foreground">John Doe</td>
            <td className="px-4 py-2 text-muted-foreground">john@example.com</td>
            <td className="px-4 py-2"><span className="px-2 py-1 bg-green-500/20 text-green-700 text-xs rounded">Active</span></td>
          </tr>
          <tr className="border-b border-border hover:bg-accent transition-colors">
            <td className="px-4 py-2 text-foreground">Jane Smith</td>
            <td className="px-4 py-2 text-muted-foreground">jane@example.com</td>
            <td className="px-4 py-2"><span className="px-2 py-1 bg-blue-500/20 text-blue-700 text-xs rounded">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  const TableDisplayStripedPreview = () => (
    <div className="w-full max-w-2xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="px-4 py-2 text-left font-semibold text-foreground">Product</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Price</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Qty</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="px-4 py-2 text-foreground">Product A</td>
            <td className="px-4 py-2 text-muted-foreground">$29.99</td>
            <td className="px-4 py-2 text-foreground">5</td>
          </tr>
          <tr className="bg-accent/30 border-b border-border">
            <td className="px-4 py-2 text-foreground">Product B</td>
            <td className="px-4 py-2 text-muted-foreground">$49.99</td>
            <td className="px-4 py-2 text-foreground">3</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  const TableDisplayCompactPreview = () => (
    <div className="w-full max-w-2xl overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="px-2 py-1 text-left font-semibold text-foreground">ID</th>
            <th className="px-2 py-1 text-left font-semibold text-foreground">Name</th>
            <th className="px-2 py-1 text-left font-semibold text-foreground">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border hover:bg-accent transition-colors">
            <td className="px-2 py-1 text-foreground">001</td>
            <td className="px-2 py-1 text-muted-foreground">Item A</td>
            <td className="px-2 py-1 text-foreground">100</td>
          </tr>
          <tr className="border-b border-border hover:bg-accent transition-colors">
            <td className="px-2 py-1 text-foreground">002</td>
            <td className="px-2 py-1 text-muted-foreground">Item B</td>
            <td className="px-2 py-1 text-foreground">200</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  const TableDisplayExpandablePreview = () => (
    <div className="w-full max-w-2xl space-y-2">
      <div className="border border-border rounded-lg overflow-hidden">
        <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent transition-colors text-sm font-medium text-foreground">
          <span>Row 1 Details</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent transition-colors text-sm font-medium text-foreground">
          <span>Row 2 Details</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )



  // ============ PROGRESS INDICATOR LIVE PREVIEWS ============
  const ProgressIndicatorCircularPreview = () => (
    <div className="w-full max-w-md flex items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="141.3" strokeDashoffset="35.3" className="text-primary transition-all" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground">65%</span>
        </div>
      </div>
    </div>
  )

  const ProgressIndicatorLinearPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-foreground">Download</span>
          <span className="text-xs text-muted-foreground">45%</span>
        </div>
        <div className="h-3 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: '45%' }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-foreground">Upload</span>
          <span className="text-xs text-muted-foreground">80%</span>
        </div>
        <div className="h-3 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all" style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  )

  const ProgressIndicatorSegmentedPreview = () => (
    <div className="w-full max-w-md space-y-2">
      <div className="flex gap-1">
        <div className="flex-1 h-2 bg-primary rounded-full"></div>
        <div className="flex-1 h-2 bg-primary rounded-full"></div>
        <div className="flex-1 h-2 bg-primary rounded-full"></div>
        <div className="flex-1 h-2 bg-accent rounded-full"></div>
        <div className="flex-1 h-2 bg-border rounded-full"></div>
      </div>
      <p className="text-xs text-muted-foreground">3 of 5 completed</p>
    </div>
  )

  const ProgressIndicatorAnimatedPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" style={{ width: '60%' }} />
      </div>
      <p className="text-xs text-muted-foreground">Processing... 60%</p>
    </div>
  )

  // ============ MEDIA AND GALLERY LIVE PREVIEWS ============
  const PhotoGalleryGridPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-3">
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"></div>
      <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"></div>
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"></div>
      <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"></div>
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"></div>
      <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"></div>
    </div>
  )

  const PhotoGalleryMasonryPreview = () => (
    <div className="w-full max-w-2xl columns-3 gap-3">
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer mb-3 break-inside-avoid"></div>
      <div className="aspect-[3/4] bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer mb-3 break-inside-avoid"></div>
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer mb-3 break-inside-avoid"></div>
      <div className="aspect-[3/4] bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer mb-3 break-inside-avoid"></div>
    </div>
  )

  const PhotoGalleryLightboxPreview = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    return (
      <div>
        <div className="w-full max-w-2xl grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} onClick={() => setSelectedIndex(i - 1)} className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"></div>
          ))}
        </div>
        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg"></div>
            <button onClick={() => setSelectedIndex(null)} className="absolute top-4 right-4 p-2 bg-background rounded-lg hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>
        )}
      </div>
    )
  }

  const PhotoGalleryCarouselPreview = () => {
    const [current, setCurrent] = useState(0)
    return (
      <div className="w-full max-w-2xl">
        <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-3">
          <p className="text-foreground">Image {current + 1}</p>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrent((current - 1 + 4) % 4)} className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronLeft className="h-5 w-5 text-foreground" /></button>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(i => <div key={i} className={`h-2 w-2 rounded-full ${i === current ? 'bg-primary' : 'bg-border'}`} />)}
          </div>
          <button onClick={() => setCurrent((current + 1) % 4)} className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronRight className="h-5 w-5 text-foreground" /></button>
        </div>
      </div>
    )
  }

  const VideoPlayerBasicPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group">
        <button className="p-4 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
          <Play className="h-8 w-8" />
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-1 bg-border rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: '35%' }} /></div>
        <span className="text-xs text-muted-foreground">1:45 / 5:00</span>
      </div>
    </div>
  )

  const VideoPlayerCustomControlsPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
        <button className="p-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Play className="h-8 w-8" />
        </button>
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-1 bg-border rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: '45%' }} /></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-accent transition-colors"><Play className="h-4 w-4 text-foreground" /></button>
            <span className="text-xs text-muted-foreground">2:15 / 5:00</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-accent transition-colors"><Bell className="h-4 w-4 text-foreground" /></button>
            <button className="p-1 rounded hover:bg-accent transition-colors"><Expand className="h-4 w-4 text-foreground" /></button>
          </div>
        </div>
      </div>
    </div>
  )

  const VideoPlayerPlaylistPreview = () => (
    <div className="w-full max-w-4xl flex gap-4">
      <div className="flex-1">
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
          <Play className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="w-48 space-y-2 max-h-48 overflow-y-auto">
        <div className="p-2 bg-primary/10 border border-primary/30 rounded-lg cursor-pointer">
          <p className="text-xs font-medium text-foreground">Video 1</p>
        </div>
        <div className="p-2 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
          <p className="text-xs font-medium text-foreground">Video 2</p>
        </div>
        <div className="p-2 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
          <p className="text-xs font-medium text-foreground">Video 3</p>
        </div>
      </div>
    </div>
  )

  const VideoPlayerLivePreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-sm font-medium text-foreground">LIVE</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Viewers: 1,234</span>
        <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 transition-colors">Follow</button>
      </div>
    </div>
  )

  const ImageSliderPreview = () => {
    const [current, setCurrent] = useState(0)
    return (
      <div className="w-full max-w-2xl">
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
          <p className="text-foreground">Slide {current + 1}</p>
        </div>
        <div className="mt-3 flex gap-2">
          {[0, 1, 2, 3].map(i => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-12 w-12 rounded-lg border-2 transition-colors ${i === current ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`} />
          ))}
        </div>
      </div>
    )
  }

  const MediaGridPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-2 gap-3">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
        <Play className="h-8 w-8 text-primary" />
      </div>
      <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
        <Play className="h-8 w-8 text-primary" />
      </div>
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
        <Play className="h-8 w-8 text-primary" />
      </div>
      <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
        <Play className="h-8 w-8 text-primary" />
      </div>
    </div>
  )

  const VideoGalleryPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group">
          <Play className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
        </div>
      ))}
    </div>
  )

  const AudioPlayerPreview = () => (
    <div className="w-full max-w-md space-y-3 p-4 border border-border rounded-lg bg-accent/30">
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Play className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Song Title</p>
          <p className="text-xs text-muted-foreground">Artist Name</p>
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-1 bg-border rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: '40%' }} /></div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1:45</span>
          <span>4:30</span>
        </div>
      </div>
    </div>
  )

  const ImageComparisonPreview = () => (
    <div className="w-full max-w-md relative h-48 rounded-lg overflow-hidden border border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 w-1/2"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-12 bg-primary cursor-col-resize"></div>
      <p className="absolute top-2 left-2 text-xs text-foreground">Before</p>
      <p className="absolute top-2 right-2 text-xs text-foreground">After</p>
    </div>
  )

  const MediaUploadPreview = () => (
    <div className="w-full max-w-md p-6 border-2 border-dashed border-border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
      <Play className="h-8 w-8 text-primary mx-auto mb-2" />
      <p className="text-sm text-foreground font-medium">Upload Media</p>
      <p className="text-xs text-muted-foreground mt-1">Drag files or click to browse</p>
    </div>
  )

  const SlideshowPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
        <p className="text-foreground">Slide 1 of 5</p>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button className="px-3 py-1 text-xs border border-border rounded hover:bg-accent transition-colors">Pause</button>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className={`h-1 w-8 rounded-full ${i === 1 ? 'bg-primary' : 'bg-border'}`} />)}
        </div>
        <button className="px-3 py-1 text-xs border border-border rounded hover:bg-accent transition-colors">Next</button>
      </div>
    </div>
  )

  // ============ E-COMMERCE LIVE PREVIEWS ============
  const ProductCardGridPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      <div className="p-3 space-y-2">
        <p className="text-sm font-medium text-foreground">Product Name</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">$29.99</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-xs text-yellow-500">★</span>)}
          </div>
        </div>
        <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add to Cart</button>
      </div>
    </div>
  )

  const ProductCardListPreview = () => (
    <div className="w-full max-w-2xl border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex">
      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0"></div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Product Name</p>
          <p className="text-xs text-muted-foreground">Product description</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">$29.99</p>
          <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors">Add</button>
        </div>
      </div>
    </div>
  )

  const ProductCardFeaturedPreview = () => (
    <div className="w-full max-w-2xl border-2 border-primary rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <div className="relative h-40 bg-gradient-to-br from-primary/30 to-accent/30">
        <div className="absolute top-2 right-2 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded">SALE</div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">Featured Product</p>
          <p className="text-xs text-muted-foreground">Premium quality item</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-primary">$19.99</p>
          <p className="text-sm text-muted-foreground line-through">$39.99</p>
        </div>
        <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add to Cart</button>
      </div>
    </div>
  )

  const ProductCardQuickViewPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Quick View</button>
      </div>
      <div className="p-3 space-y-2">
        <p className="text-sm font-medium text-foreground">Product Name</p>
        <p className="text-lg font-bold text-primary">$29.99</p>
      </div>
    </div>
  )

  const ShoppingCartDropdownPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card p-3 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <p className="text-sm font-medium text-foreground">Shopping Cart</p>
        <p className="text-xs text-muted-foreground">3 items</p>
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded"></div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">Item {i}</p>
            <p className="text-xs text-muted-foreground">$29.99 × 1</p>
          </div>
          <X className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      ))}
      <div className="pt-2 border-t border-border space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-foreground">Total:</span>
          <span className="font-bold text-primary">$89.97</span>
        </div>
        <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Checkout</button>
      </div>
    </div>
  )

  const ShoppingCartSidebarPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card p-4 space-y-4 h-96 flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">Cart (3)</p>
        <X className="h-4 w-4 cursor-pointer" />
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-2 pb-2 border-b border-border">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded"></div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Product {i}</p>
              <p className="text-xs text-muted-foreground">$29.99</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 border-t border-border pt-3">
        <div className="flex justify-between text-sm">
          <span>Total:</span>
          <span className="font-bold text-primary">$89.97</span>
        </div>
        <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Checkout</button>
      </div>
    </div>
  )

  const ShoppingCartModalPreview = () => (
    <div className="w-full max-w-md border border-border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">Shopping Cart</p>
        <X className="h-4 w-4 cursor-pointer" />
      </div>
      <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
        {[1, 2].map(i => (
          <div key={i} className="flex gap-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded"></div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Product {i}</p>
              <p className="text-xs text-muted-foreground">$29.99 × 1</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex justify-between text-sm">
          <span>Total:</span>
          <span className="font-bold text-primary">$59.98</span>
        </div>
        <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Checkout</button>
      </div>
    </div>
  )

  const ShoppingCartMiniPreview = () => (
    <div className="w-full max-w-xs border border-border rounded-lg bg-card p-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-foreground">Cart</p>
        <p className="text-xs font-bold text-primary">3 items</p>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-foreground">Subtotal:</span>
        <span className="font-bold text-primary">$89.97</span>
      </div>
      <button className="w-full px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors">View Cart</button>
    </div>
  )

  const ProductGalleryPreview = () => (
    <div className="w-full max-w-2xl space-y-3">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg"></div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg cursor-pointer hover:ring-2 ring-primary transition-all"></div>
        ))}
      </div>
    </div>
  )

  const PriceDisplayPreview = () => (
    <div className="w-full max-w-sm space-y-3 p-4 border border-border rounded-lg">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Price</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-primary">$29.99</p>
          <p className="text-sm text-muted-foreground line-through">$49.99</p>
          <p className="text-xs font-bold text-destructive">40% OFF</p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        <p>✓ Free shipping on orders over $50</p>
        <p>✓ 30-day money back guarantee</p>
      </div>
    </div>
  )

  const AddToCartButtonPreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center gap-2">
        <input type="number" defaultValue="1" min="1" className="w-16 px-2 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
        <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
      <button className="w-full px-4 py-2 border border-border rounded-lg text-foreground font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2">
        <Heart className="h-4 w-4" />
        Add to Wishlist
      </button>
    </div>
  )

  const ProductFilterPreview = () => (
    <div className="w-full max-w-sm space-y-3 p-4 border border-border rounded-lg">
      <p className="text-sm font-medium text-foreground">Filters</p>
      <div className="space-y-2">
        <div>
          <p className="text-xs font-medium text-foreground mb-1">Price Range</p>
          <input type="range" min="0" max="100" className="w-full" />
        </div>
        <div>
          <p className="text-xs font-medium text-foreground mb-2">Category</p>
          <div className="space-y-1">
            {['Electronics', 'Clothing', 'Books'].map(cat => (
              <label key={cat} className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input type="checkbox" className="rounded" />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const CheckoutFormPreview = () => (
    <div className="w-full max-w-md space-y-3 p-4 border border-border rounded-lg">
      <p className="text-sm font-medium text-foreground">Checkout</p>
      <div className="space-y-2">
        <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
        <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
        <input type="text" placeholder="Address" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
        <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Complete Purchase</button>
      </div>
    </div>
  )

  const ProductReviewsPreview = () => (
    <div className="w-full max-w-md space-y-3">
      {[1, 2].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Reviewer {i}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(j => <span key={j} className={`text-xs ${j <= 4 ? 'text-yellow-500' : 'text-border'}`}>★</span>)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Great product, highly recommend!</p>
        </div>
      ))}
    </div>
  )

  // ============ SOCIAL AND ENGAGEMENT LIVE PREVIEWS ============
  const SocialShareIconsPreview = () => (
    <div className="w-full max-w-md flex items-center gap-2">
      <p className="text-sm text-foreground">Share:</p>
      <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="Facebook">
        <Globe className="h-4 w-4 text-foreground" />
      </button>
      <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="Twitter">
        <Globe className="h-4 w-4 text-foreground" />
      </button>
      <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="LinkedIn">
        <Globe className="h-4 w-4 text-foreground" />
      </button>
      <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="Email">
        <Globe className="h-4 w-4 text-foreground" />
      </button>
    </div>
  )

  const SocialShareButtonsPreview = () => (
    <div className="w-full max-w-md space-y-2">
      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
        <Globe className="h-4 w-4" />
        Share on Facebook
      </button>
      <button className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2">
        <Globe className="h-4 w-4" />
        Share on Twitter
      </button>
    </div>
  )

  const SocialShareFloatingPreview = () => (
    <div className="w-full max-w-md relative h-48 border border-border rounded-lg p-4">
      <p className="text-sm text-foreground">Content area</p>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Globe className="h-4 w-4" />
        </button>
        <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Globe className="h-4 w-4" />
        </button>
        <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Globe className="h-4 w-4" />
        </button>
      </div>
    </div>
  )

  const SocialShareInlinePreview = () => (
    <div className="w-full max-w-md p-3 border border-border rounded-lg">
      <p className="text-sm text-foreground mb-3">Share this article</p>
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors">Facebook</button>
        <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors">Twitter</button>
        <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors">Copy Link</button>
      </div>
    </div>
  )

  const CommentSystemPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-2">
        <textarea placeholder="Add a comment..." className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm resize-none" rows={3} />
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Post Comment</button>
      </div>
      <div className="space-y-3 pt-3 border-t border-border">
        {[1, 2].map(i => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20"></div>
              <p className="text-xs font-medium text-foreground">User {i}</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <p className="text-xs text-foreground ml-8">Great article! Very informative.</p>
          </div>
        ))}
      </div>
    </div>
  )

  const RatingSystemStarsPreview = () => (
    <div className="w-full max-w-md space-y-3 p-4 border border-border rounded-lg">
      <p className="text-sm font-medium text-foreground">Rate this product</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <button key={i} className="text-2xl hover:scale-110 transition-transform cursor-pointer">
            ★
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">4.5 out of 5 (234 reviews)</p>
    </div>
  )

  const FollowButtonPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Follow</button>
      <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">Following</button>
    </div>
  )

  const SocialFeedPreview = () => (
    <div className="w-full max-w-md space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20"></div>
            <div>
              <p className="text-xs font-medium text-foreground">User {i}</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <p className="text-sm text-foreground">This is a social media post with interesting content</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <button className="hover:text-primary transition-colors">👍 Like</button>
            <button className="hover:text-primary transition-colors">💬 Comment</button>
            <button className="hover:text-primary transition-colors">↗️ Share</button>
          </div>
        </div>
      ))}
    </div>
  )

  const UserProfilePreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20"></div>
      <div className="p-4 space-y-3">
        <div className="flex items-end gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/20 border-4 border-card -mt-12"></div>
          <div>
            <p className="text-sm font-bold text-foreground">User Name</p>
            <p className="text-xs text-muted-foreground">@username</p>
          </div>
        </div>
        <p className="text-xs text-foreground">Bio information goes here</p>
        <div className="flex gap-4 text-xs">
          <div><p className="font-bold text-foreground">1.2K</p><p className="text-muted-foreground">Followers</p></div>
          <div><p className="font-bold text-foreground">342</p><p className="text-muted-foreground">Following</p></div>
        </div>
        <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Follow</button>
      </div>
    </div>
  )

  // ============ BUSINESS AND CORPORATE LIVE PREVIEWS ============
  const TeamMemberCardPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow text-center">
      <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      <div className="p-4 space-y-2">
        <p className="text-sm font-bold text-foreground">Team Member Name</p>
        <p className="text-xs text-primary font-medium">Job Title</p>
        <p className="text-xs text-muted-foreground">Brief bio or description</p>
        <div className="flex justify-center gap-2 pt-2">
          <button className="p-1 rounded hover:bg-accent transition-colors"><Globe className="h-4 w-4 text-foreground" /></button>
          <button className="p-1 rounded hover:bg-accent transition-colors"><Globe className="h-4 w-4 text-foreground" /></button>
        </div>
      </div>
    </div>
  )

  const TeamMemberGridPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow text-center p-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-2"></div>
          <p className="text-xs font-bold text-foreground">Member {i}</p>
          <p className="text-xs text-primary">Position</p>
        </div>
      ))}
    </div>
  )

  const TeamMemberListPreview = () => (
    <div className="w-full max-w-2xl space-y-2">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg flex gap-3 hover:bg-accent transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex-shrink-0"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Team Member {i}</p>
            <p className="text-xs text-primary">Job Title</p>
            <p className="text-xs text-muted-foreground">Email: member{i}@company.com</p>
          </div>
        </div>
      ))}
    </div>
  )

  const TeamMemberDetailedPreview = () => (
    <div className="w-full max-w-md border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      <div className="p-4 space-y-3">
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">Team Member Name</p>
          <p className="text-xs text-primary font-medium">Senior Position</p>
        </div>
        <p className="text-xs text-foreground text-center">Detailed bio with experience and achievements</p>
        <div className="flex justify-center gap-2">
          <button className="px-3 py-1 bg-primary/10 text-primary rounded text-xs font-medium hover:bg-primary/20 transition-colors">LinkedIn</button>
          <button className="px-3 py-1 bg-primary/10 text-primary rounded text-xs font-medium hover:bg-primary/20 transition-colors">Email</button>
        </div>
      </div>
    </div>
  )

  const TestimonialCardPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-3 hover:shadow-lg transition-shadow">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-500">★</span>)}
      </div>
      <p className="text-sm text-foreground italic">"This product exceeded my expectations. Highly recommended!"</p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/20"></div>
        <div>
          <p className="text-xs font-medium text-foreground">Customer Name</p>
          <p className="text-xs text-muted-foreground">Company Name</p>
        </div>
      </div>
    </div>
  )

  const TestimonialCarouselPreview = () => {
    const [current, setCurrent] = useState(0)
    return (
      <div className="w-full max-w-2xl">
        <div className="p-6 border border-border rounded-lg bg-accent/30 space-y-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-500">★</span>)}
          </div>
          <p className="text-sm text-foreground italic">"Testimonial {current + 1}: Great experience with this company!"</p>
          <p className="text-xs font-medium text-foreground">Customer {current + 1}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button onClick={() => setCurrent((current - 1 + 3) % 3)} className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronLeft className="h-4 w-4" /></button>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => <div key={i} className={`h-2 w-2 rounded-full ${i === current ? 'bg-primary' : 'bg-border'}`} />)}
          </div>
          <button onClick={() => setCurrent((current + 1) % 3)} className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    )
  }

  const TestimonialGridPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(j => <span key={j} className="text-xs text-yellow-500">★</span>)}
          </div>
          <p className="text-xs text-foreground italic">"Great testimonial {i}"</p>
          <p className="text-xs font-medium text-foreground">Customer {i}</p>
        </div>
      ))}
    </div>
  )

  const TestimonialQuotePreview = () => (
    <div className="w-full max-w-md border-l-4 border-primary p-4 bg-primary/5 rounded-r-lg">
      <p className="text-sm text-foreground italic mb-3">"This is an inspiring testimonial quote that highlights the value and impact of our service."</p>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-primary/20"></div>
        <div>
          <p className="text-xs font-bold text-foreground">Testimonial Author</p>
          <p className="text-xs text-muted-foreground">Company Position</p>
        </div>
      </div>
    </div>
  )

  const PricingTablePreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-3">
      {['Basic', 'Pro', 'Enterprise'].map((plan, i) => (
        <div key={i} className={`p-4 border rounded-lg space-y-3 ${i === 1 ? 'border-primary bg-primary/5' : 'border-border'}`}>
          <p className="text-sm font-bold text-foreground">{plan}</p>
          <p className="text-2xl font-bold text-primary">${(i + 1) * 29}</p>
          <ul className="text-xs text-foreground space-y-1">
            <li>✓ Feature 1</li>
            <li>✓ Feature 2</li>
            {i > 0 && <li>✓ Feature 3</li>}
          </ul>
          <button className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${i === 1 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-border text-foreground hover:bg-accent'}`}>Choose Plan</button>
        </div>
      ))}
    </div>
  )

  const ServiceCardPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-3 hover:shadow-lg transition-shadow text-center">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
        <Package className="h-6 w-6 text-primary" />
      </div>
      <p className="text-sm font-bold text-foreground">Service Name</p>
      <p className="text-xs text-muted-foreground">Description of the service and its benefits</p>
      <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors">Learn More</button>
    </div>
  )

  const AboutSectionPreview = () => (
    <div className="w-full max-w-2xl space-y-4">
      <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg"></div>
      <div className="space-y-2">
        <p className="text-sm font-bold text-foreground">About Our Company</p>
        <p className="text-xs text-foreground">We are a leading company dedicated to providing exceptional services and solutions to our clients worldwide.</p>
        <p className="text-xs text-foreground">Our mission is to deliver value and innovation in everything we do.</p>
      </div>
    </div>
  )

  const ContactInfoPreview = () => (
    <div className="w-full max-w-sm space-y-3 p-4 border border-border rounded-lg">
      <p className="text-sm font-bold text-foreground">Contact Information</p>
      <div className="space-y-2 text-xs text-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>123 Business Street, City, State 12345</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          <span>contact@company.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          <span>+1 (555) 123-4567</span>
        </div>
      </div>
    </div>
  )

  const CompanyStatsPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-3 p-4 border border-border rounded-lg">
      {[
        { label: 'Clients', value: '500+' },
        { label: 'Projects', value: '1000+' },
        { label: 'Team', value: '50+' },
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <p className="text-2xl font-bold text-primary">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )

  const FAQSectionPreview = () => {
    const [expanded, setExpanded] = useState<string | null>('1')
    return (
      <div className="w-full max-w-md space-y-2">
        {['What is your service?', 'How do I get started?', 'What is the pricing?'].map((q, i) => (
          <div key={i}>
            <button onClick={() => setExpanded(expanded === String(i + 1) ? null : String(i + 1))} className="w-full px-4 py-3 flex items-center justify-between border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground">
              <span>{q}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${expanded === String(i + 1) ? 'rotate-180' : ''}`} />
            </button>
            {expanded === String(i + 1) && <div className="px-4 py-3 bg-accent/30 rounded-lg text-sm text-foreground">Answer to the question goes here with helpful information.</div>}
          </div>
        ))}
      </div>
    )
  }

  // ============ DASHBOARD AND ADMIN LIVE PREVIEWS ============
  const DashboardWidgetChartPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Revenue</p>
        <TrendingUp className="h-4 w-4 text-primary" />
      </div>
      <div className="h-24 bg-gradient-to-t from-primary/20 to-transparent rounded-lg flex items-end justify-around px-2">
        {[40, 60, 45, 70, 55, 80].map((h, i) => (
          <div key={i} className="w-2 bg-primary rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
      <p className="text-sm font-bold text-foreground">$12,450</p>
    </div>
  )

  const DashboardWidgetStatPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-2">
      <p className="text-xs text-muted-foreground">Total Users</p>
      <p className="text-3xl font-bold text-primary">2,543</p>
      <p className="text-xs text-green-600">↑ 12% from last month</p>
    </div>
  )

  const DashboardWidgetListPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-2">
      <p className="text-sm font-medium text-foreground mb-2">Recent Activity</p>
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center justify-between text-xs">
          <span className="text-foreground">Activity {i}</span>
          <span className="text-muted-foreground">{i} hours ago</span>
        </div>
      ))}
    </div>
  )

  const DashboardWidgetProgressPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-3">
      <p className="text-sm font-medium text-foreground">Project Progress</p>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-foreground">Design</span>
            <span className="text-muted-foreground">75%</span>
          </div>
          <div className="h-2 bg-border rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: '75%' }} /></div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-foreground">Development</span>
            <span className="text-muted-foreground">45%</span>
          </div>
          <div className="h-2 bg-border rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: '45%' }} /></div>
        </div>
      </div>
    </div>
  )

  const DataTablePreview = () => (
    <div className="w-full max-w-2xl border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-accent/50 border-b border-border">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Date</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map(i => (
            <tr key={i} className="border-b border-border hover:bg-accent/30 transition-colors">
              <td className="px-4 py-2 text-foreground">Item {i}</td>
              <td className="px-4 py-2"><span className="px-2 py-1 bg-green-500/20 text-green-700 text-xs rounded">Active</span></td>
              <td className="px-4 py-2 text-muted-foreground">2024-01-{10 + i}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const AnalyticsCardPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Page Views</p>
        <TrendingUp className="h-4 w-4 text-primary" />
      </div>
      <p className="text-2xl font-bold text-primary">45,231</p>
      <div className="flex gap-2 text-xs">
        <span className="text-green-600">↑ 23%</span>
        <span className="text-muted-foreground">vs last week</span>
      </div>
    </div>
  )

  const StatusIndicatorPreview = () => (
    <div className="w-full max-w-sm space-y-2 p-4 border border-border rounded-lg">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <span className="text-sm text-foreground">System Online</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <span className="text-sm text-foreground">Database Warning</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <span className="text-sm text-foreground">API Error</span>
      </div>
    </div>
  )

  const ActionButtonPreview = () => (
    <div className="w-full max-w-sm space-y-2">
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Primary Action</button>
      <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">Secondary Action</button>
      <button className="w-full px-4 py-2 border border-destructive text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors">Danger Action</button>
    </div>
  )

  const SettingsPanelPreview = () => (
    <div className="w-full max-w-md space-y-3 p-4 border border-border rounded-lg">
      <p className="text-sm font-medium text-foreground">Settings</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Notifications</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Dark Mode</span>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Auto-save</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
      </div>
    </div>
  )

  // ============ MARKETING AND PROMOTION LIVE PREVIEWS ============
  const CallToActionButtonPreview = () => (
    <div className="w-full max-w-md text-center space-y-3 p-6 border border-border rounded-lg">
      <p className="text-sm font-medium text-foreground">Ready to get started?</p>
      <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">Get Started Now</button>
    </div>
  )

  const CallToActionBannerPreview = () => (
    <div className="w-full max-w-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-foreground">Limited Time Offer</p>
        <p className="text-xs text-muted-foreground">Get 50% off on all plans</p>
      </div>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Claim Offer</button>
    </div>
  )

  const CallToActionModalPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg bg-card p-6 space-y-4 text-center">
      <p className="text-sm font-bold text-foreground">Don't miss out!</p>
      <p className="text-xs text-muted-foreground">Subscribe to our newsletter for exclusive offers</p>
      <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Subscribe</button>
    </div>
  )

  const CallToActionInlinePreview = () => (
    <div className="w-full max-w-2xl flex items-center justify-between p-4 border border-border rounded-lg">
      <div>
        <p className="text-sm font-medium text-foreground">Upgrade your account</p>
        <p className="text-xs text-muted-foreground">Unlock premium features</p>
      </div>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Upgrade</button>
    </div>
  )

  const PromotionalBannerPreview = () => (
    <div className="w-full bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
      <p className="text-sm font-bold text-destructive">🎉 FLASH SALE</p>
      <p className="text-xs text-foreground mt-1">50% off everything - Ends in 24 hours!</p>
    </div>
  )

  const FeatureHighlightPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-3 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
        <Sparkles className="h-6 w-6 text-primary" />
      </div>
      <p className="text-sm font-bold text-foreground">Key Feature</p>
      <p className="text-xs text-muted-foreground">Description of this amazing feature and its benefits</p>
      <button className="text-xs text-primary font-medium hover:underline">Learn more →</button>
    </div>
  )

  const NewsletterBannerPreview = () => (
    <div className="w-full max-w-2xl bg-accent/50 border border-border rounded-lg p-6 space-y-3">
      <p className="text-sm font-bold text-foreground">Subscribe to our newsletter</p>
      <p className="text-xs text-muted-foreground">Get the latest updates delivered to your inbox</p>
      <div className="flex gap-2">
        <input type="email" placeholder="Enter your email" className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Subscribe</button>
      </div>
    </div>
  )

  const DiscountBadgePreview = () => (
    <div className="w-full max-w-sm relative">
      <div className="p-4 border border-border rounded-lg">
        <p className="text-sm text-foreground">Product Name</p>
        <p className="text-lg font-bold text-primary">$29.99</p>
      </div>
      <div className="absolute -top-2 -right-2 px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-xs font-bold">
        -30%
      </div>
    </div>
  )

  const LandingHeroPreview = () => (
    <div className="w-full max-w-2xl h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex flex-col items-center justify-center text-center space-y-4">
      <p className="text-2xl font-bold text-foreground">Welcome to Our Platform</p>
      <p className="text-sm text-muted-foreground max-w-md">Start your journey with us today and discover amazing possibilities</p>
      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">Get Started</button>
    </div>
  )

  // ============ NEWS AND CONTENT LIVE PREVIEWS ============
  const BreakingNewsTickerHorizontalPreview = () => (
    <div className="w-full bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-3">
      <div className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded">BREAKING</div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm text-foreground font-medium truncate">Major news headline appears here with important information</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </div>
  )

  const BreakingNewsTickerVerticalPreview = () => (
    <div className="w-full max-w-md space-y-2">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
          <div className="flex items-start gap-2">
            <div className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded flex-shrink-0">NEW</div>
            <p className="text-sm text-foreground">Breaking news item {i} with important updates</p>
          </div>
        </div>
      ))}
    </div>
  )

  const BreakingNewsTickerFadePreview = () => {
    const [current, setCurrent] = useState(0)
    return (
      <div className="w-full max-w-2xl">
        <div className="relative h-16 bg-destructive/5 border border-destructive/20 rounded-lg flex items-center px-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive"></div>
          <p className="text-sm text-foreground font-medium">News item {current + 1}: Breaking news headline with important information</p>
        </div>
        <div className="mt-2 flex gap-1 justify-center">
          {[0, 1, 2, 3].map(i => <div key={i} className={`h-1 w-8 rounded-full ${i === current ? 'bg-destructive' : 'bg-border'}`} />)}
        </div>
      </div>
    )
  }

  const BreakingNewsTickerSlidePreview = () => {
    const [current, setCurrent] = useState(0)
    return (
      <div className="w-full max-w-2xl">
        <div className="relative h-12 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center px-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive"></div>
          <p className="text-sm text-foreground font-medium">Breaking: News headline {current + 1}</p>
        </div>
      </div>
    )
  }

  const ArticleCardHorizontalPreview = () => (
    <div className="w-full max-w-md border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex">
      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0"></div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <p className="text-xs text-primary font-medium">Technology</p>
          <p className="text-sm font-medium text-foreground line-clamp-2">Article headline goes here</p>
        </div>
        <p className="text-xs text-muted-foreground">2 hours ago</p>
      </div>
    </div>
  )

  const ArticleCardVerticalPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      <div className="p-3 space-y-2">
        <p className="text-xs text-primary font-medium">Business</p>
        <p className="text-sm font-medium text-foreground line-clamp-2">Article headline with important information</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>By Author Name</span>
          <span>3 hours ago</span>
        </div>
      </div>
    </div>
  )

  const ArticleCardFeaturedPreview = () => (
    <div className="w-full max-w-2xl border-2 border-primary rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <div className="h-48 bg-gradient-to-br from-primary/30 to-accent/30"></div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">FEATURED</div>
          <p className="text-xs text-primary font-medium">Technology</p>
        </div>
        <p className="text-lg font-bold text-foreground">Featured article headline with prominent display</p>
        <p className="text-sm text-muted-foreground line-clamp-2">Article summary with key information about the story</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>By Featured Author</span>
          <span>1 hour ago</span>
        </div>
      </div>
    </div>
  )

  const ArticleCardMinimalPreview = () => (
    <div className="w-full max-w-md p-3 border-l-4 border-primary hover:bg-accent transition-colors cursor-pointer">
      <p className="text-xs text-primary font-medium mb-1">News</p>
      <p className="text-sm font-medium text-foreground">Minimal article headline</p>
      <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
    </div>
  )

  const NewsGridPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-24 bg-gradient-to-br from-primary/20 to-accent/20"></div>
          <div className="p-2">
            <p className="text-xs text-primary font-medium">Category</p>
            <p className="text-xs font-medium text-foreground line-clamp-2">News headline {i}</p>
            <p className="text-xs text-muted-foreground mt-1">{i} hours ago</p>
          </div>
        </div>
      ))}
    </div>
  )

  const LiveUpdatesPreview = () => (
    <div className="w-full max-w-md space-y-2">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg hover:bg-accent transition-colors">
          <div className="flex items-start gap-2">
            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Live update {i}</p>
              <p className="text-xs text-muted-foreground">Just now</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const TrendingTopicsPreview = () => (
    <div className="w-full max-w-md space-y-2">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Trending topic {i}</p>
            <p className="text-xs text-muted-foreground">{1000 * i}K posts</p>
          </div>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
      ))}
    </div>
  )

  const MostReadPreview = () => (
    <div className="w-full max-w-md space-y-2">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="text-lg font-bold text-primary">{i}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Most read article {i}</p>
              <p className="text-xs text-muted-foreground">{5000 - i * 1000} reads</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  // ============ ACCORDION LIVE PREVIEWS ============
  const AccordionSimplePreview = () => {
    const [expanded, setExpanded] = useState<string | null>(null)
    return (
      <div className="w-full max-w-md space-y-2">
        <button onClick={() => setExpanded(expanded === '1' ? null : '1')} className="w-full px-4 py-3 flex items-center justify-between border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground">
          <span>Section 1</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded === '1' ? 'rotate-180' : ''}`} />
        </button>
        {expanded === '1' && <div className="px-4 py-3 bg-accent/30 rounded-lg text-sm text-foreground">Content for section 1</div>}
        <button onClick={() => setExpanded(expanded === '2' ? null : '2')} className="w-full px-4 py-3 flex items-center justify-between border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground">
          <span>Section 2</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded === '2' ? 'rotate-180' : ''}`} />
        </button>
        {expanded === '2' && <div className="px-4 py-3 bg-accent/30 rounded-lg text-sm text-foreground">Content for section 2</div>}
      </div>
    )
  }

  const AccordionIconPreview = () => {
    const [expanded, setExpanded] = useState<string | null>('1')
    return (
      <div className="w-full max-w-md space-y-2">
        <button onClick={() => setExpanded(expanded === '1' ? null : '1')} className="w-full px-4 py-3 flex items-center justify-between border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground">
          <span className="flex items-center gap-2"><Home className="h-4 w-4" />Home</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded === '1' ? 'rotate-180' : ''}`} />
        </button>
        {expanded === '1' && <div className="px-4 py-3 bg-accent/30 rounded-lg text-sm text-foreground">Home section content</div>}
        <button onClick={() => setExpanded(expanded === '2' ? null : '2')} className="w-full px-4 py-3 flex items-center justify-between border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground">
          <span className="flex items-center gap-2"><Search className="h-4 w-4" />Search</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded === '2' ? 'rotate-180' : ''}`} />
        </button>
        {expanded === '2' && <div className="px-4 py-3 bg-accent/30 rounded-lg text-sm text-foreground">Search section content</div>}
      </div>
    )
  }

  const AccordionColoredPreview = () => {
    const [expanded, setExpanded] = useState<string | null>(null)
    return (
      <div className="w-full max-w-md space-y-2">
        <button onClick={() => setExpanded(expanded === '1' ? null : '1')} className="w-full px-4 py-3 flex items-center justify-between bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium text-foreground">
          <span>FAQ 1</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded === '1' ? 'rotate-180' : ''}`} />
        </button>
        {expanded === '1' && <div className="px-4 py-3 bg-primary/5 rounded-lg text-sm text-foreground">Answer to FAQ 1</div>}
        <button onClick={() => setExpanded(expanded === '2' ? null : '2')} className="w-full px-4 py-3 flex items-center justify-between bg-accent/10 border border-accent/30 rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium text-foreground">
          <span>FAQ 2</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded === '2' ? 'rotate-180' : ''}`} />
        </button>
        {expanded === '2' && <div className="px-4 py-3 bg-accent/5 rounded-lg text-sm text-foreground">Answer to FAQ 2</div>}
      </div>
    )
  }

  const AccordionMultiPreview = () => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set(['1']))
    const toggle = (id: string) => {
      const newSet = new Set(expanded)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      setExpanded(newSet)
    }
    return (
      <div className="w-full max-w-md space-y-2">
        {['1', '2', '3'].map(id => (
          <div key={id}>
            <button onClick={() => toggle(id)} className="w-full px-4 py-3 flex items-center justify-between border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground">
              <span>Item {id}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${expanded.has(id) ? 'rotate-180' : ''}`} />
            </button>
            {expanded.has(id) && <div className="px-4 py-3 bg-accent/30 rounded-lg text-sm text-foreground">Content {id}</div>}
          </div>
        ))}
      </div>
    )
  }

  // ============ TABS LIVE PREVIEWS ============
  const TabsSimplePreview = () => {
    const [activeTab, setActiveTab] = useState('1')
    return (
      <div className="w-full max-w-md">
        <div className="flex gap-2 border-b border-border mb-4">
          <button onClick={() => setActiveTab('1')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === '1' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>Tab 1</button>
          <button onClick={() => setActiveTab('2')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === '2' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>Tab 2</button>
          <button onClick={() => setActiveTab('3')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === '3' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>Tab 3</button>
        </div>
        <div className="text-sm text-foreground">
          {activeTab === '1' && <p>Content for tab 1</p>}
          {activeTab === '2' && <p>Content for tab 2</p>}
          {activeTab === '3' && <p>Content for tab 3</p>}
        </div>
      </div>
    )
  }

  const TabsButtonPreview = () => {
    const [activeTab, setActiveTab] = useState('1')
    return (
      <div className="w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setActiveTab('1')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === '1' ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground hover:bg-accent/80'}`}>Tab 1</button>
          <button onClick={() => setActiveTab('2')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === '2' ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground hover:bg-accent/80'}`}>Tab 2</button>
          <button onClick={() => setActiveTab('3')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === '3' ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground hover:bg-accent/80'}`}>Tab 3</button>
        </div>
        <div className="text-sm text-foreground">
          {activeTab === '1' && <p>Content for tab 1</p>}
          {activeTab === '2' && <p>Content for tab 2</p>}
          {activeTab === '3' && <p>Content for tab 3</p>}
        </div>
      </div>
    )
  }

  const TabsIconPreview = () => {
    const [activeTab, setActiveTab] = useState('1')
    return (
      <div className="w-full max-w-md">
        <div className="flex gap-2 border-b border-border mb-4">
          <button onClick={() => setActiveTab('1')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeTab === '1' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}><Home className="h-4 w-4" />Home</button>
          <button onClick={() => setActiveTab('2')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeTab === '2' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}><Search className="h-4 w-4" />Search</button>
          <button onClick={() => setActiveTab('3')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeTab === '3' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}><User className="h-4 w-4" />Profile</button>
        </div>
        <div className="text-sm text-foreground">
          {activeTab === '1' && <p>Home content</p>}
          {activeTab === '2' && <p>Search content</p>}
          {activeTab === '3' && <p>Profile content</p>}
        </div>
      </div>
    )
  }

  const TabsVerticalPreview = () => {
    const [activeTab, setActiveTab] = useState('1')
    return (
      <div className="w-full max-w-md flex gap-4">
        <div className="flex flex-col gap-2 border-r border-border pr-4">
          <button onClick={() => setActiveTab('1')} className={`px-4 py-2 text-sm font-medium text-left transition-colors ${activeTab === '1' ? 'text-primary border-r-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>Tab 1</button>
          <button onClick={() => setActiveTab('2')} className={`px-4 py-2 text-sm font-medium text-left transition-colors ${activeTab === '2' ? 'text-primary border-r-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>Tab 2</button>
          <button onClick={() => setActiveTab('3')} className={`px-4 py-2 text-sm font-medium text-left transition-colors ${activeTab === '3' ? 'text-primary border-r-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>Tab 3</button>
        </div>
        <div className="text-sm text-foreground">
          {activeTab === '1' && <p>Content for tab 1</p>}
          {activeTab === '2' && <p>Content for tab 2</p>}
          {activeTab === '3' && <p>Content for tab 3</p>}
        </div>
      </div>
    )
  }

  // ============ CAROUSEL LIVE PREVIEWS ============
  const CarouselBasicPreview = () => {
    const [current, setCurrent] = useState(0)
    const items = ['Slide 1', 'Slide 2', 'Slide 3']
    return (
      <div className="w-full max-w-md">
        <div className="relative h-40 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-3">
          <p className="text-lg font-semibold text-foreground">{items[current]}</p>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrent((current - 1 + items.length) % items.length)} className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronLeft className="h-5 w-5 text-foreground" /></button>
          <div className="flex gap-2">
            {items.map((_, i) => <div key={i} className={`h-2 w-2 rounded-full ${i === current ? 'bg-primary' : 'bg-border'}`} />)}
          </div>
          <button onClick={() => setCurrent((current + 1) % items.length)} className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronRight className="h-5 w-5 text-foreground" /></button>
        </div>
      </div>
    )
  }

  const CarouselAutoPreview = () => (
    <div className="w-full max-w-md">
      <div className="relative h-40 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="animate-pulse text-lg font-semibold text-foreground">Auto-playing Carousel</div>
      </div>
      <div className="flex gap-2 justify-center mt-3">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <div className="h-2 w-2 rounded-full bg-border" />
        <div className="h-2 w-2 rounded-full bg-border" />
      </div>
    </div>
  )

  const CarouselThumbnailPreview = () => {
    const [current, setCurrent] = useState(0)
    return (
      <div className="w-full max-w-md space-y-3">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
          <p className="text-foreground">Slide {current + 1}</p>
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-12 w-12 rounded-lg border-2 transition-colors ${i === current ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`} />
          ))}
        </div>
      </div>
    )
  }

  const CarouselFadePreview = () => {
    const [current, setCurrent] = useState(0)
    return (
      <div className="w-full max-w-md">
        <div className="relative h-40 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
          <p className="text-lg font-semibold text-foreground opacity-75 transition-opacity">Fade Carousel</p>
        </div>
        <div className="flex gap-2 justify-center mt-3">
          <button onClick={() => setCurrent(0)} className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">1</button>
          <button onClick={() => setCurrent(1)} className="px-3 py-1 text-xs border border-border rounded hover:bg-accent transition-colors">2</button>
          <button onClick={() => setCurrent(2)} className="px-3 py-1 text-xs border border-border rounded hover:bg-accent transition-colors">3</button>
        </div>
      </div>
    )
  }

  // ============ TIMELINE/PROGRESS LIVE PREVIEWS ============
  const TimelineVerticalPreview = () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="h-4 w-4 rounded-full bg-primary"></div>
          <div className="w-1 h-12 bg-border"></div>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 1</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="h-4 w-4 rounded-full bg-primary"></div>
          <div className="w-1 h-12 bg-border"></div>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 2</p>
          <p className="text-xs text-muted-foreground">In Progress</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="h-4 w-4 rounded-full border-2 border-border"></div>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 3</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
      </div>
    </div>
  )

  const TimelineHorizontalPreview = () => (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-primary rounded-full"></div>
        <div className="h-4 w-4 rounded-full bg-primary"></div>
        <div className="flex-1 h-1 bg-primary rounded-full"></div>
        <div className="h-4 w-4 rounded-full bg-primary"></div>
        <div className="flex-1 h-1 bg-border rounded-full"></div>
        <div className="h-4 w-4 rounded-full border-2 border-border"></div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Step 1</span>
        <span>Step 2</span>
        <span>Step 3</span>
      </div>
    </div>
  )

  const ProgressBarPreview = () => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-foreground">Progress</span>
          <span className="text-xs text-muted-foreground">65%</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: '65%' }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-foreground">Loading</span>
          <span className="text-xs text-muted-foreground">40%</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  )

  const ProgressStepsPreview = () => (
    <div className="w-full max-w-md">
      <div className="flex gap-2">
        <div className="flex-1 h-2 bg-primary rounded-full"></div>
        <div className="flex-1 h-2 bg-primary rounded-full"></div>
        <div className="flex-1 h-2 bg-accent rounded-full"></div>
        <div className="flex-1 h-2 bg-border rounded-full"></div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Step 3 of 4</p>
    </div>
  )


  // ============ NEWSLETTER SIGNUP LIVE PREVIEWS ============
  const NewsletterSignupInlinePreview = () => (
    <div className="w-full max-w-md flex gap-2">
      <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">Subscribe</button>
    </div>
  )

  const NewsletterSignupModalPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Subscribe</button>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-sm w-full mx-4">
              <h2 className="text-lg font-semibold text-foreground mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-sm text-muted-foreground mb-4">Get updates delivered to your inbox</p>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm mb-4" />
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Cancel</button>
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Subscribe</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const NewsletterSignupSidebarPreview = () => (
    <div className="w-full max-w-xs border border-border rounded-lg bg-card p-4 space-y-3">
      <h3 className="font-semibold text-foreground">Stay Updated</h3>
      <p className="text-xs text-muted-foreground">Subscribe for weekly updates</p>
      <input type="email" placeholder="your@email.com" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">Subscribe</button>
    </div>
  )

  const NewsletterSignupFooterPreview = () => (
    <div className="w-full bg-accent/50 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-foreground text-sm">Newsletter</h3>
      <div className="flex gap-2">
        <input type="email" placeholder="Email" className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Join</button>
      </div>
    </div>
  )

  // ============ SEARCH FORM LIVE PREVIEWS ============
  const SearchFormSimplePreview = () => (
    <div className="w-full max-w-md">
      <div className="relative">
        <input type="text" placeholder="Search..." className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )

  const SearchFormAdvancedPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="relative">
        <input type="text" placeholder="Search..." className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex gap-2">
        <select className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm">
          <option>All Categories</option>
          <option>Products</option>
          <option>Articles</option>
        </select>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Filter</button>
      </div>
    </div>
  )

  const SearchFormWithSuggestionsPreview = () => (
    <div className="w-full max-w-md">
      <div className="relative">
        <input type="text" placeholder="Search..." className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 border border-border rounded-lg bg-background overflow-hidden">
        <div className="px-4 py-2 hover:bg-accent cursor-pointer text-sm text-foreground transition-colors">Recent search 1</div>
        <div className="px-4 py-2 hover:bg-accent cursor-pointer text-sm text-foreground transition-colors">Recent search 2</div>
      </div>
    </div>
  )

  const SearchFormVoicePreview = () => (
    <div className="w-full max-w-md flex gap-2">
      <div className="relative flex-1">
        <input type="text" placeholder="Search or speak..." className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
      <button className="px-4 py-2 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors">
        <Mic className="h-4 w-4" />
      </button>
    </div>
  )

  // ============ LOGIN FORM LIVE PREVIEWS ============
  const LoginFormSimplePreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Email</label>
        <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Password</label>
        <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Sign In</button>
    </div>
  )

  const LoginFormRememberPreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Email</label>
        <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Password</label>
        <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-foreground">
          <input type="checkbox" className="h-4 w-4" />
          Remember me
        </label>
        <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Sign In</button>
    </div>
  )

  const LoginFormSocialPreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Email</label>
        <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Password</label>
        <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Sign In</button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
        <div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground">Or continue with</span></div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Google</button>
        <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">GitHub</button>
      </div>
    </div>
  )

  const LoginFormBiometricPreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Email</label>
        <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Sign In</button>
      <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm flex items-center justify-center gap-2">
        <Accessibility className="h-4 w-4" />
        Use Biometric
      </button>
    </div>
  )

  // ============ REGISTRATION FORM LIVE PREVIEWS ============
  const RegistrationFormSimplePreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Full Name</label>
        <input type="text" placeholder="John Doe" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Email</label>
        <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Password</label>
        <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Create Account</button>
    </div>
  )

  const RegistrationFormMultiStepPreview = () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-1">
        <div className="flex-1 h-1 bg-primary rounded-full"></div>
        <div className="flex-1 h-1 bg-border rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Full Name</label>
          <input type="text" placeholder="John Doe" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Email</label>
          <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Back</button>
        <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Next</button>
      </div>
    </div>
  )

  const RegistrationFormSocialPreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <div className="space-y-2">
        <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium">Sign up with Google</button>
        <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium">Sign up with GitHub</button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
        <div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground">Or register with email</span></div>
      </div>
      <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Continue</button>
    </div>
  )

  const RegistrationFormWizardPreview = () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 text-center">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mx-auto mb-1">1</div>
          <p className="text-xs text-foreground">Account</p>
        </div>
        <div className="flex-1 text-center">
          <div className="h-8 w-8 rounded-full bg-border text-foreground flex items-center justify-center text-xs font-bold mx-auto mb-1">2</div>
          <p className="text-xs text-muted-foreground">Profile</p>
        </div>
        <div className="flex-1 text-center">
          <div className="h-8 w-8 rounded-full bg-border text-foreground flex items-center justify-center text-xs font-bold mx-auto mb-1">3</div>
          <p className="text-xs text-muted-foreground">Confirm</p>
        </div>
      </div>
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Next</button>
    </div>
  )

  // ============ FEEDBACK FORM LIVE PREVIEWS ============
  const FeedbackFormSimplePreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Your Feedback</label>
        <textarea rows={3} placeholder="Tell us what you think..." className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"></textarea>
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">Submit Feedback</button>
    </div>
  )

  const FeedbackFormRatingPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div>
        <label className="block text-xs font-medium text-foreground mb-2">How satisfied are you?</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <button key={i} className="px-3 py-2 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm">{i}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">Comments</label>
        <textarea rows={2} placeholder="Additional comments..." className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"></textarea>
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Submit</button>
    </div>
  )

  const FeedbackFormSurveyPreview = () => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Would you recommend us?</p>
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm">Yes</button>
          <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm">No</button>
          <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm">Maybe</button>
        </div>
      </div>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Continue</button>
    </div>
  )

  const FeedbackFormQuickPreview = () => (
    <div className="w-full max-w-md flex gap-2 items-center">
      <span className="text-sm text-foreground">Was this helpful?</span>
      <button className="px-3 py-1 text-xs border border-border rounded hover:bg-primary hover:text-primary-foreground transition-colors">👍 Yes</button>
      <button className="px-3 py-1 text-xs border border-border rounded hover:bg-primary hover:text-primary-foreground transition-colors">👎 No</button>
    </div>
  )

  // ============ FILE UPLOAD LIVE PREVIEWS ============
  const FileUploadDragDropPreview = () => (
    <div className="w-full max-w-md p-8 border-2 border-dashed border-border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
      <p className="text-sm text-foreground font-medium">Drag files here or click to browse</p>
      <p className="text-xs text-muted-foreground mt-1">Supported: PDF, DOC, XLS</p>
    </div>
  )

  const FileUploadButtonPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">Choose File</button>
      <p className="text-xs text-muted-foreground">No file selected</p>
    </div>
  )

  const FileUploadProgressPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">document.pdf</span>
        <span className="text-xs text-muted-foreground">65%</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: '65%' }} />
      </div>
    </div>
  )

  const FileUploadMultiplePreview = () => (
    <div className="w-full max-w-md space-y-2">
      <div className="p-2 border border-border rounded-lg flex items-center justify-between">
        <span className="text-sm text-foreground">file1.pdf</span>
        <X className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
      </div>
      <div className="p-2 border border-border rounded-lg flex items-center justify-between">
        <span className="text-sm text-foreground">file2.doc</span>
        <X className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
      </div>
      <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Add More Files</button>
    </div>
  )

  // ============ FORM VALIDATION LIVE PREVIEWS ============
  const FormValidationInlinePreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div>
        <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-green-500 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
        <p className="text-xs text-green-600 mt-1">✓ Valid email format</p>
      </div>
      <div>
        <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-red-500 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-red-500 text-sm" />
        <p className="text-xs text-red-600 mt-1">✕ Password too short</p>
      </div>
    </div>
  )

  const FormValidationSummaryPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
        <p className="text-sm font-medium text-red-700 mb-2">Please fix the following errors:</p>
        <ul className="text-xs text-red-600 space-y-1">
          <li>• Email is required</li>
          <li>• Password must be at least 8 characters</li>
        </ul>
      </div>
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
    </div>
  )

  const FormValidationTooltipPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="relative">
        <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <div className="absolute top-full mt-1 left-0 p-2 bg-card border border-border rounded-lg text-xs text-foreground whitespace-nowrap">
          Enter a valid email address
        </div>
      </div>
    </div>
  )

  const FormValidationRealTimePreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div>
        <input type="text" placeholder="Username" className="w-full px-4 py-2 border border-green-500 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
        <p className="text-xs text-green-600 mt-1">✓ Available</p>
      </div>
      <div>
        <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-yellow-500 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm" />
        <p className="text-xs text-yellow-600 mt-1">⚠ Weak password</p>
      </div>
    </div>
  )


  // ============ RENDER FUNCTIONS ============
  const renderTemplateVariations = () => {
    const panel = findPanelByName(selectedItem || '')
    
    if (!panel || panel.variations.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Templates for "{selectedItem}" are coming soon.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Check back later for production-ready components.
          </p>
        </div>
      )
    }

    // Map panel names to their preview components
    const previewMap: Record<string, React.ReactNode[]> = {
      // Navigation Category
      'Breadcrumb Panel': [
        <BreadcrumbSimplePreview key="1" />,
        <BreadcrumbIconPreview key="2" />,
        <BreadcrumbDropdownPreview key="3" />,
        <BreadcrumbHierarchicalPreview key="4" />,
      ],
      'Hamburger Menu': [
        <HamburgerSlidePreview key="1" />,
        <HamburgerOverlayPreview key="2" />,
        <HamburgerPushPreview key="3" />,
        <HamburgerAccordionPreview key="4" />,
      ],
      'Pagination': [
        <PaginationNumbersPreview key="1" />,
        <PaginationArrowsPreview key="2" />,
        <PaginationLoadMorePreview key="3" />,
        <PaginationInfiniteScrollPreview key="4" />,
      ],
      'Footer Panel': [
        <FooterSimplePreview key="1" />,
        <FooterMultiColumnPreview key="2" />,
        <FooterNewsletterPreview key="3" />,
        <FooterSocialPreview key="4" />,
      ],
      'Mobile Navigation': [
        <MobileNavigationBottomTabPreview key="1" />,
        <MobileNavigationDrawerPreview key="2" />,
        <MobileNavigationFullScreenPreview key="3" />,
        <MobileNavigationFloatingPreview key="4" />,
      ],
      'Skip Links': [
        <SkipLinksBasicPreview key="1" />,
        <SkipLinksEnhancedPreview key="2" />,
        <SkipLinksKeyboardPreview key="3" />,
        <SkipLinksScreenReaderPreview key="4" />,
      ],
      'Site Map': [
        <SiteMapTreePreview key="1" />,
        <SiteMapGridPreview key="2" />,
        <SiteMapAccordionPreview key="3" />,
        <SiteMapSearchPreview key="4" />,
      ],
      'Navigation Drawer': [
        <NavigationDrawerLeftPreview key="1" />,
        <NavigationDrawerRightPreview key="2" />,
        <NavigationDrawerOverlayPreview key="3" />,
        <NavigationDrawerPushPreview key="4" />,
      ],
      'Mega Menu': [
        <MegaMenuGridPreview key="1" />,
        <MegaMenuListPreview key="2" />,
        <MegaMenuImagePreview key="3" />,
        <MegaMenuCategoryPreview key="4" />,
      ],
      'Top Navigation Bar': [
        <TopNavSimplePreview key="1" />,
        <TopNavPromotionalPreview key="2" />,
        <TopNavUtilityPreview key="3" />,
        <TopNavSocialPreview key="4" />,
      ],
      'Header Panel': [
        <HeaderClassicPreview key="1" />,
        <HeaderModernPreview key="2" />,
        <HeaderMinimalPreview key="3" />,
        <HeaderPromoPreview key="4" />,
      ],
      'Navigation Menu': [
        <NavigationMenuHorizontalPreview key="1" />,
        <NavigationMenuVerticalPreview key="2" />,
        <NavigationMenuTabsPreview key="3" />,
        <NavigationMenuBreadcrumbPreview key="4" />,
      ],
      // User Interface Category
      'Search Panel': [
        <SearchSimplePreview key="1" />,
        <SearchAdvancedPreview key="2" />,
        <SearchAutocompletePreview key="3" />,
        <SearchVoicePreview key="4" />,
      ],
      'Login Panel': [
        <LoginModalPreview key="1" />,
        <LoginPagePreview key="2" />,
        <LoginSocialPreview key="3" />,
        <LoginTwoFactorPreview key="4" />,
      ],
      'Language Selector': [
        <LanguageSelectorDropdownPreview key="1" />,
        <LanguageSelectorFlagPreview key="2" />,
        <LanguageSelectorModalPreview key="3" />,
        <LanguageSelectorInlinePreview key="4" />,
      ],
      'Location Selector': [
        <LocationSelectorMapPreview key="1" />,
        <LocationSelectorDropdownPreview key="2" />,
        <LocationSelectorAutocompletePreview key="3" />,
        <LocationSelectorGeolocationPreview key="4" />,
      ],
      'Notification Panel': [
        <NotificationPanelToastPreview key="1" />,
        <NotificationPanelBannerPreview key="2" />,
        <NotificationPanelDropdownPreview key="3" />,
        <NotificationPanelSidebarPreview key="4" />,
      ],
      'User Account': [
        <UserAccountDropdownPreview key="1" />,
        <UserAccountProfileCardPreview key="2" />,
        <UserAccountSettingsPreview key="3" />,
        <UserAccountDashboardPreview key="4" />,
      ],
      'Theme Switcher': [
        <ThemeSwitcherTogglePreview key="1" />,
        <ThemeSwitcherDropdownPreview key="2" />,
        <ThemeSwitcherSliderPreview key="3" />,
        <ThemeSwitcherAutoPreview key="4" />,
      ],
      'Accessibility Controls': [
        <AccessibilityControlsToolbarPreview key="1" />,
        <AccessibilityControlsMenuPreview key="2" />,
        <AccessibilityControlsFloatingPreview key="3" />,
        <AccessibilityControlsInlinePreview key="4" />,
      ],
      // Content Display Category
      'Hero Section': [
        <HeroImagePreview key="1" />,
        <HeroVideoPreview key="2" />,
        <HeroGradientPreview key="3" />,
        <HeroSplitPreview key="4" />,
      ],
      'Card Layout': [
        <CardBasicPreview key="1" />,
        <CardImagePreview key="2" />,
        <CardActionPreview key="3" />,
        <CardHoverPreview key="4" />,
      ],
      'Modal Dialog': [
        <ModalBasicPreview key="1" />,
        <ModalFormPreview key="2" />,
        <ModalConfirmationPreview key="3" />,
        <ModalFullScreenPreview key="4" />,
      ],
      'List Display': [
        <ListDisplaySimplePreview key="1" />,
        <ListDisplayBulletPreview key="2" />,
        <ListDisplayNumberedPreview key="3" />,
        <ListDisplayIconPreview key="4" />,
      ],
      'Table Display': [
        <TableDisplayBasicPreview key="1" />,
        <TableDisplayStripedPreview key="2" />,
        <TableDisplayCompactPreview key="3" />,
        <TableDisplayExpandablePreview key="4" />,
      ],
      'Accordion': [
        <AccordionSimplePreview key="1" />,
        <AccordionIconPreview key="2" />,
        <AccordionColoredPreview key="3" />,
        <AccordionMultiPreview key="4" />,
      ],
      'Tabs': [
        <TabsSimplePreview key="1" />,
        <TabsButtonPreview key="2" />,
        <TabsIconPreview key="3" />,
        <TabsVerticalPreview key="4" />,
      ],
      'Carousel': [
        <CarouselBasicPreview key="1" />,
        <CarouselAutoPreview key="2" />,
        <CarouselThumbnailPreview key="3" />,
        <CarouselFadePreview key="4" />,
      ],
      'Timeline': [
        <TimelineVerticalPreview key="1" />,
        <TimelineHorizontalPreview key="2" />,
        <TimelineVerticalPreview key="3" />,
        <TimelineHorizontalPreview key="4" />,
      ],
      'Progress Indicator': [
        <ProgressBarPreview key="1" />,
        <ProgressStepsPreview key="2" />,
        <ProgressBarPreview key="3" />,
        <ProgressStepsPreview key="4" />,
      ],
      // Forms & Input Category
      'Contact Form': [
        <ContactFormSimplePreview key="1" />,
        <ContactFormMultiStepPreview key="2" />,
        <ContactFormFloatingPreview key="3" />,
        <ContactFormInlinePreview key="4" />,
      ],
      'Newsletter Signup': [
        <NewsletterSignupInlinePreview key="1" />,
        <NewsletterSignupModalPreview key="2" />,
        <NewsletterSignupSidebarPreview key="3" />,
        <NewsletterSignupFooterPreview key="4" />,
      ],
      'Search Form': [
        <SearchFormSimplePreview key="1" />,
        <SearchFormAdvancedPreview key="2" />,
        <SearchFormWithSuggestionsPreview key="3" />,
        <SearchFormVoicePreview key="4" />,
      ],
      'Login Form': [
        <LoginFormSimplePreview key="1" />,
        <LoginFormRememberPreview key="2" />,
        <LoginFormSocialPreview key="3" />,
        <LoginFormBiometricPreview key="4" />,
      ],
      'Registration Form': [
        <RegistrationFormSimplePreview key="1" />,
        <RegistrationFormMultiStepPreview key="2" />,
        <RegistrationFormSocialPreview key="3" />,
        <RegistrationFormWizardPreview key="4" />,
      ],
      'Feedback Form': [
        <FeedbackFormSimplePreview key="1" />,
        <FeedbackFormRatingPreview key="2" />,
        <FeedbackFormSurveyPreview key="3" />,
        <FeedbackFormQuickPreview key="4" />,
      ],
      'File Upload': [
        <FileUploadDragDropPreview key="1" />,
        <FileUploadButtonPreview key="2" />,
        <FileUploadProgressPreview key="3" />,
        <FileUploadMultiplePreview key="4" />,
      ],
      'Form Validation': [
        <FormValidationInlinePreview key="1" />,
        <FormValidationSummaryPreview key="2" />,
        <FormValidationTooltipPreview key="3" />,
        <FormValidationRealTimePreview key="4" />,
      ],
      // Media and Gallery Category
      'Photo Gallery': [
        <PhotoGalleryGridPreview key="1" />,
        <PhotoGalleryMasonryPreview key="2" />,
        <PhotoGalleryLightboxPreview key="3" />,
        <PhotoGalleryCarouselPreview key="4" />,
      ],
      'Video Player': [
        <VideoPlayerBasicPreview key="1" />,
        <VideoPlayerCustomControlsPreview key="2" />,
        <VideoPlayerPlaylistPreview key="3" />,
        <VideoPlayerLivePreview key="4" />,
      ],
      'Image Slider': [
        <ImageSliderPreview key="1" />,
        <ImageSliderPreview key="2" />,
        <ImageSliderPreview key="3" />,
        <ImageSliderPreview key="4" />,
      ],
      'Media Grid': [
        <MediaGridPreview key="1" />,
        <MediaGridPreview key="2" />,
        <MediaGridPreview key="3" />,
        <MediaGridPreview key="4" />,
      ],
      'Video Gallery': [
        <VideoGalleryPreview key="1" />,
        <VideoGalleryPreview key="2" />,
        <VideoGalleryPreview key="3" />,
        <VideoGalleryPreview key="4" />,
      ],
      'Audio Player': [
        <AudioPlayerPreview key="1" />,
        <AudioPlayerPreview key="2" />,
        <AudioPlayerPreview key="3" />,
        <AudioPlayerPreview key="4" />,
      ],
      'Image Comparison': [
        <ImageComparisonPreview key="1" />,
        <ImageComparisonPreview key="2" />,
        <ImageComparisonPreview key="3" />,
        <ImageComparisonPreview key="4" />,
      ],
      'Media Upload': [
        <MediaUploadPreview key="1" />,
        <MediaUploadPreview key="2" />,
        <MediaUploadPreview key="3" />,
        <MediaUploadPreview key="4" />,
      ],
      'Slideshow': [
        <SlideshowPreview key="1" />,
        <SlideshowPreview key="2" />,
        <SlideshowPreview key="3" />,
        <SlideshowPreview key="4" />,
      ],
      // News and Content Category
      'Breaking News Ticker': [
        <BreakingNewsTickerHorizontalPreview key="1" />,
        <BreakingNewsTickerVerticalPreview key="2" />,
        <BreakingNewsTickerFadePreview key="3" />,
        <BreakingNewsTickerSlidePreview key="4" />,
      ],
      'Article Card': [
        <ArticleCardHorizontalPreview key="1" />,
        <ArticleCardVerticalPreview key="2" />,
        <ArticleCardFeaturedPreview key="3" />,
        <ArticleCardMinimalPreview key="4" />,
      ],
      'News Grid': [
        <NewsGridPreview key="1" />,
        <NewsGridPreview key="2" />,
        <NewsGridPreview key="3" />,
        <NewsGridPreview key="4" />,
      ],
      'Live Updates': [
        <LiveUpdatesPreview key="1" />,
        <LiveUpdatesPreview key="2" />,
        <LiveUpdatesPreview key="3" />,
        <LiveUpdatesPreview key="4" />,
      ],
      'Trending Topics': [
        <TrendingTopicsPreview key="1" />,
        <TrendingTopicsPreview key="2" />,
        <TrendingTopicsPreview key="3" />,
        <TrendingTopicsPreview key="4" />,
      ],
      'Most Read': [
        <MostReadPreview key="1" />,
        <MostReadPreview key="2" />,
        <MostReadPreview key="3" />,
        <MostReadPreview key="4" />,
      ],
      // E-commerce Category
      'Product Card': [
        <ProductCardGridPreview key="1" />,
        <ProductCardListPreview key="2" />,
        <ProductCardFeaturedPreview key="3" />,
        <ProductCardQuickViewPreview key="4" />,
      ],
      'Shopping Cart': [
        <ShoppingCartDropdownPreview key="1" />,
        <ShoppingCartSidebarPreview key="2" />,
        <ShoppingCartModalPreview key="3" />,
        <ShoppingCartMiniPreview key="4" />,
      ],
      'Product Gallery': [
        <ProductGalleryPreview key="1" />,
        <ProductGalleryPreview key="2" />,
        <ProductGalleryPreview key="3" />,
        <ProductGalleryPreview key="4" />,
      ],
      'Price Display': [
        <PriceDisplayPreview key="1" />,
        <PriceDisplayPreview key="2" />,
        <PriceDisplayPreview key="3" />,
        <PriceDisplayPreview key="4" />,
      ],
      'Add to Cart': [
        <AddToCartButtonPreview key="1" />,
        <AddToCartButtonPreview key="2" />,
        <AddToCartButtonPreview key="3" />,
        <AddToCartButtonPreview key="4" />,
      ],
      'Product Filter': [
        <ProductFilterPreview key="1" />,
        <ProductFilterPreview key="2" />,
        <ProductFilterPreview key="3" />,
        <ProductFilterPreview key="4" />,
      ],
      'Checkout Form': [
        <CheckoutFormPreview key="1" />,
        <CheckoutFormPreview key="2" />,
        <CheckoutFormPreview key="3" />,
        <CheckoutFormPreview key="4" />,
      ],
      'Product Reviews': [
        <ProductReviewsPreview key="1" />,
        <ProductReviewsPreview key="2" />,
        <ProductReviewsPreview key="3" />,
        <ProductReviewsPreview key="4" />,
      ],
      // Social and Engagement Category
      'Social Share': [
        <SocialShareIconsPreview key="1" />,
        <SocialShareButtonsPreview key="2" />,
        <SocialShareFloatingPreview key="3" />,
        <SocialShareInlinePreview key="4" />,
      ],
      'Comment System': [
        <CommentSystemPreview key="1" />,
        <CommentSystemPreview key="2" />,
        <CommentSystemPreview key="3" />,
        <CommentSystemPreview key="4" />,
      ],
      'Rating System': [
        <RatingSystemStarsPreview key="1" />,
        <RatingSystemStarsPreview key="2" />,
        <RatingSystemStarsPreview key="3" />,
        <RatingSystemStarsPreview key="4" />,
      ],
      'Follow Button': [
        <FollowButtonPreview key="1" />,
        <FollowButtonPreview key="2" />,
        <FollowButtonPreview key="3" />,
        <FollowButtonPreview key="4" />,
      ],
      'Social Feed': [
        <SocialFeedPreview key="1" />,
        <SocialFeedPreview key="2" />,
        <SocialFeedPreview key="3" />,
        <SocialFeedPreview key="4" />,
      ],
      'User Profile': [
        <UserProfilePreview key="1" />,
        <UserProfilePreview key="2" />,
        <UserProfilePreview key="3" />,
        <UserProfilePreview key="4" />,
      ],
      // Business and Corporate Category
      'Team Member': [
        <TeamMemberCardPreview key="1" />,
        <TeamMemberGridPreview key="2" />,
        <TeamMemberListPreview key="3" />,
        <TeamMemberDetailedPreview key="4" />,
      ],
      'Testimonial': [
        <TestimonialCardPreview key="1" />,
        <TestimonialCarouselPreview key="2" />,
        <TestimonialGridPreview key="3" />,
        <TestimonialQuotePreview key="4" />,
      ],
      'Pricing Table': [
        <PricingTablePreview key="1" />,
        <PricingTablePreview key="2" />,
        <PricingTablePreview key="3" />,
        <PricingTablePreview key="4" />,
      ],
      'Service Card': [
        <ServiceCardPreview key="1" />,
        <ServiceCardPreview key="2" />,
        <ServiceCardPreview key="3" />,
        <ServiceCardPreview key="4" />,
      ],
      'About Section': [
        <AboutSectionPreview key="1" />,
        <AboutSectionPreview key="2" />,
        <AboutSectionPreview key="3" />,
        <AboutSectionPreview key="4" />,
      ],
      'Contact Info': [
        <ContactInfoPreview key="1" />,
        <ContactInfoPreview key="2" />,
        <ContactInfoPreview key="3" />,
        <ContactInfoPreview key="4" />,
      ],
      'Company Stats': [
        <CompanyStatsPreview key="1" />,
        <CompanyStatsPreview key="2" />,
        <CompanyStatsPreview key="3" />,
        <CompanyStatsPreview key="4" />,
      ],
      'FAQ Section': [
        <FAQSectionPreview key="1" />,
        <FAQSectionPreview key="2" />,
        <FAQSectionPreview key="3" />,
        <FAQSectionPreview key="4" />,
      ],
      // Dashboard and Admin Category
      'Dashboard Widget': [
        <DashboardWidgetChartPreview key="1" />,
        <DashboardWidgetStatPreview key="2" />,
        <DashboardWidgetListPreview key="3" />,
        <DashboardWidgetProgressPreview key="4" />,
      ],
      'Data Table': [
        <DataTablePreview key="1" />,
        <DataTablePreview key="2" />,
        <DataTablePreview key="3" />,
        <DataTablePreview key="4" />,
      ],
      'Analytics Card': [
        <AnalyticsCardPreview key="1" />,
        <AnalyticsCardPreview key="2" />,
        <AnalyticsCardPreview key="3" />,
        <AnalyticsCardPreview key="4" />,
      ],
      'Status Indicator': [
        <StatusIndicatorPreview key="1" />,
        <StatusIndicatorPreview key="2" />,
        <StatusIndicatorPreview key="3" />,
        <StatusIndicatorPreview key="4" />,
      ],
      'Action Button': [
        <ActionButtonPreview key="1" />,
        <ActionButtonPreview key="2" />,
        <ActionButtonPreview key="3" />,
        <ActionButtonPreview key="4" />,
      ],
      'Settings Panel': [
        <SettingsPanelPreview key="1" />,
        <SettingsPanelPreview key="2" />,
        <SettingsPanelPreview key="3" />,
        <SettingsPanelPreview key="4" />,
      ],
      // Marketing and Promotion Category
      'Call to Action': [
        <CallToActionButtonPreview key="1" />,
        <CallToActionBannerPreview key="2" />,
        <CallToActionModalPreview key="3" />,
        <CallToActionInlinePreview key="4" />,
      ],
      'Promotional Banner': [
        <PromotionalBannerPreview key="1" />,
        <PromotionalBannerPreview key="2" />,
        <PromotionalBannerPreview key="3" />,
        <PromotionalBannerPreview key="4" />,
      ],
      'Feature Highlight': [
        <FeatureHighlightPreview key="1" />,
        <FeatureHighlightPreview key="2" />,
        <FeatureHighlightPreview key="3" />,
        <FeatureHighlightPreview key="4" />,
      ],
      'Newsletter Banner': [
        <NewsletterBannerPreview key="1" />,
        <NewsletterBannerPreview key="2" />,
        <NewsletterBannerPreview key="3" />,
        <NewsletterBannerPreview key="4" />,
      ],
      'Discount Badge': [
        <DiscountBadgePreview key="1" />,
        <DiscountBadgePreview key="2" />,
        <DiscountBadgePreview key="3" />,
        <DiscountBadgePreview key="4" />,
      ],
      'Landing Hero': [
        <LandingHeroPreview key="1" />,
        <LandingHeroPreview key="2" />,
        <LandingHeroPreview key="3" />,
        <LandingHeroPreview key="4" />,
      ],
    }

    const previews = previewMap[selectedItem || ''] || []

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6">
          {panel.variations.map((variation, index) => {
            const isShowingCode = viewingCode === variation.id
            
            return (
              <div
                key={variation.id}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                {/* Card Header */}
                <div className="bg-muted/30 px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{variation.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{variation.description}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md capitalize">
                      {variation.style}
                    </span>
                  </div>
                </div>

                {/* Content Area - Show either UI or Code, not both */}
                {!isShowingCode ? (
                  // Live Preview View
                  <div className="p-6 bg-background">
                    {previews[index] || (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Live preview not yet available</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Code View with Customization
                  <div className="p-4 space-y-4">
                    {/* Customization Panel */}
                    <div className="border border-border rounded-lg p-3 bg-muted/30">
                      <button
                        onClick={() => setShowCustomization(!showCustomization)}
                        className="w-full flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        <span>Customize Template</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showCustomization && "rotate-180")} />
                      </button>
                      
                      {showCustomization && (
                        <div className="mt-3 space-y-3 pt-3 border-t border-border">
                          <div>
                            <label className="text-xs font-medium text-foreground block mb-1.5">Primary Color</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={customization.primaryColor}
                                onChange={(e) => setCustomization({...customization, primaryColor: e.target.value})}
                                className="h-8 w-12 rounded cursor-pointer border border-border"
                              />
                              <input
                                type="text"
                                value={customization.primaryColor}
                                onChange={(e) => setCustomization({...customization, primaryColor: e.target.value})}
                                className="flex-1 px-2 py-1 text-xs bg-background border border-border rounded text-foreground"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-xs font-medium text-foreground block mb-1.5">Font Family</label>
                            <select
                              value={customization.fontFamily}
                              onChange={(e) => setCustomization({...customization, fontFamily: e.target.value})}
                              className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded text-foreground"
                            >
                              <option value="system">System Default</option>
                              <option value="sans">Sans Serif</option>
                              <option value="serif">Serif</option>
                              <option value="mono">Monospace</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Code Display */}
                    <div className="relative">
                      <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto text-xs max-h-96 overflow-y-auto">
                        <code className="text-foreground">{generateCustomizedCode(variation.code)}</code>
                      </pre>
                      <button
                        onClick={() => copyCode(generateCustomizedCode(variation.code), variation.id)}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-background/80 border border-border hover:bg-accent transition-colors"
                        title="Copy customized code"
                      >
                        {copiedId === variation.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Card Footer - Metadata Display */}
                <div className="px-6 py-4 bg-muted/20 border-t border-border space-y-3">
                  {/* Quick Metadata */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Complexity:</span>
                        <span className="capitalize">{variation.metadata.complexity}</span>
                      </span>
                      {variation.metadata.responsive && <span className="flex items-center gap-1 text-green-600 dark:text-green-400">✓ Responsive</span>}
                      {variation.metadata.accessible && <span className="flex items-center gap-1 text-green-600 dark:text-green-400">✓ Accessible</span>}
                      {variation.metadata.darkModeSupport && <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">✓ Dark Mode</span>}
                    </div>
                  </div>

                  {/* Features and Use Cases */}
                  {(variation.metadata.features.length > 0 || variation.metadata.useCases.length > 0) && (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {variation.metadata.features.length > 0 && (
                        <div>
                          <p className="font-medium text-foreground mb-1">Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {variation.metadata.features.map((feature, i) => (
                              <span key={i} className="px-2 py-0.5 bg-accent text-accent-foreground rounded text-xs">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {variation.metadata.useCases.length > 0 && (
                        <div>
                          <p className="font-medium text-foreground mb-1">Use Cases:</p>
                          <div className="flex flex-wrap gap-1">
                            {variation.metadata.useCases.map((useCase, i) => (
                              <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                                {useCase}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Implementation Notes */}
                  {variation.metadata.implementationNotes.length > 0 && (
                    <div className="text-xs">
                      <p className="font-medium text-foreground mb-1">Implementation Notes:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                        {variation.metadata.implementationNotes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="text-xs text-muted-foreground">
                      <span>v{variation.metadata.version}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isShowingCode && (
                        <button
                          onClick={() => setViewingCode(null)}
                          className="px-3 py-1.5 bg-background border border-border text-foreground rounded-md hover:bg-accent transition-colors text-xs font-medium"
                        >
                          Show UI
                        </button>
                      )}
                      <button
                        onClick={() => setViewingCode(isShowingCode ? null : variation.id)}
                        className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-xs font-medium"
                      >
                        {isShowingCode ? 'Hide Code' : 'View Code'}
                      </button>
                      {!isShowingCode && (
                        <button
                          onClick={() => copyCode(variation.code, variation.id)}
                          className="px-3 py-1.5 bg-background border border-border text-foreground rounded-md hover:bg-accent transition-colors text-xs font-medium"
                        >
                          {copiedId === variation.id ? 'Copied!' : 'Copy Code'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (!selectedItem) {
    return (
      <div className="relative h-full w-full">
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground shadow-lg"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-4 w-4" />
              Light
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              Dark
            </>
          )}
        </button>
        <NewsTemplateLanding />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-background transition-opacity duration-300",
        mounted ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Preview Header */}
      <div className="border-b border-border bg-card px-8 py-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Template Preview</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">{selectedItem}</h1>
            <p className="text-sm text-muted-foreground">A production-ready component for your website</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                Light
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-background p-8">
        <div className="mx-auto max-w-6xl space-y-6">{renderTemplateVariations()}</div>
      </div>
    </div>
  )
}


