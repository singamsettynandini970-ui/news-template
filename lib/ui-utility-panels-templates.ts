// UI Utility Panels templates - Language, Location, Notification, Theme, Accessibility
// 6 panels × 4 variations = 24 templates

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Language Selector templates
const LANGUAGE_SELECTOR_TEMPLATES = [
  {
    id: 1,
    name: "Dropdown Language Selector",
    description: "Language selection in dropdown menu",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { Globe, ChevronDown } from "lucide-react"\n\nconst LANGUAGES = [\n  { code: "en", name: "English" },\n  { code: "es", name: "Español" },\n  { code: "fr", name: "Français" },\n  { code: "de", name: "Deutsch" },\n  { code: "ja", name: "日本語" },\n]\n\nexport default function DropdownLanguageSelector() {\n  const [isOpen, setIsOpen] = useState(false)\n  const [selected, setSelected] = useState("en")\n\n  const selectedLang = LANGUAGES.find(l => l.code === selected)\n\n  return (\n    <div className="relative w-48">\n      <button\n        onClick={() => setIsOpen(!isOpen)}\n        className="w-full flex items-center justify-between px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors"\n      >\n        <div className="flex items-center gap-2">\n          <Globe className="h-4 w-4" />\n          <span className="text-sm font-medium">{selectedLang?.name}</span>\n        </div>\n        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />\n      </button>\n\n      {isOpen && (\n        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50">\n          <ul className="py-1">\n            {LANGUAGES.map(lang => (\n              <li key={lang.code}>\n                <button\n                  onClick={() => {\n                    setSelected(lang.code)\n                    setIsOpen(false)\n                  }}\n                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${\n                    selected === lang.code\n                      ? "bg-primary text-primary-foreground font-medium"\n                      : "text-foreground hover:bg-accent"\n                  }`}\n                >\n                  {lang.name}\n                </button>\n              </li>\n            ))}\n          </ul>\n        </div>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Flag Language Selector",
    description: "Language selection with flag icons",
    style: "modern" as const,
    code: 'import { useState } from "react"\n\nconst LANGUAGES = [\n  { code: "en", name: "English", flag: "🇺🇸" },\n  { code: "es", name: "Español", flag: "🇪🇸" },\n  { code: "fr", name: "Français", flag: "🇫🇷" },\n  { code: "de", name: "Deutsch", flag: "🇩🇪" },\n  { code: "ja", name: "日本語", flag: "🇯🇵" },\n]\n\nexport default function FlagLanguageSelector() {\n  const [selected, setSelected] = useState("en")\n  const selectedLang = LANGUAGES.find(l => l.code === selected)\n\n  return (\n    <div className="flex gap-2">\n      {LANGUAGES.map(lang => (\n        <button\n          key={lang.code}\n          onClick={() => setSelected(lang.code)}\n          className={`px-3 py-2 rounded-lg transition-colors text-lg ${\n            selected === lang.code\n              ? "bg-primary text-primary-foreground"\n              : "bg-accent hover:bg-accent/80 text-foreground"\n          }`}\n          title={lang.name}\n        >\n          {lang.flag}\n        </button>\n      ))}\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Inline Language Selector",
    description: "Inline language selection with text",
    style: "classic" as const,
    code: 'import { useState } from "react"\n\nconst LANGUAGES = [\n  { code: "en", name: "English" },\n  { code: "es", name: "Español" },\n  { code: "fr", name: "Français" },\n]\n\nexport default function InlineLanguageSelector() {\n  const [selected, setSelected] = useState("en")\n\n  return (\n    <div className="flex items-center gap-1 text-sm">\n      <span className="text-muted-foreground">Language:</span>\n      {LANGUAGES.map((lang, index) => (\n        <div key={lang.code} className="flex items-center">\n          <button\n            onClick={() => setSelected(lang.code)}\n            className={`px-2 py-1 transition-colors ${\n              selected === lang.code\n                ? "text-primary font-medium"\n                : "text-muted-foreground hover:text-foreground"\n            }`}\n          >\n            {lang.name}\n          </button>\n          {index < LANGUAGES.length - 1 && <span className="text-muted-foreground">|</span>}\n        </div>\n      ))}\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Modal Language Selector",
    description: "Language selection in a modal dialog",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { Globe, X } from "lucide-react"\n\nconst LANGUAGES = [\n  { code: "en", name: "English", region: "United States" },\n  { code: "es", name: "Español", region: "España" },\n  { code: "fr", name: "Français", region: "France" },\n  { code: "de", name: "Deutsch", region: "Deutschland" },\n  { code: "ja", name: "日本語", region: "日本" },\n]\n\nexport default function ModalLanguageSelector() {\n  const [isOpen, setIsOpen] = useState(false)\n  const [selected, setSelected] = useState("en")\n\n  return (\n    <>\n      <button\n        onClick={() => setIsOpen(true)}\n        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors"\n      >\n        <Globe className="h-4 w-4" />\n        <span className="text-sm font-medium">Select Language</span>\n      </button>\n\n      {isOpen && (\n        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">\n          <div className="bg-background border border-border rounded-xl shadow-lg max-w-md w-full">\n            <div className="flex items-center justify-between p-6 border-b border-border">\n              <h2 className="text-lg font-bold text-foreground">Select Language</h2>\n              <button\n                onClick={() => setIsOpen(false)}\n                className="p-2 hover:bg-accent rounded-lg transition-colors"\n              >\n                <X className="h-5 w-5 text-foreground" />\n              </button>\n            </div>\n\n            <div className="p-6 space-y-2">\n              {LANGUAGES.map(lang => (\n                <button\n                  key={lang.code}\n                  onClick={() => {\n                    setSelected(lang.code)\n                    setIsOpen(false)\n                  }}\n                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${\n                    selected === lang.code\n                      ? "bg-primary text-primary-foreground"\n                      : "bg-accent hover:bg-accent/80 text-foreground"\n                  }`}\n                >\n                  <div className="font-medium">{lang.name}</div>\n                  <div className="text-sm opacity-75">{lang.region}</div>\n                </button>\n              ))}\n            </div>\n          </div>\n        </div>\n      )}\n    </>\n  )\n}',
  }
]

// Location Selector templates
const LOCATION_SELECTOR_TEMPLATES = [
  {
    id: 1,
    name: "Dropdown Location Selector",
    description: "Location/edition selection in dropdown",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { MapPin, ChevronDown } from "lucide-react"\n\nconst LOCATIONS = [\n  { code: "us", name: "United States" },\n  { code: "uk", name: "United Kingdom" },\n  { code: "ca", name: "Canada" },\n  { code: "au", name: "Australia" },\n  { code: "in", name: "India" },\n]\n\nexport default function DropdownLocationSelector() {\n  const [isOpen, setIsOpen] = useState(false)\n  const [selected, setSelected] = useState("us")\n\n  const selectedLoc = LOCATIONS.find(l => l.code === selected)\n\n  return (\n    <div className="relative w-40 sm:w-48 md:w-56">\n      <button\n        onClick={() => setIsOpen(!isOpen)}\n        className="w-full flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors"\n      >\n        <div className="flex items-center gap-1 sm:gap-2 min-w-0">\n          <MapPin className="h-3 sm:h-4 w-3 sm:w-4 flex-shrink-0" />\n          <span className="text-xs sm:text-sm font-medium truncate">{selectedLoc?.name}</span>\n        </div>\n        <ChevronDown className={`h-3 sm:h-4 w-3 sm:w-4 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />\n      </button>\n\n      {isOpen && (\n        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50">\n          <ul className="py-0.5 sm:py-1">\n            {LOCATIONS.map(loc => (\n              <li key={loc.code}>\n                <button\n                  onClick={() => {\n                    setSelected(loc.code)\n                    setIsOpen(false)\n                  }}\n                  className={`w-full text-left px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors ${\n                    selected === loc.code\n                      ? "bg-primary text-primary-foreground font-medium"\n                      : "text-foreground hover:bg-accent"\n                  }`}\n                >\n                  {loc.name}\n                </button>\n              </li>\n            ))}\n          </ul>\n        </div>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Grid Location Selector",
    description: "Location selection in grid layout",
    style: "modern" as const,
    code: 'import { useState } from "react"\n\nconst LOCATIONS = [\n  { code: "us", name: "USA", emoji: "🇺🇸" },\n  { code: "uk", name: "UK", emoji: "🇬🇧" },\n  { code: "ca", name: "Canada", emoji: "🇨🇦" },\n  { code: "au", name: "Australia", emoji: "🇦🇺" },\n  { code: "in", name: "India", emoji: "🇮🇳" },\n  { code: "sg", name: "Singapore", emoji: "🇸🇬" },\n]\n\nexport default function GridLocationSelector() {\n  const [selected, setSelected] = useState("us")\n\n  return (\n    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">\n      {LOCATIONS.map(loc => (\n        <button\n          key={loc.code}\n          onClick={() => setSelected(loc.code)}\n          className={`p-2 sm:p-3 md:p-4 rounded-lg transition-colors text-center ${\n            selected === loc.code\n              ? "bg-primary text-primary-foreground"\n              : "bg-accent hover:bg-accent/80 text-foreground"\n          }`}\n        >\n          <div className="text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1">{loc.emoji}</div>\n          <div className="text-xs sm:text-sm font-medium">{loc.name}</div>\n        </button>\n      ))}\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Search Location Selector",
    description: "Location selection with search",
    style: "classic" as const,
    code: 'import { useState, useMemo } from "react"\nimport { Search, MapPin } from "lucide-react"\n\nconst LOCATIONS = [\n  "United States", "United Kingdom", "Canada", "Australia",\n  "India", "Singapore", "Japan", "Germany", "France", "Brazil"\n]\n\nexport default function SearchLocationSelector() {\n  const [query, setQuery] = useState("")\n  const [selected, setSelected] = useState("United States")\n\n  const filtered = useMemo(() => {\n    return LOCATIONS.filter(loc =>\n      loc.toLowerCase().includes(query.toLowerCase())\n    )\n  }, [query])\n\n  return (\n    <div className="w-full max-w-xs space-y-1.5 sm:space-y-2">\n      <div className="relative">\n        <input\n          type="text"\n          value={query}\n          onChange={(e) => setQuery(e.target.value)}\n          placeholder="Search location..."\n          className="w-full px-2 sm:px-4 py-1.5 sm:py-2 pl-8 sm:pl-10 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n        />\n        <Search className="absolute left-2 sm:left-3 top-2 sm:top-2.5 h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground" />\n      </div>\n\n      <div className="space-y-0.5 sm:space-y-1 max-h-48 overflow-y-auto">\n        {filtered.map(loc => (\n          <button\n            key={loc}\n            onClick={() => {\n              setSelected(loc)\n              setQuery("")\n            }}\n            className={`w-full text-left px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${\n              selected === loc\n                ? "bg-primary text-primary-foreground font-medium"\n                : "text-foreground hover:bg-accent"\n            }`}\n          >\n            <MapPin className="inline h-3 w-3 mr-1 sm:mr-2" />\n            {loc}\n          </button>\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Compact Location Selector",
    description: "Compact location selection",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { MapPin } from "lucide-react"\n\nconst LOCATIONS = [\n  { code: "us", name: "US", abbr: "USA" },\n  { code: "uk", name: "UK", abbr: "GBR" },\n  { code: "ca", name: "CA", abbr: "CAN" },\n  { code: "au", name: "AU", abbr: "AUS" },\n]\n\nexport default function CompactLocationSelector() {\n  const [selected, setSelected] = useState("us")\n  const selectedLoc = LOCATIONS.find(l => l.code === selected)\n\n  return (\n    <div className="flex items-center gap-1 sm:gap-2">\n      <MapPin className="h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground flex-shrink-0" />\n      <select\n        value={selected}\n        onChange={(e) => setSelected(e.target.value)}\n        className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"\n      >\n        {LOCATIONS.map(loc => (\n          <option key={loc.code} value={loc.code}>\n            {loc.name} ({loc.abbr})\n          </option>\n        ))}\n      </select>\n    </div>\n  )\n}',
  }
]

// Notification Panel templates
const NOTIFICATION_PANEL_TEMPLATES = [
  {
    id: 1,
    name: "Simple Notification Panel",
    description: "Basic notification list",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { Bell, X } from "lucide-react"\n\ninterface Notification {\n  id: string\n  message: string\n  time: string\n  read: boolean\n}\n\nexport default function SimpleNotificationPanel() {\n  const [notifications, setNotifications] = useState<Notification[]>([\n    { id: "1", message: "New message from John", time: "5m ago", read: false },\n    { id: "2", message: "Your order has shipped", time: "1h ago", read: false },\n    { id: "3", message: "Weekly digest ready", time: "2h ago", read: true },\n  ])\n\n  const unreadCount = notifications.filter(n => !n.read).length\n\n  const handleDismiss = (id: string) => {\n    setNotifications(notifications.filter(n => n.id !== id))\n  }\n\n  return (\n    <div className="w-full max-w-sm px-2 sm:px-4">\n      <div className="flex items-center justify-between mb-3 sm:mb-4">\n        <div className="flex items-center gap-2">\n          <Bell className="h-4 sm:h-5 w-4 sm:w-5 text-foreground" />\n          <h3 className="font-semibold text-foreground text-sm sm:text-base">Notifications</h3>\n          {unreadCount > 0 && (\n            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-accent text-accent-foreground text-xs rounded-full font-medium">\n              {unreadCount}\n            </span>\n          )}\n        </div>\n      </div>\n\n      <div className="space-y-1.5 sm:space-y-2">\n        {notifications.map(notif => (\n          <div\n            key={notif.id}\n            className={`p-2 sm:p-3 rounded-lg border transition-colors ${\n              notif.read\n                ? "bg-background border-border"\n                : "bg-primary/10 border-primary/20"\n            }`}\n          >\n            <div className="flex items-start justify-between gap-2">\n              <div className="flex-1 min-w-0">\n                <p className="text-xs sm:text-sm font-medium text-foreground truncate">{notif.message}</p>\n                <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">{notif.time}</p>\n              </div>\n              <button\n                onClick={() => handleDismiss(notif.id)}\n                className="p-1 hover:bg-accent rounded transition-colors flex-shrink-0"\n              >\n                <X className="h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground" />\n              </button>\n            </div>\n          </div>\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Grouped Notification Panel",
    description: "Notifications grouped by type",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { Bell, MessageSquare, Package, AlertCircle } from "lucide-react"\n\ninterface NotificationGroup {\n  type: string\n  icon: any\n  color: string\n  notifications: Array<{ id: string; message: string; time: string }>\n}\n\nexport default function GroupedNotificationPanel() {\n  const [groups] = useState<NotificationGroup[]>([\n    {\n      type: "Messages",\n      icon: MessageSquare,\n      color: "text-primary",\n      notifications: [\n        { id: "1", message: "New message from John", time: "5m ago" },\n      ],\n    },\n    {\n      type: "Orders",\n      icon: Package,\n      color: "text-accent",\n      notifications: [\n        { id: "2", message: "Your order has shipped", time: "1h ago" },\n      ],\n    },\n    {\n      type: "Alerts",\n      icon: AlertCircle,\n      color: "text-secondary",\n      notifications: [\n        { id: "3", message: "Security alert on your account", time: "2h ago" },\n      ],\n    },\n  ])\n\n  return (\n    <div className="w-full max-w-sm space-y-3 sm:space-y-4 px-2 sm:px-4">\n      <div className="flex items-center gap-2 mb-3 sm:mb-4">\n        <Bell className="h-4 sm:h-5 w-4 sm:w-5 text-foreground" />\n        <h3 className="font-semibold text-foreground text-sm sm:text-base">Notifications</h3>\n      </div>\n\n      {groups.map(group => {\n        const Icon = group.icon\n        return (\n          <div key={group.type}>\n            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">\n              <Icon className={`h-3 sm:h-4 w-3 sm:w-4 ${group.color}`} />\n              <h4 className="text-xs sm:text-sm font-medium text-foreground">{group.type}</h4>\n            </div>\n            <div className="space-y-1 sm:space-y-2 ml-4 sm:ml-6">\n              {group.notifications.map(notif => (\n                <div key={notif.id} className="p-1.5 sm:p-2 bg-accent rounded-lg">\n                  <p className="text-xs sm:text-sm text-foreground">{notif.message}</p>\n                  <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">{notif.time}</p>\n                </div>\n              ))}\n            </div>\n          </div>\n        )\n      })}\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Dropdown Notification Panel",
    description: "Notifications in dropdown menu",
    style: "classic" as const,
    code: 'import { useState } from "react"\nimport { Bell } from "lucide-react"\n\nexport default function DropdownNotificationPanel() {\n  const [isOpen, setIsOpen] = useState(false)\n  const [notifications] = useState([\n    { id: "1", message: "New message", time: "5m ago" },\n    { id: "2", message: "Order shipped", time: "1h ago" },\n  ])\n\n  return (\n    <div className="relative">\n      <button\n        onClick={() => setIsOpen(!isOpen)}\n        className="relative p-1.5 sm:p-2 rounded-lg hover:bg-accent transition-colors"\n      >\n        <Bell className="h-5 sm:h-6 w-5 sm:w-6 text-foreground" />\n        {notifications.length > 0 && (\n          <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full" />\n        )}\n      </button>\n\n      {isOpen && (\n        <div className="absolute top-full right-0 mt-2 w-64 sm:w-80 bg-background border border-border rounded-lg shadow-lg z-50">\n          <div className="p-3 sm:p-4 border-b border-border">\n            <h3 className="font-semibold text-foreground text-sm sm:text-base">Notifications</h3>\n          </div>\n          <div className="max-h-96 overflow-y-auto">\n            {notifications.map(notif => (\n              <div key={notif.id} className="p-3 sm:p-4 border-b border-border hover:bg-accent transition-colors cursor-pointer">\n                <p className="text-xs sm:text-sm text-foreground">{notif.message}</p>\n                <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">{notif.time}</p>\n              </div>\n            ))}\n          </div>\n          <div className="p-3 sm:p-4 border-t border-border text-center">\n            <a href="#" className="text-xs sm:text-sm text-primary hover:underline font-medium">\n              View all notifications\n            </a>\n          </div>\n        </div>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Toast Notification Panel",
    description: "Toast-style notifications",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { X, CheckCircle, AlertCircle, Info } from "lucide-react"\n\ninterface Toast {\n  id: string\n  message: string\n  type: "success" | "error" | "info"\n}\n\nexport default function ToastNotificationPanel() {\n  const [toasts, setToasts] = useState<Toast[]>([\n    { id: "1", message: "Operation completed successfully", type: "success" },\n    { id: "2", message: "Please check your input", type: "error" },\n  ])\n\n  const removeToast = (id: string) => {\n    setToasts(toasts.filter(t => t.id !== id))\n  }\n\n  const getIcon = (type: string) => {\n    switch (type) {\n      case "success": return <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-accent" />\n      case "error": return <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 text-secondary" />\n      default: return <Info className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />\n    }\n  }\n\n  return (\n    <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 space-y-1.5 sm:space-y-2 z-50">\n      {toasts.map(toast => (\n        <div\n          key={toast.id}\n          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg shadow-lg animate-in slide-in-from-right"\n        >\n          {getIcon(toast.type)}\n          <p className="text-xs sm:text-sm text-foreground flex-1">{toast.message}</p>\n          <button\n            onClick={() => removeToast(toast.id)}\n            className="p-1 hover:bg-accent rounded transition-colors flex-shrink-0"\n          >\n            <X className="h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground" />\n          </button>\n        </div>\n      ))}\n    </div>\n  )\n}',
  }
]

// Create panel functions
export function createLanguageSelectorPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = LANGUAGE_SELECTOR_TEMPLATES.map((template) => ({
    id: `language-selector-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Language Selection', 'Dropdown', 'State Management'],
      useCases: ['Internationalization', 'Multi-language Support', 'User Preferences'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Simple state management', 'Accessible dropdown', 'Responsive design']
    })
  }))

  return {
    id: 'language-selector',
    name: 'Language Selector',
    description: 'Language selection components for internationalization',
    category: 'user-interface',
    variations,
    tags: ['language', 'i18n', 'selector', 'user-interface']
  }
}

export function createLocationSelectorPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = LOCATION_SELECTOR_TEMPLATES.map((template) => ({
    id: `location-selector-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Location Selection', 'Edition Selector', 'State Management'],
      useCases: ['Regional Content', 'Edition Selection', 'Localization'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Simple state management', 'Multiple layout options', 'Responsive design']
    })
  }))

  return {
    id: 'location-selector',
    name: 'Location Selector',
    description: 'Location and edition selection components',
    category: 'user-interface',
    variations,
    tags: ['location', 'edition', 'selector', 'user-interface']
  }
}

export function createNotificationPanelPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = NOTIFICATION_PANEL_TEMPLATES.map((template) => ({
    id: `notification-panel-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Notification Display', 'State Management', 'Dismissible Items'],
      useCases: ['User Notifications', 'System Alerts', 'Real-time Updates'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['State management for notifications', 'Multiple display styles', 'Dismissible items']
    })
  }))

  return {
    id: 'notification-panel',
    name: 'Notification Panel',
    description: 'Notification display components with various layouts',
    category: 'user-interface',
    variations,
    tags: ['notification', 'alert', 'user-interface', 'interactive']
  }
}

// Export all panels
export const LANGUAGE_SELECTOR_PANEL = createLanguageSelectorPanel()
export const LOCATION_SELECTOR_PANEL = createLocationSelectorPanel()
export const NOTIFICATION_PANEL = createNotificationPanelPanel()
