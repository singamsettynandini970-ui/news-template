import type { ExtendedPanel, TemplateVariation } from './template-registry'
import React from 'react'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Upload, Download, Grid, List, Maximize2, ChevronLeft, ChevronRight, Eye, Heart, Share2, RotateCcw, ZoomIn, ZoomOut, Filter, Search, Calendar, User, Clock, FileImage, FileVideo, FileAudio, Folder, Star, MoreHorizontal } from 'lucide-react'

// Image Slider Templates - 4 unique variations
const IMAGE_SLIDER_TEMPLATES = [
  {
    id: 'slider-minimal',
    name: 'Clean Slider',
    style: 'minimal' as const,
    code: `import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CleanSlider() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative aspect-video bg-gray-100 group">
        <img src="/api/placeholder/800/450" alt="Slide" className="w-full h-full object-cover" />
        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={\`w-2 h-2 rounded-full \${i === 0 ? 'bg-white' : 'bg-white/50'}\`} />
          ))}
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slider-modern',
    name: 'Neon Slider',
    style: 'modern' as const,
    code: `import { ChevronLeft, ChevronRight, Eye } from "lucide-react"

export default function NeonSlider() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden border border-cyan-500/30">
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 group">
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          <div className="text-cyan-400 text-lg font-mono">IMAGE_PREVIEW</div>
        </div>
        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-cyan-500/30">
          <Eye className="h-4 w-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-mono">1/5</span>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={\`w-3 h-3 rounded-full border-2 \${i === 0 ? 'bg-cyan-400 border-cyan-400' : 'border-cyan-400/50'}\`} />
          ))}
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slider-classic',
    name: 'Gallery Slider',
    style: 'classic' as const,
    code: `import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react"

export default function GallerySlider() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Photo Gallery</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>March 2024</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>John Doe</span>
          </div>
        </div>
      </div>
      <div className="relative aspect-video bg-gray-100 group">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-blue-600 text-lg font-medium">Sample Image</div>
        </div>
        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={\`w-12 h-12 rounded border-2 \${i === 0 ? 'border-blue-500' : 'border-gray-300'} bg-gray-200 cursor-pointer\`} />
            ))}
          </div>
          <div className="text-sm text-gray-600">Image 1 of 5</div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slider-bold',
    name: 'Dynamic Slider',
    style: 'bold' as const,
    code: `import { ChevronLeft, ChevronRight, Zap } from "lucide-react"

export default function DynamicSlider() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-black rounded-3xl overflow-hidden border-2 border-yellow-400 transform rotate-1 shadow-2xl">
      <div className="relative aspect-video bg-gradient-to-br from-red-600/20 via-yellow-500/20 to-orange-500/20 group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-yellow-500/30 animate-pulse" />
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-yellow-400 text-2xl font-black transform -skew-x-12">EXPLOSIVE GALLERY</div>
        </div>
        <button className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl text-black font-black hover:scale-110 transition-transform shadow-lg">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl text-black font-black hover:scale-110 transition-transform shadow-lg">
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded-full">
          <Zap className="h-4 w-4 text-black animate-bounce" />
          <span className="text-black font-black text-sm">LIVE</span>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={\`w-4 h-4 rounded-full \${i === 0 ? 'bg-yellow-400 animate-pulse' : 'bg-white/30'} border-2 border-yellow-400\`} />
          ))}
        </div>
      </div>
    </div>
  )
}`
  }
]

// Media Grid Templates - 4 unique variations
const MEDIA_GRID_TEMPLATES = [
  {
    id: 'grid-minimal',
    name: 'Simple Grid',
    style: 'minimal' as const,
    code: `import { Eye, Heart, Download } from "lucide-react"

export default function SimpleGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image {i + 1}</span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`
  },
  {
    id: 'grid-modern',
    name: 'Holographic Grid',
    style: 'modern' as const,
    code: `import { Zap, Star, Share2 } from "lucide-react"

export default function HolographicGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 rounded-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Digital Gallery
        </h2>
        <p className="text-gray-400">Immersive media experience</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="group relative aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden border border-cyan-500/30 hover:border-cyan-500/60 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
            <div className="w-full h-full flex items-center justify-center relative">
              <span className="text-cyan-400 font-mono text-sm">MEDIA_{i + 1}</span>
            </div>
            <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Zap className="h-3 w-3 text-black" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span className="text-white text-xs">4.8</span>
                </div>
                <button className="p-1 bg-white/20 rounded-full">
                  <Share2 className="h-3 w-3 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`
  },
  {
    id: 'grid-classic',
    name: 'Portfolio Grid',
    style: 'classic' as const,
    code: `import { Calendar, User, Tag } from "lucide-react"

export default function PortfolioGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Media Portfolio</h2>
        <p className="text-gray-600">Professional collection showcase</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-blue-600 font-medium">Portfolio Item {i + 1}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Project Title</h3>
              <p className="text-gray-600 text-sm mb-3">Brief description of the media content and its purpose.</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Mar 2024</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Designer</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>Creative</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`
  },
  {
    id: 'grid-bold',
    name: 'Explosive Grid',
    style: 'bold' as const,
    code: `import { Flame, Target, Zap } from "lucide-react"

export default function ExplosiveGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-black rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-yellow-500/10 to-orange-500/10 animate-pulse" />
      <div className="relative">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
            <h2 className="text-4xl font-black text-yellow-400 transform -skew-x-6">MEDIA BLAST</h2>
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
          </div>
          <p className="text-red-400 font-bold">⚡ EXPLOSIVE CONTENT GALLERY ⚡</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={\`group relative aspect-square bg-gradient-to-br from-red-600 to-yellow-500 rounded-2xl overflow-hidden transform \${i % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform shadow-2xl\`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="w-full h-full flex items-center justify-center relative">
                <Target className="h-12 w-12 text-white animate-spin" />
              </div>
              <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
              <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full">
                <Zap className="h-3 w-3 text-yellow-400" />
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div className="text-white font-black text-sm transform -skew-x-6">ITEM_{i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`
  }
]

// Video Gallery Templates - 4 unique variations
const VIDEO_GALLERY_TEMPLATES = [
  {
    id: 'video-minimal',
    name: 'Clean Video Grid',
    style: 'minimal' as const,
    code: `import { Play, Clock, Eye } from "lucide-react"

export default function CleanVideoGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-video bg-gray-100">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-gray-700 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                5:24
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">Video Title {i + 1}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>1.2K</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>21 days ago</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`
  },
  {
    id: 'video-modern',
    name: 'Cyber Video Hub',
    style: 'modern' as const,
    code: `import { Play, Zap, Users, TrendingUp } from "lucide-react"

export default function CyberVideoHub() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 rounded-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Video Stream
        </h2>
        <p className="text-gray-400">Next-gen video experience</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="group relative bg-gray-800 rounded-xl overflow-hidden border border-cyan-500/30 hover:border-cyan-500/60 transition-all">
            <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-cyan-400 text-xs font-mono rounded">
                08:42
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-2">Stream #{i + 1}</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-cyan-400">
                  <Users className="h-3 w-3" />
                  <span>2.4K</span>
                </div>
                <div className="flex items-center gap-1 text-purple-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>+15%</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Zap className="h-3 w-3" />
                  <span>HD</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`
  },
  {
    id: 'video-classic',
    name: 'Theater Gallery',
    style: 'classic' as const,
    code: `import { Play, Star, Calendar, User } from "lucide-react"

export default function TheaterGallery() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Video Theater</h2>
        <p className="text-blue-700">Premium video collection</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-200">
            <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 transition-colors cursor-pointer">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded">
                12:34
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Featured Video {i + 1}</h3>
              <p className="text-gray-600 mb-4">Professional quality video content with detailed description and information.</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>March 15, 2024</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Director Name</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`
  },
  {
    id: 'video-bold',
    name: 'Action Video Grid',
    style: 'bold' as const,
    code: `import { Play, Flame, Zap, Target } from "lucide-react"

export default function ActionVideoGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-black rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-yellow-500/10 to-orange-500/10 animate-pulse" />
      <div className="relative">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-10 w-10 text-red-500 animate-bounce" />
            <h2 className="text-4xl font-black text-yellow-400 transform -skew-x-6">ACTION VIDEOS</h2>
            <Flame className="h-10 w-10 text-red-500 animate-bounce" />
          </div>
          <p className="text-red-400 font-bold text-lg">⚡ EXPLOSIVE CONTENT ⚡</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={\`group relative bg-gradient-to-br from-red-600 to-yellow-500 rounded-2xl overflow-hidden transform \${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform shadow-2xl\`}>
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-black/30" />
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 group-hover:scale-110 transition-transform">
                    <Play className="h-12 w-12 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
                  <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
                  <span className="text-white font-black text-sm">LIVE</span>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-yellow-400 font-black text-sm rounded">
                  15:47
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full animate-ping" />
              </div>
              <div className="p-4 bg-gradient-to-r from-black/80 to-black/60">
                <h3 className="text-xl font-black text-white mb-2 transform -skew-x-6">ACTION #{i + 1}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-red-400">
                    <Target className="h-4 w-4 animate-spin" />
                    <span className="font-bold text-sm">INTENSE</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Flame className="h-4 w-4 animate-bounce" />
                    <span className="font-bold text-sm">HOT</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`
  }
]

// Audio Player Templates - 4 unique variations
const AUDIO_PLAYER_TEMPLATES = [
  {
    id: 'audio-minimal',
    name: 'Simple Player',
    style: 'minimal' as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

export default function SimplePlayer() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Song Title</h3>
        <p className="text-sm text-gray-500">Artist Name</p>
      </div>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div className="bg-blue-600 h-2 rounded-full w-1/3" />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>1:23</span>
          <span>3:45</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <SkipBack className="h-5 w-5" />
        </button>
        <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          <Play className="h-6 w-6 ml-1" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <SkipForward className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 'audio-modern',
    name: 'Neon Player',
    style: 'modern' as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2, Zap } from "lucide-react"

export default function NeonPlayer() {
  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900 rounded-2xl border border-cyan-500/30 p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center relative">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
            <Zap className="h-12 w-12 text-cyan-400 animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-spin" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Cyber Track
        </h3>
        <p className="text-cyan-400 font-mono text-sm">DIGITAL_ARTIST</p>
      </div>
      <div className="mb-8">
        <div className="w-full bg-gray-700 rounded-full h-3 mb-3 relative overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full w-2/5 relative">
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
          </div>
        </div>
        <div className="flex justify-between text-sm font-mono">
          <span className="text-cyan-400">02:15</span>
          <span className="text-gray-400">05:42</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button className="p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <SkipBack className="h-6 w-6" />
        </button>
        <button className="p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
          <Play className="h-8 w-8 ml-1" />
        </button>
        <button className="p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <SkipForward className="h-6 w-6" />
        </button>
        <button className="p-3 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 hover:bg-purple-500/30 transition-colors">
          <Volume2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 'audio-classic',
    name: 'Vintage Player',
    style: 'classic' as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2, Star } from "lucide-react"

export default function VintagePlayer() {
  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg border-2 border-amber-300 p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="w-40 h-40 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg mx-auto mb-6 flex items-center justify-center border-4 border-amber-400 shadow-inner">
          <div className="w-32 h-32 bg-amber-100 rounded-lg flex items-center justify-center">
            <div className="text-amber-700 font-serif text-lg">♪</div>
          </div>
        </div>
        <h3 className="text-2xl font-serif font-bold text-amber-900 mb-2">Classical Piece</h3>
        <p className="text-amber-700 font-serif">Renowned Composer</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <div className="w-full bg-amber-200 rounded-full h-4 mb-4 border border-amber-300">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full w-1/2 border border-amber-600" />
        </div>
        <div className="flex justify-between text-sm font-serif text-amber-800">
          <span>3:24</span>
          <span>7:18</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button className="p-3 bg-amber-200 border-2 border-amber-400 rounded-full text-amber-700 hover:bg-amber-300 transition-colors shadow-md">
          <SkipBack className="h-6 w-6" />
        </button>
        <button className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 border-2 border-amber-600 rounded-full text-white hover:from-amber-600 hover:to-orange-600 transition-colors shadow-lg">
          <Play className="h-8 w-8 ml-1" />
        </button>
        <button className="p-3 bg-amber-200 border-2 border-amber-400 rounded-full text-amber-700 hover:bg-amber-300 transition-colors shadow-md">
          <SkipForward className="h-6 w-6" />
        </button>
        <button className="p-3 bg-amber-200 border-2 border-amber-400 rounded-full text-amber-700 hover:bg-amber-300 transition-colors shadow-md">
          <Volume2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 'audio-bold',
    name: 'Bass Player',
    style: 'bold' as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2, Zap, Flame } from "lucide-react"

export default function BassPlayer() {
  return (
    <div className="w-full max-w-lg mx-auto bg-black rounded-3xl border-2 border-red-500 p-8 shadow-2xl transform rotate-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-yellow-500/10 to-orange-500/10 animate-pulse" />
      <div className="relative">
        <div className="text-center mb-8">
          <div className="w-40 h-40 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center relative shadow-2xl">
            <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
              <Flame className="h-16 w-16 text-red-500 animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-500 rounded-full animate-bounce" />
          </div>
          <h3 className="text-3xl font-black text-yellow-400 mb-2 transform -skew-x-6">BASS DROP</h3>
          <p className="text-red-400 font-bold text-lg">DJ_EXPLOSIVE</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-white font-black">MAXIMUM VOLUME</span>
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
          </div>
        </div>
        <div className="mb-8">
          <div className="w-full bg-gray-800 rounded-full h-6 mb-4 border-2 border-red-500 relative overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-yellow-500 h-6 rounded-full w-3/5 relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
          <div className="flex justify-between text-lg font-black">
            <span className="text-red-400">04:20</span>
            <span className="text-yellow-400">06:66</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <button className="p-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl text-white hover:scale-110 transition-transform shadow-lg">
            <SkipBack className="h-8 w-8" />
          </button>
          <button className="p-6 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full text-black hover:scale-110 transition-transform shadow-2xl border-4 border-white">
            <Play className="h-12 w-12 ml-1" />
          </button>
          <button className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl text-white hover:scale-110 transition-transform shadow-lg">
            <SkipForward className="h-8 w-8" />
          </button>
          <button className="p-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl text-white hover:scale-110 transition-transform shadow-lg">
            <Volume2 className="h-8 w-8" />
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-red-400 text-sm font-bold animate-pulse">⚠️ WARNING: EXTREMELY LOUD ⚠️</p>
        </div>
      </div>
    </div>
  )
}`
  }
]
// Image Comparison Templates - 4 unique variations
const IMAGE_COMPARISON_TEMPLATES = [
  {
    id: 'comparison-minimal',
    name: 'Simple Compare',
    style: 'minimal' as const,
    code: `import { RotateCcw, ZoomIn } from "lucide-react"

export default function SimpleCompare() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Before & After Comparison</h3>
      </div>
      <div className="relative aspect-video">
        <div className="flex h-full">
          <div className="flex-1 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
            <span className="text-gray-600 font-medium">Before</span>
            <div className="absolute top-2 left-2 px-2 py-1 bg-gray-600 text-white text-xs rounded">ORIGINAL</div>
          </div>
          <div className="w-1 bg-gray-400 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center relative">
            <span className="text-blue-700 font-medium">After</span>
            <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">ENHANCED</div>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
            <ZoomIn className="h-4 w-4" />
            Zoom
          </button>
        </div>
        <div className="text-sm text-gray-500">Drag slider to compare</div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'comparison-modern',
    name: 'Cyber Compare',
    style: 'modern' as const,
    code: `import { Zap, RotateCcw, Maximize2 } from "lucide-react"

export default function CyberCompare() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-cyan-500/30">
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Neural Enhancement Comparison
        </h3>
        <p className="text-gray-400 text-sm mt-1">AI-powered image processing</p>
      </div>
      <div className="relative aspect-video">
        <div className="flex h-full">
          <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center relative">
            <div className="text-gray-400 font-mono text-lg">ORIGINAL_DATA</div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-mono rounded">
              RAW
            </div>
          </div>
          <div className="w-2 bg-gradient-to-b from-cyan-400 to-purple-500 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900 border-2 border-cyan-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-cyan-400" />
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
            <div className="text-cyan-400 font-mono text-lg">ENHANCED_DATA</div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
            <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-mono rounded">
              AI+
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 flex items-center justify-between">
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm flex items-center gap-2 font-mono">
            <RotateCcw className="h-4 w-4" />
            RESET
          </button>
          <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm flex items-center gap-2 font-mono">
            <Maximize2 className="h-4 w-4" />
            FULLSCREEN
          </button>
        </div>
        <div className="text-cyan-400 text-sm font-mono">DRAG_TO_COMPARE</div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'comparison-classic',
    name: 'Professional Compare',
    style: 'classic' as const,
    code: `import { RotateCcw, ZoomIn, Download, Star } from "lucide-react"

export default function ProfessionalCompare() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Image Enhancement Comparison</h3>
            <p className="text-gray-600 text-sm mt-1">Professional photo editing results</p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            ))}
            <span className="text-gray-600 text-sm ml-2">Premium Quality</span>
          </div>
        </div>
      </div>
      <div className="relative aspect-video">
        <div className="flex h-full">
          <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative border-r border-gray-300">
            <div className="text-center">
              <div className="text-gray-600 font-semibold text-lg mb-2">Original Image</div>
              <div className="text-gray-500 text-sm">Standard Processing</div>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-gray-600 text-white text-xs font-semibold rounded">
              BEFORE
            </div>
          </div>
          <div className="w-1 bg-blue-600 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-50 shadow-lg">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-blue-700 font-semibold text-lg mb-2">Enhanced Image</div>
              <div className="text-blue-600 text-sm">Professional Grade</div>
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
              AFTER
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-50 flex items-center justify-between">
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset View
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2">
            <ZoomIn className="h-4 w-4" />
            Zoom In
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
        <div className="text-gray-600 text-sm">Drag the slider to see the difference</div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'comparison-bold',
    name: 'Explosive Compare',
    style: 'bold' as const,
    code: `import { Zap, Flame, Target, RotateCcw } from "lucide-react"

export default function ExplosiveCompare() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-black rounded-3xl border-2 border-yellow-400 overflow-hidden transform rotate-1 shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-yellow-500/10 to-orange-500/10 animate-pulse" />
      <div className="relative">
        <div className="p-6 border-b border-yellow-400">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
            <h3 className="text-2xl font-black text-yellow-400 transform -skew-x-6">BEFORE VS AFTER</h3>
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
          </div>
          <p className="text-red-400 font-bold text-center">⚡ EXPLOSIVE TRANSFORMATION ⚡</p>
        </div>
        <div className="relative aspect-video">
          <div className="flex h-full">
            <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-red-400 font-black text-xl mb-2 transform -skew-x-6">BORING</div>
                <div className="text-gray-400 font-bold">OLD VERSION</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-black rounded transform -rotate-12">
                WEAK
              </div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="w-3 bg-gradient-to-b from-yellow-400 to-red-500 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black border-4 border-yellow-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl">
                <Target className="h-8 w-8 text-yellow-400 animate-spin" />
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-yellow-600 to-orange-500 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-black font-black text-xl mb-2 transform -skew-x-6">AMAZING!</div>
                <div className="text-black font-bold">POWERED UP</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-black text-xs font-black rounded transform rotate-12">
                BEAST
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-yellow-400 rounded-full animate-ping" />
            </div>
          </div>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-black rounded-2xl font-black hover:scale-110 transition-transform shadow-lg flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              RESET
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl font-black hover:scale-110 transition-transform shadow-lg flex items-center gap-2">
              <Zap className="h-5 w-5" />
              MAXIMIZE
            </button>
          </div>
          <div className="text-yellow-400 font-black text-lg animate-pulse">DRAG TO UNLEASH!</div>
        </div>
      </div>
    </div>
  )
}`
  }
]

