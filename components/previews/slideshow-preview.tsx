import React, { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Settings, Maximize, Grid, Clock } from 'lucide-react'

const SlideshowPreview = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(3)

  const slides = [
    { id: 1, title: 'Slide 1', subtitle: 'Beautiful landscape', color: 'from-emerald-400 to-teal-500' },
    { id: 2, title: 'Slide 2', subtitle: 'City architecture', color: 'from-blue-400 to-indigo-500' },
    { id: 3, title: 'Slide 3', subtitle: 'Nature photography', color: 'from-purple-400 to-pink-500' },
    { id: 4, title: 'Slide 4', subtitle: 'Abstract art', color: 'from-orange-400 to-red-500' },
    { id: 5, title: 'Slide 5', subtitle: 'Portrait session', color: 'from-cyan-400 to-blue-500' }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, autoPlaySpeed * 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, autoPlaySpeed, slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-slate-700 to-gray-600 bg-clip-text text-transparent">
          Slideshow Templates
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Template 1: Classic Slideshow */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Classic Slideshow</h3>
            </div>
            <div className="p-6">
              <div className={`relative h-64 rounded-lg overflow-hidden bg-gradient-to-br ${slides[currentSlide].color} mb-4`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h4 className="text-2xl font-bold mb-2">{slides[currentSlide].title}</h4>
                  <p className="text-white/80">{slides[currentSlide].subtitle}</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    {slides.map((_, i) => (
                      <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                  </div>
                  <span className="text-white/80 text-sm">{currentSlide + 1} / {slides.length}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <button onClick={prevSlide} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <SkipBack className="h-4 w-4" />
                </button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </button>
                <button onClick={nextSlide} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Template 2: Fullscreen Slideshow */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">Fullscreen Mode</h3>
              <button className="p-2 text-gray-500 hover:text-slate-600 transition-colors">
                <Maximize className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-black p-6">
              <div className={`relative h-64 rounded-lg overflow-hidden bg-gradient-to-br ${slides[currentSlide].color}`}>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h4 className="text-3xl font-bold mb-3">{slides[currentSlide].title}</h4>
                    <p className="text-xl text-white/90">{slides[currentSlide].subtitle}</p>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 text-white">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                      </button>
                      <span className="text-sm">{currentSlide + 1} / {slides.length}</span>
                    </div>
                    <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="w-full h-1 bg-white/30 rounded-full">
                    <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template 3: Thumbnail Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">Thumbnail Navigation</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <select value={autoPlaySpeed} onChange={(e) => setAutoPlaySpeed(Number(e.target.value))} className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700">
                  <option value={2}>2s</option>
                  <option value={3}>3s</option>
                  <option value={5}>5s</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className={`relative h-48 rounded-lg overflow-hidden bg-gradient-to-br ${slides[currentSlide].color} mb-4`}>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">{slides[currentSlide].title}</h4>
                    <p className="text-white/80">{slides[currentSlide].subtitle}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2 mb-4">
                {slides.map((slide, i) => (
                  <button key={slide.id} onClick={() => setCurrentSlide(i)} className={`aspect-video rounded bg-gradient-to-br ${slide.color} ${i === currentSlide ? 'ring-2 ring-slate-500' : 'opacity-70'} hover:opacity-100 transition-all`}>
                    <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium">
                      {i + 1}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <button onClick={() => setIsPlaying(!isPlaying)} className={`px-4 py-2 rounded-lg transition-colors ${isPlaying ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}>
                  {isPlaying ? 'Stop' : 'Start'} Slideshow
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">Auto-play: {autoPlaySpeed}s</span>
              </div>
            </div>
          </div>

          {/* Template 4: Grid Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">Grid Overview</h3>
              <button className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                <Grid className="h-4 w-4" />
                View All
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {slides.map((slide, i) => (
                  <div key={slide.id} className={`relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br ${slide.color} cursor-pointer group ${i === currentSlide ? 'ring-2 ring-slate-500' : ''}`} onClick={() => setCurrentSlide(i)}>
                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-6 w-6" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                        <p className="text-white text-xs font-medium truncate">{slide.title}</p>
                      </div>
                    </div>
                    {i === currentSlide && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {isPlaying ? 'Playing' : 'Paused'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {slides.length} slides
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlideshowPreview