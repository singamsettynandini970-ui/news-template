import { Play, Pause, Volume2, Maximize } from 'lucide-react'
import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const VIDEO_PLAYER_TEMPLATES = [
  {
    id: 1,
    name: "Basic Player",
    description: "Basic video player with native controls",
    style: "minimal" as const,
    code: 'export default function BasicVideoPlayer() {\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">\n        <video className="w-full h-full object-cover" controls>\n          <source src="/video.mp4" type="video/mp4" />\n          Your browser does not support the video tag.\n        </video>\n      </div>\n      <div className="mt-4 space-y-2">\n        <h3 className="text-lg font-semibold text-foreground">Video Title</h3>\n        <p className="text-sm text-muted-foreground">Video description goes here</p>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Custom Controls",
    description: "Video player with custom controls",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { Play, Pause, Volume2, Maximize } from "lucide-react"\n\nexport default function CustomControlsPlayer() {\n  const [isPlaying, setIsPlaying] = useState(false)\n  const [volume, setVolume] = useState(100)\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video group">\n        <video className="w-full h-full object-cover" />\n        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">\n          <button className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90">\n            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}\n          </button>\n        </div>\n        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">\n          <div className="flex items-center gap-3">\n            <button className="p-1 hover:bg-white/20 rounded transition-colors">\n              {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}\n            </button>\n            <div className="flex-1 h-1 bg-white/30 rounded-full">\n              <div className="h-full w-1/3 bg-primary rounded-full" />\n            </div>\n            <button className="p-1 hover:bg-white/20 rounded transition-colors">\n              <Volume2 className="h-4 w-4 text-white" />\n            </button>\n            <button className="p-1 hover:bg-white/20 rounded transition-colors">\n              <Maximize className="h-4 w-4 text-white" />\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Playlist Player",
    description: "Video player with playlist",
    style: "classic" as const,
    code: 'import { useState } from "react"\nimport { Play, ChevronRight } from "lucide-react"\n\nexport default function PlaylistPlayer() {\n  const [current, setCurrent] = useState(0)\n  const videos = [\n    { id: 1, title: "Video 1", duration: "5:30" },\n    { id: 2, title: "Video 2", duration: "3:45" },\n    { id: 3, title: "Video 3", duration: "7:20" },\n  ]\n\n  return (\n    <div className="w-full max-w-4xl flex gap-4">\n      <div className="flex-1">\n        <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">\n          <video className="w-full h-full object-cover" controls>\n            <source src="/video.mp4" type="video/mp4" />\n          </video>\n        </div>\n        <h3 className="text-lg font-semibold text-foreground mt-4">{videos[current].title}</h3>\n      </div>\n      <div className="w-64 bg-accent rounded-lg p-4 space-y-2 max-h-96 overflow-y-auto">\n        {videos.map((video, idx) => (\n          <button\n            key={video.id}\n            onClick={() => setCurrent(idx)}\n            className={"w-full flex items-center gap-3 p-3 rounded-lg transition-colors " + (idx === current ? "bg-primary text-primary-foreground" : "hover:bg-background text-foreground")}\n          >\n            <Play className="h-4 w-4 flex-shrink-0" />\n            <div className="flex-1 text-left">\n              <p className="text-sm font-medium">{video.title}</p>\n              <p className="text-xs opacity-75">{video.duration}</p>\n            </div>\n          </button>\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Live Stream",
    description: "Live streaming video player",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { Circle } from "lucide-react"\n\nexport default function LiveStreamPlayer() {\n  const [isLive, setIsLive] = useState(true)\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">\n        <video className="w-full h-full object-cover" autoPlay muted>\n          <source src="/stream.m3u8" type="application/x-mpegURL" />\n        </video>\n        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">\n          <Circle className={"h-2 w-2 " + (isLive ? "fill-current animate-pulse" : "")} />\n          {isLive ? "LIVE" : "OFFLINE"}\n        </div>\n      </div>\n      <div className="mt-4 space-y-2">\n        <h3 className="text-lg font-semibold text-foreground">Live Stream Title</h3>\n        <p className="text-sm text-muted-foreground">Watching with 1,234 viewers</p>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createVideoPlayerPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = VIDEO_PLAYER_TEMPLATES.map((template) => ({
    id: `video-player-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Video Playback', 'Custom Controls', 'Responsive', 'Playlist Support'],
      useCases: ['Media', 'Tutorials', 'Entertainment', 'Live Streaming'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Native HTML5 video', 'Custom control UI', 'Responsive design', 'Playlist management']
    })
  }))

  return {
    id: 'video-player',
    name: 'Video Player',
    description: 'Video Player component templates with various control styles',
    category: 'media-gallery',
    variations,
    tags: ['media', 'video', 'player', 'streaming']
  }
}

export const VIDEO_PLAYER_PANEL_WITH_VARIATIONS = createVideoPlayerPanel()
