// Modal Dialog templates - Basic, Form, Confirmation, Full Screen
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const MODAL_DIALOG_TEMPLATES = [
  {
    id: 1,
    name: "Basic Modal",
    description: "Simple modal dialog with content",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { X } from "lucide-react"\n\nexport default function BasicModal() {\n  const [isOpen, setIsOpen] = useState(false)\n\n  return (\n    <>\n      <button\n        onClick={() => setIsOpen(true)}\n        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"\n      >\n        Open Modal\n      </button>\n\n      {isOpen && (\n        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">\n          <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full">\n            <div className="flex items-center justify-between p-6 border-b border-border">\n              <h2 className="text-lg font-bold text-foreground">Modal Title</h2>\n              <button\n                onClick={() => setIsOpen(false)}\n                className="p-2 hover:bg-accent rounded-lg transition-colors"\n              >\n                <X className="h-5 w-5 text-foreground" />\n              </button>\n            </div>\n\n            <div className="p-6">\n              <p className="text-sm text-muted-foreground mb-6">\n                This is a basic modal dialog. It displays content in a focused overlay that requires user interaction.\n              </p>\n            </div>\n\n            <div className="flex gap-3 p-6 border-t border-border">\n              <button\n                onClick={() => setIsOpen(false)}\n                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium"\n              >\n                Cancel\n              </button>\n              <button\n                onClick={() => setIsOpen(false)}\n                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"\n              >\n                Confirm\n              </button>\n            </div>\n          </div>\n        </div>\n      )}\n    </>\n  )\n}',
  },
  {
    id: 2,
    name: "Form Modal",
    description: "Modal with form inputs",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { X } from "lucide-react"\n\nexport default function FormModal() {\n  const [isOpen, setIsOpen] = useState(false)\n  const [formData, setFormData] = useState({ name: "", email: "" })\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    setIsOpen(false)\n    setFormData({ name: "", email: "" })\n  }\n\n  return (\n    <>\n      <button\n        onClick={() => setIsOpen(true)}\n        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"\n      >\n        Open Form\n      </button>\n\n      {isOpen && (\n        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">\n          <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full">\n            <div className="flex items-center justify-between p-6 border-b border-border">\n              <h2 className="text-lg font-bold text-foreground">Contact Form</h2>\n              <button\n                onClick={() => setIsOpen(false)}\n                className="p-2 hover:bg-accent rounded-lg transition-colors"\n              >\n                <X className="h-5 w-5 text-foreground" />\n              </button>\n            </div>\n\n            <form onSubmit={handleSubmit} className="p-6 space-y-4">\n              <div>\n                <label className="block text-sm font-medium text-foreground mb-2">\n                  Name\n                </label>\n                <input\n                  type="text"\n                  value={formData.name}\n                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}\n                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n                  placeholder="Your name"\n                />\n              </div>\n              <div>\n                <label className="block text-sm font-medium text-foreground mb-2">\n                  Email\n                </label>\n                <input\n                  type="email"\n                  value={formData.email}\n                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}\n                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n                  placeholder="your@email.com"\n                />\n              </div>\n\n              <div className="flex gap-3 pt-4">\n                <button\n                  type="button"\n                  onClick={() => setIsOpen(false)}\n                  className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium"\n                >\n                  Cancel\n                </button>\n                <button\n                  type="submit"\n                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"\n                >\n                  Submit\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      )}\n    </>\n  )\n}',
  },
  {
    id: 3,
    name: "Confirmation Modal",
    description: "Modal for confirmation dialogs",
    style: "classic" as const,
    code: 'import { useState } from "react"\nimport { AlertCircle } from "lucide-react"\n\nexport default function ConfirmationModal() {\n  const [isOpen, setIsOpen] = useState(false)\n\n  return (\n    <>\n      <button\n        onClick={() => setIsOpen(true)}\n        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"\n      >\n        Delete Item\n      </button>\n\n      {isOpen && (\n        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">\n          <div className="bg-background border border-border rounded-lg shadow-lg max-w-sm w-full">\n            <div className="p-6 text-center">\n              <div className="flex justify-center mb-4">\n                <AlertCircle className="h-12 w-12 text-red-600" />\n              </div>\n              <h2 className="text-lg font-bold text-foreground mb-2">\n                Confirm Delete\n              </h2>\n              <p className="text-sm text-muted-foreground mb-6">\n                Are you sure you want to delete this item? This action cannot be undone.\n              </p>\n\n              <div className="flex gap-3">\n                <button\n                  onClick={() => setIsOpen(false)}\n                  className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium"\n                >\n                  Cancel\n                </button>\n                <button\n                  onClick={() => setIsOpen(false)}\n                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"\n                >\n                  Delete\n                </button>\n              </div>\n            </div>\n          </div>\n        </div>\n      )}\n    </>\n  )\n}',
  },
  {
    id: 4,
    name: "Full Screen Modal",
    description: "Full screen modal dialog",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { X } from "lucide-react"\n\nexport default function FullScreenModal() {\n  const [isOpen, setIsOpen] = useState(false)\n\n  return (\n    <>\n      <button\n        onClick={() => setIsOpen(true)}\n        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"\n      >\n        Open Full Screen\n      </button>\n\n      {isOpen && (\n        <div className="fixed inset-0 bg-background z-50 flex flex-col">\n          <div className="flex items-center justify-between p-6 border-b border-border">\n            <h2 className="text-2xl font-bold text-foreground">\n              Full Screen Modal\n            </h2>\n            <button\n              onClick={() => setIsOpen(false)}\n              className="p-2 hover:bg-accent rounded-lg transition-colors"\n            >\n              <X className="h-6 w-6 text-foreground" />\n            </button>\n          </div>\n\n          <div className="flex-1 overflow-auto p-6">\n            <div className="max-w-4xl mx-auto">\n              <h3 className="text-xl font-semibold text-foreground mb-4">\n                Content Area\n              </h3>\n              <p className="text-muted-foreground mb-4">\n                This is a full-screen modal that takes up the entire viewport. It\'s useful for complex forms, detailed content, or immersive experiences.\n              </p>\n              <div className="grid grid-cols-2 gap-4">\n                {[1, 2, 3, 4].map(i => (\n                  <div key={i} className="p-4 border border-border rounded-lg bg-accent">\n                    <p className="text-sm text-foreground">Content Block {i}</p>\n                  </div>\n                ))}\n              </div>\n            </div>\n          </div>\n\n          <div className="flex gap-3 p-6 border-t border-border">\n            <button\n              onClick={() => setIsOpen(false)}\n              className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium"\n            >\n              Cancel\n            </button>\n            <button\n              onClick={() => setIsOpen(false)}\n              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"\n            >\n              Confirm\n            </button>\n          </div>\n        </div>\n      )}\n    </>\n  )\n}',
  }
]

export function createModalDialogPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = MODAL_DIALOG_TEMPLATES.map((template) => ({
    id: `modal-dialog-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Modal Dialog', 'Focus Management', 'Keyboard Navigation', 'Backdrop'],
      useCases: ['Confirmations', 'Forms', 'Alerts', 'Content Display'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Proper focus management', 'Escape key handling', 'Backdrop click close', 'Accessible dialogs']
    })
  }))

  return {
    id: 'modal-dialog',
    name: 'Modal Dialog',
    description: 'Modal dialog components with various layouts and purposes',
    category: 'content-display',
    variations,
    tags: ['modal', 'dialog', 'content-display', 'interactive']
  }
}

export const MODAL_DIALOG_PANEL_WITH_VARIATIONS = createModalDialogPanel()
