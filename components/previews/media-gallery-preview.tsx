import React, { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Download, Share2, Heart, Eye, Grid, List } from 'lucide-react'

const MediaGalleryPreview = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [selectedImage, setSelectedImage] = useState(null)

  const mediaItems = [
    { id: 1, type: 'image', src: '/api/placeholder/400/300', title: 'Mountain Landscape', views: 1234 },
    { id: 2, type: 'video', src: '/api/placeholder/400/300', title: 'Ocean Waves', duration: '2:45' },
    { id: 3, type: 'image', src: '/api/placeholder/400/300', title: 'City Skyline', views: 856 },
    { id: 4, type: 'audio', title: 'Ambient Music', duration: '4:20', artist: 'John Doe' },
    { id: 5, type: 'image', src: '/api/placeholder/400/300', title: 'Forest Path', views: 2341 },
    { id: 6, type: 'video', src: '/api/placeholder/400/300', title: 'Sunset Timelapse', duration: '1:30' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-purple-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Media & Gallery Templates
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Interactive media components for modern websites</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Image Slider Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-purple-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Image Slider
              </h2>
            </div>
            <div className="relative h-80 bg-gradient-to-r from-purple-400 to-pink-400">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Beautiful Image Slider</h3>
                  <p className="text-white/80">Responsive carousel with smooth transitions</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeSlide === i ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Media Grid Panel */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-purple-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Media Grid Panel
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="group relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center">
                      {item.type === 'video' && <Play className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                      {item.type === 'image' && <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                      {item.type === 'audio' && <Volume2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-1">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.views ? `${item.views} views` : item.duration}</span>
                        <div className="flex gap-2">
                          <Heart className="h-4 w-4 hover:text-red-500 cursor-pointer" />
                          <Share2 className="h-4 w-4 hover:text-blue-500 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Gallery */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-purple-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Video Gallery
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="h-10 w-10 text-white ml-1" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Featured Video</h3>
                    <p className="text-gray-600 dark:text-gray-300">HD Quality • 5:42</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                      <div className="w-16 h-12 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-600 dark:to-gray-500 rounded flex items-center justify-center">
                        <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-white">Video Title {i}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2:3{i} • 1.2K views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-purple-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Audio Player
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </button>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Ambient Soundscape</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Relaxing Nature Sounds</p>
                    <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <Download className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-green-500 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Comparison & Media Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-purple-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Image Comparison
              </h2>
            </div>
            <div className="p-6">
              <div className="relative bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-700 dark:to-gray-600 rounded-xl h-48 overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                    <span className="text-orange-700 font-medium">Before</span>
                  </div>
                  <div className="w-1/2 bg-gradient-to-br from-red-200 to-red-300 flex items-center justify-center">
                    <span className="text-red-700 font-medium">After</span>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-white shadow-lg"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-purple-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Media Upload
              </h2>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-indigo-300 dark:border-indigo-600 rounded-xl p-8 text-center bg-indigo-50 dark:bg-indigo-900/20">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-white rotate-180" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Upload Media Files</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Drag & drop or click to browse</p>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm">
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow */}
        <div className="mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-purple-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                Slideshow
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Auto-Playing Slideshow</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Seamless transitions with customizable timing</p>
                  <div className="flex items-center justify-center gap-4">
                    <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                      Play
                    </button>
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                      Pause
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaGalleryPreview