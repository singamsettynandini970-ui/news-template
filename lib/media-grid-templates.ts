import { Eye, Download, Share2, Heart, Grid, List, Filter, Loader2 } from 'lucide-react'
import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const MEDIA_GRID_TEMPLATES = [
  {
    id: 1,
    name: "Masonry Waterfall",
    description: "Pinterest-style masonry grid with variable heights",
    style: "minimal" as const,
    code: `import { Eye, Download, Share2, Heart } from "lucide-react"
import { useState } from "react"

export default function MasonryWaterfall() {
  const [likedItems, setLikedItems] = useState(new Set())
  const items = [
    { id: 1, title: "Sunset Beach", views: 1240, height: "h-64" },
    { id: 2, title: "Mountain Peak", views: 890, height: "h-48" },
    { id: 3, title: "City Lights", views: 2100, height: "h-80" },
    { id: 4, title: "Forest Path", views: 650, height: "h-56" },
    { id: 5, title: "Ocean Waves", views: 1800, height: "h-72" },
    { id: 6, title: "Desert Dunes", views: 420, height: "h-60" }
  ]
  
  return (
    <div className="w-full bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Curated Collection</h2>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="break-inside-avoid group">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className={"bg-gradient-to-br from-blue-100 to-purple-100 " + item.height + " relative overflow-hidden"}>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl text-gray-400">
                    📸
                  </div>
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <button 
                      onClick={() => {
                        const newLiked = new Set(likedItems)
                        if (newLiked.has(item.id)) {
                          newLiked.delete(item.id)
                        } else {
                          newLiked.add(item.id)
                        }
                        setLikedItems(newLiked)
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Heart className={"h-4 w-4 " + (likedItems.has(item.id) ? "text-red-500 fill-current" : "text-gray-400")} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.views.toLocaleString()} views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 2,
    name: "Card Flip Gallery",
    description: "Interactive 3D card flip effects with detailed info",
    style: "modern" as const,
    code: `import { RotateY, Star, Calendar, User } from "lucide-react"
import { useState } from "react"

export default function CardFlipGallery() {
  const [flippedCards, setFlippedCards] = useState(new Set())
  const items = [
    { id: 1, title: "Abstract Art", artist: "Jane Doe", date: "2024-01-15", rating: 4.8, color: "from-pink-400 to-rose-500" },
    { id: 2, title: "Digital Landscape", artist: "John Smith", date: "2024-01-20", rating: 4.6, color: "from-blue-400 to-indigo-500" },
    { id: 3, title: "Neon Dreams", artist: "Alex Chen", date: "2024-01-25", rating: 4.9, color: "from-purple-400 to-violet-500" }
  ]
  
  const toggleFlip = (id) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(id)) {
      newFlipped.delete(id)
    } else {
      newFlipped.add(id)
    }
    setFlippedCards(newFlipped)
  }
  
  return (
    <div className="w-full bg-slate-900 p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Interactive Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="relative h-80" style={{ perspective: "1000px" }}>
              <div 
                className={"w-full h-full relative cursor-pointer transition-transform duration-700 " + (flippedCards.has(item.id) ? "rotate-y-180" : "")}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => toggleFlip(item.id)}
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl" style={{ backfaceVisibility: "hidden" }}>
                  <div className={"h-full bg-gradient-to-br " + item.color + " flex items-center justify-center text-white relative"}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎨</div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <RotateY className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-white" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <div className="h-full p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="h-4 w-4" />
                          <span className="text-sm">{item.artist}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{item.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 3,
    name: "Grid Layout",
    description: "Classic grid with view mode toggle and filtering",
    style: "classic" as const,
    code: `import { Grid, List, Filter } from "lucide-react"
import { useState } from "react"

export default function GridLayout() {
  const [viewMode, setViewMode] = useState('grid')
  const items = [
    { id: 1, title: "Nature Photography", category: "Photos", count: 24 },
    { id: 2, title: "Urban Architecture", category: "Photos", count: 18 },
    { id: 3, title: "Travel Videos", category: "Videos", count: 12 },
    { id: 4, title: "Portrait Gallery", category: "Photos", count: 36 }
  ]
  
  return (
    <div className="w-full bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Media Collection</h2>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={"p-2 rounded transition-colors " + (viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200')}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={"p-2 rounded transition-colors " + (viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200')}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {items.map((item) => (
            <div key={item.id} className={"bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow " + (viewMode === 'list' ? 'flex items-center p-4' : '')}>
              <div className={"bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl text-gray-500 " + (viewMode === 'list' ? 'w-16 h-16 rounded-lg mr-4' : 'aspect-video')}>
                {item.category === 'Photos' ? '📷' : '🎬'}
              </div>
              <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.count} items • {item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 4,
    name: "Infinite Scroll",
    description: "Dynamic loading grid with infinite scroll functionality",
    style: "bold" as const,
    code: `import { Loader2, Heart, Share2 } from "lucide-react"
import { useState } from "react"

export default function InfiniteScroll() {
  const [items, setItems] = useState(Array.from({ length: 12 }, (_, i) => ({ id: i + 1, title: "Media Item " + (i + 1), likes: Math.floor(Math.random() * 1000) })))
  const [loading, setLoading] = useState(false)
  const [likedItems, setLikedItems] = useState(new Set())
  
  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      const newItems = Array.from({ length: 6 }, (_, i) => ({ 
        id: items.length + i + 1, 
        title: "Media Item " + (items.length + i + 1), 
        likes: Math.floor(Math.random() * 1000) 
      }))
      setItems(prev => [...prev, ...newItems])
      setLoading(false)
    }, 1000)
  }
  
  return (
    <div className="w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Infinite Media Feed</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div key={item.id} className="group relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center text-6xl">
                  {idx % 3 === 0 ? '🎨' : idx % 3 === 1 ? '📸' : '🎬'}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{item.likes} likes</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const newLiked = new Set(likedItems)
                          if (newLiked.has(item.id)) {
                            newLiked.delete(item.id)
                          } else {
                            newLiked.add(item.id)
                          }
                          setLikedItems(newLiked)
                        }}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <Heart className={"h-4 w-4 " + (likedItems.has(item.id) ? "text-red-400 fill-current" : "text-white")} />
                      </button>
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                        <Share2 className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-4 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white rounded-full font-medium transition-colors flex items-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}`,
  }
]

export function createMediaGridPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = MEDIA_GRID_TEMPLATES.map((template) => ({
    id: `media-grid-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Media Grid', 'Interactive Layout', 'Responsive Design', 'Hover Effects'],
      useCases: ['Portfolio', 'Gallery', 'Media Library', 'Content Showcase'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Multiple layout options', 'Interactive elements', 'Responsive grid system', 'Smooth animations']
    })
  }))

  return {
    id: 'media-grid',
    name: 'Media Grid',
    description: 'Media Grid component templates with various layout styles',
    category: 'media-gallery',
    variations,
    tags: ['media', 'grid', 'layout', 'gallery']
  }
}

export const MEDIA_GRID_PANEL_WITH_VARIATIONS = createMediaGridPanel()