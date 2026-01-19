import React, { useState } from 'react'
import { Upload, File, Image, Video, Music, X, Check, AlertCircle, Cloud, FolderOpen } from 'lucide-react'

const MediaUploadPreview = () => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'image1.jpg', type: 'image', size: '2.4 MB', status: 'completed' },
    { id: 2, name: 'video1.mp4', type: 'video', size: '15.2 MB', status: 'uploading', progress: 65 }
  ])

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Media Upload Templates
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Template 1: Drag & Drop Zone */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Drag & Drop Zone</h3>
            </div>
            <div className="p-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive 
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-violet-400'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Drop files here</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">or click to browse</p>
                <button className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                  Choose Files
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Supports: JPG, PNG, MP4, MP3 (Max 50MB)
                </p>
              </div>
            </div>
          </div>

          {/* Template 2: Multi-Step Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Multi-Step Upload</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div className="w-12 h-1 bg-violet-600 mx-2"></div>
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div className="w-12 h-1 bg-gray-300 mx-2"></div>
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center mb-4">
                <Cloud className="h-12 w-12 text-violet-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Step 2: Upload Files</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Select media files to upload</p>
                <button className="px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors">
                  Browse Files
                </button>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Previous
                </button>
                <button className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                  Next Step
                </button>
              </div>
            </div>
          </div>

          {/* Template 3: File Manager Style */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">File Manager Style</h3>
              <button className="flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg text-sm hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors">
                <FolderOpen className="h-4 w-4" />
                New Folder
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-4 gap-3 mb-4">
                <button className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-violet-400 transition-colors">
                  <Upload className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Upload</span>
                </button>
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg flex flex-col items-center justify-center">
                  <Image className="h-6 w-6 text-blue-600 mb-1" />
                  <span className="text-xs text-blue-600">IMG_001</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-lg flex flex-col items-center justify-center">
                  <Video className="h-6 w-6 text-red-600 mb-1" />
                  <span className="text-xs text-red-600">VID_001</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg flex flex-col items-center justify-center">
                  <Music className="h-6 w-6 text-green-600 mb-1" />
                  <span className="text-xs text-green-600">AUD_001</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>3 files selected</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Delete
                  </button>
                  <button className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors">
                    Upload All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Template 4: Progress Tracker */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Progress Tracker</h3>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center mb-4">
                <Upload className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Drop files or click to upload</p>
              </div>
              
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded flex items-center justify-center">
                      {file.type === 'image' ? <Image className="h-4 w-4 text-violet-600" /> : 
                       file.type === 'video' ? <Video className="h-4 w-4 text-violet-600" /> : 
                       <File className="h-4 w-4 text-violet-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>
                      {file.status === 'uploading' && (
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1 mt-1">
                          <div className="bg-violet-600 h-1 rounded-full transition-all" style={{ width: `${file.progress}%` }}></div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'completed' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : file.status === 'uploading' ? (
                        <span className="text-xs text-violet-600">{file.progress}%</span>
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">2 of 3 files uploaded</span>
                <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                  Upload More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaUploadPreview