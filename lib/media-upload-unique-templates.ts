import { Upload, Paperclip, Stamp, Zap, Cpu, Wifi, Briefcase, FileText, Shield, Clock, Rocket, Flame, Star } from 'lucide-react'
import { useState } from 'react'

// Media Upload Templates - 4 completely unique visual designs
const MEDIA_UPLOAD_TEMPLATES = [
  {
    id: 'upload-minimal',
    name: 'Postcard Uploader',
    style: 'minimal' as const,
    code: `import { Upload, Paperclip, Stamp } from "lucide-react"
import { useState } from "react"

export default function PostcardUploader() {
  const [dragActive, setDragActive] = useState(false)
  
  return (
    <div className="w-full max-w-lg mx-auto bg-cream p-8 border-4 border-amber-200 shadow-sm">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-amber-100 border-2 border-amber-300 rounded-full mb-4">
          <Stamp className="h-8 w-8 text-amber-700" />
        </div>
        <h3 className="text-xl font-serif text-amber-900 mb-2">Send Your Files</h3>
        <p className="text-amber-700 text-sm">Drop files like sending a postcard</p>
      </div>
      
      <div 
        className={\`border-2 border-dashed \${dragActive ? 'border-amber-500 bg-amber-50' : 'border-amber-300 bg-amber-25'} rounded-lg p-8 text-center transition-colors\`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        <Paperclip className="h-12 w-12 text-amber-600 mx-auto mb-4" />
        <p className="text-amber-800 font-serif mb-4">Drop your memories here</p>
        <button className="px-6 py-2 bg-amber-600 text-white rounded border-2 border-amber-700 hover:bg-amber-700 transition-colors font-serif">
          Choose Files
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-amber-600 font-serif">Accepts: Photos, Documents, Videos</p>
        <div className="mt-2 flex justify-center gap-2">
          <div className="w-4 h-4 bg-amber-300 border border-amber-400 transform rotate-45" />
          <div className="w-4 h-4 bg-amber-400 border border-amber-500 transform -rotate-12" />
          <div className="w-4 h-4 bg-amber-200 border border-amber-300 transform rotate-12" />
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-modern',
    name: 'Hologram Uploader',
    style: 'modern' as const,
    code: `import { Upload, Zap, Cpu, Wifi } from "lucide-react"
import { useState } from "react"

export default function HologramUploader() {
  const [scanning, setScanning] = useState(false)
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-black p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center relative">
            <Upload className="h-10 w-10 text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-spin" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            NEURAL UPLOAD SYSTEM
          </h3>
          <p className="text-cyan-400 font-mono text-sm">QUANTUM_FILE_TRANSFER_v3.0</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 border-2 border-dashed border-cyan-400/50 rounded-2xl flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl" />
              <Cpu className="h-16 w-16 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-white font-mono mb-4">DRAG_FILES || CLICK_TO_SELECT</p>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
              INITIALIZE TRANSFER
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <p className="text-white text-sm font-mono">QUANTUM</p>
            <p className="text-gray-400 text-xs">Instant transfer</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <Wifi className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <p className="text-white text-sm font-mono">SECURE</p>
            <p className="text-gray-400 text-xs">Encrypted</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <Cpu className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <p className="text-white text-sm font-mono">AI_SCAN</p>
            <p className="text-gray-400 text-xs">Auto-detect</p>
          </div>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-classic',
    name: 'Briefcase Uploader',
    style: 'classic' as const,
    code: `import { Upload, Briefcase, FileText, Shield, Clock } from "lucide-react"
import { useState } from "react"

export default function BriefcaseUploader() {
  const [selectedFiles, setSelectedFiles] = useState([])
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-100 to-slate-200 p-8 border-4 border-slate-300 rounded-lg shadow-lg">
      <div className="bg-white p-6 border-2 border-slate-300 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Document Center</h3>
            <p className="text-slate-600">Professional file management system</p>
          </div>
        </div>
        
        <div className="border-2 border-dashed border-slate-400 rounded-lg p-8 bg-slate-50 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-slate-200 border-2 border-slate-400 rounded-lg flex items-center justify-center">
              <Upload className="h-10 w-10 text-slate-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">Upload Business Documents</h4>
            <p className="text-slate-600 mb-4">Drag and drop files or click to browse</p>
            <button className="px-8 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold">
              Select Files
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-slate-100 border border-slate-300 rounded-lg">
            <FileText className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-800">Documents</p>
            <p className="text-xs text-slate-600">PDF, DOC, XLS</p>
          </div>
          <div className="text-center p-4 bg-slate-100 border border-slate-300 rounded-lg">
            <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm font-semibold text-slate-800">Secure</p>
            <p className="text-xs text-slate-600">Enterprise grade</p>
          </div>
          <div className="text-center p-4 bg-slate-100 border border-slate-300 rounded-lg">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-semibold text-slate-800">Fast</p>
            <p className="text-xs text-slate-600">Quick processing</p>
          </div>
        </div>
        
        <div className="text-center text-sm text-slate-600">
          <p>Maximum file size: 100MB • Supported formats: All business documents</p>
        </div>
      </div>
    </div>
  )
}`
  },
  {
    id: 'upload-bold',
    name: 'Rocket Launcher',
    style: 'bold' as const,
    code: `import { Upload, Rocket, Flame, Star, Zap } from "lucide-react"
import { useState } from "react"

export default function RocketLauncher() {
  const [launching, setLaunching] = useState(false)
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-black p-8 border-4 border-orange-500 rounded-3xl shadow-[0_0_50px_rgba(249,115,22,0.5)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 animate-pulse" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-10 w-10 text-red-500 animate-bounce" />
            <h3 className="text-4xl font-black text-orange-400 transform -skew-x-12">FILE ROCKET</h3>
            <Flame className="h-10 w-10 text-red-500 animate-bounce" />
          </div>
          <p className="text-red-400 font-bold text-lg">🚀 BLAST YOUR FILES TO THE CLOUD! 🚀</p>
        </div>
        
        <div className="border-4 border-dashed border-orange-500 rounded-2xl p-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-8 relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping" />
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center relative">
              <Rocket className="h-16 w-16 text-white transform rotate-45" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            </div>
            <h4 className="text-2xl font-black text-white mb-4 transform -skew-x-6">LAUNCH PAD READY!</h4>
            <p className="text-orange-300 font-bold mb-6">Drop files here for MAXIMUM SPEED upload!</p>
            <button className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-black text-xl hover:scale-110 transition-transform shadow-lg border-2 border-yellow-400">
              🚀 LAUNCH FILES!
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gradient-to-br from-red-600/30 to-orange-500/30 border-2 border-red-500 rounded-xl p-4">
            <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400 animate-pulse" />
            <p className="text-white font-black text-sm">TURBO SPEED</p>
            <p className="text-orange-300 text-xs">Lightning fast</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600/30 to-yellow-500/30 border-2 border-orange-500 rounded-xl p-4">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400 animate-spin" />
            <p className="text-white font-black text-sm">MEGA POWER</p>
            <p className="text-orange-300 text-xs">Unlimited size</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/30 to-red-500/30 border-2 border-yellow-500 rounded-xl p-4">
            <Flame className="h-8 w-8 mx-auto mb-2 text-red-400 animate-bounce" />
            <p className="text-white font-black text-sm">BLAST OFF</p>
            <p className="text-orange-300 text-xs">To the cloud!</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-orange-400 font-bold text-sm animate-pulse">⚠️ WARNING: EXTREMELY FAST UPLOAD SPEEDS! ⚠️</p>
        </div>
      </div>
    </div>
  )
}`
  }
]

export { MEDIA_UPLOAD_TEMPLATES }