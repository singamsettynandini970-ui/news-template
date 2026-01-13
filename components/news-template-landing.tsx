"use client"

import type React from "react"

import { useState } from "react"
import { Search, User, Video, ImageIcon, FileText, Layout, Grid3x3, Share2, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComponentHighlight {
  name: string
  description: string
  icon: React.ReactNode
}

export function NewsTemplateLanding() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const componentMap: Record<string, ComponentHighlight> = {
    header: {
      name: "Header Panel",
      description: "Multi-tier navigation with branding",
      icon: <Layout className="w-4 h-4" />,
    },
    hero: {
      name: "Hero / Lead Story",
      description: "Featured article spotlight",
      icon: <FileText className="w-4 h-4" />,
    },
    trending: { name: "Trending News", description: "Popular stories widget", icon: <Clock className="w-4 h-4" /> },
    video: { name: "Video Highlight", description: "Embedded video player", icon: <Video className="w-4 h-4" /> },
    articles: { name: "Article List", description: "Grid of news articles", icon: <Grid3x3 className="w-4 h-4" /> },
    sidebar: { name: "Sidebar Widget", description: "Editor's picks & ads", icon: <Layout className="w-4 h-4" /> },
    gallery: { name: "Photo Gallery", description: "Image carousel", icon: <ImageIcon className="w-4 h-4" /> },
    footer: { name: "Footer Panel", description: "Links & social media", icon: <Share2 className="w-4 h-4" /> },
  }

  const ComponentTag = ({ section }: { section: string }) => {
    const comp = componentMap[section]
    if (!comp) return null

    return (
      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-10 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
        {comp.icon}
        <div>
          <div className="font-semibold text-sm">{comp.name}</div>
          <div className="text-xs opacity-90">{comp.description}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
            News Template Showcase
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-balance">
            Build Professional News Websites in Minutes
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Explore our complete template library with ready-to-use components. Hover over any section to see which
            component powers it.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="text-base">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent">
              View All Components
            </Button>
          </div>
        </div>
      </div>

      {/* Full News Website Template */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Complete News Portal Example</h2>
          <p className="text-muted-foreground">Hover over sections to discover the components used</p>
        </div>

        {/* Header Section */}
        <div
          className="relative group cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredSection("header")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          {hoveredSection === "header" && <ComponentTag section="header" />}
          <div
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              hoveredSection === "header" ? "ring-4 ring-primary/50 shadow-2xl scale-[1.02]" : "shadow-md"
            }`}
          >
            <div className="bg-card p-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded" />
                    <div>
                      <div className="font-bold text-lg">NewsHub</div>
                      <div className="text-xs text-muted-foreground">www.newshub.com</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm font-medium">
                {["Home", "World", "Politics", "Business", "Technology", "Sports", "Entertainment", "Health"].map(
                  (item) => (
                    <div key={item} className="hover:text-primary cursor-pointer transition-colors">
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Story Section */}
        <div
          className="relative group cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredSection("hero")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          {hoveredSection === "hero" && <ComponentTag section="hero" />}
          <div
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              hoveredSection === "hero" ? "ring-4 ring-primary/50 shadow-2xl scale-[1.02]" : "shadow-md"
            }`}
          >
            <div className="bg-card">
              <div className="aspect-[21/9] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <ImageIcon className="w-24 h-24 text-muted-foreground/30" />
              </div>
              <div className="p-8">
                <div className="inline-block px-3 py-1 bg-destructive/10 text-destructive rounded text-sm font-medium mb-3">
                  BREAKING NEWS
                </div>
                <h2 className="text-4xl font-bold mb-4 text-balance">
                  Major Technology Breakthrough Announced by Leading Scientists
                </h2>
                <p className="text-lg text-muted-foreground mb-4 text-pretty">
                  Researchers unveil groundbreaking discovery that could revolutionize renewable energy production
                  worldwide, promising sustainable solutions for future generations.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Sarah Johnson
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Jan 5, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />5 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trending Section */}
            <div
              className="relative group cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredSection("trending")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {hoveredSection === "trending" && <ComponentTag section="trending" />}
              <div
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  hoveredSection === "trending" ? "ring-4 ring-primary/50 shadow-2xl scale-[1.02]" : "shadow-md"
                }`}
              >
                <div className="bg-card p-6">
                  <h3 className="text-xl font-bold mb-4">🔥 Trending Now</h3>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 hover:bg-accent/50 p-2 rounded cursor-pointer transition-colors"
                      >
                        <div className="text-2xl font-bold text-muted-foreground">{i}</div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Breaking: Important news headline story {i}</div>
                          <div className="text-xs text-muted-foreground">2 hours ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Highlight */}
            <div
              className="relative group cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredSection("video")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {hoveredSection === "video" && <ComponentTag section="video" />}
              <div
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  hoveredSection === "video" ? "ring-4 ring-primary/50 shadow-2xl scale-[1.02]" : "shadow-md"
                }`}
              >
                <div className="bg-card">
                  <div className="aspect-video bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center relative">
                    <Video className="w-16 h-16 text-muted-foreground/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-background/80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-foreground border-b-8 border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Watch: Live Coverage of Global Summit</h3>
                    <p className="text-muted-foreground text-sm">World leaders gather to discuss climate initiatives</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Grid */}
            <div
              className="relative group cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredSection("articles")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {hoveredSection === "articles" && <ComponentTag section="articles" />}
              <div
                className={`transition-all duration-300 ${
                  hoveredSection === "articles" ? "ring-4 ring-primary/50 rounded-lg shadow-2xl scale-[1.02]" : ""
                }`}
              >
                <h3 className="text-2xl font-bold mb-6">Latest Stories</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="border rounded-lg overflow-hidden bg-card shadow-md hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-primary font-medium mb-2">TECHNOLOGY</div>
                        <h4 className="font-bold mb-2 text-balance">Innovative Solutions Transform Daily Life</h4>
                        <p className="text-sm text-muted-foreground mb-3 text-pretty">
                          New developments in artificial intelligence continue to reshape industries worldwide.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />3 hours ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div
              className="relative group cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredSection("gallery")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {hoveredSection === "gallery" && <ComponentTag section="gallery" />}
              <div
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  hoveredSection === "gallery" ? "ring-4 ring-primary/50 shadow-2xl scale-[1.02]" : "shadow-md"
                }`}
              >
                <div className="bg-card p-6">
                  <h3 className="text-xl font-bold mb-4">📸 Photo Gallery: Event Highlights</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                      >
                        <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div
              className="relative group cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredSection("sidebar")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {hoveredSection === "sidebar" && <ComponentTag section="sidebar" />}
              <div
                className={`transition-all duration-300 ${
                  hoveredSection === "sidebar" ? "ring-4 ring-primary/50 rounded-lg shadow-2xl scale-[1.02]" : ""
                }`}
              >
                <div className="space-y-6">
                  {/* Editor's Pick */}
                  <div className="border rounded-lg overflow-hidden bg-card shadow-md">
                    <div className="bg-primary text-primary-foreground p-4 font-bold">Editor's Pick</div>
                    <div className="p-4 space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex gap-3 hover:bg-accent/50 p-2 rounded cursor-pointer transition-colors"
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-1">Must-read story headline</div>
                            <div className="text-xs text-muted-foreground">Jan {i}, 2026</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="border rounded-lg overflow-hidden bg-card shadow-md">
                    <div className="p-6 space-y-4">
                      <h4 className="font-bold text-lg">📧 Daily Newsletter</h4>
                      <p className="text-sm text-muted-foreground">Get the top stories delivered to your inbox</p>
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
                      />
                      <Button className="w-full">Subscribe</Button>
                    </div>
                  </div>

                  {/* Most Popular */}
                  <div className="border rounded-lg overflow-hidden bg-card shadow-md">
                    <div className="p-4">
                      <h4 className="font-bold mb-4">Most Popular</h4>
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 hover:bg-accent/50 p-2 rounded cursor-pointer transition-colors"
                          >
                            <div className="text-xl font-bold text-primary">{i}</div>
                            <div className="text-sm font-medium">Popular article headline goes here</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div
          className="relative group cursor-pointer transition-all duration-300 mt-12"
          onMouseEnter={() => setHoveredSection("footer")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          {hoveredSection === "footer" && <ComponentTag section="footer" />}
          <div
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              hoveredSection === "footer" ? "ring-4 ring-primary/50 shadow-2xl scale-[1.02]" : "shadow-md"
            }`}
          >
            <div className="bg-card p-8">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h5 className="font-bold mb-4">About Us</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="hover:text-primary cursor-pointer">Our Story</li>
                    <li className="hover:text-primary cursor-pointer">Team</li>
                    <li className="hover:text-primary cursor-pointer">Careers</li>
                    <li className="hover:text-primary cursor-pointer">Contact</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold mb-4">Sections</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="hover:text-primary cursor-pointer">World News</li>
                    <li className="hover:text-primary cursor-pointer">Politics</li>
                    <li className="hover:text-primary cursor-pointer">Business</li>
                    <li className="hover:text-primary cursor-pointer">Sports</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold mb-4">Resources</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="hover:text-primary cursor-pointer">Newsletter</li>
                    <li className="hover:text-primary cursor-pointer">Podcasts</li>
                    <li className="hover:text-primary cursor-pointer">Videos</li>
                    <li className="hover:text-primary cursor-pointer">Photos</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold mb-4">Follow Us</h5>
                  <div className="flex gap-3">
                    {["F", "T", "I", "Y"].map((social) => (
                      <div
                        key={social}
                        className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center cursor-pointer transition-colors font-bold"
                      >
                        {social}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t pt-6 flex items-center justify-between text-sm text-muted-foreground">
                <div>© 2026 NewsHub. All rights reserved.</div>
                <div className="flex gap-4">
                  <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-primary cursor-pointer">Terms of Service</span>
                  <span className="hover:text-primary cursor-pointer">Cookie Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-12 text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your News Platform?</h2>
          <p className="text-lg mb-6 opacity-90">
            Start with our complete template library and customize every component to match your brand
          </p>
          <Button size="lg" variant="secondary" className="text-base">
            Browse All Components
          </Button>
        </div>
      </div>
    </div>
  )
}
