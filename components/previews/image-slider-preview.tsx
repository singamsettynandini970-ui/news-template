import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

const ImageSliderPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)

  const slides = [
    { id: 1, title: 'Slide 1', color: 'from-blue-400 to-purple-500' },
    { id: 2, title: 'Slide 2', color: 'from-green-400 to-blue-500' },
    { id: 3, title: 'Slide 3', color: 'from-purple-400 to-pink-500' },
    { id: 4, title: 'Slide 4', color: 'from-yellow-400 to-red-500' }
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Image Slider Templates
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Template 1: Classic Slider */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Classic Slider</h3>
            </div>
            <div className="relative h-64 bg-gradient-to-r from-blue-400 to-purple-500">
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
                {slides[currentSlide].title}
              </div>
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Template 2: Modern Card Slider */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Modern Card Slider</h3>
            </div>
            <div className="p-6">
              <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                  Card {currentSlide + 1}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <div key={i} className={`h-2 w-8 rounded-full ${i === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prevSlide} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={nextSlide} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Template 3: Thumbnail Slider */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Thumbnail Slider</h3>
            </div>
            <div className="p-6">
              <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                  Image {currentSlide + 1}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {slides.map((slide, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} className={`h-12 rounded-lg bg-gradient-to-br ${slide.color} ${i === currentSlide ? 'ring-2 ring-purple-500' : 'opacity-70'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Template 4: Auto-Play Slider */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">Auto-Play Slider</h3>
              <button onClick={() => setIsAutoPlay(!isAutoPlay)} className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isAutoPlay ? 'Pause' : 'Play'}
              </button>
            </div>
            <div className="relative h-64 bg-gradient-to-r from-yellow-400 to-red-500">
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
                Auto Slide {currentSlide + 1}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="flex items-center gap-3 text-white text-sm">
                  <span>{currentSlide + 1} / {slides.length}</span>
                  <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
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

export default ImageSliderPreview