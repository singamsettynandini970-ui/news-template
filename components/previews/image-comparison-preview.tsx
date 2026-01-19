import React, { useState } from 'react'
import { Move, RotateCcw, ZoomIn, ZoomOut, Maximize2, ArrowLeftRight } from 'lucide-react'

const ImageComparisonPreview = () => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [comparisonMode, setComparisonMode] = useState('slider')

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Image Comparison Templates
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Template 1: Classic Slider */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Classic Slider</h3>
            </div>
            <div className="p-6">
              <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <div className="absolute inset-0 flex">
                  <div className="bg-gradient-to-br from-red-300 to-red-500 flex items-center justify-center text-white font-semibold" style={{ width: `${sliderPosition}%` }}>
                    Before
                  </div>
                  <div className="bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-white font-semibold flex-1">
                    After
                  </div>
                </div>
                <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPosition}%` }}>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab">
                    <ArrowLeftRight className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Template 2: Side by Side */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">Side by Side</h3>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-cyan-600 transition-colors">
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-cyan-600 transition-colors">
                  <ZoomOut className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 h-64">
                <div className="relative bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center text-white font-semibold overflow-hidden">
                  <span className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-sm">Original</span>
                  Before
                </div>
                <div className="relative bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold overflow-hidden">
                  <span className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-sm">Enhanced</span>
                  After
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-900/50 transition-colors">
                  Reset View
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Template 3: Overlay Mode */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">Overlay Mode</h3>
              <select value={comparisonMode} onChange={(e) => setComparisonMode(e.target.value)} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700">
                <option value="slider">Slider</option>
                <option value="fade">Fade</option>
                <option value="split">Split</option>
              </select>
            </div>
            <div className="p-6">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500 flex items-center justify-center text-white font-semibold">
                  Base Image
                </div>
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center text-white font-semibold transition-all duration-300"
                  style={{ 
                    clipPath: comparisonMode === 'slider' ? `inset(0 ${100 - sliderPosition}% 0 0)` : 'none',
                    opacity: comparisonMode === 'fade' ? sliderPosition / 100 : 1
                  }}
                >
                  Overlay Image
                </div>
                {comparisonMode === 'slider' && (
                  <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPosition}%` }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab">
                      <Move className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[3rem]">{sliderPosition}%</span>
              </div>
            </div>
          </div>

          {/* Template 4: Interactive Hotspots */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Interactive Hotspots</h3>
            </div>
            <div className="p-6">
              <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-300 to-indigo-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                  Interactive Comparison
                </div>
                
                {/* Hotspots */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full border-2 border-indigo-600 cursor-pointer hover:scale-125 transition-transform">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    Color Enhancement
                  </div>
                </div>
                
                <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-white rounded-full border-2 border-indigo-600 cursor-pointer hover:scale-125 transition-transform">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    Brightness Boost
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-white rounded-full border-2 border-indigo-600 cursor-pointer hover:scale-125 transition-transform">
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    Noise Reduction
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Maximize2 className="h-4 w-4" />
                  Fullscreen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageComparisonPreview