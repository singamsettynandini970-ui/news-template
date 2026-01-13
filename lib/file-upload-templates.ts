// File Upload templates - Drag Drop, Button, Progress, Multiple
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const FILE_UPLOAD_TEMPLATES = [
  {
    id: 1,
    name: "Drag and Drop Upload",
    description: "Drag and drop file upload area",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { Upload } from "lucide-react"\n\nexport default function DragDropUpload() {\n  const [isDragging, setIsDragging] = useState(false)\n  const [files, setFiles] = useState<File[]>([])\n\n  const handleDragOver = (e: React.DragEvent) => {\n    e.preventDefault()\n    setIsDragging(true)\n  }\n\n  const handleDragLeave = () => {\n    setIsDragging(false)\n  }\n\n  const handleDrop = (e: React.DragEvent) => {\n    e.preventDefault()\n    setIsDragging(false)\n    const droppedFiles = Array.from(e.dataTransfer.files)\n    setFiles([...files, ...droppedFiles])\n  }\n\n  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {\n    if (e.target.files) {\n      setFiles([...files, ...Array.from(e.target.files)])\n    }\n  }\n\n  return (\n    <div className="w-full max-w-md space-y-3 sm:space-y-4 px-2 sm:px-4">\n      <div\n        onDragOver={handleDragOver}\n        onDragLeave={handleDragLeave}\n        onDrop={handleDrop}\n        className={`p-6 sm:p-8 border-2 border-dashed rounded-lg transition-colors ${\n          isDragging\n            ? "border-primary bg-primary/5"\n            : "border-border bg-accent/50"\n        }`}\n      >\n        <div className="flex flex-col items-center gap-2 sm:gap-3">\n          <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />\n          <div className="text-center">\n            <p className="text-xs sm:text-sm font-medium text-foreground">\n              Drag and drop files here\n            </p>\n            <p className="text-xs text-muted-foreground">or</p>\n          </div>\n          <label className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-xs sm:text-sm font-medium">\n            Browse Files\n            <input\n              type="file"\n              multiple\n              onChange={handleFileSelect}\n              className="hidden"\n            />\n          </label>\n        </div>\n      </div>\n\n      {files.length > 0 && (\n        <div className="space-y-2">\n          <p className="text-xs sm:text-sm font-medium text-foreground">\n            {files.length} file(s) selected\n          </p>\n          <ul className="space-y-1 sm:space-y-2">\n            {files.map((file, idx) => (\n              <li key={idx} className="text-xs sm:text-sm text-muted-foreground truncate">\n                {file.name}\n              </li>\n            ))}\n          </ul>\n        </div>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Button File Upload",
    description: "Traditional button-based file upload",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { FileUp, X } from "lucide-react"\n\nexport default function ButtonFileUpload() {\n  const [files, setFiles] = useState<File[]>([])\n  const [uploading, setUploading] = useState(false)\n\n  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {\n    if (e.target.files) {\n      setFiles(Array.from(e.target.files))\n    }\n  }\n\n  const handleUpload = async () => {\n    setUploading(true)\n    await new Promise(resolve => setTimeout(resolve, 2000))\n    setUploading(false)\n    setFiles([])\n  }\n\n  const removeFile = (idx: number) => {\n    setFiles(files.filter((_, i) => i !== idx))\n  }\n\n  return (\n    <div className="w-full max-w-md space-y-3 sm:space-y-4 px-2 sm:px-4">\n      <div className="flex gap-2 sm:gap-3">\n        <label className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-xs sm:text-sm font-medium flex items-center justify-center gap-2">\n          <FileUp className="h-4 w-4" />\n          Choose Files\n          <input\n            type="file"\n            multiple\n            onChange={handleFileSelect}\n            className="hidden"\n          />\n        </label>\n        <button\n          onClick={handleUpload}\n          disabled={files.length === 0 || uploading}\n          className="px-3 sm:px-4 py-2 sm:py-2.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50"\n        >\n          {uploading ? "Uploading..." : "Upload"}\n        </button>\n      </div>\n\n      {files.length > 0 && (\n        <div className="space-y-2">\n          <p className="text-xs sm:text-sm font-medium text-foreground">\n            {files.length} file(s) selected\n          </p>\n          <ul className="space-y-1 sm:space-y-2">\n            {files.map((file, idx) => (\n              <li\n                key={idx}\n                className="flex items-center justify-between p-2 sm:p-3 bg-accent/50 rounded-lg"\n              >\n                <span className="text-xs sm:text-sm text-foreground truncate">\n                  {file.name}\n                </span>\n                <button\n                  onClick={() => removeFile(idx)}\n                  className="p-1 hover:bg-accent rounded transition-colors"\n                >\n                  <X className="h-4 w-4 text-muted-foreground" />\n                </button>\n              </li>\n            ))}\n          </ul>\n        </div>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Upload with Progress",
    description: "File upload with progress indicator",
    style: "classic" as const,
    code: 'import { useState } from "react"\nimport { Upload, CheckCircle2 } from "lucide-react"\n\nexport default function UploadWithProgress() {\n  const [files, setFiles] = useState<File[]>([])\n  const [progress, setProgress] = useState(0)\n  const [uploading, setUploading] = useState(false)\n  const [completed, setCompleted] = useState(false)\n\n  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {\n    if (e.target.files) {\n      setFiles(Array.from(e.target.files))\n    }\n  }\n\n  const handleUpload = async () => {\n    setUploading(true)\n    setProgress(0)\n    const interval = setInterval(() => {\n      setProgress(prev => {\n        if (prev >= 100) {\n          clearInterval(interval)\n          setUploading(false)\n          setCompleted(true)\n          setTimeout(() => {\n            setFiles([])\n            setProgress(0)\n            setCompleted(false)\n          }, 2000)\n          return 100\n        }\n        return prev + Math.random() * 30\n      })\n    }, 300)\n  }\n\n  return (\n    <div className="w-full max-w-md space-y-3 sm:space-y-4 px-2 sm:px-4">\n      <label className="block px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-xs sm:text-sm font-medium text-center">\n        <div className="flex items-center justify-center gap-2">\n          <Upload className="h-4 w-4" />\n          Select Files\n        </div>\n        <input\n          type="file"\n          multiple\n          onChange={handleFileSelect}\n          className="hidden"\n        />\n      </label>\n\n      {files.length > 0 && (\n        <div className="space-y-3 sm:space-y-4">\n          <div className="space-y-2">\n            {files.map((file, idx) => (\n              <div key={idx} className="text-xs sm:text-sm text-foreground truncate">\n                {file.name}\n              </div>\n            ))}\n          </div>\n\n          {uploading || completed ? (\n            <div className="space-y-2">\n              <div className="w-full bg-border rounded-full h-2 overflow-hidden">\n                <div\n                  className="bg-primary h-full transition-all duration-300"\n                  style={{ width: `${progress}%` }}\n                />\n              </div>\n              <div className="flex items-center justify-between">\n                <span className="text-xs text-muted-foreground">\n                  {completed ? "Upload complete" : `${Math.round(progress)}%`}\n                </span>\n                {completed && <CheckCircle2 className="h-4 w-4 text-accent" />}\n              </div>\n            </div>\n          ) : (\n            <button\n              onClick={handleUpload}\n              className="w-full px-3 sm:px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-xs sm:text-sm font-medium"\n            >\n              Upload Files\n            </button>\n          )}\n        </div>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Multiple File Upload",
    description: "Advanced multi-file upload with preview",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { Upload, X, File } from "lucide-react"\n\ninterface UploadedFile {\n  file: File\n  preview?: string\n  size: string\n}\n\nexport default function MultipleFileUpload() {\n  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])\n  const [uploading, setUploading] = useState(false)\n\n  const formatFileSize = (bytes: number) => {\n    if (bytes === 0) return "0 Bytes"\n    const k = 1024\n    const sizes = ["Bytes", "KB", "MB"]\n    const i = Math.floor(Math.log(bytes) / Math.log(k))\n    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]\n  }\n\n  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {\n    if (e.target.files) {\n      const newFiles = Array.from(e.target.files).map(file => ({\n        file,\n        size: formatFileSize(file.size),\n        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined\n      }))\n      setUploadedFiles([...uploadedFiles, ...newFiles])\n    }\n  }\n\n  const removeFile = (idx: number) => {\n    setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))\n  }\n\n  const handleUpload = async () => {\n    setUploading(true)\n    await new Promise(resolve => setTimeout(resolve, 2000))\n    setUploading(false)\n    setUploadedFiles([])\n  }\n\n  return (\n    <div className="w-full max-w-2xl space-y-3 sm:space-y-4 px-2 sm:px-4">\n      <label className="block px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-xs sm:text-sm font-medium text-center">\n        <div className="flex items-center justify-center gap-2">\n          <Upload className="h-4 w-4" />\n          Add Files\n        </div>\n        <input\n          type="file"\n          multiple\n          onChange={handleFileSelect}\n          className="hidden"\n        />\n      </label>\n\n      {uploadedFiles.length > 0 && (\n        <div className="space-y-3 sm:space-y-4">\n          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">\n            {uploadedFiles.map((item, idx) => (\n              <div\n                key={idx}\n                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-accent/50 rounded-lg"\n              >\n                {item.preview ? (\n                  <img\n                    src={item.preview}\n                    alt={item.file.name}\n                    className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded"\n                  />\n                ) : (\n                  <File className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />\n                )}\n                <div className="flex-1 min-w-0">\n                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">\n                    {item.file.name}\n                  </p>\n                  <p className="text-xs text-muted-foreground">{item.size}</p>\n                </div>\n                <button\n                  onClick={() => removeFile(idx)}\n                  className="p-1 hover:bg-accent rounded transition-colors"\n                >\n                  <X className="h-4 w-4 text-muted-foreground" />\n                </button>\n              </div>\n            ))}\n          </div>\n\n          <button\n            onClick={handleUpload}\n            disabled={uploading}\n            className="w-full px-3 sm:px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50"\n          >\n            {uploading ? "Uploading..." : `Upload ${uploadedFiles.length} file(s)`}\n          </button>\n        </div>\n      )}\n    </div>\n  )\n}',
  }
]

export function createFileUploadPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = FILE_UPLOAD_TEMPLATES.map((template) => ({
    id: `file-upload-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['File Upload', 'Drag and Drop', 'Progress Tracking', 'Multiple Files'],
      useCases: ['Document Upload', 'Image Upload', 'Media Management', 'File Sharing'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Drag and drop file upload support',
        'Progress tracking for uploads',
        'Multiple file selection',
        'File preview for images',
        'File size display'
      ]
    })
  }))

  return {
    id: 'file-upload',
    name: 'File Upload',
    description: 'File upload components with various features',
    category: 'forms-input',
    variations,
    tags: ['form', 'upload', 'file', 'drag-drop']
  }
}

export const FILE_UPLOAD_PANEL_WITH_VARIATIONS = createFileUploadPanel()
