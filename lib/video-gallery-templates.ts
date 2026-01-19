import { Play, Star, Clock, Ticket, Volume2, Maximize, Heart, Eye, Shuffle, Repeat, SkipForward } from 'lucide-react'
import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const VIDEO_GALLERY_TEMPLATES = [
  {
    id: 1,
    name: "Theater Marquee",
    description: "Classic movie theater style with marquee lights and showtimes",
    style: "minimal" as const,
    code: `import { Play, Star, Clock, Ticket } from "lucide-react"
import { useState } from "react"

export default function TheaterMarquee() {
  const [selectedMovie, setSelectedMovie] = useState(0)
  const movies = [
    { id: 1, title: "Midnight Dreams", genre: "Drama", duration: "2h 15m", rating: 4.8, showtime: "7:30 PM" },
    { id: 2, title: "City Lights", genre: "Romance", duration: "1h 45m", rating: 4.6, showtime: "9:45 PM" },
    { id: 3, title: "Space Odyssey", genre: "Sci-Fi", duration: "2h 30m", rating: 4.9, showtime: "10:15 PM" }
  ]
  
  return (
    <div className="w-full bg-gradient-to-b from-red-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 to-red-500 rounded-t-3xl p-6 text-center relative overflow-hidden">
          <h1 className="text-4xl font-black text-black relative z-10">🎬 GRAND THEATER 🎬</h1>
          <p className="text-black font-bold relative z-10">Now Showing</p>
        </div>
        
        <div className="bg-black rounded-b-3xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-6xl text-white border-4 border-yellow-400">
                🎭
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                NOW PLAYING
              </div>
            </div>
            
            <div className="text-white space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{movies[selectedMovie].title}</h2>
                <p className="text-yellow-400 text-lg">{movies[selectedMovie].genre}</p>
              </div>
              
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2">
                <Ticket className="h-6 w-6" />
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 2,
    name: "Neon Cinema",
    description: "Futuristic neon-themed video player with cyberpunk aesthetics",
    style: "modern" as const,
    code: `import { Play, Volume2, Maximize, Heart } from "lucide-react"
import { useState } from "react"

export default function NeonCinema() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [liked, setLiked] = useState(new Set())
  const videos = [
    { id: 1, title: "Cyberpunk 2077", views: "2.1M", duration: "3:45", color: "from-cyan-400 to-blue-500" },
    { id: 2, title: "Neon Nights", views: "890K", duration: "2:30", color: "from-pink-400 to-purple-500" }
  ]
  
  return (
    <div className="w-full bg-black p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-4">
            NEON CINEMA
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">📺</div>
                  <h3 className="text-2xl font-bold mb-2">{videos[activeVideo].title}</h3>
                  <p className="text-cyan-400">{videos[activeVideo].duration}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Trending Now</h3>
            {videos.map((video, idx) => (
              <div 
                key={video.id}
                onClick={() => setActiveVideo(idx)}
                className="p-4 rounded-xl cursor-pointer transition-all border-2 border-gray-700 bg-gray-800 hover:border-gray-600"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl">📹</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm">{video.title}</h4>
                    <p className="text-gray-400 text-xs">{video.views} • {video.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 3,
    name: "Video Grid",
    description: "Educational video library with organized grid layout",
    style: "classic" as const,
    code: `import { Play, Clock, Eye } from "lucide-react"
import { useState } from "react"

export default function VideoGrid() {
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const videos = [
    { id: 1, title: "Getting Started Tutorial", duration: "5:30", views: "12K", thumbnail: "tutorial" },
    { id: 2, title: "Advanced Techniques", duration: "8:45", views: "8.5K", thumbnail: "advanced" },
    { id: 3, title: "Best Practices Guide", duration: "6:20", views: "15K", thumbnail: "guide" }
  ]
  
  return (
    <div className="w-full bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Video Library</h2>
          <p className="text-gray-600">Comprehensive collection of educational content</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                <div className="text-4xl text-blue-500">
                  {video.thumbnail === 'tutorial' ? '🎯' : 
                   video.thumbnail === 'advanced' ? '⚙️' : '📚'}
                </div>
                
                <div className={"absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity " + (hoveredVideo === video.id ? "opacity-100" : "opacity-0")}>
                  <button className="p-4 bg-white/90 rounded-full text-gray-900 hover:bg-white transition-colors">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
                
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{video.duration}</span>
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
    id: 4,
    name: "Playlist Showcase",
    description: "Dynamic playlist viewer with immersive visual effects",
    style: "bold" as const,
    code: `import { Play, Shuffle, Repeat, SkipForward } from "lucide-react"
import { useState } from "react"

export default function PlaylistShowcase() {
  const [currentPlaylist, setCurrentPlaylist] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const playlists = [
    { 
      id: 1, 
      title: "Action Packed", 
      videos: 24, 
      duration: "2h 45m", 
      color: "from-red-500 to-orange-600",
      icon: "💥"
    },
    { 
      id: 2, 
      title: "Sci-Fi Collection", 
      videos: 18, 
      duration: "3h 20m", 
      color: "from-blue-500 to-purple-600",
      icon: "🚀"
    }
  ]
  
  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">VIDEO PLAYLISTS</h1>
        </div>
        
        <div className="relative">
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className={"aspect-square rounded-2xl bg-gradient-to-br " + playlists[currentPlaylist].color + " flex items-center justify-center text-8xl relative overflow-hidden"}>                  
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="relative z-10">{playlists[currentPlaylist].icon}</span>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-6 bg-white/20 backdrop-blur-sm rounded-full text-white transition-all hover:scale-105"
                    >
                      <Play className="h-12 w-12" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-white space-y-6">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{playlists[currentPlaylist].title}</h2>
                  <p className="text-xl text-gray-300">{playlists[currentPlaylist].videos} videos • {playlists[currentPlaylist].duration}</p>
                </div>
                
                <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
                  <SkipForward className="h-6 w-6" />
                  Play All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  }
]

export function createVideoGalleryPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = VIDEO_GALLERY_TEMPLATES.map((template) => ({
    id: `video-gallery-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Video Gallery', 'Interactive Controls', 'Responsive Design', 'Media Playback'],
      useCases: ['Video Showcase', 'Media Library', 'Entertainment', 'Portfolio'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Video player integration', 'Playlist management', 'Custom controls', 'Responsive layout']
    })
  }))

  return {
    id: 'video-gallery',
    name: 'Video Gallery',
    description: 'Video Gallery component templates with various display styles',
    category: 'media-gallery',
    variations,
    tags: ['video', 'gallery', 'media', 'player']
  }
}

export const VIDEO_GALLERY_PANEL_WITH_VARIATIONS = createVideoGalleryPanel()