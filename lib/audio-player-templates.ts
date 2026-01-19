import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat, Radio, Download, Share2, Clock, Headphones } from 'lucide-react'
import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const AUDIO_PLAYER_TEMPLATES = [
  {
    id: 1,
    name: "Vinyl Record Player",
    description: "Vintage vinyl record player with spinning animation",
    style: "minimal" as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { useState } from "react"

export default function VinylRecordPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  
  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif font-bold text-amber-900">Vintage Vinyl</h3>
        <p className="text-amber-700 text-sm">Classic Record Player</p>
      </div>
      
      <div className="relative mb-8">
        <div className="w-64 h-64 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-inner flex items-center justify-center">
          <div 
            className={"w-56 h-56 bg-black rounded-full relative transition-transform duration-1000 " + (isPlaying ? "animate-spin" : "")}
            style={{ animationDuration: '3s' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                <div className="text-white text-xs font-bold text-center">
                  <div>STEREO</div>
                  <div>45 RPM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h4 className="text-xl font-bold text-amber-900 mb-1">Classic Jazz</h4>
        <p className="text-amber-700">Miles Davis</p>
        <p className="text-sm text-amber-600">Blue Note Records • 1959</p>
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-4">
        <button className="p-3 bg-amber-300 hover:bg-amber-400 rounded-full text-amber-900 transition-colors">
          <SkipBack className="h-5 w-5" />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 bg-amber-600 hover:bg-amber-700 rounded-full text-white transition-colors shadow-lg"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </button>
        <button className="p-3 bg-amber-300 hover:bg-amber-400 rounded-full text-amber-900 transition-colors">
          <SkipForward className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}`,
  },
  {
    id: 2,
    name: "Modern Streaming",
    description: "Contemporary streaming interface with gradient design",
    style: "modern" as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat } from "lucide-react"
import { useState } from "react"

export default function ModernStreaming() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-6 text-white shadow-2xl">
      <div className="relative mb-6">
        <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-6xl mb-4">
          🎵
        </div>
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
        >
          <Heart className={"h-5 w-5 " + (isLiked ? "text-red-400 fill-current" : "text-white")} />
        </button>
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-1">Midnight Vibes</h3>
        <p className="text-purple-300">Lo-Fi Hip Hop</p>
        <p className="text-sm text-gray-400">Chill Beats Collective</p>
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-6">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Shuffle className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <SkipBack className="h-6 w-6" />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full transition-all transform hover:scale-105"
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <SkipForward className="h-6 w-6" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Repeat className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}`,
  },
  {
    id: 3,
    name: "Retro Boombox",
    description: "80s-style boombox with radio station controls",
    style: "classic" as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Volume2, Radio } from "lucide-react"
import { useState } from "react"

export default function RetroBoombox() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl">
      <div className="bg-black rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="aspect-square bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="text-4xl">📻</div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white/50 rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="aspect-square bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="text-4xl">🎤</div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className="bg-green-400 text-black px-4 py-2 rounded-lg mb-2 font-mono text-lg">
          ♪ NOW PLAYING ♪
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">80s HITS RADIO</h3>
        <p className="text-green-400">FM 103.7 • Retro Wave Station</p>
      </div>
      
      <div className="bg-gray-700 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-center gap-6 mb-4">
          <button className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors">
            <SkipBack className="h-6 w-6" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 bg-green-500 hover:bg-green-600 rounded-full text-white transition-colors transform hover:scale-105"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </button>
          <button className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors">
            <SkipForward className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 4,
    name: "Podcast Player",
    description: "Professional podcast player with episode details",
    style: "bold" as const,
    code: `import { Play, Pause, SkipBack, SkipForward, Download, Share2, Clock, Headphones } from "lucide-react"
import { useState } from "react"

export default function PodcastPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  
  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-6 text-white shadow-2xl">
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-6xl mb-4 shadow-lg">
          🎙️
        </div>
        <h3 className="text-xl font-bold mb-1">Tech Talk Daily</h3>
        <p className="text-purple-300">Episode 127: AI Revolution</p>
        <p className="text-sm text-gray-400">Hosted by Sarah Chen • 45 min</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">12:34</span>
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            <span className="text-sm">2.1K listening</span>
          </div>
          <span className="text-sm font-medium">45:20</span>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <SkipBack className="h-6 w-6" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-full text-black transition-all transform hover:scale-105 shadow-lg"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <SkipForward className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setPlaybackSpeed(playbackSpeed === 2 ? 0.5 : playbackSpeed + 0.25)}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
        >
          {playbackSpeed}x
        </button>
        
        <div className="flex gap-2">
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}`,
  }
]

export function createAudioPlayerPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = AUDIO_PLAYER_TEMPLATES.map((template) => ({
    id: `audio-player-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Audio Playback', 'Custom Controls', 'Playlist Support', 'Volume Control'],
      useCases: ['Music Player', 'Podcast Player', 'Audio Library', 'Streaming'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Audio controls', 'Progress tracking', 'Playlist functionality', 'Volume management']
    })
  }))

  return {
    id: 'audio-player',
    name: 'Audio Player',
    description: 'Audio Player component templates with various control styles',
    category: 'media-gallery',
    variations,
    tags: ['audio', 'music', 'player', 'controls']
  }
}

export const AUDIO_PLAYER_PANEL_WITH_VARIATIONS = createAudioPlayerPanel()