import React, { useState } from 'react'
import { Grid, List, Filter, Search, Play, Heart, Share2, Eye } from 'lucide-react'

const MediaGridPreview = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [filter, setFilter] = useState('all')

  const mediaItems = [
    { id: 1, type: 'image', title: 'Mountain View', views: '2.1K', likes: 45 },
    { id: 2, type: 'video', title: 'Ocean Waves', views: '5.3K', likes: 89 },
    { id: 3, type: 'image', title: 'City Lights', views: '1.8K', likes: 32 },
    { id: 4, type: 'video', title: 'Forest Walk', views: '3.2K', likes: 67 },
    { id: 5, type: 'image', title: 'Desert Sunset', views: '4.1K', likes: 78 },
    { id: 6, type: 'video', title: 'River Flow', views: '2.9K', likes: 54 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Media Grid Templates
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Template 1: Classic Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Classic Grid</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3">
                {mediaItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="aspect-square bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-gray-600 dark:to-gray-500 rounded-lg flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform">
                    {item.type === 'video' ? (
                      <Play className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Eye className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template 2: Card Grid with Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">Card Grid</h3>
              <div className="flex gap-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-500'}`}>
                  <Grid className="h-4 w-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-500'}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {mediaItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center">
                      {item.type === 'video' ? <Play className="h-6 w-6 text-emerald-600" /> : <Eye className="h-6 w-6 text-emerald-600" />}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-800 dark:text-white text-sm mb-1">{item.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.views} views</span>
                        <div className="flex gap-2">
                          <Heart className="h-3 w-3" />
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template 3: Masonry Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">Masonry Grid</h3>
              <button className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
            <div className="p-6">
              <div className="columns-2 gap-3">
                {mediaItems.map((item, i) => (
                  <div key={item.id} className={`mb-3 break-inside-avoid bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-lg overflow-hidden hover:shadow-md transition-shadow ${i % 3 === 0 ? 'aspect-square' : 'aspect-[3/4]'}`}>
                    <div className="h-full bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center relative group">
                      {item.type === 'video' ? <Play className="h-6 w-6 text-emerald-600" /> : <Eye className="h-6 w-6 text-emerald-600" />}
                      <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-medium">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template 4: Interactive Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Interactive Grid</h3>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" placeholder="Search media..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700" />
                </div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700">
                  <option value="all">All</option>
                  <option value="images">Images</option>
                  <option value="videos">Videos</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3">
                {mediaItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="aspect-square bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-gray-600 dark:to-gray-500 rounded-lg flex items-center justify-center relative group cursor-pointer hover:scale-105 transition-all">
                    {item.type === 'video' ? <Play className="h-6 w-6 text-emerald-600" /> : <Eye className="h-6 w-6 text-emerald-600" />}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 bg-black/50 rounded-full text-white hover:bg-black/70">
                        <Heart className="h-3 w-3" />
                      </button>
                      <button className="p-1 bg-black/50 rounded-full text-white hover:bg-black/70">
                        <Share2 className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium">{item.title}</p>
                      <p className="text-white/80 text-xs">{item.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaGridPreview