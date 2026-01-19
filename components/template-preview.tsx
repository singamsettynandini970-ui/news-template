"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Sparkles,
  Moon,
  Sun,
  Search,
  ShoppingCart,
  User,
  Users,
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
  Star,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NewsTemplateLanding } from "./news-template-landing"
import type { ExtendedPanel } from "@/lib/template-registry"
import { TEMPLATE_REGISTRY } from "@/lib/template-data"
import MediaGalleryPreview from "./previews/media-gallery-preview"
import NewsContentPreview from "./previews/news-content-preview"
import EcommercePreview from "./previews/ecommerce-preview"
import SocialEngagementPreview from "./previews/social-engagement-preview"
import BusinessCorporatePreview from "./previews/business-corporate-preview"
import MarketingPromotionsPreview from "./previews/marketing-promotions-preview"

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

  // Image Slider Variations
  // Variation 1: Classic Dot Navigation Slider
  const ImageSliderClassicPreview = () => {
    const [current, setCurrent] = useState(0)
    const slides = [
      { bg: 'from-rose-400 to-orange-300', title: 'Summer Collection', subtitle: 'Explore new arrivals' },
      { bg: 'from-blue-400 to-cyan-300', title: 'Winter Sale', subtitle: 'Up to 50% off' },
      { bg: 'from-emerald-400 to-teal-300', title: 'Spring Fashion', subtitle: 'Fresh styles' },
      { bg: 'from-violet-400 to-purple-300', title: 'Autumn Vibes', subtitle: 'Cozy essentials' }
    ]
    return (
      <div className="w-full max-w-2xl">
        <div className={`relative h-56 bg-gradient-to-br ${slides[current].bg} rounded-2xl overflow-hidden shadow-xl`}>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div>
              <h2 className="text-3xl font-black">{slides[current].title}</h2>
              <p className="mt-2 text-white/80">{slides[current].subtitle}</p>
            </div>
          </div>
          <button onClick={() => setCurrent(c => c > 0 ? c - 1 : slides.length - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors">
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </button>
          <button onClick={() => setCurrent(c => c < slides.length - 1 ? c + 1 : 0)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors">
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </button>
        </div>
        <div className="mt-4 flex gap-2 justify-center">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-2 transition-all rounded-full ${i === current ? 'w-8 bg-slate-800' : 'w-2 bg-slate-300 hover:bg-slate-400'}`} />
          ))}
        </div>
      </div>
    )
  }

  // Variation 2: Modern Fullwidth with Progress Bar
  const ImageSliderModernPreview = () => {
    const [active, setActive] = useState(0)
    return (
      <div className="w-full max-w-2xl">
        <div className="relative h-64 bg-slate-900 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30" />
          <div className="absolute inset-0 flex items-center p-8">
            <div className="max-w-md">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-bold">NEW</span>
              <h2 className="mt-3 text-3xl font-black text-white">Modern Design System</h2>
              <p className="mt-2 text-white/70">Create beautiful interfaces with our component library</p>
              <button className="mt-4 px-6 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors">Explore</button>
            </div>
          </div>
          <div className="absolute bottom-4 left-8 right-8">
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <button key={i} onClick={() => setActive(i)} className={`flex-1 h-1 rounded-full transition-all ${i === active ? 'bg-white' : 'bg-white/30'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variation 3: Thumbnail Gallery Slider
  const ImageSliderThumbnailPreview = () => {
    const [selected, setSelected] = useState(0)
    const images = ['from-amber-200 to-yellow-400', 'from-sky-200 to-blue-400', 'from-pink-200 to-rose-400', 'from-lime-200 to-green-400']
    return (
      <div className="w-full max-w-2xl bg-white p-4 rounded-2xl shadow-lg border border-slate-100">
        <div className={`h-52 bg-gradient-to-br ${images[selected]} rounded-xl mb-4 flex items-center justify-center`}>
          <span className="text-white/80 font-bold text-lg">Product Image {selected + 1}</span>
        </div>
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button key={i} onClick={() => setSelected(i)} className={`flex-1 h-16 bg-gradient-to-br ${img} rounded-lg transition-all ${i === selected ? 'ring-2 ring-slate-900 ring-offset-2 scale-95' : 'opacity-60 hover:opacity-100'}`} />
          ))}
        </div>
      </div>
    )
  }

  // Variation 4: Autoplay with Timer Indicator
  const ImageSliderAutoplayPreview = () => {
    const [slide, setSlide] = useState(0)
    useEffect(() => {
      const timer = setInterval(() => setSlide(s => (s + 1) % 3), 3000)
      return () => clearInterval(timer)
    }, [])
    const slides = [
      { bg: 'from-indigo-600 to-violet-600', icon: '🚀', text: 'Launch Your Project' },
      { bg: 'from-emerald-600 to-teal-600', icon: '📈', text: 'Grow Your Business' },
      { bg: 'from-orange-600 to-red-600', icon: '🎯', text: 'Reach Your Goals' }
    ]
    return (
      <div className="w-full max-w-2xl">
        <div className={`relative h-52 bg-gradient-to-r ${slides[slide].bg} rounded-2xl overflow-hidden shadow-2xl transition-all duration-500`}>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <span className="text-5xl">{slides[slide].icon}</span>
              <h3 className="mt-3 text-2xl font-black">{slides[slide].text}</h3>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-white font-medium">Auto-play</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div className="h-full bg-white/80 animate-[progress_3s_linear_infinite]" style={{ width: '100%' }} />
          </div>
        </div>
        <div className="mt-4 flex gap-2 justify-center">
          {slides.map((_, i) => (
            <div key={i} className={`h-1.5 w-12 rounded-full transition-all ${i === slide ? 'bg-slate-800' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>
    )
  }

  // Media Grid Variations
  // Variation 1: Classic Equal Grid
  const MediaGridClassicPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-3 gap-3">
        {['from-rose-300 to-pink-400', 'from-amber-300 to-orange-400', 'from-emerald-300 to-teal-400', 'from-sky-300 to-blue-400', 'from-violet-300 to-purple-400', 'from-slate-300 to-gray-400'].map((gradient, i) => (
          <div key={i} className={`aspect-square bg-gradient-to-br ${gradient} rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer`} />
        ))}
      </div>
    </div>
  )

  // Variation 2: Pinterest-style Masonry
  const MediaGridMasonryPreview = () => (
    <div className="w-full max-w-2xl columns-3 gap-3">
      {[
        { h: 'h-48', color: 'from-pink-400 to-rose-500' },
        { h: 'h-32', color: 'from-cyan-400 to-blue-500' },
        { h: 'h-56', color: 'from-amber-400 to-orange-500' },
        { h: 'h-40', color: 'from-emerald-400 to-teal-500' },
        { h: 'h-52', color: 'from-violet-400 to-purple-500' },
        { h: 'h-36', color: 'from-red-400 to-pink-500' }
      ].map((item, i) => (
        <div key={i} className={`${item.h} mb-3 break-inside-avoid bg-gradient-to-br ${item.color} rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer`} />
      ))}
    </div>
  )

  // Variation 3: Filterable Gallery with Pills
  const MediaGridFilterablePreview = () => {
    const [filter, setFilter] = useState('all')
    return (
      <div className="w-full max-w-2xl">
        <div className="flex gap-2 mb-4">
          {['All', 'Photos', 'Videos', 'Art'].map(f => (
            <button key={f} onClick={() => setFilter(f.toLowerCase())} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f.toLowerCase() ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{f}</button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`aspect-square rounded-xl overflow-hidden ${i % 3 === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <div className={`w-full h-full bg-gradient-to-br ${['from-indigo-400 to-blue-500', 'from-pink-400 to-rose-500', 'from-emerald-400 to-cyan-500', 'from-amber-400 to-orange-500'][i % 4]} hover:scale-110 transition-transform`} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Variation 4: Interactive Grid with Hover Details
  const MediaGridInteractivePreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-4">
      {[
        { title: 'Mountain View', likes: '2.4K', gradient: 'from-slate-700 to-slate-900' },
        { title: 'Ocean Sunset', likes: '1.8K', gradient: 'from-orange-500 to-rose-600' },
        { title: 'City Lights', likes: '3.1K', gradient: 'from-indigo-600 to-purple-700' },
        { title: 'Forest Path', likes: '982', gradient: 'from-emerald-600 to-teal-700' },
        { title: 'Desert Dunes', likes: '1.5K', gradient: 'from-amber-500 to-orange-600' },
        { title: 'Northern Lights', likes: '4.2K', gradient: 'from-cyan-500 to-blue-600' }
      ].map((item, i) => (
        <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg">
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-white/80 flex items-center justify-center gap-1 mt-1">
                <Heart className="h-3 w-3" /> {item.likes}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  // Video Gallery Variations
  // Variation 1: Featured Hero Video
  const VideoGalleryFeaturedPreview = () => (
    <div className="w-full max-w-2xl space-y-4">
      <div className="relative h-56 bg-slate-900 rounded-2xl overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="h-10 w-10 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">LIVE</span>
          <h3 className="mt-2 text-white font-bold text-lg">Featured Documentary: Into the Wild</h3>
          <p className="text-white/70 text-sm">2.3M views • 45:32</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="aspect-video bg-slate-800 rounded-xl relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Variation 2: YouTube-style Grid
  const VideoGalleryGridPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-4">
      {[
        { title: 'Tech Review', channel: 'TechWorld', views: '1.2M', gradient: 'from-blue-600 to-cyan-500' },
        { title: 'Cooking Tips', channel: 'ChefMaster', views: '890K', gradient: 'from-orange-500 to-red-500' },
        { title: 'Travel Vlog', channel: 'Wanderlust', views: '2.1M', gradient: 'from-emerald-500 to-teal-500' },
        { title: 'Music Mix', channel: 'BeatLab', views: '5.4M', gradient: 'from-purple-600 to-pink-500' },
        { title: 'Fitness', channel: 'FitLife', views: '743K', gradient: 'from-red-500 to-rose-500' },
        { title: 'Gaming', channel: 'ProGamer', views: '3.8M', gradient: 'from-indigo-600 to-violet-500' }
      ].map((video, i) => (
        <div key={i} className="group cursor-pointer">
          <div className={`aspect-video bg-gradient-to-br ${video.gradient} rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <Play className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-xs text-white">12:34</div>
          </div>
          <div className="mt-2">
            <p className="font-semibold text-sm text-slate-900 line-clamp-2">{video.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{video.channel} • {video.views} views</p>
          </div>
        </div>
      ))}
    </div>
  )

  // Variation 3: Compact List View
  const VideoGalleryListPreview = () => (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {[
        { title: 'Introduction to Machine Learning', duration: '45:21', views: '125K' },
        { title: 'Building Your First App', duration: '32:15', views: '89K' },
        { title: 'Advanced CSS Techniques', duration: '28:44', views: '67K' },
        { title: 'Database Design Patterns', duration: '51:08', views: '43K' }
      ].map((video, i) => (
        <div key={i} className={`flex gap-4 p-4 hover:bg-slate-50 cursor-pointer transition-colors ${i !== 0 ? 'border-t border-slate-100' : ''}`}>
          <div className="w-40 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 relative">
            <Play className="h-8 w-8 text-white" />
            <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 rounded text-xs text-white">{video.duration}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 mb-1">{video.title}</h4>
            <p className="text-sm text-slate-500">{video.views} views</p>
            <div className="mt-2 flex gap-2">
              <span className="px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-600">Tutorial</span>
              <span className="px-2 py-1 bg-blue-100 rounded-full text-xs text-blue-600">HD</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  // Variation 4: Cinema/Theater Mode
  const VideoGalleryTheaterPreview = () => (
    <div className="w-full max-w-2xl bg-black rounded-3xl overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer">
            <Play className="h-12 w-12 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-xl">Cinematic Experience</h3>
              <p className="text-white/60 text-sm mt-1">4K Ultra HD • Dolby Atmos</p>
            </div>
            <div className="flex gap-3">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Heart className="h-5 w-5 text-white" />
              </button>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Expand className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          <div className="mt-4 h-1 bg-white/20 rounded-full">
            <div className="h-full w-1/3 bg-red-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )

  // Audio Player Variations
  const AudioPlayerMinimalPreview = () => (
    <div className="w-full max-w-md flex items-center gap-3 p-3 border border-border rounded-lg bg-card">
      <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
        <Play className="h-4 w-4" />
      </button>
      <div className="flex-1 h-1 bg-border rounded-full">
        <div className="h-full bg-primary rounded-full" style={{ width: '40%' }} />
      </div>
      <span className="text-xs text-muted-foreground">1:45</span>
    </div>
  )

  const AudioPlayerWaveformPreview = () => (
    <div className="w-full max-w-md p-4 border border-border rounded-lg bg-card space-y-3">
      <div className="flex items-end gap-1 justify-center h-16">
        {[30, 50, 40, 70, 45, 80, 60, 35, 75, 50, 40, 60].map((h, i) => (
          <div key={i} className="w-2 bg-primary rounded-t transition-all" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full bg-primary text-primary-foreground">
          <Play className="h-4 w-4" />
        </button>
        <div className="flex-1 text-sm text-foreground">Track Name</div>
        <span className="text-xs text-muted-foreground">2:30</span>
      </div>
    </div>
  )

  const AudioPlayerPlaylistPreview = () => (
    <div className="w-full max-w-md border border-border rounded-lg overflow-hidden">
      <div className="p-3 bg-primary/10 flex items-center gap-3">
        <button className="p-2 rounded-full bg-primary text-primary-foreground">
          <Play className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Now Playing</p>
          <div className="h-1 bg-border rounded-full mt-1">
            <div className="h-full bg-primary rounded-full" style={{ width: '45%' }} />
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-2 hover:bg-accent cursor-pointer text-sm text-foreground">Track {i}</div>
        ))}
      </div>
    </div>
  )

  const AudioPlayerModernPreview = () => (
    <div className="w-full max-w-md bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 space-y-4">
      <div className="text-center">
        <p className="text-lg font-bold text-foreground">Song Title</p>
        <p className="text-sm text-muted-foreground">Artist Name</p>
      </div>
      <div className="h-1 bg-border rounded-full">
        <div className="h-full bg-primary rounded-full" style={{ width: '40%' }} />
      </div>
      <div className="flex items-center justify-center gap-4">
        <button className="p-2 rounded-full hover:bg-accent"><ChevronLeft className="h-5 w-5" /></button>
        <button className="p-4 rounded-full bg-primary text-primary-foreground">
          <Play className="h-6 w-6" />
        </button>
        <button className="p-2 rounded-full hover:bg-accent"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </div>
  )

  // Image Comparison Variations
  const ImageComparisonSliderPreview = () => (
    <div className="w-full max-w-md relative h-48 rounded-lg overflow-hidden border border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 w-1/2"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-12 bg-primary cursor-col-resize"></div>
      <p className="absolute top-2 left-2 text-xs text-foreground">Before</p>
      <p className="absolute top-2 right-2 text-xs text-foreground">After</p>
    </div>
  )

  const ImageComparisonSideBySidePreview = () => (
    <div className="w-full max-w-md flex gap-2">
      <div className="flex-1 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
        <span className="text-xs text-foreground">Before</span>
      </div>
      <div className="flex-1 h-48 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
        <span className="text-xs text-foreground">After</span>
      </div>
    </div>
  )

  const ImageComparisonOverlayPreview = () => (
    <div className="w-full max-w-md relative h-48 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-50 hover:opacity-0 transition-opacity"></div>
      <p className="absolute top-2 left-2 text-xs text-foreground bg-black/50 px-2 py-1 rounded">Hover to compare</p>
    </div>
  )

  const ImageComparisonHotspotsPreview = () => (
    <div className="w-full max-w-md relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
      <div className="absolute top-1/4 left-1/3 h-4 w-4 bg-primary rounded-full cursor-pointer animate-pulse"></div>
      <div className="absolute top-1/2 right-1/3 h-4 w-4 bg-primary rounded-full cursor-pointer animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/2 h-4 w-4 bg-primary rounded-full cursor-pointer animate-pulse"></div>
    </div>
  )

  // Media Upload Variations
  const MediaUploadDragDropPreview = () => (
    <div className="w-full max-w-md p-8 border-2 border-dashed border-border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
      <Play className="h-8 w-8 text-primary mx-auto mb-2" />
      <p className="text-sm text-foreground font-medium">Drag & Drop Files</p>
      <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
    </div>
  )

  const MediaUploadMultiStepPreview = () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-1">
        <div className="flex-1 h-1 bg-primary rounded-full"></div>
        <div className="flex-1 h-1 bg-border rounded-full"></div>
        <div className="flex-1 h-1 bg-border rounded-full"></div>
      </div>
      <div className="p-6 border border-border rounded-lg text-center">
        <p className="text-sm font-medium text-foreground">Select Files</p>
      </div>
    </div>
  )

  const MediaUploadFileManagerPreview = () => (
    <div className="w-full max-w-md border border-border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <p className="text-sm font-medium text-foreground">Files</p>
        <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">Upload</button>
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center justify-between p-2 hover:bg-accent rounded">
          <span className="text-sm text-foreground">file{i}.jpg</span>
          <X className="h-4 w-4 cursor-pointer" />
        </div>
      ))}
    </div>
  )

  const MediaUploadProgressPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Uploading file.mp4</span>
        <span className="text-xs text-muted-foreground">65%</span>
      </div>
      <div className="h-2 bg-border rounded-full">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: '65%' }} />
      </div>
    </div>
  )

  // Slideshow Variations
  const SlideshowClassicPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
        <p className="text-foreground">Slide 1 of 5</p>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button className="px-3 py-1 text-xs border border-border rounded hover:bg-accent">Pause</button>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className={`h-1 w-8 rounded-full ${i === 1 ? 'bg-primary' : 'bg-border'}`} />)}
        </div>
        <button className="px-3 py-1 text-xs border border-border rounded hover:bg-accent">Next</button>
      </div>
    </div>
  )

  const SlideshowFullscreenPreview = () => (
    <div className="w-full max-w-2xl h-64 bg-black rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-xl">Fullscreen Slideshow</p>
      </div>
      <button className="absolute top-4 right-4 p-2 bg-white/20 rounded hover:bg-white/30">
        <Expand className="h-5 w-5 text-white" />
      </button>
    </div>
  )

  const SlideshowThumbnailNavPreview = () => (
    <div className="w-full max-w-2xl space-y-3">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg"></div>
      <div className="flex gap-2 overflow-x-auto">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-16 w-24 flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded cursor-pointer ${i === 1 ? 'ring-2 ring-primary' : ''}`} />
        ))}
      </div>
    </div>
  )

  const SlideshowGridOverviewPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-4 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded cursor-pointer hover:ring-2 ring-primary transition-all" />
      ))}
    </div>
  )

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

  const ProductGalleryCarouselPreview = () => {
    const [current, setCurrent] = useState(0)
    return (
      <div className="w-full max-w-2xl space-y-3">
        <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
          <p className="text-foreground">Image {current + 1}</p>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrent((current - 1 + 4) % 4)} className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(i => <div key={i} className={`h-2 w-2 rounded-full ${i === current ? 'bg-primary' : 'bg-border'}`} />)}
          </div>
          <button onClick={() => setCurrent((current + 1) % 4)} className="p-2 rounded-lg hover:bg-accent transition-colors"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    )
  }

  const ProductGalleryGridPreview = () => (
    <div className="w-full max-w-2xl space-y-3">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg"></div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg cursor-pointer hover:ring-2 ring-primary transition-all"></div>
        ))}
      </div>
    </div>
  )

  const ProductGalleryZoomPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group cursor-zoom-in">
        <p className="text-foreground">Hover to zoom</p>
      </div>
    </div>
  )

  const ProductGalleryThumbnailPreview = () => (
    <div className="w-full max-w-2xl flex gap-3">
      <div className="w-24 space-y-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded cursor-pointer hover:ring-2 ring-primary transition-all"></div>
        ))}
      </div>
      <div className="flex-1 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg"></div>
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

  const PriceDisplayBasicPreview = () => (
    <div className="w-full max-w-sm p-4 border border-border rounded-lg">
      <p className="text-2xl font-bold text-primary">$29.99</p>
    </div>
  )

  const PriceDisplaySalePreview = () => (
    <div className="w-full max-w-sm p-4 border border-border rounded-lg">
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-primary">$29.99</p>
        <p className="text-sm text-muted-foreground line-through">$49.99</p>
        <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">40% OFF</span>
      </div>
    </div>
  )

  const PriceDisplayTieredPreview = () => (
    <div className="w-full max-w-sm p-4 border border-border rounded-lg space-y-2">
      <div className="text-xs text-muted-foreground">Starting at</div>
      <p className="text-2xl font-bold text-primary">$29.99</p>
      <div className="space-y-1 text-xs text-muted-foreground">
        <p>• 1-10 items: $29.99 each</p>
        <p>• 11-50 items: $24.99 each</p>
        <p>• 51+ items: $19.99 each</p>
      </div>
    </div>
  )

  const PriceDisplaySubscriptionPreview = () => (
    <div className="w-full max-w-sm p-4 border border-border rounded-lg space-y-2">
      <p className="text-2xl font-bold text-primary">$29.99<span className="text-sm text-muted-foreground">/month</span></p>
      <p className="text-xs text-muted-foreground">Or $299/year (save 17%)</p>
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

  const AddToCartSimplePreview = () => (
    <div className="w-full max-w-sm">
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
        Add to Cart
      </button>
    </div>
  )

  const AddToCartQuantityPreview = () => (
    <div className="w-full max-w-sm flex items-center gap-2">
      <input type="number" defaultValue="1" min="1" className="w-16 px-2 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
      <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
        Add to Cart
      </button>
    </div>
  )

  const AddToCartVariantPreview = () => (
    <div className="w-full max-w-sm space-y-3">
      <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm">
        <option>Size: Medium</option>
        <option>Size: Large</option>
      </select>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
        Add to Cart
      </button>
    </div>
  )

  const AddToCartAnimatedPreview = () => (
    <div className="w-full max-w-sm">
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
        Add to Cart
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

  const ProductFilterSidebarPreview = () => (
    <div className="w-full max-w-xs border border-border rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-foreground">Filters</h3>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-foreground mb-2">Category</p>
          {['Electronics', 'Clothing', 'Books'].map(cat => (
            <label key={cat} className="flex items-center gap-2 text-xs text-foreground cursor-pointer py-1">
              <input type="checkbox" className="rounded" />
              {cat}
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const ProductFilterDropdownPreview = () => (
    <div className="w-full max-w-sm flex gap-2">
      <select className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm">
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Clothing</option>
      </select>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Filter</button>
    </div>
  )

  const ProductFilterChipsPreview = () => (
    <div className="w-full max-w-md flex flex-wrap gap-2">
      {['Electronics', 'Sale', 'Featured', 'New'].map(chip => (
        <button key={chip} className="px-3 py-1 bg-accent text-foreground rounded-full text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
          {chip} ×
        </button>
      ))}
    </div>
  )

  const ProductFilterAdvancedPreview = () => (
    <div className="w-full max-w-sm space-y-3 p-4 border border-border rounded-lg">
      <h3 className="font-semibold text-foreground">Advanced Filters</h3>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Price Range</label>
          <input type="range" min="0" max="100" className="w-full" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Rating</label>
          <input type="range" min="0" max="5" className="w-full" />
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

  const CheckoutFormSimplePreview = () => (
    <div className="w-full max-w-md space-y-3">
      <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
      <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Complete Purchase</button>
    </div>
  )

  const CheckoutFormMultiStepPreview = () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-1">
        <div className="flex-1 h-1 bg-primary rounded-full"></div>
        <div className="flex-1 h-1 bg-border rounded-full"></div>
        <div className="flex-1 h-1 bg-border rounded-full"></div>
      </div>
      <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Next</button>
    </div>
  )

  const CheckoutFormExpressPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        Express Checkout
      </button>
      <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div><div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground">Or</span></div></div>
      <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm" />
    </div>
  )

  const CheckoutFormGuestPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Sign In</button>
        <button className="flex-1 px-4 py-2 border border-border rounded-lg text-sm hover:bg-accent transition-colors">Guest Checkout</button>
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

  const ProductReviewsListPreview = () => (
    <div className="w-full max-w-md space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Reviewer {i}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(j => <span key={j} className={`text-xs ${j <= 4 ? 'text-yellow-500' : 'text-border'}`}>★</span>)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Great product!</p>
        </div>
      ))}
    </div>
  )

  const ProductReviewsSummaryPreview = () => (
    <div className="w-full max-w-md p-4 border border-border rounded-lg space-y-3">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground">4.5</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => <span key={i} className={`text-xs ${i <= 4 ? 'text-yellow-500' : 'text-border'}`}>★</span>)}
          </div>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map(i => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span>{i}★</span>
              <div className="flex-1 h-2 bg-border rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: `${i * 20}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const ProductReviewsFilteredPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">All</button>
        <button className="px-3 py-1 border border-border rounded text-xs hover:bg-accent transition-colors">5★</button>
        <button className="px-3 py-1 border border-border rounded text-xs hover:bg-accent transition-colors">4★</button>
      </div>
      <div className="p-3 border border-border rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Reviewer</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-xs text-yellow-500">★</span>)}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Excellent!</p>
      </div>
    </div>
  )

  const ProductReviewsVerifiedPreview = () => (
    <div className="w-full max-w-md space-y-3">
      {[1, 2].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">Verified Buyer</p>
              <span className="px-2 py-0.5 bg-green-500/10 text-green-700 text-xs rounded">✓ Verified</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(j => <span key={j} className={`text-xs ${j <= 4 ? 'text-yellow-500' : 'text-border'}`}>★</span>)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Great product!</p>
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

  const CommentSystemThreadedPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <textarea placeholder="Add a comment..." className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm resize-none" rows={2} />
      <div className="space-y-3">
        <div className="border-l-2 border-border pl-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-primary/20"></div>
            <p className="text-xs font-medium text-foreground">User 1</p>
          </div>
          <p className="text-xs text-foreground mb-2">Main comment</p>
          <div className="border-l-2 border-border pl-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20"></div>
              <p className="text-xs font-medium text-foreground">User 2</p>
            </div>
            <p className="text-xs text-muted-foreground">Reply to comment</p>
          </div>
        </div>
      </div>
    </div>
  )

  const CommentSystemFlatPreview = () => (
    <div className="w-full max-w-md space-y-2">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg hover:bg-accent transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-primary/20"></div>
            <p className="text-xs font-medium text-foreground">User {i}</p>
          </div>
          <p className="text-xs text-foreground">Comment text here</p>
        </div>
      ))}
    </div>
  )

  const CommentSystemModeratedPreview = () => (
    <div className="w-full max-w-md space-y-3">
      <div className="p-3 bg-accent/50 border border-border rounded-lg">
        <p className="text-xs text-foreground mb-2">Your comment will be reviewed before publishing</p>
        <textarea placeholder="Add a comment..." className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm resize-none" rows={2} />
      </div>
    </div>
  )

  const CommentSystemRealtimePreview = () => (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
        <p className="text-xs text-muted-foreground">Live comments</p>
      </div>
      {[1, 2].map(i => (
        <div key={i} className="p-2 border border-border rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary/20"></div>
            <p className="text-xs font-medium text-foreground">User {i}</p>
            <p className="text-xs text-muted-foreground">Just now</p>
          </div>
          <p className="text-xs text-foreground mt-1">Comment {i}</p>
        </div>
      ))}
    </div>
  )

  const RatingSystemThumbsPreview = () => (
    <div className="w-full max-w-md space-y-3 p-4 border border-border rounded-lg">
      <p className="text-sm font-medium text-foreground">Was this helpful?</p>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
          <span className="text-lg">👍</span>
          <span className="text-sm font-medium">Yes (234)</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
          <span className="text-lg">👎</span>
          <span className="text-sm font-medium">No (12)</span>
        </button>
      </div>
    </div>
  )

  const RatingSystemEmojiPreview = () => (
    <div className="w-full max-w-md space-y-3 p-4 border border-border rounded-lg">
      <p className="text-sm font-medium text-foreground">How do you feel about this?</p>
      <div className="flex gap-2 justify-center">
        {['😍', '😊', '😐', '😕', '😢'].map((emoji, i) => (
          <button key={i} className="p-3 text-2xl hover:scale-110 transition-transform cursor-pointer">
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )

  const RatingSystemDetailedPreview = () => (
    <div className="w-full max-w-md space-y-4 p-4 border border-border rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <button key={i} className="text-2xl text-yellow-500">★</button>
          ))}
        </div>
        <span className="text-sm font-bold text-foreground">4.5/5</span>
      </div>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map(stars => (
          <div key={stars} className="flex items-center gap-2 text-xs">
            <span className="w-8 text-foreground">{stars}★</span>
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${stars * 20}%` }} />
            </div>
            <span className="w-8 text-muted-foreground">{stars * 20}%</span>
          </div>
        ))}
      </div>
    </div>
  )

  const FollowButtonSimplePreview = () => (
    <div className="w-full max-w-md">
      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
        Follow
      </button>
    </div>
  )

  const FollowButtonCountPreview = () => (
    <div className="w-full max-w-md space-y-2">
      <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm flex items-center justify-center gap-2">
        <span>Follow</span>
        <span className="px-2 py-0.5 bg-primary-foreground/20 rounded-full text-xs">1.2K</span>
      </button>
    </div>
  )

  const FollowButtonAnimatedPreview = () => (
    <div className="w-full max-w-md">
      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 active:scale-95 transition-transform font-medium text-sm">
        Follow
      </button>
    </div>
  )

  const FollowButtonMultiPreview = () => (
    <div className="w-full max-w-md flex gap-2">
      <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Follow</button>
      <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm">Message</button>
    </div>
  )

  const SocialFeedTimelinePreview = () => (
    <div className="w-full max-w-md space-y-3">
      {[1, 2].map(i => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary/20"></div>
            {i < 2 && <div className="w-1 flex-1 bg-border mt-2"></div>}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm font-medium text-foreground mb-1">User {i}</p>
            <p className="text-sm text-foreground">Post content here</p>
            <p className="text-xs text-muted-foreground mt-1">2h ago</p>
          </div>
        </div>
      ))}
    </div>
  )

  const SocialFeedMasonryPreview = () => (
    <div className="w-full max-w-md columns-2 gap-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className={`mb-3 break-inside-avoid p-3 border border-border rounded-lg ${i % 2 === 0 ? 'h-32' : 'h-24'}`}>
          <p className="text-sm text-foreground">Post {i}</p>
        </div>
      ))}
    </div>
  )

  const SocialFeedCardsPreview = () => (
    <div className="w-full max-w-md space-y-3">
      {[1, 2].map(i => (
        <div key={i} className="p-4 border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20"></div>
            <div>
              <p className="text-sm font-medium text-foreground">User {i}</p>
              <p className="text-xs text-muted-foreground">2h ago</p>
            </div>
          </div>
          <p className="text-sm text-foreground">Social post content</p>
        </div>
      ))}
    </div>
  )

  const SocialFeedStoriesPreview = () => (
    <div className="w-full max-w-md flex gap-2 overflow-x-auto pb-2">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-primary p-1">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20"></div>
          </div>
          <p className="text-xs text-center text-foreground mt-1">User {i}</p>
        </div>
      ))}
    </div>
  )

  const UserProfileCardPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-3"></div>
      <p className="text-sm font-bold text-foreground">John Doe</p>
      <p className="text-xs text-muted-foreground">@johndoe</p>
      <button className="w-full mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Follow</button>
    </div>
  )

  const UserProfileFullPreview = () => (
    <div className="w-full max-w-md border border-border rounded-lg overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20"></div>
      <div className="p-4">
        <div className="flex items-start gap-3 -mt-12">
          <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-card"></div>
          <div className="flex-1 mt-12">
            <p className="text-sm font-bold text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">@johndoe</p>
          </div>
        </div>
        <p className="text-sm text-foreground mt-3">Bio information here</p>
        <div className="flex gap-4 text-xs mt-3">
          <div><p className="font-bold text-foreground">1.2K</p><p className="text-muted-foreground">Followers</p></div>
          <div><p className="font-bold text-foreground">342</p><p className="text-muted-foreground">Following</p></div>
        </div>
      </div>
    </div>
  )

  const UserProfileCompactPreview = () => (
    <div className="w-full max-w-sm p-3 border border-border rounded-lg flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-primary/20"></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">John Doe</p>
        <p className="text-xs text-muted-foreground">@johndoe</p>
      </div>
      <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">Follow</button>
    </div>
  )

  const UserProfileSocialPreview = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary/20"></div>
        <div>
          <p className="text-sm font-bold text-foreground">John Doe</p>
          <p className="text-xs text-muted-foreground">@johndoe</p>
        </div>
      </div>
      <p className="text-sm text-foreground mb-3">Bio text</p>
      <div className="flex justify-center gap-2">
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Globe className="h-4 w-4" /></button>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Globe className="h-4 w-4" /></button>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Globe className="h-4 w-4" /></button>
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

  // ============ PRICING TABLE VARIATIONS ============
  // Variation 1: Minimal Flat Cards
  const PricingTableSimplePreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-4">
      {[
        { name: 'Starter', price: 9, color: 'bg-slate-100', textColor: 'text-slate-700', features: ['1 User', '5GB Storage', 'Email Support'] },
        { name: 'Growth', price: 29, color: 'bg-blue-50', textColor: 'text-blue-700', features: ['5 Users', '25GB Storage', 'Priority Support', 'Analytics'] },
        { name: 'Scale', price: 99, color: 'bg-slate-900', textColor: 'text-white', features: ['Unlimited Users', '100GB Storage', '24/7 Support', 'API Access'] }
      ].map((plan, i) => (
        <div key={i} className={`p-5 rounded-xl ${plan.color} ${i === 2 ? 'text-white' : ''}`}>
          <p className={`text-xs font-medium uppercase tracking-wider ${i === 2 ? 'text-slate-400' : 'text-slate-500'}`}>{plan.name}</p>
          <p className={`text-3xl font-black mt-2 ${plan.textColor}`}>${plan.price}<span className="text-sm font-normal opacity-70">/mo</span></p>
          <ul className={`mt-4 space-y-2 text-xs ${i === 2 ? 'text-slate-300' : 'text-slate-600'}`}>
            {plan.features.map((f, j) => <li key={j}>• {f}</li>)}
          </ul>
          <button className={`w-full mt-4 py-2 rounded-lg text-sm font-semibold transition-all ${i === 2 ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>Get Started</button>
        </div>
      ))}
    </div>
  )

  // Variation 2: Horizontal Comparison Table
  const PricingTableComparisonPreview = () => (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="p-4 font-bold text-sm">Features</div>
        <div className="p-4 text-center font-bold text-sm border-l border-white/20">Free</div>
        <div className="p-4 text-center font-bold text-sm border-l border-white/20 bg-white/10">Pro</div>
        <div className="p-4 text-center font-bold text-sm border-l border-white/20">Team</div>
      </div>
      {[
        { feature: 'Projects', free: '3', pro: 'Unlimited', team: 'Unlimited' },
        { feature: 'Storage', free: '1GB', pro: '50GB', team: '500GB' },
        { feature: 'Support', free: 'Email', pro: 'Priority', team: 'Dedicated' },
        { feature: 'API Access', free: '✕', pro: '✓', team: '✓' },
      ].map((row, i) => (
        <div key={i} className={`grid grid-cols-4 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
          <div className="p-3 font-medium text-slate-700">{row.feature}</div>
          <div className="p-3 text-center text-slate-600 border-l border-slate-100">{row.free}</div>
          <div className="p-3 text-center text-indigo-600 font-medium border-l border-slate-100 bg-indigo-50/50">{row.pro}</div>
          <div className="p-3 text-center text-slate-600 border-l border-slate-100">{row.team}</div>
        </div>
      ))}
      <div className="grid grid-cols-4 p-4 bg-slate-50 border-t border-slate-200">
        <div></div>
        <div className="text-center"><button className="px-4 py-2 text-xs border border-slate-300 rounded-lg hover:bg-slate-100">Free</button></div>
        <div className="text-center"><button className="px-4 py-2 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">$19/mo</button></div>
        <div className="text-center"><button className="px-4 py-2 text-xs border border-slate-300 rounded-lg hover:bg-slate-100">$49/mo</button></div>
      </div>
    </div>
  )

  // Variation 3: Toggle with Animated Cards
  const PricingTableTogglePreview = () => {
    const [isAnnual, setIsAnnual] = useState(true)
    return (
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-center gap-4 bg-slate-100 rounded-full p-1 w-fit mx-auto">
          <button onClick={() => setIsAnnual(false)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>Monthly</button>
          <button onClick={() => setIsAnnual(true)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isAnnual ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>Annual <span className="text-green-600 text-xs">-20%</span></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Personal', monthlyPrice: 12, features: ['All features', 'Priority email'] },
            { name: 'Business', monthlyPrice: 39, features: ['All features', 'Dedicated support', 'Custom integrations'] }
          ].map((plan, i) => (
            <div key={i} className={`p-6 rounded-2xl border-2 transition-all hover:shadow-xl ${i === 1 ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50' : 'border-slate-200 bg-white'}`}>
              <p className="font-bold text-lg text-slate-900">{plan.name}</p>
              <div className="mt-2">
                <span className="text-4xl font-black text-slate-900">${isAnnual ? Math.floor(plan.monthlyPrice * 0.8) : plan.monthlyPrice}</span>
                <span className="text-slate-500">/mo</span>
              </div>
              {isAnnual && <p className="text-xs text-emerald-600 mt-1">Save ${plan.monthlyPrice * 12 * 0.2}/year</p>}
              <ul className="mt-4 space-y-2">
                {plan.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-sm text-slate-600"><Check className="h-4 w-4 text-emerald-500" />{f}</li>)}
              </ul>
              <button className={`w-full mt-5 py-3 rounded-xl font-semibold transition-all ${i === 1 ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Variation 4: Featured Spotlight with Gradient
  const PricingTableFeaturedPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4">MOST POPULAR</div>
          <h3 className="text-2xl font-black">Professional Plan</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-black">$79</span>
            <span className="text-white/70">/month</span>
          </div>
          <ul className="mt-6 space-y-3">
            {['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations', 'Team collaboration'].map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm"><div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center"><Check className="h-3 w-3" /></div>{f}</li>
            ))}
          </ul>
          <button className="w-full mt-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all shadow-lg">Start Free Trial</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-slate-50 rounded-xl text-center">
          <p className="text-sm text-slate-500">Basic</p>
          <p className="text-xl font-bold text-slate-900">$29/mo</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl text-center">
          <p className="text-sm text-slate-500">Enterprise</p>
          <p className="text-xl font-bold text-slate-900">Custom</p>
        </div>
      </div>
    </div>
  )

  // ============ SERVICE CARD VARIATIONS ============
  // Variation 1: Minimal Icon Card with Hover Effect
  const ServiceCardIconPreview = () => (
    <div className="w-full max-w-sm group">
      <div className="relative p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Cpu className="h-7 w-7 text-white" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">Cloud Computing</h3>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">Scale your infrastructure with our enterprise-grade cloud solutions.</p>
          <button className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-semibold group-hover:gap-3 transition-all">
            Learn More <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  // Variation 2: Glass Morphism Image Card
  const ServiceCardImagePreview = () => (
    <div className="w-full max-w-sm">
      <div className="relative h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Premium Design</h3>
                <p className="text-xs text-white/70">UI/UX Excellence</p>
              </div>
            </div>
            <p className="text-xs text-white/80">Transform your brand with stunning visual experiences</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Variation 3: Detailed Feature List Card
  const ServiceCardDetailedPreview = () => (
    <div className="w-full max-w-sm bg-slate-900 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-amber-500/20 rounded-xl">
          <Sparkles className="h-6 w-6 text-amber-400" />
        </div>
        <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-xs font-bold">Popular</span>
      </div>
      <h3 className="text-xl font-bold">AI Solutions</h3>
      <p className="mt-2 text-sm text-slate-400">Next-generation artificial intelligence for your business</p>
      <div className="mt-5 space-y-3">
        {['Machine Learning Models', 'Natural Language Processing', 'Predictive Analytics', '24/7 AI Support'].map((feature, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Check className="h-3 w-3 text-emerald-400" />
            </div>
            <span className="text-slate-300">{feature}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all">Get Started</button>
    </div>
  )

  // Variation 4: Pricing Highlight Card
  const ServiceCardPricingPreview = () => (
    <div className="w-full max-w-sm">
      <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400" />
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Enterprise</span>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Full Service Package</h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-slate-900">$299</span>
              <span className="text-slate-500 text-sm">/mo</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">Complete solution for growing businesses with dedicated support</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {['Unlimited Users', 'API Access', 'Analytics', 'Support'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors">Subscribe</button>
            <button className="px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <ExternalLink className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // ============ ABOUT SECTION VARIATIONS ============
  // Variation 1: Story with Side Image
  const AboutSectionStoryPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="grid grid-cols-2">
          <div className="h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex items-center">
            <div className="w-full h-32 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
              <span className="text-6xl">🏢</span>
            </div>
          </div>
          <div className="p-6">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Our Story</span>
            <h3 className="mt-2 text-xl font-black text-slate-900">Building the Future Since 2015</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">What started as a small startup has grown into a global company serving millions of customers worldwide.</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">Read More</button>
          </div>
        </div>
      </div>
    </div>
  )

  // Variation 2: Team Grid with Hover Cards
  const AboutSectionTeamPreview = () => (
    <div className="w-full max-w-2xl bg-slate-900 rounded-3xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white">Meet Our Leadership</h3>
        <p className="text-slate-400 text-sm mt-1">The passionate people behind our success</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: 'Sarah Chen', role: 'CEO', color: 'from-rose-400 to-pink-500' },
          { name: 'James Park', role: 'CTO', color: 'from-blue-400 to-cyan-500' },
          { name: 'Emily Davis', role: 'Design', color: 'from-amber-400 to-orange-500' },
          { name: 'Michael Lee', role: 'Product', color: 'from-emerald-400 to-teal-500' }
        ].map((member, i) => (
          <div key={i} className="group cursor-pointer">
            <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${member.color} mb-3 group-hover:scale-105 transition-transform shadow-lg`} />
            <p className="text-white font-semibold text-sm">{member.name}</p>
            <p className="text-slate-500 text-xs">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // Variation 3: Mission Statement with Values
  const AboutSectionMissionPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-4">
            <span className="text-lg">🎯</span>
            <span className="text-sm font-bold">Our Mission</span>
          </div>
          <h3 className="text-2xl font-black leading-tight">"To empower every person and organization to achieve more through technology."</h3>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[{ icon: '💡', text: 'Innovation' }, { icon: '🤝', text: 'Integrity' }, { icon: '🌍', text: 'Impact' }].map((val, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                <span className="text-2xl">{val.icon}</span>
                <p className="text-sm font-medium mt-1">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Variation 4: Animated Timeline
  const AboutSectionTimelinePreview = () => (
    <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Our Journey</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
        {[
          { year: '2015', title: 'Founded', desc: 'Started in a small garage', color: 'bg-blue-500' },
          { year: '2018', title: 'Series A', desc: 'Raised $10M funding', color: 'bg-purple-500' },
          { year: '2021', title: 'Global', desc: 'Expanded to 20 countries', color: 'bg-pink-500' },
          { year: '2024', title: 'IPO', desc: 'Public company', color: 'bg-amber-500' }
        ].map((item, i) => (
          <div key={i} className="relative pl-10 pb-6 last:pb-0">
            <div className={`absolute left-2 w-5 h-5 rounded-full ${item.color} border-4 border-white shadow`} />
            <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
              <span className="text-xs font-bold text-slate-400">{item.year}</span>
              <h4 className="font-bold text-slate-900">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ============ CONTACT INFO VARIATIONS ============
  // Variation 1: Modern Card with Gradient Border
  const ContactInfoCardPreview = () => (
    <div className="w-full max-w-md">
      <div className="relative p-6 bg-white rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-10" />
        <div className="relative">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Get in Touch</h3>
          <div className="space-y-4">
            {[
              { icon: MapPin, label: 'Address', value: '123 Innovation Drive, Tech City, CA 94016' },
              { icon: Globe, label: 'Email', value: 'hello@company.com' },
              { icon: Bell, label: 'Phone', value: '+1 (555) 123-4567' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Variation 2: Map Preview with Location Pin
  const ContactInfoMapPreview = () => (
    <div className="w-full max-w-md">
      <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden border border-slate-200">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23000\' fillOpacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50 animate-bounce">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
          <p className="font-bold text-slate-900 text-sm">TechCorp Headquarters</p>
          <p className="text-xs text-slate-500">123 Innovation Drive, Silicon Valley</p>
        </div>
      </div>
    </div>
  )

  // Variation 3: Icon Grid with Hover Effects
  const ContactInfoIconsPreview = () => (
    <div className="w-full max-w-md grid grid-cols-3 gap-4">
      {[
        { icon: MapPin, label: 'Visit Us', color: 'from-rose-500 to-pink-500' },
        { icon: Globe, label: 'Email Us', color: 'from-violet-500 to-purple-500' },
        { icon: Bell, label: 'Call Us', color: 'from-amber-500 to-orange-500' }
      ].map((item, i) => (
        <div key={i} className="group cursor-pointer">
          <div className="bg-white rounded-2xl p-5 text-center shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
              <item.icon className="h-7 w-7 text-white" />
            </div>
            <p className="mt-3 font-semibold text-slate-800 text-sm">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  )

  // Variation 4: Social Media Links with Brand Colors
  const ContactInfoSocialPreview = () => (
    <div className="w-full max-w-md bg-slate-900 rounded-3xl p-6">
      <h3 className="text-white font-bold text-lg mb-2">Follow Us</h3>
      <p className="text-slate-400 text-sm mb-5">Stay connected on social media</p>
      <div className="grid grid-cols-4 gap-3">
        {[
          { color: 'bg-blue-600', name: 'FB' },
          { color: 'bg-sky-500', name: 'TW' },
          { color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400', name: 'IG' },
          { color: 'bg-blue-700', name: 'IN' }
        ].map((social, i) => (
          <button key={i} className={`${social.color} p-4 rounded-xl text-white font-bold hover:scale-105 transition-transform shadow-lg`}>
            {social.name}
          </button>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-slate-800">
        <p className="text-slate-400 text-xs">Or email us at <span className="text-white">hello@company.com</span></p>
      </div>
    </div>
  )

  // ============ COMPANY STATS VARIATIONS ============
  // Variation 1: Animated Counter Cards
  const CompanyStatsCounterPreview = () => (
    <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
      <div className="grid grid-cols-4 gap-4">
        {[
          { value: '10K+', label: 'Users', icon: '👥' },
          { value: '500+', label: 'Projects', icon: '📁' },
          { value: '99%', label: 'Uptime', icon: '⚡' },
          { value: '24/7', label: 'Support', icon: '💬' }
        ].map((stat, i) => (
          <div key={i} className="text-center p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <span className="text-3xl">{stat.icon}</span>
            <p className="mt-2 text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // Variation 2: Gradient Stat Cards
  const CompanyStatsCardsPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-4">
      {[
        { value: '2.5M', label: 'Active Users', gradient: 'from-blue-600 to-cyan-500' },
        { value: '$50M', label: 'Revenue', gradient: 'from-emerald-600 to-teal-500' },
        { value: '150+', label: 'Countries', gradient: 'from-violet-600 to-purple-500' }
      ].map((stat, i) => (
        <div key={i} className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white shadow-xl`}>
          <p className="text-4xl font-black">{stat.value}</p>
          <p className="text-sm text-white/80 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )

  // Variation 3: Circle Progress Stats
  const CompanyStatsAnimatedPreview = () => (
    <div className="w-full max-w-2xl bg-slate-900 rounded-3xl p-6">
      <div className="grid grid-cols-3 gap-6">
        {[
          { value: 95, label: 'Customer Satisfaction', color: 'text-emerald-400' },
          { value: 88, label: 'Project Success Rate', color: 'text-blue-400' },
          { value: 92, label: 'Team Efficiency', color: 'text-amber-400' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-700" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" className={stat.color} strokeDasharray={`${stat.value * 2.51} 251`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-bold ${stat.color}`}>{stat.value}%</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // Variation 4: Infographic Style with Icons
  const CompanyStatsInfographicPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full" />
        </div>
        <div className="relative grid grid-cols-4 gap-4 text-white">
          {[
            { icon: Users, value: '50K+', label: 'Customers' },
            { icon: Globe, value: '120+', label: 'Countries' },
            { icon: TrendingUp, value: '300%', label: 'Growth' },
            { icon: Heart, value: '4.9★', label: 'Rating' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-xs text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // ============ FAQ SECTION VARIATIONS ============
  // Variation 1: Classic Accordion with Icons
  const FAQSectionAccordionPreview = () => {
    const [expanded, setExpanded] = useState<number | null>(0)
    const faqs = [
      { q: 'How do I get started?', a: 'Sign up for a free account and follow our onboarding wizard to set up your first project in minutes.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.' },
      { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time with no cancellation fees.' }
    ]
    return (
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h3 className="text-white font-bold text-lg">Frequently Asked Questions</h3>
          <p className="text-blue-100 text-sm mt-1">Find answers to common questions</p>
        </div>
        <div className="divide-y divide-slate-100">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                <span className="font-semibold text-slate-800 pr-4">{faq.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${expanded === i ? 'bg-blue-100 rotate-180' : 'bg-slate-100'}`}>
                  <ChevronDown className={`h-4 w-4 ${expanded === i ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
              </button>
              {expanded === i && <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed bg-blue-50/50">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Variation 2: Category Grid Layout
  const FAQSectionCategoryPreview = () => (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: '🚀', title: 'Getting Started', count: 8, color: 'from-violet-500 to-purple-500' },
          { icon: '💳', title: 'Billing & Plans', count: 12, color: 'from-emerald-500 to-teal-500' },
          { icon: '🔧', title: 'Technical Support', count: 15, color: 'from-orange-500 to-red-500' },
          { icon: '🔒', title: 'Security & Privacy', count: 6, color: 'from-blue-500 to-cyan-500' }
        ].map((cat, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h4 className="font-bold text-slate-800">{cat.title}</h4>
              <p className="text-sm text-slate-500 mt-1">{cat.count} articles</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Variation 3: Searchable FAQ with Instant Results
  const FAQSectionSearchablePreview = () => {
    const [query, setQuery] = useState('')
    const faqs = [
      'How do I reset my password?',
      'How to upgrade my plan?',
      'Where can I view my invoices?'
    ]
    const filtered = faqs.filter(f => f.toLowerCase().includes(query.toLowerCase()))
    return (
      <div className="w-full max-w-lg bg-slate-900 rounded-3xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">How can we help?</h3>
        <p className="text-slate-400 text-sm mb-5">Search our knowledge base or browse topics below</p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
            className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mt-4 space-y-2">
          {filtered.map((faq, i) => (
            <div key={i} className="p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 cursor-pointer transition-colors">
              <p className="text-sm text-slate-200">{faq}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Variation 4: Tabbed FAQ with Pill Navigation
  const FAQSectionTabbedPreview = () => {
    const [activeTab, setActiveTab] = useState('general')
    const tabs = ['General', 'Pricing', 'Support', 'Account']
    return (
      <div className="w-full max-w-lg bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.toLowerCase()
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                  : 'bg-white text-slate-600 hover:bg-amber-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-amber-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 font-bold text-xs">Q</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Sample question {i} for {activeTab}?</p>
                  <p className="text-slate-500 text-xs mt-2">Click to expand and see the full answer to this question.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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

  // Data Table Previews - 4 unique variations
  const DataTablePreview1 = () => (
    <div className="w-full max-w-2xl border border-border rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b border-border bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Users</h3>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">Export</button>
        </div>
        <input type="text" placeholder="Search..." className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs" />
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map(i => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 text-gray-900">User {i}</td>
              <td className="px-4 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Admin</span></td>
              <td className="px-4 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Active</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const DataTablePreview2 = () => (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Projects</h3>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium">New Project</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Project {i}</h4>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">In Progress</span>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="text-xs text-gray-600">Deadline: 2024-02-15</div>
          </div>
        ))}
      </div>
    </div>
  )

  const DataTablePreview3 = () => (
    <div className="w-full max-w-2xl bg-black rounded-lg border border-green-500/30 font-mono shadow-2xl">
      <div className="p-3 border-b border-green-500/30 flex items-center gap-2 text-green-400">
        <span className="text-xs">USER_MANAGEMENT_SYSTEM v2.1.0</span>
        <div className="ml-auto flex gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="text-green-400 text-xs mb-3">
          <div>&gt; LOADING USER DATABASE...</div>
          <div>&gt; FOUND 3 ENTRIES</div>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="p-2 rounded border border-gray-700 hover:border-green-500/50 transition-all">
            <div className="flex items-center justify-between text-green-400 text-xs">
              <span>[{i}] User_{i}@example.com</span>
              <span className="text-green-500">&gt;</span>
            </div>
            <div className="text-gray-500 text-xs mt-1">Status: ACTIVE | Role: ADMIN</div>
          </div>
        ))}
      </div>
    </div>
  )

  const DataTablePreview4 = () => (
    <div className="w-full max-w-2xl bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden border-2 border-purple-200">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
        <h3 className="text-white font-bold text-lg">Data Records</h3>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map(i => (
            <tr key={i} className={i % 2 === 0 ? "bg-purple-50" : "bg-white"}>
              <td className="px-4 py-3 font-bold text-purple-600">{i}</td>
              <td className="px-4 py-3 text-gray-900 font-medium">Record {i}</td>
              <td className="px-4 py-3">
                <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full">ACTIVE</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Analytics Card Previews - 4 unique variations
  const AnalyticsCardPreview1 = () => (
    <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-3 bg-white">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Page Views</p>
        <TrendingUp className="h-4 w-4 text-blue-600" />
      </div>
      <p className="text-2xl font-bold text-gray-900">45,231</p>
      <div className="flex gap-2 text-xs">
        <span className="text-green-600 font-medium">↑ 23%</span>
        <span className="text-gray-500">vs last week</span>
      </div>
    </div>
  )

  const AnalyticsCardPreview2 = () => (
    <div className="w-full max-w-sm bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium opacity-90">Total Revenue</p>
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>
      <p className="text-3xl font-bold mb-2">$45,231</p>
      <div className="flex items-center gap-2 text-xs">
        <span className="bg-white/20 px-2 py-1 rounded">↑ 12.5%</span>
        <span className="opacity-80">vs last month</span>
      </div>
    </div>
  )

  const AnalyticsCardPreview3 = () => (
    <div className="w-full max-w-sm bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700">Active Users</p>
        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">2,345</p>
      <div className="text-xs text-gray-600">
        <span className="text-green-600 font-medium">+8.2%</span> from last week
      </div>
    </div>
  )

  const AnalyticsCardPreview4 = () => (
    <div className="w-full max-w-sm bg-black border-2 border-cyan-500 rounded-lg p-5 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-cyan-400">Orders</p>
        <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/50">
          <TrendingUp className="h-4 w-4 text-cyan-400" />
        </div>
      </div>
      <p className="text-3xl font-bold text-cyan-400 mb-2">1,234</p>
      <div className="text-xs text-cyan-300">
        <span className="text-red-400">↓ 3.1%</span> vs last period
      </div>
    </div>
  )

  // Status Indicator Previews - 4 unique variations
  const StatusIndicatorPreview1 = () => (
    <div className="w-full max-w-sm space-y-3 p-4 border border-border rounded-lg bg-white">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-900">API Server</span>
          <span className="text-xs text-gray-500 ml-2">99.9% uptime</span>
        </div>
        <span className="text-xs text-green-600 font-medium">Operational</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-900">Database</span>
          <span className="text-xs text-gray-500 ml-2">98.5% uptime</span>
        </div>
        <span className="text-xs text-yellow-600 font-medium">Degraded</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-900">CDN</span>
          <span className="text-xs text-gray-500 ml-2">95.2% uptime</span>
        </div>
        <span className="text-xs text-red-600 font-medium">Maintenance</span>
      </div>
    </div>
  )

  const StatusIndicatorPreview2 = () => (
    <div className="w-full max-w-sm space-y-4 p-4 border border-border rounded-lg bg-white">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">API Server</span>
          <span className="text-xs text-green-600 font-medium">99.9%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">Database</span>
          <span className="text-xs text-yellow-600 font-medium">98.5%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98.5%' }} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">CDN</span>
          <span className="text-xs text-red-600 font-medium">95.2%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-red-500 h-2 rounded-full" style={{ width: '95.2%' }} />
        </div>
      </div>
    </div>
  )

  const StatusIndicatorPreview3 = () => (
    <div className="w-full max-w-sm grid grid-cols-2 gap-3">
      <div className="bg-white border-2 border-green-200 rounded-lg p-3 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <div className="h-6 w-6 rounded-full bg-green-500"></div>
        </div>
        <p className="text-xs font-medium text-gray-900 mb-1">API Server</p>
        <span className="text-xs text-green-600 font-semibold">Operational</span>
      </div>
      <div className="bg-white border-2 border-yellow-200 rounded-lg p-3 text-center">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <div className="h-6 w-6 rounded-full bg-yellow-500"></div>
        </div>
        <p className="text-xs font-medium text-gray-900 mb-1">Database</p>
        <span className="text-xs text-yellow-600 font-semibold">Warning</span>
      </div>
      <div className="bg-white border-2 border-red-200 rounded-lg p-3 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <div className="h-6 w-6 rounded-full bg-red-500"></div>
        </div>
        <p className="text-xs font-medium text-gray-900 mb-1">CDN</p>
        <span className="text-xs text-red-600 font-semibold">Error</span>
      </div>
      <div className="bg-white border-2 border-blue-200 rounded-lg p-3 text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <div className="h-6 w-6 rounded-full bg-blue-500"></div>
        </div>
        <p className="text-xs font-medium text-gray-900 mb-1">Cache</p>
        <span className="text-xs text-blue-600 font-semibold">Active</span>
      </div>
    </div>
  )

  const StatusIndicatorPreview4 = () => (
    <div className="w-full max-w-sm bg-black border-2 border-cyan-500 rounded-lg p-4 space-y-3 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse"></div>
        <span className="text-sm font-medium text-cyan-400 font-mono">API_SERVER</span>
        <span className="ml-auto text-xs text-green-400 font-mono">[ONLINE]</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)] animate-pulse"></div>
        <span className="text-sm font-medium text-yellow-400 font-mono">DATABASE</span>
        <span className="ml-auto text-xs text-yellow-400 font-mono">[WARN]</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)] animate-pulse"></div>
        <span className="text-sm font-medium text-red-400 font-mono">CDN</span>
        <span className="ml-auto text-xs text-red-400 font-mono">[ERROR]</span>
      </div>
    </div>
  )

  // Action Button Previews - 4 unique variations
  const ActionButtonPreview1 = () => (
    <div className="w-full max-w-sm space-y-2 p-4 border border-border rounded-lg bg-white">
      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
        <span>⌘</span> Create New
      </button>
      <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
        <span>⌘</span> Upload File
      </button>
      <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
        <span>⌘</span> Download
      </button>
    </div>
  )

  const ActionButtonPreview2 = () => (
    <div className="w-full max-w-sm relative h-64">
      <button className="absolute bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center">
        <span className="text-2xl">+</span>
      </button>
      <div className="absolute bottom-20 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-12 h-12 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center text-sm">↑</button>
        <button className="w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center text-sm">↓</button>
        <button className="w-12 h-12 bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center text-sm">✎</button>
      </div>
    </div>
  )

  const ActionButtonPreview3 = () => (
    <div className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center gap-2">
      <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">Edit</button>
      <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">Copy</button>
      <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">Share</button>
      <div className="h-6 w-px bg-gray-300"></div>
      <button className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium">Delete</button>
    </div>
  )

  const ActionButtonPreview4 = () => (
    <div className="w-full max-w-sm bg-black border-2 border-cyan-500 rounded-lg p-4 grid grid-cols-2 gap-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
      <button className="px-4 py-3 bg-cyan-500/20 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all text-sm font-medium font-mono shadow-[0_0_10px_rgba(6,182,212,0.5)]">
        CREATE
      </button>
      <button className="px-4 py-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 hover:bg-green-500/30 transition-all text-sm font-medium font-mono shadow-[0_0_10px_rgba(34,197,94,0.5)]">
        UPLOAD
      </button>
      <button className="px-4 py-3 bg-purple-500/20 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all text-sm font-medium font-mono shadow-[0_0_10px_rgba(168,85,247,0.5)]">
        DOWNLOAD
      </button>
      <button className="px-4 py-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 transition-all text-sm font-medium font-mono shadow-[0_0_10px_rgba(239,68,68,0.5)]">
        DELETE
      </button>
    </div>
  )

  // Settings Panel Previews - 4 unique variations
  const SettingsPanelPreview1 = () => (
    <div className="w-full max-w-md space-y-4 p-5 border border-gray-200 rounded-lg bg-white">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-900">Notifications</span>
            <p className="text-xs text-gray-500">Receive notifications on your device</p>
          </div>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-900">Dark Mode</span>
            <p className="text-xs text-gray-500">Switch to dark theme</p>
          </div>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-900">Auto-save</span>
            <p className="text-xs text-gray-500">Automatically save changes</p>
          </div>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
      </div>
    </div>
  )

  const SettingsPanelPreview2 = () => (
    <div className="w-full max-w-md border border-gray-200 rounded-lg bg-white">
      <div className="flex border-b border-gray-200">
        <button className="flex-1 px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">General</button>
        <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">Privacy</button>
        <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">Security</button>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">Notifications</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">Dark Mode</span>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">Auto-save</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
      </div>
    </div>
  )

  const SettingsPanelPreview3 = () => (
    <div className="w-full max-w-md flex border border-gray-200 rounded-lg bg-white">
      <div className="w-32 border-r border-gray-200 p-3 space-y-1">
        <button className="w-full px-3 py-2 text-left text-sm font-medium text-blue-600 bg-blue-50 rounded">General</button>
        <button className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded">Privacy</button>
        <button className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded">Security</button>
      </div>
      <div className="flex-1 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">Notifications</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">Dark Mode</span>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">Auto-save</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
      </div>
    </div>
  )

  const SettingsPanelPreview4 = () => (
    <div className="w-full max-w-md bg-black border-2 border-cyan-500 rounded-lg p-4 space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
      <h3 className="text-cyan-400 font-mono text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">SYSTEM_CONTROLS</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
          <span className="text-cyan-400 text-sm font-mono">NOTIFICATIONS</span>
          <div className="w-12 h-6 bg-cyan-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
          <span className="text-cyan-400 text-sm font-mono">DARK_MODE</span>
          <div className="w-12 h-6 bg-gray-700 rounded-full relative">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
          <span className="text-cyan-400 text-sm font-mono">AUTO_SAVE</span>
          <div className="w-12 h-6 bg-cyan-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )

  // ============ TESTIMONIAL BANNER LIVE PREVIEWS ============
  const TestimonialBannerWhisperPreview = () => (
    <div className="w-full max-w-lg bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <span className="text-gray-300 text-xl mt-1">"</span>
        <div className="flex-1">
          <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"This solution transformed our workflow completely. Simple, elegant, and incredibly effective."</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">JS</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Jessica Smith</div>
              <div className="text-xs text-gray-500">Product Manager</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const TestimonialBannerHolographicPreview = () => (
    <div className="w-full max-w-lg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/20 to-pink-500/10 animate-pulse" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-cyan-400 text-sm font-bold tracking-wide">⚡ QUANTUM FEEDBACK</span>
        </div>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400">⭐</span>
          ))}
        </div>
        <p className="text-lg mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-relaxed">"This quantum leap in technology has revolutionized our entire neural network processing capabilities."</p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AC</span>
          </div>
          <div>
            <div className="font-bold text-white">Dr. Alex Chen</div>
            <div className="text-cyan-400 text-sm">Quantum Research Lab</div>
          </div>
        </div>
      </div>
    </div>
  )

  const TestimonialBannerRoyalPreview = () => (
    <div className="w-full max-w-lg bg-gradient-to-b from-amber-50 to-cream border-2 border-amber-200 rounded-lg p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-amber-600 text-xl">👑</span>
        <span className="text-amber-800 text-sm font-serif font-semibold uppercase tracking-wide">Distinguished Testimonial</span>
      </div>
      <span className="text-amber-400 text-4xl mb-4 block">"</span>
      <p className="text-amber-900 mb-6 font-serif italic text-lg leading-relaxed">In my forty years of distinguished service, I have rarely encountered such exemplary craftsmanship and unwavering commitment to excellence.</p>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full border-2 border-amber-600 flex items-center justify-center">
          <span className="text-amber-800 font-bold text-lg">WH</span>
        </div>
        <div>
          <div className="font-serif font-bold text-amber-900 text-lg">Sir William Hartford</div>
          <div className="text-amber-700 text-sm">Chairman Emeritus, Royal Institute</div>
        </div>
      </div>
    </div>
  )

  const TestimonialBannerExplosivePreview = () => (
    <div className="w-full max-w-lg bg-black text-white rounded-3xl p-8 relative overflow-hidden transform -rotate-1 shadow-2xl">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-red-500 rounded-full opacity-20 animate-ping" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-500 text-2xl animate-bounce">🔥</span>
          <span className="text-red-400 font-black text-sm uppercase tracking-widest">MIND = BLOWN</span>
        </div>
        <div className="text-6xl font-black text-yellow-400 mb-4 transform -skew-x-12 animate-pulse">+2000%</div>
        <p className="text-2xl font-black mb-6 text-white transform skew-x-3">"ABSOLUTELY INSANE RESULTS!"</p>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center transform rotate-12">
            <span className="text-black text-2xl">📈</span>
          </div>
          <div>
            <div className="text-2xl font-black text-white">MIKE CRUSHER</div>
            <div className="text-yellow-400 font-black text-lg">EXTREME CEO</div>
          </div>
        </div>
      </div>
    </div>
  )

  const CallToActionButtonPreview = () => (
    <div className="w-full max-w-sm space-y-3 p-4 border border-border rounded-lg">
      <p className="text-sm font-medium text-foreground">Ready to get started?</p>
      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Get Started Now</button>
      <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">Learn More</button>
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

  // Promotional Banner Previews - 4 unique variations
  const PromotionalBannerPreview1 = () => (
    <div className="w-full bg-red-50 border-2 border-red-300 rounded-lg p-4 text-center">
      <p className="text-lg font-bold text-red-600">🎉 FLASH SALE</p>
      <p className="text-sm text-gray-700 mt-1">50% off everything - Ends in 24 hours!</p>
    </div>
  )

  const PromotionalBannerPreview2 = () => (
    <div className="w-full bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-5 text-center text-white shadow-lg">
      <p className="text-xl font-bold mb-1">LIMITED TIME OFFER</p>
      <p className="text-sm opacity-90">Get 50% off on all premium plans. Don't miss out!</p>
      <button className="mt-3 px-6 py-2 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">Shop Now</button>
    </div>
  )

  const PromotionalBannerPreview3 = () => (
    <div className="w-full bg-black border-2 border-yellow-400 rounded-lg p-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <p className="text-yellow-400 font-mono text-sm font-bold">NEW YEAR SALE</p>
        <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      <p className="text-white text-sm">50% OFF - Use code: NEWYEAR2024</p>
    </div>
  )

  const PromotionalBannerPreview4 = () => (
    <div className="w-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-xl p-6 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <p className="text-2xl font-bold mb-2">🎊 MEGA SALE</p>
        <p className="text-lg mb-3">Up to 70% OFF</p>
        <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
          <p className="text-xs">Ends in: 23:59:45</p>
        </div>
      </div>
    </div>
  )

  // Feature Highlight Previews - 4 unique variations
  const FeatureHighlightPreview1 = () => (
    <div className="w-full max-w-sm border border-gray-200 rounded-lg p-5 space-y-3 hover:shadow-lg transition-shadow bg-white">
      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
        <Sparkles className="h-6 w-6 text-blue-600" />
      </div>
      <p className="text-base font-bold text-gray-900">Key Feature</p>
      <p className="text-sm text-gray-600">Description of this amazing feature and its benefits for users</p>
      <button className="text-sm text-blue-600 font-medium hover:underline">Learn more →</button>
    </div>
  )

  const FeatureHighlightPreview2 = () => (
    <div className="w-full max-w-sm bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
        <Sparkles className="h-8 w-8 text-white" />
      </div>
      <p className="text-lg font-bold mb-2">Premium Feature</p>
      <p className="text-sm opacity-90 mb-4">Unlock powerful capabilities with this premium feature</p>
      <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">Explore</button>
    </div>
  )

  const FeatureHighlightPreview3 = () => (
    <div className="w-full max-w-sm bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-md">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-base font-bold text-gray-900 mb-1">Smart Feature</p>
          <p className="text-sm text-gray-600 mb-3">AI-powered solution that adapts to your needs</p>
          <button className="text-sm text-green-600 font-semibold hover:underline">Discover →</button>
        </div>
      </div>
    </div>
  )

  const FeatureHighlightPreview4 = () => (
    <div className="w-full max-w-sm bg-black border-2 border-cyan-400 rounded-lg p-5 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400 rounded-lg flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-cyan-400" />
        </div>
        <p className="text-cyan-400 font-mono font-bold text-sm">FEATURE_X</p>
      </div>
      <p className="text-white text-sm mb-3">Advanced feature with cutting-edge technology</p>
      <button className="px-4 py-2 bg-cyan-500 text-black rounded font-mono text-xs font-bold hover:bg-cyan-400 transition-colors">ACTIVATE</button>
    </div>
  )

  // Newsletter Banner Previews - 4 unique variations
  const NewsletterBannerPreview1 = () => (
    <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
      <p className="text-base font-bold text-gray-900">Subscribe to our newsletter</p>
      <p className="text-sm text-gray-600">Get the latest updates delivered to your inbox</p>
      <div className="flex gap-2">
        <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm" />
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Subscribe</button>
      </div>
    </div>
  )

  const NewsletterBannerPreview2 = () => (
    <div className="w-full max-w-2xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
      <p className="text-xl font-bold mb-2">Stay Updated</p>
      <p className="text-sm opacity-90 mb-4">Join 10,000+ subscribers for weekly insights</p>
      <div className="flex gap-2">
        <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 text-sm" />
        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">Subscribe</button>
      </div>
    </div>
  )

  const NewsletterBannerPreview3 = () => (
    <div className="w-full max-w-2xl bg-white border-2 border-gray-300 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-900 mb-1">Newsletter</p>
          <p className="text-sm text-gray-600">Get exclusive content delivered weekly</p>
        </div>
        <div className="flex gap-2 flex-1 justify-end">
          <input type="email" placeholder="Email" className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 text-sm" />
          <button className="px-4 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors text-sm">Join</button>
        </div>
      </div>
    </div>
  )

  const NewsletterBannerPreview4 = () => (
    <div className="w-full max-w-2xl bg-black border-2 border-green-400 rounded-lg p-6 font-mono">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
        <p className="text-green-400 text-sm font-bold">NEWSLETTER_SUBSCRIPTION</p>
      </div>
      <p className="text-white text-sm mb-4">Enter your email to receive updates:</p>
      <div className="flex gap-2">
        <input type="email" placeholder="user@domain.com" className="flex-1 px-4 py-2 bg-gray-900 border border-green-400/50 rounded text-green-400 placeholder-green-400/50 text-sm font-mono" />
        <button className="px-6 py-2 bg-green-400 text-black rounded font-bold hover:bg-green-300 transition-colors text-sm">SUBMIT</button>
      </div>
    </div>
  )

  // Discount Badge Previews - 4 unique variations
  const DiscountBadgePreview1 = () => (
    <div className="w-full max-w-sm relative">
      <div className="p-5 border border-gray-200 rounded-lg bg-white">
        <p className="text-sm text-gray-600 mb-1">Premium Product</p>
        <p className="text-2xl font-bold text-gray-900">$29.99</p>
        <p className="text-xs text-gray-500 line-through mt-1">$49.99</p>
      </div>
      <div className="absolute -top-2 -right-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold shadow-lg">
        -30%
      </div>
    </div>
  )

  const DiscountBadgePreview2 = () => (
    <div className="w-full max-w-sm relative">
      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
        <p className="text-sm opacity-90 mb-1">Special Offer</p>
        <p className="text-3xl font-bold mb-1">$29.99</p>
        <p className="text-sm line-through opacity-75">$49.99</p>
      </div>
      <div className="absolute -top-3 -right-3 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl rotate-12">
        <p className="text-red-600 font-bold text-sm">SAVE<br/>30%</p>
      </div>
    </div>
  )

  const DiscountBadgePreview3 = () => (
    <div className="w-full max-w-sm relative">
      <div className="p-5 border-2 border-blue-300 rounded-lg bg-blue-50">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-blue-600">$29</p>
          <p className="text-lg text-blue-600">.99</p>
        </div>
        <p className="text-xs text-gray-600 line-through mt-1">Was $49.99</p>
      </div>
      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-bold">
        40% OFF
      </div>
    </div>
  )

  const DiscountBadgePreview4 = () => (
    <div className="w-full max-w-sm relative">
      <div className="bg-black border-2 border-cyan-400 rounded-lg p-5 font-mono">
        <p className="text-cyan-400 text-xs mb-2">PRODUCT_NAME</p>
        <div className="flex items-baseline gap-2 mb-2">
          <p className="text-cyan-400 text-2xl font-bold">$29</p>
          <p className="text-cyan-400 text-lg">.99</p>
        </div>
        <p className="text-gray-500 text-xs line-through">$49.99</p>
      </div>
      <div className="absolute -top-2 -right-2 bg-cyan-400 text-black px-3 py-1 rounded font-mono text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.8)]">
        -30%
      </div>
    </div>
  )

  // Landing Hero Previews - 4 unique variations
  const LandingHeroPreview1 = () => (
    <div className="w-full max-w-2xl h-56 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex flex-col items-center justify-center text-center space-y-4 p-6 border border-gray-200">
      <p className="text-3xl font-bold text-gray-900">Welcome to Our Platform</p>
      <p className="text-base text-gray-600 max-w-md">Start your journey with us today and discover amazing possibilities</p>
      <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg">Get Started</button>
    </div>
  )

  const LandingHeroPreview2 = () => (
    <div className="w-full max-w-2xl h-64 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl flex flex-col items-center justify-center text-center space-y-5 p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <p className="text-4xl font-bold mb-3">Transform Your Business</p>
        <p className="text-lg opacity-90 max-w-md mb-4">Join thousands of companies already using our platform</p>
        <div className="flex gap-3 justify-center">
          <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-xl">Start Free Trial</button>
          <button className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg font-medium hover:bg-white/30 transition-colors">Learn More</button>
        </div>
      </div>
    </div>
  )

  const LandingHeroPreview3 = () => (
    <div className="w-full max-w-2xl h-56 bg-white border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center text-center space-y-4 p-6">
      <p className="text-3xl font-bold text-gray-900">Simple. Powerful. Effective.</p>
      <p className="text-base text-gray-600 max-w-md">Everything you need to succeed, all in one place</p>
      <div className="flex gap-3">
        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">Get Started</button>
        <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">Watch Demo</button>
      </div>
    </div>
  )

  const LandingHeroPreview4 = () => (
    <div className="w-full max-w-2xl h-64 bg-black border-2 border-green-400 rounded-lg flex flex-col items-center justify-center text-center space-y-5 p-8 font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <p className="text-green-400 text-2xl font-bold">SYSTEM_READY</p>
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-white text-lg mb-4">Initialize your journey with cutting-edge technology</p>
        <button className="px-8 py-3 bg-green-400 text-black rounded font-bold hover:bg-green-300 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.5)] text-sm">EXECUTE</button>
      </div>
    </div>
  )

  // ============ PRODUCT SHOWCASE LIVE PREVIEWS ============
  // Variation 1: 3D Floating Card Product Display
  const ProductShowcase3DCardPreview = () => (
    <div className="w-full max-w-lg">
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="relative">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-500 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <Package className="h-20 w-20 text-white/80" />
          </div>
          <div className="mt-6 text-center">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs text-white font-bold">NEW RELEASE</span>
            <h3 className="mt-3 text-2xl font-black text-white">Pro Edition X1</h3>
            <p className="mt-2 text-slate-400 text-sm">Next-generation performance meets elegant design</p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <span className="text-3xl font-black text-white">$299</span>
              <span className="text-slate-500 line-through">$399</span>
            </div>
            <button className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-bold hover:from-blue-600 hover:to-purple-600 transition-all">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )

  // Variation 2: Split Screen Product Hero
  const ProductShowcaseSplitHeroPreview = () => (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 flex items-center justify-center">
          <div className="w-40 h-40 bg-white rounded-3xl shadow-xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform">
            <Sparkles className="h-16 w-16 text-amber-500" />
          </div>
        </div>
        <div className="bg-white p-8 flex flex-col justify-center">
          <span className="text-amber-600 text-xs font-bold uppercase tracking-wider">Premium Collection</span>
          <h3 className="mt-2 text-2xl font-black text-slate-900">Artisan Series</h3>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">Handcrafted with precision and passion for those who appreciate excellence.</p>
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
            <span className="text-slate-500 text-xs ml-2">(128 reviews)</span>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">Shop Now</button>
            <button className="p-3 border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
              <Heart className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Variation 3: Interactive 360 View Style
  const ProductShowcase360Preview = () => {
    const [rotation, setRotation] = useState(0)
    return (
      <div className="w-full max-w-lg">
        <div className="bg-gradient-to-b from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
          <div className="relative">
            <div 
              className="w-56 h-56 mx-auto bg-white rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300"
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              <div className="w-36 h-36 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Cpu className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">IN STOCK</div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <button onClick={() => setRotation(r => r - 45)} className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-slate-500 px-4">Rotate View</span>
            <button onClick={() => setRotation(r => r + 45)} className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold text-slate-900">TechCore Pro Max</h3>
            <p className="mt-1 text-slate-500 text-sm">Ultimate performance processor</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[{ label: 'Speed', value: '5.2GHz' }, { label: 'Cores', value: '16' }, { label: 'Cache', value: '64MB' }].map((spec, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-indigo-600">{spec.value}</p>
                  <p className="text-xs text-slate-500">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variation 4: Neon Cyberpunk Product Card
  const ProductShowcaseNeonPreview = () => (
    <div className="w-full max-w-lg">
      <div className="relative bg-black rounded-2xl p-8 overflow-hidden border border-cyan-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-cyan-400 font-mono text-xs">MODEL_X9000</span>
              <h3 className="mt-1 text-2xl font-black text-white">QUANTUM<span className="text-cyan-400">DRIVE</span></h3>
            </div>
            <div className="px-3 py-1 bg-pink-500/20 border border-pink-500 rounded-full">
              <span className="text-pink-400 text-xs font-bold font-mono">LIMITED</span>
            </div>
          </div>
          <div className="w-48 h-48 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-2xl" />
            <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/30 flex items-center justify-center">
              <Zap className="h-20 w-20 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-slate-500 text-xs font-mono">PRICE</p>
              <p className="text-3xl font-black text-white">$<span className="text-cyan-400">499</span>.99</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs font-mono">AVAILABILITY</p>
              <p className="text-emerald-400 font-bold">READY TO SHIP</p>
            </div>
          </div>
          <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl font-bold text-black hover:from-cyan-400 hover:to-pink-400 transition-all shadow-lg shadow-cyan-500/25">
            ADD TO CART
          </button>
        </div>
      </div>
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

  // ============ NEWS GRID VARIATIONS ============
  const NewsGridClassicPreview = () => (
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

  const NewsGridMagazinePreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-4">
      <div className="col-span-2 row-span-2 border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="h-48 bg-gradient-to-br from-primary/30 to-accent/30"></div>
        <div className="p-3">
          <p className="text-sm text-primary font-medium">Featured</p>
          <p className="text-base font-bold text-foreground">Main story headline</p>
        </div>
      </div>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-20 bg-gradient-to-br from-primary/20 to-accent/20"></div>
          <div className="p-2">
            <p className="text-xs font-medium text-foreground line-clamp-2">Story {i}</p>
          </div>
        </div>
      ))}
    </div>
  )

  const NewsGridCompactPreview = () => (
    <div className="w-full max-w-md space-y-2">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="p-2 border-l-4 border-primary hover:bg-accent transition-colors cursor-pointer">
          <p className="text-sm font-medium text-foreground">{i}. Compact news headline</p>
          <p className="text-xs text-muted-foreground">{i} min ago</p>
        </div>
      ))}
    </div>
  )

  const NewsGridFeaturedPreview = () => (
    <div className="w-full max-w-2xl space-y-4">
      <div className="border-2 border-primary rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="h-40 bg-gradient-to-br from-primary/30 to-accent/30"></div>
        <div className="p-4">
          <div className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded inline-block mb-2">FEATURED</div>
          <p className="text-lg font-bold text-foreground">Featured story headline</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2].map(i => (
          <div key={i} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="h-24 bg-gradient-to-br from-primary/20 to-accent/20"></div>
            <div className="p-2">
              <p className="text-sm font-medium text-foreground">Story {i}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ============ LIVE UPDATES VARIATIONS ============
  const LiveUpdatesTickerPreview = () => (
    <div className="w-full max-w-2xl bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-destructive animate-pulse flex-shrink-0"></div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm text-foreground font-medium truncate">LIVE: Breaking news update ticker</p>
      </div>
    </div>
  )

  const LiveUpdatesTimelinePreview = () => (
    <div className="w-full max-w-md space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            {i < 3 && <div className="w-1 h-full bg-border mt-1"></div>}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-xs text-muted-foreground">{i} min ago</p>
            <p className="text-sm font-medium text-foreground">Live update {i}</p>
          </div>
        </div>
      ))}
    </div>
  )

  const LiveUpdatesFeedPreview = () => (
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

  const LiveUpdatesNotificationPreview = () => (
    <div className="w-full max-w-md">
      <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-lg">
        <div className="flex items-start gap-3">
          <div className="h-2 w-2 rounded-full bg-primary mt-1.5 animate-pulse"></div>
          <div>
            <p className="text-sm font-bold text-foreground">LIVE UPDATE</p>
            <p className="text-sm text-foreground mt-1">Breaking news notification</p>
            <p className="text-xs text-muted-foreground mt-1">Just now</p>
          </div>
        </div>
      </div>
    </div>
  )

  // ============ TRENDING TOPICS VARIATIONS ============
  const TrendingTopicsListPreview = () => (
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

  const TrendingTopicsTagsPreview = () => (
    <div className="w-full max-w-md flex flex-wrap gap-2">
      {['Technology', 'Business', 'Sports', 'Entertainment', 'Science'].map((topic, i) => (
        <button key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
          #{topic}
        </button>
      ))}
    </div>
  )

  const TrendingTopicsCardsPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-xs text-primary font-bold">#{i} Trending</span>
          </div>
          <p className="text-sm font-medium text-foreground">Topic {i}</p>
          <p className="text-xs text-muted-foreground">{1000 * i}K posts</p>
        </div>
      ))}
    </div>
  )

  const TrendingTopicsChartPreview = () => (
    <div className="w-full max-w-md space-y-3">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground font-medium">Topic {i}</span>
            <span className="text-muted-foreground">{100 - i * 15}%</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${100 - i * 15}%` }} />
          </div>
        </div>
      ))}
    </div>
  )

  // ============ MOST READ VARIATIONS ============
  const MostReadRankedPreview = () => (
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

  const MostReadCardsPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-3 gap-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="h-20 bg-gradient-to-br from-primary/20 to-accent/20"></div>
          <div className="p-2">
            <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded inline-block mb-1">#{i}</div>
            <p className="text-xs font-medium text-foreground line-clamp-2">Article {i}</p>
            <p className="text-xs text-muted-foreground">{5000 - i * 1000} reads</p>
          </div>
        </div>
      ))}
    </div>
  )

  const MostReadSidebarPreview = () => (
    <div className="w-full max-w-xs border border-border rounded-lg p-3 space-y-2">
      <h3 className="text-sm font-bold text-foreground mb-2">Most Read</h3>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex gap-2 pb-2 border-b border-border last:border-0 hover:bg-accent p-1 rounded transition-colors cursor-pointer">
          <span className="text-xs font-bold text-primary">{i}</span>
          <p className="text-xs text-foreground line-clamp-2 flex-1">Article headline {i}</p>
        </div>
      ))}
    </div>
  )

  const MostReadGridPreview = () => (
    <div className="w-full max-w-2xl grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-3 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
          <div className="flex items-start gap-2">
            <div className="text-xl font-bold text-primary">{i}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Popular article {i}</p>
              <p className="text-xs text-muted-foreground">{5000 - i * 1000} reads • 2h ago</p>
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
        <ImageSliderClassicPreview key="1" />,
        <ImageSliderModernPreview key="2" />,
        <ImageSliderThumbnailPreview key="3" />,
        <ImageSliderAutoplayPreview key="4" />,
      ],
      'Media Grid': [
        <MediaGridClassicPreview key="1" />,
        <MediaGridMasonryPreview key="2" />,
        <MediaGridFilterablePreview key="3" />,
        <MediaGridInteractivePreview key="4" />,
      ],
      'Video Gallery': [
        <VideoGalleryFeaturedPreview key="1" />,
        <VideoGalleryGridPreview key="2" />,
        <VideoGalleryListPreview key="3" />,
        <VideoGalleryTheaterPreview key="4" />,
      ],
      'Audio Player': [
        <AudioPlayerMinimalPreview key="1" />,
        <AudioPlayerWaveformPreview key="2" />,
        <AudioPlayerPlaylistPreview key="3" />,
        <AudioPlayerModernPreview key="4" />,
      ],
      'Image Comparison': [
        <ImageComparisonSliderPreview key="1" />,
        <ImageComparisonSideBySidePreview key="2" />,
        <ImageComparisonOverlayPreview key="3" />,
        <ImageComparisonHotspotsPreview key="4" />,
      ],
      'Media Upload': [
        <MediaUploadDragDropPreview key="1" />,
        <MediaUploadMultiStepPreview key="2" />,
        <MediaUploadFileManagerPreview key="3" />,
        <MediaUploadProgressPreview key="4" />,
      ],
      'Slideshow': [
        <SlideshowClassicPreview key="1" />,
        <SlideshowFullscreenPreview key="2" />,
        <SlideshowThumbnailNavPreview key="3" />,
        <SlideshowGridOverviewPreview key="4" />,
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
        <NewsGridClassicPreview key="1" />,
        <NewsGridMagazinePreview key="2" />,
        <NewsGridCompactPreview key="3" />,
        <NewsGridFeaturedPreview key="4" />,
      ],
      'Live Updates': [
        <LiveUpdatesTickerPreview key="1" />,
        <LiveUpdatesTimelinePreview key="2" />,
        <LiveUpdatesFeedPreview key="3" />,
        <LiveUpdatesNotificationPreview key="4" />,
      ],
      'Trending Topics': [
        <TrendingTopicsListPreview key="1" />,
        <TrendingTopicsTagsPreview key="2" />,
        <TrendingTopicsCardsPreview key="3" />,
        <TrendingTopicsChartPreview key="4" />,
      ],
      'Most Read': [
        <MostReadRankedPreview key="1" />,
        <MostReadCardsPreview key="2" />,
        <MostReadSidebarPreview key="3" />,
        <MostReadGridPreview key="4" />,
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
        <ProductGalleryCarouselPreview key="1" />,
        <ProductGalleryGridPreview key="2" />,
        <ProductGalleryZoomPreview key="3" />,
        <ProductGalleryThumbnailPreview key="4" />,
      ],
      'Price Display': [
        <PriceDisplayBasicPreview key="1" />,
        <PriceDisplaySalePreview key="2" />,
        <PriceDisplayTieredPreview key="3" />,
        <PriceDisplaySubscriptionPreview key="4" />,
      ],
      'Add to Cart': [
        <AddToCartSimplePreview key="1" />,
        <AddToCartQuantityPreview key="2" />,
        <AddToCartVariantPreview key="3" />,
        <AddToCartAnimatedPreview key="4" />,
      ],
      'Product Filter': [
        <ProductFilterSidebarPreview key="1" />,
        <ProductFilterDropdownPreview key="2" />,
        <ProductFilterChipsPreview key="3" />,
        <ProductFilterAdvancedPreview key="4" />,
      ],
      'Checkout Form': [
        <CheckoutFormSimplePreview key="1" />,
        <CheckoutFormMultiStepPreview key="2" />,
        <CheckoutFormExpressPreview key="3" />,
        <CheckoutFormGuestPreview key="4" />,
      ],
      'Product Reviews': [
        <ProductReviewsListPreview key="1" />,
        <ProductReviewsSummaryPreview key="2" />,
        <ProductReviewsFilteredPreview key="3" />,
        <ProductReviewsVerifiedPreview key="4" />,
      ],
      // Social and Engagement Category
      'Social Share': [
        <SocialShareIconsPreview key="1" />,
        <SocialShareButtonsPreview key="2" />,
        <SocialShareFloatingPreview key="3" />,
        <SocialShareInlinePreview key="4" />,
      ],
      'Comment System': [
        <CommentSystemThreadedPreview key="1" />,
        <CommentSystemFlatPreview key="2" />,
        <CommentSystemModeratedPreview key="3" />,
        <CommentSystemRealtimePreview key="4" />,
      ],
      'Rating System': [
        <RatingSystemStarsPreview key="1" />,
        <RatingSystemThumbsPreview key="2" />,
        <RatingSystemEmojiPreview key="3" />,
        <RatingSystemDetailedPreview key="4" />,
      ],
      'Follow Button': [
        <FollowButtonSimplePreview key="1" />,
        <FollowButtonCountPreview key="2" />,
        <FollowButtonAnimatedPreview key="3" />,
        <FollowButtonMultiPreview key="4" />,
      ],
      'Social Feed': [
        <SocialFeedTimelinePreview key="1" />,
        <SocialFeedMasonryPreview key="2" />,
        <SocialFeedCardsPreview key="3" />,
        <SocialFeedStoriesPreview key="4" />,
      ],
      'User Profile': [
        <UserProfileCardPreview key="1" />,
        <UserProfileFullPreview key="2" />,
        <UserProfileCompactPreview key="3" />,
        <UserProfileSocialPreview key="4" />,
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
        <PricingTableSimplePreview key="1" />,
        <PricingTableComparisonPreview key="2" />,
        <PricingTableTogglePreview key="3" />,
        <PricingTableFeaturedPreview key="4" />,
      ],
      'Service Card': [
        <ServiceCardIconPreview key="1" />,
        <ServiceCardImagePreview key="2" />,
        <ServiceCardDetailedPreview key="3" />,
        <ServiceCardPricingPreview key="4" />,
      ],
      'About Section': [
        <AboutSectionStoryPreview key="1" />,
        <AboutSectionTeamPreview key="2" />,
        <AboutSectionMissionPreview key="3" />,
        <AboutSectionTimelinePreview key="4" />,
      ],
      'Contact Info': [
        <ContactInfoCardPreview key="1" />,
        <ContactInfoMapPreview key="2" />,
        <ContactInfoIconsPreview key="3" />,
        <ContactInfoSocialPreview key="4" />,
      ],
      'Company Stats': [
        <CompanyStatsCounterPreview key="1" />,
        <CompanyStatsCardsPreview key="2" />,
        <CompanyStatsAnimatedPreview key="3" />,
        <CompanyStatsInfographicPreview key="4" />,
      ],
      'FAQ Section': [
        <FAQSectionAccordionPreview key="1" />,
        <FAQSectionCategoryPreview key="2" />,
        <FAQSectionSearchablePreview key="3" />,
        <FAQSectionTabbedPreview key="4" />,
      ],
      // Dashboard and Admin Category
      'Dashboard Widget': [
        <DashboardWidgetChartPreview key="1" />,
        <DashboardWidgetStatPreview key="2" />,
        <DashboardWidgetListPreview key="3" />,
        <DashboardWidgetProgressPreview key="4" />,
      ],
      'Data Table': [
        <DataTablePreview1 key="1" />,
        <DataTablePreview2 key="2" />,
        <DataTablePreview3 key="3" />,
        <DataTablePreview4 key="4" />,
      ],
      'Analytics Card': [
        <AnalyticsCardPreview1 key="1" />,
        <AnalyticsCardPreview2 key="2" />,
        <AnalyticsCardPreview3 key="3" />,
        <AnalyticsCardPreview4 key="4" />,
      ],
      'Status Indicator': [
        <StatusIndicatorPreview1 key="1" />,
        <StatusIndicatorPreview2 key="2" />,
        <StatusIndicatorPreview3 key="3" />,
        <StatusIndicatorPreview4 key="4" />,
      ],
      'Action Button': [
        <ActionButtonPreview1 key="1" />,
        <ActionButtonPreview2 key="2" />,
        <ActionButtonPreview3 key="3" />,
        <ActionButtonPreview4 key="4" />,
      ],
      'Settings Panel': [
        <SettingsPanelPreview1 key="1" />,
        <SettingsPanelPreview2 key="2" />,
        <SettingsPanelPreview3 key="3" />,
        <SettingsPanelPreview4 key="4" />,
      ],
      // Marketing and Promotion Category
      'Call to Action': [
        <CallToActionButtonPreview key="1" />,
        <CallToActionBannerPreview key="2" />,
        <CallToActionModalPreview key="3" />,
        <CallToActionInlinePreview key="4" />,
      ],
      'Promotional Banner': [
        <PromotionalBannerPreview1 key="1" />,
        <PromotionalBannerPreview2 key="2" />,
        <PromotionalBannerPreview3 key="3" />,
        <PromotionalBannerPreview4 key="4" />,
      ],
      'Feature Highlight': [
        <FeatureHighlightPreview1 key="1" />,
        <FeatureHighlightPreview2 key="2" />,
        <FeatureHighlightPreview3 key="3" />,
        <FeatureHighlightPreview4 key="4" />,
      ],
      'Newsletter Banner': [
        <NewsletterBannerPreview1 key="1" />,
        <NewsletterBannerPreview2 key="2" />,
        <NewsletterBannerPreview3 key="3" />,
        <NewsletterBannerPreview4 key="4" />,
      ],
      'Discount Badge': [
        <DiscountBadgePreview1 key="1" />,
        <DiscountBadgePreview2 key="2" />,
        <DiscountBadgePreview3 key="3" />,
        <DiscountBadgePreview4 key="4" />,
      ],
      'Landing Hero': [
        <LandingHeroPreview1 key="1" />,
        <LandingHeroPreview2 key="2" />,
        <LandingHeroPreview3 key="3" />,
        <LandingHeroPreview4 key="4" />,
      ],
      'Product Showcase': [
        <ProductShowcase3DCardPreview key="1" />,
        <ProductShowcaseSplitHeroPreview key="2" />,
        <ProductShowcase360Preview key="3" />,
        <ProductShowcaseNeonPreview key="4" />,
      ],
      'Testimonial Banner': [
        <TestimonialBannerWhisperPreview key="1" />,
        <TestimonialBannerHolographicPreview key="2" />,
        <TestimonialBannerRoyalPreview key="3" />,
        <TestimonialBannerExplosivePreview key="4" />,
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
                  {/* {variation.metadata.implementationNotes.length > 0 && (
                    <div className="text-xs">
                      <p className="font-medium text-foreground mb-1">Implementation Notes:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                        {variation.metadata.implementationNotes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )} */}

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

  // Category-specific preview components mapping
  const getCategoryPreview = () => {
    switch (selectedItem) {
      case 'Media & Gallery':
        return <MediaGalleryPreview />
      case 'News & Content':
        return <NewsContentPreview />
      case 'E-commerce':
        return <EcommercePreview />
      case 'Social & Engagement':
        return <SocialEngagementPreview />
      case 'Business & Corporate':
        return <BusinessCorporatePreview />
      case 'Marketing & Promotion':
        return <MarketingPromotionsPreview />
      default:
        return null
    }
  }

  const categoryPreview = getCategoryPreview()
  
  if (categoryPreview) {
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
        {categoryPreview}
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