// Media Upload Templates - 4 unique variations
const MEDIA_UPLOAD_TEMPLATES = [
  {
    id: 'upload-minimal',
    name: 'Simple Upload',
    style: 'minimal' as const,
    code: `import { Upload, FileImage, X } from "lucide-react"

export default function SimpleUpload() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-colors">
      <div className="mb-4">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload your files</h3>
        <p className="text-gray-500 text-sm">Drag and drop files here, or click to select</p>
      </div>
      <div className="mb-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Choose Files
        </button>
      </div>
      <div className="text-xs text-gray-400">
        Supported formats: JPG, PNG, GIF, MP4, PDF (Max 10MB)
      </div>
      
      {/* Upload Progress Example */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <FileImage className="h-8 w-8 text-blue-600" />
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">image.jpg</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-blue-600 h-2 rounded-full w-3/4" />
            </div>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-modern',
    name: 'Cyber Upload',
    style: 'modern' as const,
    code: `import { Upload, Zap, FileImage, CheckCircle } from "lucide-react"

export default function CyberUpload() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl border-2 border-dashed border-cyan-500/50 p-8 text-center hover:border-cyan-500 transition-colors relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
      <div className="relative">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Upload className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Neural Upload System
          </h3>
          <p className="text-gray-400 text-sm font-mono">DRAG_FILES || CLICK_TO_SELECT</p>
        </div>
        <div className="mb-8">
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            INITIALIZE UPLOAD
          </button>
        </div>
        <div className="text-xs text-cyan-400 font-mono mb-6">
          SUPPORTED: [JPG, PNG, MP4, GIF] | MAX_SIZE: 50MB
        </div>
        
        {/* Upload Progress Example */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-gray-800 border border-cyan-500/30 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <FileImage className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-mono text-white">neural_image.jpg</div>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full w-4/5 relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className="text-xs text-cyan-400 font-mono mt-1">PROCESSING: 80%</div>
            </div>
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-classic',
    name: 'Professional Upload',
    style: 'classic' as const,
    code: `import { Upload, FileImage, FileVideo, FileAudio, Folder, CheckCircle } from "lucide-react"

export default function ProfessionalUpload() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-300">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Media Upload Center</h3>
        <p className="text-gray-600">Upload and manage your media files professionally</p>
      </div>
      
      <div className="p-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors mb-6">
          <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Drop files here to upload</h4>
          <p className="text-gray-500 mb-4">or click to browse from your computer</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Browse Files
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <FileImage className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Images</div>
            <div className="text-xs text-gray-500">JPG, PNG, GIF</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <FileVideo className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Videos</div>
            <div className="text-xs text-gray-500">MP4, AVI, MOV</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <FileAudio className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Audio</div>
            <div className="text-xs text-gray-500">MP3, WAV, AAC</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <Folder className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Folders</div>
            <div className="text-xs text-gray-500">Batch Upload</div>
          </div>
        </div>
        
        {/* Upload Queue */}
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">Upload Queue</h5>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <FileImage className="h-8 w-8 text-blue-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">presentation.jpg</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full w-full" />
                </div>
                <div className="text-xs text-blue-600 mt-1">Complete - 2.4 MB</div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-bold',
    name: 'Explosive Upload',
    style: 'bold' as const,
    code: `import { Upload, Zap, Flame, Target, FileImage } from "lucide-react"

export default function ExplosiveUpload() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-black rounded-3xl border-2 border-yellow-400 p-8 text-center transform rotate-1 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-yellow-500/10 to-orange-500/10 animate-pulse" />
      <div className="relative">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-10 w-10 text-red-500 animate-bounce" />
            <h3 className="text-3xl font-black text-yellow-400 transform -skew-x-6">UPLOAD ZONE</h3>
            <Flame className="h-10 w-10 text-red-500 animate-bounce" />
          </div>
          <p className="text-red-400 font-bold text-lg">⚡ EXPLOSIVE FILE TRANSFER ⚡</p>
        </div>
        
        <div className="border-4 border-dashed border-yellow-400 rounded-2xl p-12 mb-8 hover:border-red-500 transition-colors relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full animate-ping" />
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Upload className="h-12 w-12 text-black" />
          </div>
          <h4 className="text-2xl font-black text-white mb-4 transform -skew-x-6">DROP FILES HERE!</h4>
          <p className="text-yellow-400 font-bold mb-6">OR CLICK TO UNLEASH</p>
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-red-500 text-black rounded-2xl font-black text-xl hover:scale-110 transition-transform shadow-lg">
            🚀 LAUNCH UPLOAD!
          </button>
        </div>
        
        <div className="text-yellow-400 font-bold text-sm mb-8">
          💥 SUPPORTS ALL FORMATS | MAX POWER: 100MB 💥
        </div>
        
        {/* Upload Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-600/20 to-yellow-500/20 border-2 border-yellow-400 rounded-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl flex items-center justify-center">
              <FileImage className="h-8 w-8 text-black" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-lg font-black text-white transform -skew-x-6">MEGA_FILE.jpg</div>
              <div className="w-full bg-gray-800 rounded-full h-4 mt-2 border-2 border-yellow-400">
                <div className="bg-gradient-to-r from-red-500 to-yellow-500 h-4 rounded-full w-5/6 relative">
                  <div className="absolute inset-0 bg-white/30 animate-pulse" />
                </div>
              </div>
              <div className="text-yellow-400 font-black text-sm mt-2">UPLOADING: 85% COMPLETE!</div>
            </div>
            <Target className="h-8 w-8 text-yellow-400 animate-spin" />
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-red-400 text-sm font-bold animate-pulse">⚠️ WARNING: MAXIMUM UPLOAD POWER ⚠️</p>
        </div>
      </div>
    </div>
  )
}`
  }
]

// Slideshow Templates - 4 unique variations
const SLIDESHOW_TEMPLATES = [
  {
    id: 'slideshow-minimal',
    name: 'Clean Slideshow',
    style: 'minimal' as const,
    code: `import { Play, Pause, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

export default function CleanSlideshow() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative aspect-video bg-gray-100 group">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-700 mb-2">Slide 1</div>
            <div className="text-gray-500">Beautiful slideshow presentation</div>
          </div>
        </div>
        
        {/* Navigation */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
        
        {/* Play/Pause */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      
      {/* Controls */}
      <div className="p-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Play className="h-5 w-5" />
          </button>
          <div className="text-sm text-gray-600">Slide 1 of 8</div>
        </div>
        <div className="flex gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={\`w-2 h-2 rounded-full \${i === 0 ? 'bg-blue-600' : 'bg-gray-300'} cursor-pointer\`} />
          ))}
        </div>
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slideshow-modern',
    name: 'Holographic Slideshow',
    style: 'modern' as const,
    code: `import { Play, Pause, ChevronLeft, ChevronRight, Zap, Eye } from "lucide-react"

export default function HolographicSlideshow() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl">
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
              HOLOGRAPHIC SLIDE
            </div>
            <div className="text-cyan-400 font-mono">NEURAL_PRESENTATION_01</div>
          </div>
        </div>
        
        {/* Floating Navigation */}
        <button className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Control Panel */}
        <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-cyan-500/30">
          <button className="text-cyan-400 hover:text-white transition-colors">
            <Play className="h-4 w-4" />
          </button>
          <div className="w-1 h-4 bg-cyan-500/50" />
          <div className="text-cyan-400 font-mono text-sm">AUTO</div>
        </div>
        
        {/* Status */}
        <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-purple-500/30">
          <Eye className="h-4 w-4 text-purple-400" />
          <span className="text-purple-400 font-mono text-sm">01/08</span>
        </div>
      </div>
      
      {/* Advanced Controls */}
      <div className="p-6 bg-gray-800 border-t border-cyan-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="p-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors">
              <Play className="h-5 w-5" />
            </button>
            <div className="text-white font-mono">SLIDE_01 / TOTAL_08</div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-mono text-sm">LIVE</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full w-1/8 relative">
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex gap-3 justify-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={\`w-3 h-3 rounded-full border-2 cursor-pointer transition-colors \${i === 0 ? 'bg-cyan-400 border-cyan-400' : 'border-gray-600 hover:border-cyan-400'}\`} />
          ))}
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slideshow-classic',
    name: 'Professional Slideshow',
    style: 'classic' as const,
    code: `import { Play, Pause, ChevronLeft, ChevronRight, Calendar, User, Clock } from "lucide-react"

export default function ProfessionalSlideshow() {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Business Presentation</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>March 2024</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>John Smith</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>15 minutes</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">01</div>
            <div className="text-sm text-gray-500">of 12 slides</div>
          </div>
        </div>
      </div>
      
      <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200 group">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center max-w-2xl px-8">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Welcome to Our Presentation</h2>
            <p className="text-blue-700 text-lg">Professional slideshow with comprehensive business insights</p>
          </div>
        </div>
        
        {/* Navigation */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Professional Controls */}
      <div className="p-6 bg-gray-50 border-t border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Play className="h-4 w-4" />
              <span className="text-sm font-medium">Start Presentation</span>
            </button>
            <div className="text-sm text-gray-600">Auto-advance: 5 seconds</div>
          </div>
          <div className="text-sm text-gray-600">Duration: 15:30</div>
        </div>
        
        {/* Progress */}
        <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
          <div className="bg-blue-600 h-3 rounded-full w-1/12" />
        </div>
        
        {/* Slide Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={\`flex-shrink-0 w-16 h-12 rounded border-2 cursor-pointer transition-colors \${i === 0 ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100 hover:border-blue-300'}\`}>
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slideshow-bold',
    name: 'Dynamic Slideshow',
    style: 'bold' as const,
    code: `import { Play, Pause, ChevronLeft, ChevronRight, Zap, Flame, Target } from "lucide-react"

export default function DynamicSlideshow() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-black rounded-3xl border-2 border-yellow-400 overflow-hidden transform rotate-1 shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-yellow-500/10 to-orange-500/10 animate-pulse" />
      <div className="relative">
        <div className="p-6 border-b border-yellow-400">
          <div className="flex items-center justify-center gap-3">
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
            <h3 className="text-2xl font-black text-yellow-400 transform -skew-x-6">EXPLOSIVE SLIDESHOW</h3>
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
          </div>
        </div>
        
        <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-yellow-500/20" />
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-5xl font-black text-yellow-400 mb-6 transform -skew-x-12 animate-pulse">
                SLIDE #01
              </div>
              <div className="text-red-400 font-bold text-xl">⚡ MAXIMUM IMPACT PRESENTATION ⚡</div>
            </div>
          </div>
          
          {/* Explosive Navigation */}
          <button className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl text-black hover:scale-110 transition-transform shadow-2xl">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl text-black hover:scale-110 transition-transform shadow-2xl">
            <ChevronRight className="h-8 w-8" />
          </button>
          
          {/* Power Indicators */}
          <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 bg-red-600 rounded-full">
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-white font-black text-sm">LIVE</span>
          </div>
          
          <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-full">
            <Target className="h-4 w-4 text-black animate-spin" />
            <span className="text-black font-black text-sm">01/10</span>
          </div>
          
          {/* Explosion Effects */}
          <div className="absolute bottom-6 left-6 w-8 h-8 bg-red-500 rounded-full animate-ping" />
          <div className="absolute bottom-6 right-6 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
        </div>
        
        {/* Explosive Controls */}
        <div className="p-8 bg-gradient-to-r from-gray-900 to-black">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <button className="p-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl text-black hover:scale-110 transition-transform shadow-lg">
                <Play className="h-8 w-8" />
              </button>
              <div className="text-white font-black text-xl transform -skew-x-6">SLIDE_01 / TOTAL_10</div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full">
              <Flame className="h-5 w-5 text-black animate-bounce" />
              <span className="text-black font-black">AUTO BLAST</span>
            </div>
          </div>
          
          {/* Power Progress */}
          <div className="w-full bg-gray-800 rounded-full h-6 mb-6 border-2 border-yellow-400">
            <div className="bg-gradient-to-r from-red-500 to-yellow-500 h-6 rounded-full w-1/10 relative">
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
            </div>
          </div>
          
          {/* Explosive Indicators */}
          <div className="flex gap-4 justify-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={\`w-4 h-4 rounded-full border-2 cursor-pointer transition-all \${i === 0 ? 'bg-yellow-400 border-yellow-400 animate-pulse' : 'border-gray-600 hover:border-yellow-400 hover:scale-125'}\`} />
            ))}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-red-400 text-sm font-bold animate-pulse">💥 WARNING: MAXIMUM PRESENTATION POWER 💥</p>
          </div>
        </div>
      </div>
    </div>
  )
}`
  }
]

const createMediaPanel = (id: string, name: string, templates: any[]): ExtendedPanel => {
  const variations: TemplateVariation[] = templates.map((template) => ({
    id: template.id,
    name: template.name,
    description: `${name} - ${template.name}`,
    style: template.style,
    code: template.code,
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
      useCases: ['Media Display', 'User Engagement', 'Content Management'],
      implementationNotes: ['Customizable styling', 'Animation support', 'Mobile responsive']
    }
  }))

  return {
    id,
    name,
    description: `${name} component templates with different design styles`,
    category: 'media-gallery',
    variations,
    tags: ['media', 'gallery', 'interactive']
  }
}

export const IMAGE_SLIDER_PANEL_WITH_VARIATIONS = createMediaPanel('image-slider', 'Image Slider', IMAGE_SLIDER_TEMPLATES)
export const MEDIA_GRID_PANEL_WITH_VARIATIONS = createMediaPanel('media-grid', 'Media Grid', MEDIA_GRID_TEMPLATES)
export const VIDEO_GALLERY_PANEL_WITH_VARIATIONS = createMediaPanel('video-gallery', 'Video Gallery', VIDEO_GALLERY_TEMPLATES)
export const AUDIO_PLAYER_PANEL_WITH_VARIATIONS = createMediaPanel('audio-player', 'Audio Player', AUDIO_PLAYER_TEMPLATES)
export const IMAGE_COMPARISON_PANEL_WITH_VARIATIONS = createMediaPanel('image-comparison', 'Image Comparison', IMAGE_COMPARISON_TEMPLATES)
export const MEDIA_UPLOAD_PANEL_WITH_VARIATIONS = createMediaPanel('media-upload', 'Media Upload', MEDIA_UPLOAD_TEMPLATES)
export const SLIDESHOW_PANEL_WITH_VARIATIONS = createMediaPanel('slideshow', 'Slideshow', SLIDESHOW_TEMPLATES)

export {
  IMAGE_SLIDER_TEMPLATES,
  MEDIA_GRID_TEMPLATES,
  VIDEO_GALLERY_TEMPLATES,
  AUDIO_PLAYER_TEMPLATES,
  IMAGE_COMPARISON_TEMPLATES,
  MEDIA_UPLOAD_TEMPLATES,
  SLIDESHOW_TEMPLATES
}