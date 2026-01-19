import type { ExtendedPanel, TemplateVariation } from './template-registry'
import React from 'react'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Upload, Download, Grid, List, Maximize2, ChevronLeft, ChevronRight, Eye, Heart, Share2, RotateCcw, ZoomIn, ZoomOut, Filter, Search, Calendar, User, Clock, FileImage, FileVideo, FileAudio, Folder, Star, MoreHorizontal, Circle, Camera, Zap, Flame, Target, TrendingUp, Users, MessageCircle, ThumbsUp, CheckCircle, X, Cloud, Shield, Globe, Sync, Paperclip, Stamp, Cpu, Wifi, Briefcase, Rocket } from 'lucide-react'

// Image Slider Templates - 4 completely unique designs
const IMAGE_SLIDER_TEMPLATES = [
  {
    id: 'slider-minimal',
    name: 'Paper Slider',
    style: 'minimal' as const,
    code: `import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PaperSlider() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-white border border-gray-200 shadow-sm">
        <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 border border-gray-200" />
            <p className="text-gray-600 text-sm">Image 1 of 5</p>
          </div>
          <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={\`w-1.5 h-1.5 \${i === 0 ? 'bg-gray-800' : 'bg-gray-300'}\`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slider-modern',
    name: 'Glass Slider',
    style: 'modern' as const,
    code: `import { ChevronLeft, ChevronRight, Circle } from "lucide-react"

export default function GlassSlider() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-3xl">
      <div className="relative aspect-video bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <Circle className="w-20 h-20 mx-auto mb-4 opacity-60" />
            <p className="text-lg font-light">Slide Content</p>
          </div>
        </div>
        <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30">
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={\`w-2 h-2 rounded-full \${i === 0 ? 'bg-white' : 'bg-white/40'}\`} />
          ))}
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slider-classic',
    name: 'Vintage Slider',
    style: 'classic' as const,
    code: `import { ChevronLeft, ChevronRight, Camera } from "lucide-react"

export default function VintageSlider() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-amber-50 p-6 border-4 border-amber-200 rounded-lg">
      <div className="bg-amber-100 p-4 border-2 border-amber-300 rounded">
        <div className="relative aspect-video bg-sepia bg-gradient-to-br from-amber-200 to-orange-200 border-2 border-amber-400">
          <div className="absolute inset-4 border border-amber-400 bg-amber-100/50">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-amber-800">
                <Camera className="w-16 h-16 mx-auto mb-3" />
                <p className="font-serif text-lg">Vintage Photo</p>
                <p className="text-sm opacity-75">Est. 1924</p>
              </div>
            </div>
          </div>
          <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-600 text-amber-100 border-2 border-amber-700 flex items-center justify-center hover:bg-amber-700">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-600 text-amber-100 border-2 border-amber-700 flex items-center justify-center hover:bg-amber-700">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={\`w-3 h-3 border-2 border-amber-600 \${i === 0 ? 'bg-amber-600' : 'bg-amber-100'}\`} />
            ))}
          </div>
          <p className="mt-2 text-amber-800 font-serif text-sm">Photo 1 of 5</p>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'slider-bold',
    name: 'Neon Slider',
    style: 'bold' as const,
    code: `import { ChevronLeft, ChevronRight, Zap } from "lucide-react"

export default function NeonSlider() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-black p-4 border-2 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
      <div className="relative aspect-video bg-gray-900 border border-pink-500">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse" />
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 border-2 border-pink-500 bg-pink-500/20 flex items-center justify-center">
              <Zap className="w-12 h-12 text-pink-500 animate-pulse" />
            </div>
            <p className="text-pink-500 font-mono text-xl tracking-wider">NEON_SLIDE_01</p>
          </div>
        </div>
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-pink-500 text-black font-bold hover:bg-pink-400 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-pink-500 text-black font-bold hover:bg-pink-400 transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={\`w-3 h-3 border border-pink-500 \${i === 0 ? 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]' : 'bg-transparent'}\`} />
          ))}
        </div>
      </div>
    </div>
  )
}`
  }
]

// Media Grid Templates - 4 completely unique designs
const MEDIA_GRID_TEMPLATES = [
  {
    id: 'grid-minimal',
    name: 'Polaroid Grid',
    style: 'minimal' as const,
    code: `import { Heart, MessageCircle } from "lucide-react"

export default function PolaroidGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gray-50">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white p-3 shadow-sm border border-gray-200 transform rotate-1 hover:rotate-0 transition-transform">
            <div className="aspect-square bg-gray-100 mb-3">
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                Photo {i + 1}
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Memory #{i + 1}</p>
              <div className="flex justify-center gap-3 text-gray-400">
                <button className="hover:text-red-500 transition-colors">
                  <Heart className="h-3 w-3" />
                </button>
                <button className="hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-3 w-3" />
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
    name: 'Hexagon Grid',
    style: 'modern' as const,
    code: `import { Play, Star, Eye } from "lucide-react"

export default function HexagonGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="group relative">
            <div className="aspect-square bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-white/30 transition-all">
              <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                <div className="relative z-10 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/80 text-xs font-mono">HEX_{i + 1}</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Star className="h-3 w-3 text-black m-0.5" />
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
    name: 'Museum Grid',
    style: 'classic' as const,
    code: `import { Calendar, User, Eye } from "lucide-react"

export default function MuseumGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-b from-stone-100 to-stone-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-stone-800 mb-2">Gallery Collection</h2>
        <p className="text-stone-600">Curated masterpieces from our archives</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 shadow-lg border-4 border-stone-300">
            <div className="aspect-[4/5] bg-gradient-to-br from-stone-200 to-stone-300 border-2 border-stone-400 mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-stone-600">
                  <div className="w-16 h-16 mx-auto mb-3 bg-stone-400 rounded-full flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-serif">Artwork {i + 1}</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg text-stone-800 mb-2">Classical Piece #{i + 1}</h3>
              <div className="flex items-center justify-center gap-4 text-xs text-stone-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>1890</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Artist</span>
                </div>
              </div>
              <div className="mt-3 px-3 py-1 bg-stone-200 text-stone-700 text-xs font-serif">
                Oil on Canvas
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
    name: 'Comic Grid',
    style: 'bold' as const,
    code: `import { Zap, Flame, Star } from "lucide-react"

export default function ComicGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-yellow-300 border-4 border-black">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-black mb-2 transform -skew-x-12">POW! GALLERY</h2>
        <p className="text-black font-bold">EXPLOSIVE MEDIA COLLECTION!</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={\`relative bg-white border-4 border-black p-3 transform \${i % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]\`}>
            <div className="aspect-square bg-gradient-to-br from-red-400 to-yellow-400 border-2 border-black relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-black rounded-full flex items-center justify-center">
                    {i % 3 === 0 ? <Zap className="h-6 w-6 text-yellow-400" /> : 
                     i % 3 === 1 ? <Flame className="h-6 w-6 text-red-400" /> : 
                     <Star className="h-6 w-6 text-white" />}
                  </div>
                  <p className="text-black font-black text-sm">ITEM #{i + 1}</p>
                </div>
              </div>
              <div className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs font-black border border-black transform rotate-12">
                NEW!
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-black font-black text-xs transform -skew-x-6">SUPER ITEM!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`
  }
]
// Audio Player Templates - 4 completely unique designs
const AUDIO_PLAYER_TEMPLATES = [
  {
    id: 'audio-minimal',
    name: 'Vinyl Player',
    style: 'minimal' as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

export default function VinylPlayer() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="w-32 h-32 bg-gray-900 rounded-full mx-auto mb-4 relative flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-600 rounded-full" />
          </div>
          <div className="absolute inset-0 border-2 border-gray-300 rounded-full animate-spin" style={{animationDuration: '3s'}} />
        </div>
        <h3 className="font-medium text-gray-900 mb-1">Classic Track</h3>
        <p className="text-sm text-gray-500">Vintage Artist</p>
      </div>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
          <div className="bg-gray-800 h-1 rounded-full w-1/3" />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>1:23</span>
          <span>3:45</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <SkipBack className="h-4 w-4" />
        </button>
        <button className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
          <Play className="h-5 w-5 ml-0.5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <SkipForward className="h-4 w-4" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 'audio-modern',
    name: 'Spectrum Player',
    style: 'modern' as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2, Zap } from "lucide-react"

export default function SpectrumPlayer() {
  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900 rounded-2xl border border-cyan-500/30 p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-40 h-40 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center relative">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center">
            <Zap className="h-16 w-16 text-cyan-400 animate-pulse" />
          </div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={\`absolute w-1 bg-cyan-400 animate-pulse\`} 
                 style={{
                   height: Math.random() * 20 + 10 + 'px',
                   left: 50 + Math.cos(i * Math.PI / 4) * 60 + '%',
                   top: 50 + Math.sin(i * Math.PI / 4) * 60 + '%',
                   animationDelay: i * 0.1 + 's'
                 }} />
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Digital Wave
        </h3>
        <p className="text-cyan-400 font-mono text-sm">ELECTRONIC_ARTIST</p>
      </div>
      <div className="mb-8">
        <div className="w-full bg-gray-700 rounded-full h-2 mb-3 relative overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full w-2/5 relative">
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
          <SkipBack className="h-5 w-5" />
        </button>
        <button className="p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
          <Play className="h-6 w-6 ml-0.5" />
        </button>
        <button className="p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <SkipForward className="h-5 w-5" />
        </button>
        <button className="p-3 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 hover:bg-purple-500/30 transition-colors">
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 'audio-classic',
    name: 'Radio Player',
    style: 'classic' as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2, Radio } from "lucide-react"

export default function RadioPlayer() {
  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg border-4 border-amber-300 p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="w-48 h-32 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg mx-auto mb-6 flex items-center justify-center border-4 border-amber-400 shadow-inner relative">
          <div className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute top-2 right-2 w-8 h-2 bg-amber-600 rounded-full" />
          <Radio className="h-16 w-16 text-amber-700" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-amber-900 mb-2">Radio Station</h3>
        <p className="text-amber-700 font-serif">FM 101.5 - Classic Hits</p>
        <div className="mt-2 px-4 py-1 bg-red-500 text-white text-xs font-bold rounded-full inline-block">
          ON AIR
        </div>
      </div>
      <div className="mb-8">
        <div className="w-full bg-amber-200 rounded-full h-3 mb-4 border border-amber-300">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full w-1/2 border border-amber-600" />
        </div>
        <div className="flex justify-between text-sm font-serif text-amber-800">
          <span>3:24</span>
          <span>Now Playing</span>
          <span>7:18</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button className="p-3 bg-amber-200 border-2 border-amber-400 rounded-lg text-amber-700 hover:bg-amber-300 transition-colors shadow-md">
          <SkipBack className="h-5 w-5" />
        </button>
        <button className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 border-2 border-amber-600 rounded-lg text-white hover:from-amber-600 hover:to-orange-600 transition-colors shadow-lg">
          <Play className="h-6 w-6 ml-0.5" />
        </button>
        <button className="p-3 bg-amber-200 border-2 border-amber-400 rounded-lg text-amber-700 hover:bg-amber-300 transition-colors shadow-md">
          <SkipForward className="h-5 w-5" />
        </button>
        <button className="p-3 bg-amber-200 border-2 border-amber-400 rounded-lg text-amber-700 hover:bg-amber-300 transition-colors shadow-md">
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 'audio-bold',
    name: 'Boom Box',
    style: 'bold' as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2, Zap, Flame } from "lucide-react"

export default function BoomBox() {
  return (
    <div className="w-full max-w-lg mx-auto bg-black rounded-3xl border-4 border-red-500 p-8 shadow-2xl transform rotate-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-yellow-500/10 to-orange-500/10 animate-pulse" />
      <div className="relative">
        <div className="text-center mb-8">
          <div className="w-48 h-32 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl mx-auto mb-6 flex items-center justify-center relative shadow-2xl border-4 border-white">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 rounded-full" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full" />
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <Flame className="h-8 w-8 text-red-500 animate-bounce" />
              </div>
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          <h3 className="text-3xl font-black text-yellow-400 mb-2 transform -skew-x-6">BOOM BOX</h3>
          <p className="text-red-400 font-bold text-lg">MAXIMUM VOLUME!</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="text-white font-black text-sm">BASS BOOST ACTIVE</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          </div>
        </div>
        <div className="mb-8">
          <div className="w-full bg-gray-800 rounded-full h-4 mb-4 border-2 border-red-500 relative overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-yellow-500 h-4 rounded-full w-3/5 relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
          <div className="flex justify-between text-lg font-black">
            <span className="text-red-400">04:20</span>
            <span className="text-yellow-400">LOUD MODE</span>
            <span className="text-red-400">06:66</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <button className="p-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl text-white hover:scale-110 transition-transform shadow-lg border-2 border-yellow-400">
            <SkipBack className="h-6 w-6" />
          </button>
          <button className="p-6 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full text-black hover:scale-110 transition-transform shadow-2xl border-4 border-white">
            <Play className="h-8 w-8 ml-1" />
          </button>
          <button className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl text-white hover:scale-110 transition-transform shadow-lg border-2 border-yellow-400">
            <SkipForward className="h-6 w-6" />
          </button>
          <button className="p-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl text-white hover:scale-110 transition-transform shadow-lg border-2 border-white">
            <Volume2 className="h-6 w-6" />
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
// Image Comparison Templates - 4 completely unique designs
const IMAGE_COMPARISON_TEMPLATES = [
  {
    id: 'comparison-minimal',
    name: 'Split View',
    style: 'minimal' as const,
    code: `import { RotateCcw, ZoomIn } from "lucide-react"

export default function SplitView() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Before & After</h3>
      </div>
      <div className="relative aspect-video">
        <div className="flex h-full">
          <div className="flex-1 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
            <span className="text-gray-600 font-medium">Before</span>
            <div className="absolute top-2 left-2 px-2 py-1 bg-gray-600 text-white text-xs rounded">ORIGINAL</div>
          </div>
          <div className="w-0.5 bg-gray-400 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
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
        <div className="text-sm text-gray-500">Drag to compare</div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'comparison-modern',
    name: 'Hologram Compare',
    style: 'modern' as const,
    code: `import { Zap, RotateCcw, Maximize2 } from "lucide-react"

export default function HologramCompare() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-cyan-500/30">
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Neural Enhancement
        </h3>
        <p className="text-gray-400 text-sm mt-1">AI-powered comparison</p>
      </div>
      <div className="relative aspect-video">
        <div className="flex h-full">
          <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center relative">
            <div className="text-gray-400 font-mono text-lg">RAW_DATA</div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-mono rounded">
              UNPROCESSED
            </div>
          </div>
          <div className="w-1 bg-gradient-to-b from-cyan-400 to-purple-500 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 border-2 border-cyan-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Zap className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
            <div className="text-cyan-400 font-mono text-lg">ENHANCED</div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
            <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-mono rounded">
              AI_PROCESSED
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
            EXPAND
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
    name: 'Studio Compare',
    style: 'classic' as const,
    code: `import { RotateCcw, ZoomIn, Download, Star } from "lucide-react"

export default function StudioCompare() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Professional Comparison</h3>
            <p className="text-gray-600 text-sm mt-1">Studio-grade image enhancement</p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            ))}
            <span className="text-gray-600 text-sm ml-2">Premium</span>
          </div>
        </div>
      </div>
      <div className="relative aspect-video">
        <div className="flex h-full">
          <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative border-r border-gray-300">
            <div className="text-center">
              <div className="text-gray-600 font-semibold text-lg mb-2">Original</div>
              <div className="text-gray-500 text-sm">Standard Quality</div>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-gray-600 text-white text-xs font-semibold rounded">
              BEFORE
            </div>
          </div>
          <div className="w-0.5 bg-blue-600 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-50 shadow-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-blue-700 font-semibold text-lg mb-2">Enhanced</div>
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
            Reset
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2">
            <ZoomIn className="h-4 w-4" />
            Zoom
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
        <div className="text-gray-600 text-sm">Drag slider to see difference</div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'comparison-bold',
    name: 'Battle Compare',
    style: 'bold' as const,
    code: `import { Zap, Flame, Target, RotateCcw } from "lucide-react"

export default function BattleCompare() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-black rounded-3xl border-4 border-yellow-400 overflow-hidden transform rotate-1 shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-yellow-500/10 to-orange-500/10 animate-pulse" />
      <div className="relative">
        <div className="p-6 border-b border-yellow-400">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
            <h3 className="text-2xl font-black text-yellow-400 transform -skew-x-6">BEFORE VS AFTER</h3>
            <Flame className="h-8 w-8 text-red-500 animate-bounce" />
          </div>
          <p className="text-red-400 font-bold text-center">⚡ EPIC TRANSFORMATION BATTLE ⚡</p>
        </div>
        <div className="relative aspect-video">
          <div className="flex h-full">
            <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-red-400 font-black text-xl mb-2 transform -skew-x-6">WEAK</div>
                <div className="text-gray-400 font-bold">OLD VERSION</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-black rounded transform -rotate-12">
                BORING
              </div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="w-2 bg-gradient-to-b from-yellow-400 to-red-500 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-4 border-yellow-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl">
                <Target className="h-6 w-6 text-yellow-400 animate-spin" />
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-yellow-600 to-orange-500 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-black font-black text-xl mb-2 transform -skew-x-6">AMAZING!</div>
                <div className="text-black font-bold">POWERED UP</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-black text-xs font-black rounded transform rotate-12">
                EPIC!
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
          <div className="text-yellow-400 font-black text-lg animate-pulse">DRAG TO BATTLE!</div>
        </div>
      </div>
    </div>
  )
}`
  }
]
// Media Upload Templates - 4 completely unique designs
const MEDIA_UPLOAD_TEMPLATES = [
  {
    id: 'upload-minimal',
    name: 'Postcard Uploader',
    style: 'minimal' as const,
    code: `import { Upload, Paperclip, Stamp } from "lucide-react"
import { useState } from "react"

export default function PostcardUploader() {
  const [dragActive, setDragActive] = useState(false)
  
  return (
    <div className="w-full max-w-lg mx-auto bg-cream p-8 border-4 border-amber-200 shadow-sm">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-amber-100 border-2 border-amber-300 rounded-full mb-4">
          <Stamp className="h-8 w-8 text-amber-700" />
        </div>
        <h3 className="text-xl font-serif text-amber-900 mb-2">Send Your Files</h3>
        <p className="text-amber-700 text-sm">Drop files like sending a postcard</p>
      </div>
      
      <div 
        className={\`border-2 border-dashed \${dragActive ? 'border-amber-500 bg-amber-50' : 'border-amber-300 bg-amber-25'} rounded-lg p-8 text-center transition-colors\`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        <Paperclip className="h-12 w-12 text-amber-600 mx-auto mb-4" />
        <p className="text-amber-800 font-serif mb-4">Drop your memories here</p>
        <button className="px-6 py-2 bg-amber-600 text-white rounded border-2 border-amber-700 hover:bg-amber-700 transition-colors font-serif">
          Choose Files
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-amber-600 font-serif">Accepts: Photos, Documents, Videos</p>
        <div className="mt-2 flex justify-center gap-2">
          <div className="w-4 h-4 bg-amber-300 border border-amber-400 transform rotate-45" />
          <div className="w-4 h-4 bg-amber-400 border border-amber-500 transform -rotate-12" />
          <div className="w-4 h-4 bg-amber-200 border border-amber-300 transform rotate-12" />
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-modern',
    name: 'Hologram Uploader',
    style: 'modern' as const,
    code: `import { Upload, Zap, Cpu, Wifi } from "lucide-react"
import { useState } from "react"

export default function HologramUploader() {
  const [scanning, setScanning] = useState(false)
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-black p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center relative">
            <Upload className="h-10 w-10 text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-spin" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            NEURAL UPLOAD
          </h3>
          <p className="text-cyan-400 font-mono text-sm">QUANTUM_TRANSFER_v3.0</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 border-2 border-dashed border-cyan-400/50 rounded-2xl flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl" />
              <Cpu className="h-16 w-16 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-white font-mono mb-4">DRAG_FILES || CLICK_SELECT</p>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
              INITIALIZE
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <p className="text-white text-sm font-mono">QUANTUM</p>
            <p className="text-gray-400 text-xs">Instant</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <Wifi className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <p className="text-white text-sm font-mono">SECURE</p>
            <p className="text-gray-400 text-xs">Encrypted</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <Cpu className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <p className="text-white text-sm font-mono">AI_SCAN</p>
            <p className="text-gray-400 text-xs">Auto-detect</p>
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-classic',
    name: 'Briefcase Uploader',
    style: 'classic' as const,
    code: `import { Upload, Briefcase, FileText, Shield, Clock } from "lucide-react"

export default function BriefcaseUploader() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-100 to-slate-200 p-8 border-4 border-slate-300 rounded-lg shadow-lg">
      <div className="bg-white p-6 border-2 border-slate-300 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Document Center</h3>
            <p className="text-slate-600">Professional file management</p>
          </div>
        </div>
        
        <div className="border-2 border-dashed border-slate-400 rounded-lg p-8 bg-slate-50 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-slate-200 border-2 border-slate-400 rounded-lg flex items-center justify-center">
              <Upload className="h-10 w-10 text-slate-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">Upload Documents</h4>
            <p className="text-slate-600 mb-4">Drag and drop or click to browse</p>
            <button className="px-8 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold">
              Select Files
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-slate-100 border border-slate-300 rounded-lg">
            <FileText className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-800">Documents</p>
            <p className="text-xs text-slate-600">PDF, DOC, XLS</p>
          </div>
          <div className="text-center p-4 bg-slate-100 border border-slate-300 rounded-lg">
            <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm font-semibold text-slate-800">Secure</p>
            <p className="text-xs text-slate-600">Enterprise grade</p>
          </div>
          <div className="text-center p-4 bg-slate-100 border border-slate-300 rounded-lg">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-semibold text-slate-800">Fast</p>
            <p className="text-xs text-slate-600">Quick processing</p>
          </div>
        </div>
        
        <div className="text-center text-sm text-slate-600">
          <p>Max: 100MB • All business formats supported</p>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-bold',
    name: 'Rocket Launcher',
    style: 'bold' as const,
    code: `import { Upload, Rocket, Flame, Star, Zap } from "lucide-react"

export default function RocketLauncher() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-black p-8 border-4 border-orange-500 rounded-3xl shadow-[0_0_50px_rgba(249,115,22,0.5)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 animate-pulse" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-10 w-10 text-red-500 animate-bounce" />
            <h3 className="text-4xl font-black text-orange-400 transform -skew-x-12">FILE ROCKET</h3>
            <Flame className="h-10 w-10 text-red-500 animate-bounce" />
          </div>
          <p className="text-red-400 font-bold text-lg">🚀 BLAST FILES TO CLOUD! 🚀</p>
        </div>
        
        <div className="border-4 border-dashed border-orange-500 rounded-2xl p-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-8 relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping" />
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center relative">
              <Rocket className="h-16 w-16 text-white transform rotate-45" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
            </div>
            <h4 className="text-2xl font-black text-white mb-4 transform -skew-x-6">LAUNCH PAD READY!</h4>
            <p className="text-orange-300 font-bold mb-6">Drop files for MAXIMUM SPEED!</p>
            <button className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-black text-xl hover:scale-110 transition-transform shadow-lg border-2 border-yellow-400">
              🚀 LAUNCH!
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gradient-to-br from-red-600/30 to-orange-500/30 border-2 border-red-500 rounded-xl p-4">
            <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400 animate-pulse" />
            <p className="text-white font-black text-sm">TURBO</p>
            <p className="text-orange-300 text-xs">Lightning</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600/30 to-yellow-500/30 border-2 border-orange-500 rounded-xl p-4">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400 animate-spin" />
            <p className="text-white font-black text-sm">MEGA</p>
            <p className="text-orange-300 text-xs">Unlimited</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/30 to-red-500/30 border-2 border-yellow-500 rounded-xl p-4">
            <Flame className="h-8 w-8 mx-auto mb-2 text-red-400 animate-bounce" />
            <p className="text-white font-black text-sm">BLAST</p>
            <p className="text-orange-300 text-xs">To cloud!</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-orange-400 font-bold text-sm animate-pulse">⚠️ EXTREMELY FAST SPEEDS! ⚠️</p>
        </div>
      </div>
    </div>
  )
}`
  }
]

// Slideshow Templates - 4 completely unique designs
const SLIDESHOW_TEMPLATES = [
  {
    id: 'slideshow-minimal',
    name: 'Clean Slideshow',
    style: 'minimal' as const,
    code: `import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"

export default function CleanSlideshow() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative aspect-video bg-gray-100 group">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-700 mb-2">Slide 1</div>
            <div className="text-gray-500">Clean presentation</div>
          </div>
        </div>
        
        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
        
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      
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
        
        <button className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
        
        <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-cyan-500/30">
          <button className="text-cyan-400 hover:text-white transition-colors">
            <Play className="h-4 w-4" />
          </button>
          <div className="w-1 h-4 bg-cyan-500/50" />
          <div className="text-cyan-400 font-mono text-sm">AUTO</div>
        </div>
        
        <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-purple-500/30">
          <Eye className="h-4 w-4 text-purple-400" />
          <span className="text-purple-400 font-mono text-sm">01/08</span>
        </div>
      </div>
      
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
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full w-1/8 relative">
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>
        
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
            <p className="text-blue-700 text-lg">Professional slideshow with business insights</p>
          </div>
        </div>
        
        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Play className="h-4 w-4" />
              <span className="text-sm font-medium">Start</span>
            </button>
            <div className="text-sm text-gray-600">Auto-advance: 5 seconds</div>
          </div>
          <div className="text-sm text-gray-600">Duration: 15:30</div>
        </div>
        
        <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
          <div className="bg-blue-600 h-3 rounded-full w-1/12" />
        </div>
        
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
              <div className="text-red-400 font-bold text-xl">⚡ MAXIMUM IMPACT ⚡</div>
            </div>
          </div>
          
          <button className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl text-black hover:scale-110 transition-transform shadow-2xl">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl text-black hover:scale-110 transition-transform shadow-2xl">
            <ChevronRight className="h-8 w-8" />
          </button>
          
          <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 bg-red-600 rounded-full">
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-white font-black text-sm">LIVE</span>
          </div>
          
          <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-full">
            <Target className="h-4 w-4 text-black animate-spin" />
            <span className="text-black font-black text-sm">01/10</span>
          </div>
          
          <div className="absolute bottom-6 left-6 w-8 h-8 bg-red-500 rounded-full animate-ping" />
          <div className="absolute bottom-6 right-6 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
        </div>
        
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
          
          <div className="w-full bg-gray-800 rounded-full h-6 mb-6 border-2 border-yellow-400">
            <div className="bg-gradient-to-r from-red-500 to-yellow-500 h-6 rounded-full w-1/10 relative">
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={\`w-4 h-4 rounded-full border-2 cursor-pointer transition-all \${i === 0 ? 'bg-yellow-400 border-yellow-400 animate-pulse' : 'border-gray-600 hover:border-yellow-400 hover:scale-125'}\`} />
            ))}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-red-400 text-sm font-bold animate-pulse">💥 MAXIMUM PRESENTATION POWER 💥</p>
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
export const AUDIO_PLAYER_PANEL_WITH_VARIATIONS = createMediaPanel('audio-player', 'Audio Player', AUDIO_PLAYER_TEMPLATES)
export const IMAGE_COMPARISON_PANEL_WITH_VARIATIONS = createMediaPanel('image-comparison', 'Image Comparison', IMAGE_COMPARISON_TEMPLATES)
export const MEDIA_UPLOAD_PANEL_WITH_VARIATIONS = createMediaPanel('media-upload', 'Media Upload', MEDIA_UPLOAD_TEMPLATES)
export const SLIDESHOW_PANEL_WITH_VARIATIONS = createMediaPanel('slideshow', 'Slideshow', SLIDESHOW_TEMPLATES)

export {
  IMAGE_SLIDER_TEMPLATES,
  MEDIA_GRID_TEMPLATES,
  AUDIO_PLAYER_TEMPLATES,
  IMAGE_COMPARISON_TEMPLATES,
  MEDIA_UPLOAD_TEMPLATES,
  SLIDESHOW_TEMPLATES
}