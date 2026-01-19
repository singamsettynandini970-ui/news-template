import type { ExtendedPanel, TemplateVariation } from './template-registry'
import React from 'react'
import { ChevronLeft, ChevronRight, Maximize2, RotateCcw, Layers, Zap, Award, Star, Shield, Truck, Flame, Target, TrendingUp, Quote, CheckCircle, MessageCircle, ThumbsUp, Share2, Users, Seal, Trophy } from 'lucide-react'

// Call to Action Templates
const CALL_TO_ACTION_TEMPLATES = [
  {
    id: 'cta-minimal',
    name: 'Clean & Simple',
    style: 'minimal' as const,
    code: `import { ArrowRight } from "lucide-react"

export default function CleanSimpleCTA() {
  return (
    <div className="w-full max-w-sm p-8 text-center bg-white border border-gray-100 rounded-lg shadow-sm">
      <h3 className="text-xl font-light text-gray-800 mb-3">Start Your Journey</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">Simple. Elegant. Effective.</p>
      <button className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        Begin <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  )
}`
  },
  {
    id: 'cta-modern',
    name: 'Neon Glow',
    style: 'modern' as const,
    code: `import { Zap } from "lucide-react"

export default function NeonGlowCTA() {
  return (
    <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse" />
      <div className="relative text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4 animate-bounce">
          <Zap className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">Future is Now</h3>
        <p className="text-gray-300 mb-6">Experience next-generation technology</p>
        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:scale-105">
          ACTIVATE
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 'cta-classic',
    name: 'Corporate Elite',
    style: 'classic' as const,
    code: `import { Award, Users } from "lucide-react"

export default function CorporateEliteCTA() {
  return (
    <div className="w-full max-w-lg p-8 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Award className="h-6 w-6 text-blue-600" />
        <span className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Enterprise Grade</span>
      </div>
      <h3 className="text-2xl font-bold text-blue-900 mb-3">Trusted by Fortune 500</h3>
      <p className="text-blue-700 mb-6">Join 50,000+ professionals who rely on our platform for mission-critical operations.</p>
      <div className="flex items-center gap-4">
        <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Request Demo
        </button>
        <div className="flex items-center gap-2 text-blue-600">
          <Users className="h-4 w-4" />
          <span className="text-sm font-medium">50K+ Users</span>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'cta-bold',
    name: 'Explosive Impact',
    style: 'bold' as const,
    code: `import { Rocket, Star } from "lucide-react"

export default function ExplosiveImpactCTA() {
  return (
    <div className="w-full max-w-lg p-10 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl text-white relative overflow-hidden transform rotate-1 shadow-2xl">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-ping" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-6 w-6 text-yellow-300 animate-spin" />
          <span className="text-yellow-300 font-black text-sm uppercase tracking-widest">Limited Time</span>
        </div>
        <h3 className="text-4xl font-black mb-4 transform -skew-x-6">BREAKTHROUGH!</h3>
        <p className="text-xl font-bold mb-6">Revolutionary results in 24 hours or your money back!</p>
        <button className="w-full px-8 py-4 bg-yellow-400 text-black rounded-2xl font-black text-xl hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
          <Rocket className="h-6 w-6" />
          LAUNCH NOW!
        </button>
        <p className="text-center text-yellow-200 text-xs mt-3 font-semibold">⚡ 10,000+ SUCCESS STORIES ⚡</p>
      </div>
    </div>
  )
}`
  }
]

// Promotional Banner Templates - 4 unique variations
const PROMOTIONAL_BANNER_TEMPLATES = [
  {
    id: 'promo-minimal',
    name: 'Simple Banner',
    style: 'minimal' as const,
    code: `export default function SimpleBanner() {
  return (
    <div className="w-full bg-red-50 border-2 border-red-300 rounded-lg p-4 text-center">
      <p className="text-lg font-bold text-red-600">🎉 FLASH SALE</p>
      <p className="text-sm text-gray-700 mt-1">50% off everything - Ends in 24 hours!</p>
    </div>
  )
}` 
  },
  {
    id: 'promo-modern',
    name: 'Gradient Banner',
    style: 'modern' as const,
    code: `export default function GradientBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-5 text-center text-white shadow-lg">
      <p className="text-xl font-bold mb-1">LIMITED TIME OFFER</p>
      <p className="text-sm opacity-90">Get 50% off on all premium plans. Don't miss out!</p>
      <button className="mt-3 px-6 py-2 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">Shop Now</button>
    </div>
  )
}` 
  },
  {
    id: 'promo-classic',
    name: 'Neon Banner',
    style: 'classic' as const,
    code: `export default function NeonBanner() {
  return (
    <div className="w-full bg-black border-2 border-yellow-400 rounded-lg p-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <p className="text-yellow-400 font-mono text-sm font-bold">NEW YEAR SALE</p>
        <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      <p className="text-white text-sm">50% OFF - Use code: NEWYEAR2024</p>
    </div>
  )
}` 
  },
  {
    id: 'promo-bold',
    name: 'Mega Sale Banner',
    style: 'bold' as const,
    code: `export default function MegaSaleBanner() {
  return (
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
}` 
  }
]

// Feature Highlight Templates - 4 unique variations
const FEATURE_HIGHLIGHT_TEMPLATES = [
  {
    id: 'feature-minimal',
    name: 'Standard Card',
    style: 'minimal' as const,
    code: `import { Sparkles } from "lucide-react"

export default function StandardCard() {
  return (
    <div className="w-full max-w-sm border border-gray-200 rounded-lg p-5 space-y-3 hover:shadow-lg transition-shadow bg-white">
      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
        <Sparkles className="h-6 w-6 text-blue-600" />
      </div>
      <p className="text-base font-bold text-gray-900">Key Feature</p>
      <p className="text-sm text-gray-600">Description of this amazing feature and its benefits for users</p>
      <button className="text-sm text-blue-600 font-medium hover:underline">Learn more →</button>
    </div>
  )
}` 
  },
  {
    id: 'feature-modern',
    name: 'Gradient Card',
    style: 'modern' as const,
    code: `import { Sparkles } from "lucide-react"

export default function GradientCard() {
  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
        <Sparkles className="h-8 w-8 text-white" />
      </div>
      <p className="text-lg font-bold mb-2">Premium Feature</p>
      <p className="text-sm opacity-90 mb-4">Unlock powerful capabilities with this premium feature</p>
      <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">Explore</button>
    </div>
  )
}` 
  },
  {
    id: 'feature-classic',
    name: 'Sidebar Style',
    style: 'classic' as const,
    code: `import { Sparkles } from "lucide-react"

export default function SidebarStyle() {
  return (
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
}` 
  },
  {
    id: 'feature-bold',
    name: 'Neon Terminal',
    style: 'bold' as const,
    code: `import { Sparkles } from "lucide-react"

export default function NeonTerminal() {
  return (
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
}` 
  }
]

// Discount Badge Templates - 4 unique variations
const DISCOUNT_BADGE_TEMPLATES = [
  {
    id: 'discount-minimal-1',
    name: 'Standard Badge',
    style: 'minimal' as const,
    code: `export default function StandardBadge() {
  return (
    <div className="relative">
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
}` 
  },
  {
    id: 'discount-minimal-2',
    name: 'Circular Badge',
    style: 'minimal' as const,
    code: `export default function CircularBadge() {
  return (
    <div className="relative">
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
}` 
  },
  {
    id: 'discount-minimal-3',
    name: 'Corner Badge',
    style: 'minimal' as const,
    code: `export default function CornerBadge() {
  return (
    <div className="relative">
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
}` 
  },
  {
    id: 'discount-bold-3',
    name: 'Neon Badge',
    style: 'bold' as const,
    code: `export default function NeonBadge() {
  return (
    <div className="relative">
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
}` 
  }
]

// Product Showcase Templates - Unique 3D/Interactive Product Display Designs
const PRODUCT_SHOWCASE_TEMPLATES = [
  {
    id: 'product-minimal',
    name: 'Floating Gallery',
    style: 'minimal' as const,
    code: `import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

export default function FloatingGallery() {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Product Image Carousel */}
      <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group">
        <div className="w-48 h-48 bg-white rounded-xl shadow-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg" />
        </div>
        
        {/* Navigation Arrows */}
        <button className="absolute left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <button className="absolute right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
        
        {/* Zoom Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="h-4 w-4 text-gray-600" />
        </button>
        
        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={\`w-12 h-12 rounded-lg \${i === 0 ? 'bg-white border-2 border-blue-500' : 'bg-white/60'} flex items-center justify-center cursor-pointer\`}>
              <div className="w-8 h-8 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Premium Product</h3>
            <p className="text-gray-500 text-sm">SKU: PRD-001</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">$299</div>
            <div className="text-sm text-gray-500 line-through">$399</div>
          </div>
        </div>
        
        {/* Color Options */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Color:</p>
          <div className="flex gap-2">
            {['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-gray-800'].map((color, i) => (
              <button key={i} className={\`w-8 h-8 rounded-full \${color} \${i === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}\`} />
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            ♡
          </button>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'product-modern',
    name: '3D Product Viewer',
    style: 'modern' as const,
    code: `import { RotateCcw, Layers, Zap } from "lucide-react"

export default function ProductViewer3D() {
  return (
    <div className="w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* 3D Viewer */}
      <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
        <div className="relative">
          {/* 3D Product Mock */}
          <div className="w-40 h-40 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500 shadow-2xl">
            <div className="absolute inset-4 bg-gradient-to-tl from-white/20 to-transparent rounded-xl" />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full animate-pulse" />
        </div>
        
        {/* Control Panel */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors">
            <Layers className="h-4 w-4" />
          </button>
        </div>
        
        {/* AR Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white text-xs font-bold flex items-center gap-1">
          <Zap className="h-3 w-3" /> AR VIEW
        </div>
        
        {/* Progress Ring */}
        <div className="absolute bottom-4 right-4">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="20" stroke="white/20" strokeWidth="2" fill="none" />
            <circle cx="24" cy="24" r="20" stroke="cyan" strokeWidth="2" fill="none" strokeDasharray="125" strokeDashoffset="25" className="animate-pulse" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">3D</div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-wide">Next-Gen Tech</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          HoloDevice Pro
        </h3>
        
        <p className="text-gray-300 text-sm mb-4">Experience the future with advanced holographic display technology</p>
        
        {/* Specs */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-gray-400">Resolution</div>
            <div className="text-white font-bold">8K Ultra</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-gray-400">Refresh Rate</div>
            <div className="text-white font-bold">120Hz</div>
          </div>
        </div>
        
        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white">$1,299</div>
            <div className="text-cyan-400 text-xs">Free shipping</div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            Pre-order
          </button>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'product-classic',
    name: 'Catalog Display',
    style: 'classic' as const,
    code: `import { Award, Star, Shield, Truck } from "lucide-react"

export default function CatalogDisplay() {
  return (
    <div className="w-full max-w-xl bg-white border-2 border-gray-200 rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-semibold text-sm uppercase tracking-wide">Premium Collection</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            ))}
            <span className="text-gray-600 text-sm ml-1">(4.9)</span>
          </div>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Main Product */}
          <div className="col-span-2">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-3">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg shadow-md" />
            </div>
          </div>
          
          {/* Thumbnail Grid */}
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded border-2 border-transparent hover:border-blue-500 cursor-pointer flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Professional Series X1</h3>
            <p className="text-gray-600 text-sm">Engineered for excellence • Model: PSX-2024</p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-gray-700">
              <Shield className="h-4 w-4 text-green-600" />
              <span>5-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>Free Delivery</span>
            </div>
          </div>
          
          {/* Specifications */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Specifications</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>Dimensions: 12" × 8" × 3"</div>
              <div>Weight: 2.5 lbs</div>
              <div>Material: Premium Steel</div>
              <div>Finish: Brushed Chrome</div>
            </div>
          </div>
          
          {/* Price & Purchase */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-gray-900">$449.99</div>
              <div className="text-sm text-gray-500">MSRP: <span className="line-through">$599.99</span></div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm">
                Compare
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'product-bold',
    name: 'Explosive Showcase',
    style: 'bold' as const,
    code: `import { Flame, Zap, Target, TrendingUp } from "lucide-react"

export default function ExplosiveShowcase() {
  return (
    <div className="w-full max-w-lg bg-black rounded-3xl overflow-hidden relative transform rotate-2 shadow-2xl">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-orange-500/20 to-yellow-400/20 animate-pulse" />
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500 rounded-full opacity-30 animate-ping" />
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce" />
      
      {/* Product Display */}
      <div className="relative p-8">
        {/* Explosive Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
            <span className="text-red-400 font-black text-lg uppercase tracking-widest">EXPLOSIVE DEAL</span>
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
          </div>
          
          {/* Countdown Timer */}
          <div className="flex justify-center gap-2 mb-4">
            {['23', '59', '45'].map((time, i) => (
              <div key={i} className="bg-red-600 text-white px-3 py-2 rounded-lg font-black text-lg">
                {time}
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Image */}
        <div className="relative mb-6">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-yellow-400 to-red-600 rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-2xl">
            <div className="w-32 h-32 bg-black rounded-2xl flex items-center justify-center">
              <Target className="h-16 w-16 text-red-500 animate-spin" />
            </div>
          </div>
          
          {/* Explosion Effects */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-red-500 rounded-full animate-bounce" />
          <div className="absolute top-1/2 -left-4 w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
        </div>
        
        {/* Product Info */}
        <div className="text-center text-white">
          <h3 className="text-3xl font-black mb-2 transform -skew-x-6 text-yellow-400">
            MEGA BLASTER 3000
          </h3>
          <p className="text-red-400 font-bold text-lg mb-4">⚡ MAXIMUM POWER EDITION ⚡</p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-red-600/50 rounded-lg p-3">
              <TrendingUp className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-yellow-400 font-black text-lg">+500%</div>
              <div className="text-white text-xs">POWER</div>
            </div>
            <div className="bg-orange-600/50 rounded-lg p-3">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-1 animate-pulse" />
              <div className="text-yellow-400 font-black text-lg">∞</div>
              <div className="text-white text-xs">ENERGY</div>
            </div>
            <div className="bg-yellow-600/50 rounded-lg p-3">
              <Flame className="h-6 w-6 text-red-400 mx-auto mb-1 animate-bounce" />
              <div className="text-red-400 font-black text-lg">MAX</div>
              <div className="text-white text-xs">IMPACT</div>
            </div>
          </div>
          
          {/* Price & Action */}
          <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-4 mb-4">
            <div className="text-black font-black text-4xl mb-1">$999</div>
            <div className="text-red-800 font-bold text-sm line-through">Was $1999</div>
            <div className="text-black font-black text-lg">💥 50% OFF! 💥</div>
          </div>
          
          <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-red-500 text-black rounded-2xl font-black text-xl hover:from-yellow-300 hover:to-red-400 transition-all transform hover:scale-105 shadow-lg">
            🚀 UNLEASH THE POWER! 🚀
          </button>
          
          <p className="text-red-400 text-xs mt-3 font-bold animate-pulse">
            ⚠️ WARNING: EXTREMELY POWERFUL ⚠️
          </p>
        </div>
      </div>
    </div>
  )
}`
  }
]

// Testimonial Banner Templates - Unique Customer Feedback & Social Proof Designs
const TESTIMONIAL_BANNER_TEMPLATES = [
  {
    id: 'testimonial-minimal',
    name: 'Floating Review',
    style: 'minimal' as const,
    code: `import { Quote, Star, CheckCircle } from "lucide-react"

export default function FloatingReview() {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Review Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <Quote className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Customer Review</div>
              <div className="text-xs text-gray-500">Verified Purchase</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
        </div>
        
        {/* Review Text */}
        <p className="text-gray-700 leading-relaxed mb-4 italic">
          "This product exceeded all my expectations. The quality is outstanding and the customer service was exceptional. I've been using it for 3 months now and couldn't be happier with my purchase."
        </p>
        
        {/* Reviewer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <span className="text-green-700 font-semibold text-sm">SM</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Sarah Mitchell</div>
              <div className="text-xs text-gray-500">Marketing Director</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs font-medium">Verified Buyer</span>
          </div>
        </div>
      </div>
      
      {/* Review Stats */}
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">4.9</div>
            <div className="text-xs text-gray-500">Average Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">2,847</div>
            <div className="text-xs text-gray-500">Total Reviews</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">98%</div>
            <div className="text-xs text-gray-500">Recommend</div>
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'testimonial-modern',
    name: 'Social Proof Hub',
    style: 'modern' as const,
    code: `import { MessageCircle, ThumbsUp, Share2, TrendingUp, Users } from "lucide-react"

export default function SocialProofHub() {
  return (
    <div className="w-full max-w-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">Community Feedback</div>
              <div className="text-cyan-400 text-sm">Real-time social proof</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-bold">LIVE</span>
          </div>
        </div>
      </div>
      
      {/* Main Testimonial */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Review */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">AC</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-bold">Alex Chen</span>
                    <span className="text-cyan-400 text-sm">@alexc_dev</span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span className="text-gray-400 text-sm">2h ago</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    "Just hit 6 months using this platform and the results are incredible! 🚀 
                    My productivity increased by 300% and the team collaboration features are game-changing. 
                    Best investment I've made this year! #ProductivityHack"
                  </p>
                  
                  {/* Engagement Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-red-400 cursor-pointer transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">847</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">23</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-green-400 cursor-pointer transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Live Stats */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-bold text-sm">TRENDING UP</span>
              </div>
              <div className="text-white text-2xl font-bold mb-1">+2,847</div>
              <div className="text-gray-400 text-xs">New reviews this week</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
              <div className="text-cyan-400 text-sm font-bold mb-2">SATISFACTION SCORE</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-3xl font-bold">9.8</span>
                <span className="text-gray-400 text-sm">/10</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full w-[98%]" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
              <div className="text-purple-400 text-sm font-bold mb-2">ACTIVE USERS</div>
              <div className="text-white text-2xl font-bold mb-1">47.2K</div>
              <div className="text-gray-400 text-xs">Online right now</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'testimonial-classic',
    name: 'Certificate of Excellence',
    style: 'classic' as const,
    code: `import { Award, Seal, Shield, Star } from "lucide-react"

export default function CertificateExcellence() {
  return (
    <div className="w-full max-w-2xl bg-gradient-to-b from-amber-50 to-cream border-4 border-amber-300 rounded-lg shadow-xl relative">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-amber-400 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-amber-400 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-amber-400 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-amber-400 rounded-br-lg" />
      
      {/* Header */}
      <div className="text-center p-8 border-b-2 border-amber-200">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Award className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Certificate of Excellence</h2>
        <p className="text-amber-700 font-serif italic">Outstanding Customer Satisfaction</p>
      </div>
      
      {/* Main Content */}
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 text-amber-500 fill-amber-500" />
            ))}
          </div>
          <p className="text-lg font-serif text-amber-900 leading-relaxed italic mb-6">
            "In recognition of exceptional service quality, professional excellence, and unwavering commitment to customer satisfaction. This organization has consistently demonstrated the highest standards of business practice and customer care."
          </p>
        </div>
        
        {/* Testimonial Quote */}
        <div className="bg-white/60 rounded-lg p-6 border-2 border-amber-200 mb-6">
          <p className="text-amber-900 font-serif text-lg leading-relaxed mb-4">
            "Having worked with numerous service providers over my 25-year career, I can confidently state that this organization sets the gold standard for professional excellence and customer dedication."
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-2 border-blue-300 flex items-center justify-center">
                <span className="text-blue-800 font-bold text-lg">RH</span>
              </div>
              <div>
                <div className="font-serif font-bold text-amber-900 text-lg">Robert Harrison</div>
                <div className="text-amber-700 text-sm">Chairman, Industry Council</div>
                <div className="text-amber-600 text-xs">Member since 1998</div>
              </div>
            </div>
            <div className="text-right">
              <Seal className="h-12 w-12 text-amber-600 mx-auto mb-1" />
              <div className="text-amber-700 text-xs font-bold">CERTIFIED</div>
            </div>
          </div>
        </div>
        
        {/* Credentials */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
            <Shield className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-amber-900 font-bold text-lg">A+</div>
            <div className="text-amber-700 text-xs">BBB Rating</div>
          </div>
          <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
            <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-amber-900 font-bold text-lg">ISO</div>
            <div className="text-amber-700 text-xs">Certified</div>
          </div>
          <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
            <Star className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-amber-900 font-bold text-lg">25+</div>
            <div className="text-amber-700 text-xs">Years</div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center p-4 border-t-2 border-amber-200 bg-amber-100/50">
        <p className="text-amber-800 text-sm font-serif">Established 1999 • Trusted by 10,000+ Clients Worldwide</p>
      </div>
    </div>
  )
}`
  },
  {
    id: 'testimonial-bold',
    name: 'Success Explosion',
    style: 'bold' as const,
    code: `import { Flame, TrendingUp, Zap, Target, Trophy } from "lucide-react"

export default function SuccessExplosion() {
  return (
    <div className="w-full max-w-3xl bg-black rounded-3xl overflow-hidden relative transform -rotate-1 shadow-2xl">
      {/* Explosive Background Effects */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-ping" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-500 rounded-full opacity-30 animate-bounce" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-500 rounded-full opacity-10 animate-pulse" />
      
      <div className="relative p-8">
        {/* Header Explosion */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-12 w-12 text-red-500 animate-bounce" />
            <span className="text-red-400 font-black text-2xl uppercase tracking-widest">SUCCESS STORY</span>
            <Flame className="h-12 w-12 text-red-500 animate-bounce" />
          </div>
          
          {/* Impact Numbers */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 transform rotate-3 shadow-xl">
              <TrendingUp className="h-12 w-12 text-yellow-300 mx-auto mb-2 animate-pulse" />
              <div className="text-yellow-300 font-black text-4xl mb-1">+500%</div>
              <div className="text-white font-bold text-lg">GROWTH</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 transform -rotate-2 shadow-xl">
              <Target className="h-12 w-12 text-red-600 mx-auto mb-2 animate-spin" />
              <div className="text-red-600 font-black text-4xl mb-1">100%</div>
              <div className="text-black font-bold text-lg">SUCCESS</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-2xl p-6 transform rotate-1 shadow-xl">
              <Trophy className="h-12 w-12 text-orange-600 mx-auto mb-2 animate-bounce" />
              <div className="text-orange-600 font-black text-4xl mb-1">#1</div>
              <div className="text-black font-bold text-lg">RESULTS</div>
            </div>
          </div>
        </div>
        
        {/* Main Testimonial */}
        <div className="bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-3xl p-8 border-2 border-yellow-400 mb-8">
          <div className="text-center">
            <div className="text-6xl font-black text-yellow-400 mb-4 transform -skew-x-12 animate-pulse">
              "ABSOLUTELY INSANE!"
            </div>
            <p className="text-white text-2xl font-bold mb-6 transform skew-x-3">
              "This completely DESTROYED my expectations and rebuilt them from scratch! 
              My business went from struggling to DOMINATING the market in just 90 days!"
            </p>
            
            {/* Customer Info */}
            <div className="flex items-center justify-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center transform rotate-12 animate-spin-slow border-4 border-white">
                <Zap className="h-12 w-12 text-black" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-black text-white mb-1">MIKE "CRUSHER" JOHNSON</div>
                <div className="text-yellow-400 font-black text-xl">CEO • EXTREME ENTERPRISES</div>
                <div className="text-red-400 text-lg font-bold">⚡ VERIFIED SUCCESS STORY ⚡</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-red-600 rounded-xl p-4 transform rotate-1">
            <div className="text-yellow-300 font-black text-2xl">2M+</div>
            <div className="text-white font-bold text-sm">REVENUE</div>
          </div>
          <div className="bg-orange-500 rounded-xl p-4 transform -rotate-2">
            <div className="text-black font-black text-2xl">90</div>
            <div className="text-black font-bold text-sm">DAYS</div>
          </div>
          <div className="bg-yellow-400 rounded-xl p-4 transform rotate-2">
            <div className="text-red-600 font-black text-2xl">0</div>
            <div className="text-black font-bold text-sm">REGRETS</div>
          </div>
          <div className="bg-green-500 rounded-xl p-4 transform -rotate-1">
            <div className="text-black font-black text-2xl">∞</div>
            <div className="text-black font-bold text-sm">POWER</div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-red-400 text-lg font-bold animate-pulse">
            💥 WARNING: RESULTS MAY BE TOO POWERFUL 💥
          </p>
        </div>
      </div>
    </div>
  )
}`
  }
]

const createMarketingPanel = (id: string, name: string, templates: any[]): ExtendedPanel => {
  const variations: TemplateVariation[] = templates.map((template) => ({
    id: template.id,
    name: template.name,
    description: `${name} - ${template.name}`,
    style: template.style,
    code: template.code,
    previewComponent: template.previewComponent,
    metadata: {
      createdDate: '2026-01-08',
      version: '1.0.0',
      author: 'Template Generator',
      complexity: 'simple',
      responsive: true,
      accessible: true,
      darkModeSupport: true,
      dependencies: ['lucide-react'],
      features: ['Responsive Design', 'Interactive Elements', 'Accessibility'],
      useCases: ['Marketing Campaigns', 'User Engagement', 'Conversion Optimization'],
      implementationNotes: ['Customizable colors', 'Animation support', 'Mobile responsive']
    }
  }))

  return {
    id,
    name,
    description: `${name} component templates with different design styles`,
    category: 'marketing-promotion',
    variations,
    tags: ['marketing', 'promotion', 'conversion']
  }
}

// Newsletter Banner Templates - 4 unique variations
const NEWSLETTER_BANNER_TEMPLATES = [
  {
    id: 'newsletter-minimal',
    name: 'Standard Form',
    style: 'minimal' as const,
    code: `import { useState } from "react"

export default function StandardForm() {
  const [email, setEmail] = useState("")
  
  return (
    <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
      <p className="text-base font-bold text-gray-900">Subscribe to our newsletter</p>
      <p className="text-sm text-gray-600">Get the latest updates delivered to your inbox</p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
        />
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Subscribe</button>
      </div>
    </div>
  )
}` 
  },
  {
    id: 'newsletter-modern',
    name: 'Gradient Form',
    style: 'modern' as const,
    code: `import { useState } from "react"

export default function GradientForm() {
  const [email, setEmail] = useState("")
  
  return (
    <div className="w-full max-w-2xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
      <p className="text-xl font-bold mb-2">Stay Updated</p>
      <p className="text-sm opacity-90 mb-4">Join 10,000+ subscribers for weekly insights</p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 text-sm"
        />
        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">Subscribe</button>
      </div>
    </div>
  )
}` 
  },
  {
    id: 'newsletter-classic',
    name: 'Inline Form',
    style: 'classic' as const,
    code: `import { useState } from "react"

export default function InlineForm() {
  const [email, setEmail] = useState("")
  
  return (
    <div className="w-full max-w-2xl bg-white border-2 border-gray-300 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-900 mb-1">Newsletter</p>
          <p className="text-sm text-gray-600">Get exclusive content delivered weekly</p>
        </div>
        <div className="flex gap-2 flex-1 justify-end">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 text-sm"
          />
          <button className="px-4 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors text-sm">Join</button>
        </div>
      </div>
    </div>
  )
}` 
  },
  {
    id: 'newsletter-bold',
    name: 'Terminal Style',
    style: 'bold' as const,
    code: `import { useState } from "react"

export default function TerminalStyle() {
  const [email, setEmail] = useState("")
  
  return (
    <div className="w-full max-w-2xl bg-black border-2 border-green-400 rounded-lg p-6 font-mono">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
        <p className="text-green-400 text-sm font-bold">NEWSLETTER_SUBSCRIPTION</p>
      </div>
      <p className="text-white text-sm mb-4">Enter your email to receive updates:</p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@domain.com"
          className="flex-1 px-4 py-2 bg-gray-900 border border-green-400/50 rounded text-green-400 placeholder-green-400/50 text-sm font-mono"
        />
        <button className="px-6 py-2 bg-green-400 text-black rounded font-bold hover:bg-green-300 transition-colors text-sm">SUBMIT</button>
      </div>
    </div>
  )
}` 
  }
]

// Landing Hero Templates - 4 unique variations
const LANDING_HERO_TEMPLATES = [
  {
    id: 'hero-minimal',
    name: 'Standard Hero',
    style: 'minimal' as const,
    code: `import { ArrowRight } from "lucide-react"

export default function StandardHero() {
  return (
    <div className="w-full max-w-2xl h-56 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex flex-col items-center justify-center text-center space-y-4 p-6 border border-gray-200">
      <p className="text-3xl font-bold text-gray-900">Welcome to Our Platform</p>
      <p className="text-base text-gray-600 max-w-md">Start your journey with us today and discover amazing possibilities</p>
      <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg">Get Started</button>
    </div>
  )
}` 
  },
  {
    id: 'hero-modern',
    name: 'Gradient Hero',
    style: 'modern' as const,
    code: `import { ArrowRight } from "lucide-react"

export default function GradientHero() {
  return (
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
}` 
  },
  {
    id: 'hero-classic',
    name: 'Minimal Hero',
    style: 'classic' as const,
    code: `export default function MinimalHero() {
  return (
    <div className="w-full max-w-2xl h-56 bg-white border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center text-center space-y-4 p-6">
      <p className="text-3xl font-bold text-gray-900">Simple. Powerful. Effective.</p>
      <p className="text-base text-gray-600 max-w-md">Everything you need to succeed, all in one place</p>
      <div className="flex gap-3">
        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">Get Started</button>
        <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">Watch Demo</button>
      </div>
    </div>
  )
}` 
  },
  {
    id: 'hero-bold',
    name: 'Terminal Hero',
    style: 'bold' as const,
    code: `export default function TerminalHero() {
  return (
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
}` 
  }
]

export const CALL_TO_ACTION_PANEL_WITH_VARIATIONS = createMarketingPanel('call-to-action', 'Call to Action', CALL_TO_ACTION_TEMPLATES)
export const PROMOTIONAL_BANNER_PANEL_WITH_VARIATIONS = createMarketingPanel('promotional-banner', 'Promotional Banner', PROMOTIONAL_BANNER_TEMPLATES)
export const FEATURE_HIGHLIGHT_PANEL_WITH_VARIATIONS = createMarketingPanel('feature-highlight', 'Feature Highlight', FEATURE_HIGHLIGHT_TEMPLATES)
export const NEWSLETTER_BANNER_PANEL_WITH_VARIATIONS = createMarketingPanel('newsletter-banner', 'Newsletter Banner', NEWSLETTER_BANNER_TEMPLATES)
export const DISCOUNT_BADGE_PANEL_WITH_VARIATIONS = createMarketingPanel('discount-badge', 'Discount Badge', DISCOUNT_BADGE_TEMPLATES)
export const LANDING_HERO_PANEL_WITH_VARIATIONS = createMarketingPanel('landing-hero', 'Landing Hero', LANDING_HERO_TEMPLATES)
export const PRODUCT_SHOWCASE_PANEL_WITH_VARIATIONS = createMarketingPanel('product-showcase', 'Product Showcase', PRODUCT_SHOWCASE_TEMPLATES)
export const TESTIMONIAL_BANNER_PANEL_WITH_VARIATIONS = createMarketingPanel('testimonial-banner', 'Testimonial Banner', TESTIMONIAL_BANNER_TEMPLATES)

export {
  CALL_TO_ACTION_TEMPLATES,
  PROMOTIONAL_BANNER_TEMPLATES,
  FEATURE_HIGHLIGHT_TEMPLATES,
  PRODUCT_SHOWCASE_TEMPLATES,
  TESTIMONIAL_BANNER_TEMPLATES,
  NEWSLETTER_BANNER_TEMPLATES,
  DISCOUNT_BADGE_TEMPLATES,
  LANDING_HERO_TEMPLATES
}
