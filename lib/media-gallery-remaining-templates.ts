import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Image Comparison templates with unique designs
const IMAGE_COMPARISON_TEMPLATES = [
  { 
    id: 1, 
    name: "Split Screen Slider", 
    description: "Interactive before/after slider with draggable divider",
    style: "minimal" as const, 
    code: `import { Move, RotateCcw } from "lucide-react"
import { useState } from "react"

export default function SplitScreenComparison() {
  const [sliderPosition, setSliderPosition] = useState(50)
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 text-center">Before & After Comparison</h3>
      </div>
      
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-2">📷</div>
            <p className="font-medium">BEFORE</p>
            <p className="text-sm">Original Image</p>
          </div>
        </div>
        
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-300 to-green-400 flex items-center justify-center overflow-hidden"
          style={{ clipPath: "inset(0 " + (100 - sliderPosition) + "% 0 0)" }}
        >
          <div className="text-center text-white">
            <div className="text-6xl mb-2">✨</div>
            <p className="font-medium">AFTER</p>
            <p className="text-sm">Enhanced Image</p>
          </div>
        </div>
        
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10 flex items-center justify-center"
          style={{ left: sliderPosition + "%" }}
        >
          <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Move className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Drag to compare</span>
          <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
        
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  )
}` 
  },
  {
    id: 2,
    name: "Side by Side",
    description: "Professional side-by-side comparison with detailed metadata",
    style: "modern" as const,
    code: `import { ArrowLeftRight, Maximize2, Download } from "lucide-react"
import { useState } from "react"

export default function SideBySideComparison() {
  const [activeView, setActiveView] = useState('both')
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Image Comparison Tool</h3>
        <p className="text-slate-300">Compare images side by side with precision</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="relative group">
          <div className="aspect-video bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center text-6xl relative overflow-hidden">
            🌅
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              Original
            </div>
            <button className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 text-center">
            <p className="font-medium">Before Enhancement</p>
            <p className="text-sm text-slate-400">1920x1080 • 2.3 MB</p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="aspect-video bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-6xl relative overflow-hidden">
            🌄
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              Enhanced
            </div>
            <button className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 text-center">
            <p className="font-medium">After Enhancement</p>
            <p className="text-sm text-slate-400">1920x1080 • 2.1 MB</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-700 rounded-lg p-1">
          <button 
            onClick={() => setActiveView('original')}
            className={"px-4 py-2 rounded text-sm font-medium transition-colors " + (activeView === 'original' ? 'bg-slate-600 text-white' : 'text-slate-300 hover:text-white')}
          >
            Original
          </button>
          <button 
            onClick={() => setActiveView('both')}
            className={"px-4 py-2 rounded text-sm font-medium transition-colors " + (activeView === 'both' ? 'bg-slate-600 text-white' : 'text-slate-300 hover:text-white')}
          >
            Both
          </button>
          <button 
            onClick={() => setActiveView('enhanced')}
            className={"px-4 py-2 rounded text-sm font-medium transition-colors " + (activeView === 'enhanced' ? 'bg-slate-600 text-white' : 'text-slate-300 hover:text-white')}
          >
            Enhanced
          </button>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <ArrowLeftRight className="h-4 w-4" />
            Compare
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 3,
    name: "Overlay Toggle",
    description: "Layer-based comparison with opacity controls",
    style: "classic" as const,
    code: `import { Eye, EyeOff, Layers, Settings } from "lucide-react"
import { useState } from "react"

export default function OverlayToggle() {
  const [showOverlay, setShowOverlay] = useState(true)
  const [opacity, setOpacity] = useState(50)
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Overlay Comparison</h3>
            <p className="text-sm text-gray-600 mt-1">Toggle between images with overlay controls</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Settings className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-blue-400 flex items-center justify-center text-6xl">
            🌳
          </div>
          
          {showOverlay && (
            <div 
              className="absolute inset-0 bg-gradient-to-br from-orange-300 to-red-400 flex items-center justify-center text-6xl transition-opacity"
              style={{ opacity: opacity / 100 }}
            >
              🍂
            </div>
          )}
          
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              Base Layer
            </div>
            {showOverlay && (
              <div className="bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                Overlay ({opacity}%)
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowOverlay(!showOverlay)}
                className={"flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors " + (showOverlay ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
              >
                {showOverlay ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {showOverlay ? 'Hide Overlay' : 'Show Overlay'}
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-medium transition-colors">
                <Layers className="h-4 w-4" />
                Layers
              </button>
            </div>
          </div>
          
          {showOverlay && (
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overlay Opacity: {opacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 4,
    name: "Interactive Magnifier",
    description: "Advanced magnification tool with zoom controls",
    style: "bold" as const,
    code: `import { ZoomIn, ZoomOut, RotateCw, Crosshair } from "lucide-react"
import { useState } from "react"

export default function InteractiveMagnifier() {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">Precision Magnifier</h3>
        <p className="text-purple-200">Interactive zoom comparison with pixel-perfect detail</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div 
            className="relative aspect-square bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl overflow-hidden cursor-crosshair"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setMousePos({ 
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100
              })
            }}
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
          >
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              🔍
            </div>
            
            {showMagnifier && (
              <div 
                className="absolute w-32 h-32 border-4 border-white rounded-full pointer-events-none z-10"
                style={{
                  left: mousePos.x + '%',
                  top: mousePos.y + '%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
                }}
              >
                <div className="absolute inset-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                  🔎
                </div>
              </div>
            )}
            
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              Original
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-semibold mb-2">Image A Details</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Resolution: 2048x2048</p>
              <p>Format: PNG</p>
              <p>Size: 4.2 MB</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative aspect-square bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              ✨
            </div>
            
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              Enhanced
            </div>
            
            <div className="absolute bottom-4 right-4 bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              +{zoomLevel}% Quality
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-semibold mb-2">Image B Details</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Resolution: 2048x2048</p>
              <p>Format: PNG</p>
              <p>Size: 3.8 MB</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Magnification Controls</h4>
          <div className="flex items-center gap-2">
            <Crosshair className="h-4 w-4" />
            <span className="text-sm">Hover to magnify</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          
          <div className="flex-1">
            <input
              type="range"
              min="50"
              max="400"
              step="25"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>50%</span>
              <span className="font-medium">{zoomLevel}%</span>
              <span>400%</span>
            </div>
          </div>
          
          <button 
            onClick={() => setZoomLevel(Math.min(400, zoomLevel + 25))}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          
          <button className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors">
            <RotateCw className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}`
  }
]

// Media Upload templates with unique designs
const MEDIA_UPLOAD_TEMPLATES = [
  { 
    id: 1, 
    name: "Dropzone Portal", 
    description: "Animated drag-and-drop interface with visual feedback",
    style: "minimal" as const, 
    code: `import { Upload, FileImage, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function DropzonePortal() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">File Portal</h3>
        <p className="text-slate-600">Drag files into the portal or click to browse</p>
      </div>
      
      <div 
        className={"relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer " + (isDragOver ? "border-blue-400 bg-blue-50 scale-105" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50")}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false) }}
      >
        <div className={"absolute inset-4 rounded-xl transition-all duration-500 " + (isDragOver ? "bg-gradient-to-r from-blue-200/50 to-purple-200/50 animate-pulse" : "")} />
        
        <div className="relative z-10">
          <div className={"w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 " + (isDragOver ? "bg-blue-500 text-white scale-110" : "bg-slate-200 text-slate-500")}>
            <Upload className="h-10 w-10" />
          </div>
          
          <h4 className="text-lg font-semibold text-slate-700 mb-2">
            {isDragOver ? "Release to upload" : "Drop files here"}
          </h4>
          <p className="text-sm text-slate-500 mb-4">
            Supports JPG, PNG, GIF up to 10MB
          </p>
          
          <button className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors">
            Browse Files
          </button>
        </div>
        
        {isDragOver && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }, (_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: i * 0.1 + 's'
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold text-slate-700">Uploaded Files</h4>
          {uploadedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <FileImage className="h-5 w-5 text-slate-500" />
              <span className="flex-1 text-sm text-slate-700">{file.name}</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}` 
  },
  {
    id: 2,
    name: "Progress Uploader",
    description: "Advanced upload manager with progress tracking",
    style: "modern" as const,
    code: `import { Upload, X, CheckCircle, AlertCircle, File } from "lucide-react"
import { useState } from "react"

export default function ProgressUploader() {
  const [files, setFiles] = useState([
    { id: 1, name: "vacation-photo.jpg", size: "2.4 MB", progress: 100, status: "complete" },
    { id: 2, name: "presentation.pdf", size: "5.1 MB", progress: 65, status: "uploading" },
    { id: 3, name: "video-clip.mp4", size: "12.8 MB", progress: 0, status: "error" }
  ])
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />
      default: return <File className="h-5 w-5 text-blue-500" />
    }
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'bg-green-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }
  
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Upload Manager</h3>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Add Files
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {files.map((file) => (
          <div key={file.id} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              {getStatusIcon(file.status)}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {file.status === 'complete' ? 'Completed' : 
                   file.status === 'error' ? 'Failed' : 
                   'Uploading... ' + file.progress + '%'}
                </span>
                {file.status === 'uploading' && (
                  <span className="text-gray-500">{file.progress}%</span>
                )}
              </div>
              
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={"h-full transition-all duration-300 " + getStatusColor(file.status)}
                  style={{ width: file.progress + '%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">2 of 3 files uploaded</span>
          <span className="font-medium text-gray-900">20.3 MB total</span>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 3,
    name: "Gallery Uploader",
    description: "Visual gallery-style uploader with file organization",
    style: "classic" as const,
    code: `import { Plus, Image, Video, FileText, Trash2 } from "lucide-react"
import { useState } from "react"

export default function GalleryUploader() {
  const [selectedFiles, setSelectedFiles] = useState([
    { id: 1, type: 'image', name: 'sunset.jpg', preview: '🌅' },
    { id: 2, type: 'video', name: 'vacation.mp4', preview: '🎬' },
    { id: 3, type: 'image', name: 'portrait.png', preview: '👤' },
    { id: 4, type: 'document', name: 'report.pdf', preview: '📄' }
  ])
  
  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Media Gallery</h3>
        <p className="text-gray-600">Upload and organize your media files</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {selectedFiles.map((file) => (
          <div key={file.id} className="relative group">
            <div className="aspect-square bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-blue-300 transition-colors overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center text-4xl bg-gradient-to-br from-gray-100 to-gray-200">
                  {file.preview}
                </div>
                <div className="p-3 bg-white">
                  <div className="flex items-center gap-2 mb-1">
                    {getFileIcon(file.type)}
                    <span className="text-xs font-medium text-gray-700 truncate">{file.name}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedFiles(files => files.filter(f => f.id !== file.id))}
                className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
        
        <div className="aspect-square border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-colors group">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Add Files</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Upload Settings</h4>
          <span className="text-sm text-gray-500">{selectedFiles.length} files selected</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>High (Original)</option>
              <option>Medium (Compressed)</option>
              <option>Low (Web Optimized)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Privacy</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Public</option>
              <option>Private</option>
              <option>Unlisted</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Album</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Recent Uploads</option>
              <option>Vacation 2024</option>
              <option>Work Projects</option>
            </select>
          </div>
        </div>
        
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          Upload {selectedFiles.length} Files
        </button>
      </div>
    </div>
  )
}`
  },
  {
    id: 4,
    name: "Cloud Sync Uploader",
    description: "Enterprise cloud storage with real-time sync",
    style: "bold" as const,
    code: `import { Cloud, Zap, Shield, Globe, Upload, Download, Sync } from "lucide-react"
import { useState } from "react"

export default function CloudSyncUploader() {
  const [syncStatus, setSyncStatus] = useState('syncing')
  const [uploadStats, setUploadStats] = useState({
    uploaded: 847,
    total: 1200,
    speed: '2.4 MB/s'
  })
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-8 text-white shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
          <Cloud className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold mb-2">CloudSync Pro</h3>
        <p className="text-blue-200">Intelligent cloud storage with real-time sync</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
          <p className="text-sm font-medium">Lightning Fast</p>
          <p className="text-xs text-gray-300">Up to 10GB/s</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <Shield className="h-6 w-6 mx-auto mb-2 text-green-400" />
          <p className="text-sm font-medium">Secure</p>
          <p className="text-xs text-gray-300">256-bit encryption</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <Globe className="h-6 w-6 mx-auto mb-2 text-blue-400" />
          <p className="text-sm font-medium">Global CDN</p>
          <p className="text-xs text-gray-300">99.9% uptime</p>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Sync Progress</h4>
          <div className="flex items-center gap-2">
            <Sync className={"h-4 w-4 " + (syncStatus === 'syncing' ? 'animate-spin text-blue-400' : 'text-green-400')} />
            <span className="text-sm capitalize">{syncStatus}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Files: {uploadStats.uploaded} / {uploadStats.total}</span>
            <span>{uploadStats.speed}</span>
          </div>
          
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: (uploadStats.uploaded / uploadStats.total) * 100 + '%' }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-300">
            <span>{Math.round((uploadStats.uploaded / uploadStats.total) * 100)}% complete</span>
            <span>ETA: 2m 34s</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
          <Upload className="h-6 w-6" />
          Upload Files
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            Download All
          </button>
          
          <button className="py-3 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors">
            Manage Storage
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-400">
        <p>2.4 GB used of 100 GB • Premium Plan</p>
      </div>
    </div>
  )
}`
  }
]

// Slideshow templates with unique designs
const SLIDESHOW_TEMPLATES = [
  { 
    id: 1, 
    name: "Zen Garden Slideshow", 
    description: "Peaceful slideshow with nature-inspired transitions",
    style: "minimal" as const, 
    code: `import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { useState, useEffect } from "react"

export default function ZenGardenSlideshow() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const slides = [
    { id: 1, title: "Tranquil Waters", subtitle: "Find peace in stillness", color: "from-blue-200 to-teal-300" },
    { id: 2, title: "Mountain Mist", subtitle: "Breathe in serenity", color: "from-gray-200 to-slate-300" },
    { id: 3, title: "Bamboo Grove", subtitle: "Nature's gentle wisdom", color: "from-green-200 to-emerald-300" },
    { id: 4, title: "Stone Garden", subtitle: "Balance in simplicity", color: "from-amber-200 to-orange-300" }
  ]
  
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, slides.length])
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="relative h-96">
        {slides.map((slide, idx) => (
          <div 
            key={slide.id}
            className={"absolute inset-0 bg-gradient-to-br " + slide.color + " transition-all duration-1000 " + (idx === current ? "opacity-100" : "opacity-0")}
          >
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className={"transform transition-all duration-1000 " + (idx === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
                <h2 className="text-4xl font-light text-gray-800 mb-4">{slide.title}</h2>
                <p className="text-lg text-gray-600 font-light">{slide.subtitle}</p>
              </div>
            </div>
            
            {idx === current && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 5 }, (_, i) => (
                  <div 
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                    style={{
                      left: 20 + (i * 15) + '%',
                      top: 30 + (Math.sin(i) * 20) + '%',
                      animationDelay: i * 0.5 + 's'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        
        <button 
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-gray-600 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={() => setCurrent((current + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-gray-600 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={"w-3 h-3 rounded-full transition-all " + (idx === current ? "bg-gray-600 scale-125" : "bg-gray-300 hover:bg-gray-400")}
              />
            ))}
          </div>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition-colors"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span className="text-sm font-medium">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}` 
  },
  {
    id: 2,
    name: "Dynamic Presentation",
    description: "Professional presentation slideshow with progress tracking",
    style: "modern" as const,
    code: `import { Play, Pause, SkipForward, SkipBack, Maximize, Settings } from "lucide-react"
import { useState, useEffect } from "react"

export default function DynamicPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const slides = [
    { id: 1, title: "Market Analysis", content: "Q4 Performance Review", color: "from-blue-500 to-cyan-400", icon: "📈" },
    { id: 2, title: "Growth Strategy", content: "2024 Roadmap", color: "from-purple-500 to-pink-400", icon: "🚀" },
    { id: 3, title: "Team Updates", content: "New Initiatives", color: "from-green-500 to-teal-400", icon: "👥" },
    { id: 4, title: "Next Steps", content: "Action Items", color: "from-orange-500 to-red-400", icon: "✅" }
  ]
  
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentSlide(current => (current + 1) % slides.length)
            return 0
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, slides.length])
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-96">
        <div className={"absolute inset-0 bg-gradient-to-br " + slides[currentSlide].color}>
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div>
              <div className="text-8xl mb-6">{slides[currentSlide].icon}</div>
              <h1 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h1>
              <p className="text-xl font-light opacity-90">{slides[currentSlide].content}</p>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors">
              <Maximize className="h-5 w-5 text-white" />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 text-sm font-medium">
                Slide {currentSlide + 1} of {slides.length}
              </span>
              <span className="text-white/80 text-sm">
                {isPlaying ? Math.round(progress) + '%' : 'Paused'}
              </span>
            </div>
            
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: progress + '%' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </button>
            
            <button 
              onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentSlide(idx); setProgress(0) }}
                className={"w-12 h-3 rounded-full transition-all " + (idx === currentSlide ? "bg-blue-500" : "bg-gray-600 hover:bg-gray-500")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 3,
    name: "Story Timeline",
    description: "Interactive timeline storytelling with milestone navigation",
    style: "classic" as const,
    code: `import { Clock, MapPin, Calendar, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function StoryTimeline() {
  const [activeStory, setActiveStory] = useState(0)
  const stories = [
    { 
      id: 1, 
      year: "2020", 
      title: "The Beginning", 
      location: "San Francisco", 
      description: "Where it all started with a simple idea",
      color: "from-indigo-400 to-purple-500"
    },
    { 
      id: 2, 
      year: "2021", 
      title: "First Milestone", 
      location: "Remote", 
      description: "Reaching our first 1000 users during the pandemic",
      color: "from-green-400 to-blue-500"
    },
    { 
      id: 3, 
      year: "2022", 
      title: "Global Expansion", 
      location: "Worldwide", 
      description: "Opening offices in 5 countries",
      color: "from-orange-400 to-red-500"
    },
    { 
      id: 4, 
      year: "2023", 
      title: "Innovation Award", 
      location: "New York", 
      description: "Recognition for breakthrough technology",
      color: "from-yellow-400 to-orange-500"
    }
  ]
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Our Journey</h3>
        <p className="text-gray-600">A timeline of milestones and achievements</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 rounded-full" />
        
        <div className="space-y-12">
          {stories.map((story, idx) => (
            <div 
              key={story.id}
              className={"relative flex items-center " + (idx % 2 === 0 ? "justify-start" : "justify-end")}
            >
              <div 
                className={"w-1/2 " + (idx % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left")}
                onClick={() => setActiveStory(idx)}
              >
                <div className={"bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl " + (activeStory === idx ? "ring-2 ring-blue-500 scale-105" : "")}>
                  <div className={"w-full h-32 rounded-xl bg-gradient-to-br " + story.color + " flex items-center justify-center text-4xl text-white mb-4"}>
                    {idx === 0 ? '🌱' : idx === 1 ? '🎆' : idx === 2 ? '🌍' : '🏆'}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{story.year}</span>
                      <MapPin className="h-4 w-4 ml-2" />
                      <span>{story.location}</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900">{story.title}</h4>
                    <p className="text-gray-600">{story.description}</p>
                    
                    {activeStory === idx && (
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full z-10" />
              
              <div className={"absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold " + (activeStory === idx ? "scale-110" : "")}>
                {story.year}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStory(idx)}
              className={"w-3 h-3 rounded-full transition-all " + (idx === activeStory ? "bg-blue-500 scale-125" : "bg-gray-300 hover:bg-gray-400")}
            />
          ))}
        </div>
        
        <p className="text-sm text-gray-500">
          <Clock className="inline h-4 w-4 mr-1" />
          Click on any milestone to explore the details
        </p>
      </div>
    </div>
  )
}`
  },
  {
    id: 4,
    name: "Immersive Showcase",
    description: "Cinematic full-screen slideshow with scene transitions",
    style: "bold" as const,
    code: `import { Play, Pause, Volume2, VolumeX, Maximize, Share2 } from "lucide-react"
import { useState, useEffect } from "react"

export default function ImmersiveShowcase() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const scenes = [
    { 
      id: 1, 
      title: "Arctic Expedition", 
      subtitle: "Journey to the North Pole", 
      color: "from-blue-600 via-cyan-500 to-white",
      emoji: "🌊",
      duration: 8
    },
    { 
      id: 2, 
      title: "Desert Mirage", 
      subtitle: "Sahara's Hidden Secrets", 
      color: "from-yellow-600 via-orange-500 to-red-600",
      emoji: "🏜️",
      duration: 6
    },
    { 
      id: 3, 
      title: "Urban Jungle", 
      subtitle: "City Life After Dark", 
      color: "from-purple-900 via-blue-800 to-indigo-900",
      emoji: "🌆",
      duration: 7
    },
    { 
      id: 4, 
      title: "Space Odyssey", 
      subtitle: "Beyond the Stars", 
      color: "from-black via-purple-900 to-blue-900",
      emoji: "🌌",
      duration: 10
    }
  ]
  
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const maxProgress = scenes[currentScene].duration * 10
          if (prev >= maxProgress) {
            setCurrentScene(current => (current + 1) % scenes.length)
            return 0
          }
          return prev + 1
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentScene, scenes])
  
  const currentProgressPercent = (progress / (scenes[currentScene].duration * 10)) * 100
  
  return (
    <div className="w-full max-w-6xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl">
      <div className="relative h-[500px]">
        <div className={"absolute inset-0 bg-gradient-to-br " + scenes[currentScene].color}>
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="text-white">
              <div className="text-9xl mb-8 animate-pulse">{scenes[currentScene].emoji}</div>
              <h1 className="text-5xl font-black mb-4 tracking-wide">{scenes[currentScene].title}</h1>
              <p className="text-2xl font-light opacity-90">{scenes[currentScene].subtitle}</p>
            </div>
          </div>
          
          <div className="absolute inset-0">
            {Array.from({ length: 20 }, (_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 3 + 's',
                  animationDuration: (2 + Math.random() * 2) + 's'
                }}
              />
            ))}
          </div>
          
          <div className="absolute top-6 right-6 flex gap-3">
            <button className="p-3 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full transition-colors">
              <Share2 className="h-5 w-5 text-white" />
            </button>
            <button className="p-3 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full transition-colors">
              <Maximize className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-white hover:bg-gray-100 rounded-full text-black transition-colors"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </button>
            
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            
            <div className="text-white">
              <p className="font-bold">{scenes[currentScene].title}</p>
              <p className="text-sm text-gray-400">
                Scene {currentScene + 1} of {scenes.length} • {scenes[currentScene].duration}s
              </p>
            </div>
          </div>
          
          <div className="text-right text-white">
            <p className="text-sm text-gray-400">Progress</p>
            <p className="font-mono">{Math.round(currentProgressPercent)}%</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all"
              style={{ width: currentProgressPercent + '%' }}
            />
          </div>
          
          <div className="flex justify-center gap-3">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => { setCurrentScene(idx); setProgress(0) }}
                className={"px-4 py-2 rounded-full text-sm font-medium transition-all " + (idx === currentScene ? "bg-white text-black" : "bg-gray-700 text-white hover:bg-gray-600")}
              >
                {scene.emoji} {scene.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}`
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

export function createImageComparisonPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = IMAGE_COMPARISON_TEMPLATES.map((template) => ({
    id: `image-comparison-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'advanced',
      features: ['Image Comparison', 'Interactive Slider', 'Before/After View', 'Zoom Controls'],
      useCases: ['Photo Editing', 'Product Comparison', 'Design Review', 'Quality Assessment'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Slider interaction', 'Image overlay', 'Zoom functionality', 'Responsive comparison']
    })
  }))

  return {
    id: 'image-comparison',
    name: 'Image Comparison',
    description: 'Image Comparison component templates with interactive comparison tools',
    category: 'media-gallery',
    variations,
    tags: ['image', 'comparison', 'slider', 'before-after']
  }
}

export function createMediaUploadPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = MEDIA_UPLOAD_TEMPLATES.map((template) => ({
    id: `media-upload-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'advanced',
      features: ['File Upload', 'Drag & Drop', 'Progress Tracking', 'File Management'],
      useCases: ['File Upload', 'Media Management', 'Content Creation', 'Asset Library'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Drag and drop support', 'Upload progress', 'File validation', 'Preview generation']
    })
  }))

  return {
    id: 'media-upload',
    name: 'Media Upload',
    description: 'Media Upload component templates with various upload interfaces',
    category: 'media-gallery',
    variations,
    tags: ['upload', 'files', 'drag-drop', 'media']
  }
}

export function createSlideshowPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = SLIDESHOW_TEMPLATES.map((template) => ({
    id: `slideshow-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Slideshow', 'Auto-play', 'Navigation Controls', 'Transition Effects'],
      useCases: ['Presentations', 'Image Carousel', 'Story Telling', 'Content Showcase'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Auto-play functionality', 'Smooth transitions', 'Navigation controls', 'Progress indicators']
    })
  }))

  return {
    id: 'slideshow',
    name: 'Slideshow',
    description: 'Slideshow component templates with various presentation styles',
    category: 'media-gallery',
    variations,
    tags: ['slideshow', 'carousel', 'presentation', 'gallery']
  }
}

export const IMAGE_COMPARISON_PANEL_WITH_VARIATIONS = createImageComparisonPanel()
export const MEDIA_UPLOAD_PANEL_WITH_VARIATIONS = createMediaUploadPanel()
export const SLIDESHOW_PANEL_WITH_VARIATIONS = createSlideshowPanel()