import React, { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, Eye, ThumbsUp } from 'lucide-react'

const VideoGalleryPreview = () => {
  const [selectedVideo, setSelectedVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const videos = [
    { id: 1, title: 'Nature Documentary', duration: '12:45', views: '1.2M', likes: '45K', thumbnail: 'from-green-400 to-blue-500' },
    { id: 2, title: 'Tech Review', duration: '8:30', views: '890K', likes: '32K', thumbnail: 'from-blue-400 to-purple-500' },
    { id: 3, title: 'Travel Vlog', duration: '15:20', views: '2.1M', likes: '78K', thumbnail: 'from-purple-400 to-pink-500' },
    { id: 4, title: 'Cooking Tutorial', duration: '6:15', views: '650K', likes: '28K', thumbnail: 'from-orange-400 to-red-500' },
    { id: 5, title: 'Music Video', duration: '4:30', views: '3.5M', likes: '120K', thumbnail: 'from-pink-400 to-red-500' },
    { id: 6, title: 'Gaming Stream', duration: '45:00', views: '780K', likes: '35K', thumbnail: 'from-indigo-400 to-blue-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Video Gallery Templates
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Template 1: Featured Player */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Featured Player</h3>
            </div>
            <div className="p-6">
              <div className="relative aspect-video bg-gradient-to-br from-red-400 to-orange-500 rounded-lg mb-4 group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded px-3 py-2">
                    <h4 className="text-white font-medium">{videos[selectedVideo].title}</h4>
                    <div className="flex items-center gap-4 text-white/80 text-sm mt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {videos[selectedVideo].views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {videos[selectedVideo].likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {videos[selectedVideo].duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {videos.slice(0, 3).map((video, i) => (
                  <button key={video.id} onClick={() => setSelectedVideo(i)} className={`aspect-video bg-gradient-to-br ${video.thumbnail} rounded flex items-center justify-center ${i === selectedVideo ? 'ring-2 ring-red-500' : 'opacity-70'}`}>
                    <Play className="h-4 w-4 text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Template 2: Grid Gallery */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Grid Gallery</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {videos.slice(0, 4).map((video) => (
                  <div key={video.id} className="relative aspect-video bg-gradient-to-br from-red-200 to-orange-200 dark:from-gray-600 dark:to-gray-500 rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                        <p className="text-white text-xs font-medium truncate">{video.title}</p>
                        <p className="text-white/80 text-xs">{video.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template 3: List View */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">List View</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {videos.slice(0, 4).map((video, i) => (
                  <div key={video.id} className="flex items-center gap-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative w-20 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded flex items-center justify-center flex-shrink-0">
                      <Play className="h-4 w-4 text-white" />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">{video.duration}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 dark:text-white truncate">{video.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span>{video.views} views</span>
                        <span>{video.likes} likes</span>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template 4: Theater Mode */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Theater Mode</h3>
            </div>
            <div className="bg-black p-6">
              <div className="relative aspect-video bg-gradient-to-br from-red-500 to-orange-600 rounded-lg mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <Play className="h-10 w-10 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <button className="p-2 bg-black/50 rounded-full hover:bg-black/70">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-black/50 rounded-full hover:bg-black/70">
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <span className="text-sm">2:30 / 12:45</span>
                    </div>
                    <button className="p-2 bg-black/50 rounded-full hover:bg-black/70">
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="w-full h-1 bg-white/30 rounded-full mt-2">
                    <div className="w-1/5 h-full bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <h4 className="font-semibold mb-2">{videos[0].title}</h4>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span>{videos[0].views} views</span>
                  <span>{videos[0].likes} likes</span>
                  <span>Published 2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGalleryPreview