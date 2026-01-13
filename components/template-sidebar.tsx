"use client"

import { useState, useMemo, memo, useCallback } from "react"
import {
  Search,
  ChevronDown,
  ChevronRight,
  Layers,
  PanelLeftClose,
  PanelLeft,
  Navigation,
  Monitor,
  Newspaper,
  Edit,
  Video,
  FolderTree,
  FileText,
  Users,
  Radio,
  Calendar,
  DollarSign,
  Mail,
  Building,
  ShoppingCart,
  Layout,
  Star,
  Settings,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { EXTENDED_TEMPLATE_PANELS, TEMPLATE_REGISTRY } from "@/lib/template-data"

interface Panel {
  id: string
  name: string
  subPanels: string[]
}

const TEMPLATE_PANELS: Panel[] = EXTENDED_TEMPLATE_PANELS

interface TemplateSidebarProps {
  onSelectItem: (item: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const CATEGORY_ICONS: Record<string, any> = {
  navigation: Navigation,
  "user-interface": Monitor,
  "news-content": Newspaper,
  editorial: Edit,
  media: Video,
  "content-organization": FolderTree,
  article: FileText,
  engagement: Users,
  "live-features": Radio,
  "special-events": Calendar,
  monetization: DollarSign,
  "user-tools": Mail,
  corporate: Building,
  admin: Monitor,
  "content-display": Layout,
  "forms-input": Edit,
  "media-gallery": Video,
  ecommerce: ShoppingCart,
  "social-engagement": Users,
  "business-corporate": Building,
  "dashboard-admin": Settings,
  "marketing-promotion": Star,
}

// Memoized sub-panel item for performance
interface SubPanelItemProps {
  subPanel: string
  isSelected: boolean
  onSelect: (item: string) => void
}

const SubPanelItem = memo(({ subPanel, isSelected, onSelect }: SubPanelItemProps) => (
  <button
    onClick={() => onSelect(subPanel)}
    className={cn(
      "block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors",
      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      isSelected
        ? "bg-primary text-primary-foreground font-medium"
        : "text-sidebar-foreground",
    )}
  >
    {subPanel}
  </button>
))
SubPanelItem.displayName = "SubPanelItem"

// Memoized panel item for performance
interface PanelItemProps {
  panel: Panel
  isExpanded: boolean
  isCollapsed: boolean
  selectedItem: string | null
  onToggle: (panelId: string) => void
  onSelectItem: (item: string) => void
}

const PanelItem = memo(({ panel, isExpanded, isCollapsed, selectedItem, onToggle, onSelectItem }: PanelItemProps) => {
  const IconComponent = CATEGORY_ICONS[panel.id] || Layers

  return (
    <div className="space-y-1">
      <button
        onClick={() => !isCollapsed && onToggle(panel.id)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isExpanded && !isCollapsed && "bg-sidebar-accent text-sidebar-accent-foreground",
          isCollapsed && "justify-center",
        )}
        title={isCollapsed ? panel.name : undefined}
      >
        {isCollapsed ? (
          <IconComponent className="h-5 w-5 text-sidebar-foreground" />
        ) : (
          <>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <IconComponent className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-left text-sidebar-foreground">{panel.name}</span>
            <span className="text-xs text-muted-foreground">{panel.subPanels.length}</span>
          </>
        )}
      </button>

      {isExpanded && !isCollapsed && (
        <div className="ml-6 space-y-0.5 border-l-2 border-sidebar-border pl-3">
          {panel.subPanels.map((subPanel) => (
            <SubPanelItem
              key={subPanel}
              subPanel={subPanel}
              isSelected={selectedItem === subPanel}
              onSelect={onSelectItem}
            />
          ))}
        </div>
      )}
    </div>
  )
})
PanelItem.displayName = "PanelItem"

export function TemplateSidebar({ onSelectItem, collapsed, onToggleCollapse }: TemplateSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedPanels, setExpandedPanels] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [complexityFilter, setComplexityFilter] = useState<string | null>(null)
  const [responsiveFilter, setResponsiveFilter] = useState(false)

  const filteredPanels = useMemo(() => {
    let panels = TEMPLATE_PANELS

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      panels = panels.map((panel) => ({
        ...panel,
        subPanels: panel.subPanels.filter(
          (sub) => sub.toLowerCase().includes(query) || panel.name.toLowerCase().includes(query),
        ),
      })).filter((panel) => panel.subPanels.length > 0 || panel.name.toLowerCase().includes(query))
    }

    return panels
  }, [searchQuery])

  const togglePanel = useCallback((panelId: string) => {
    setExpandedPanels((prev) => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(panelId)) {
        newExpanded.delete(panelId)
      } else {
        newExpanded.add(panelId)
      }
      return newExpanded
    })
  }, [])

  const handleItemClick = useCallback((item: string) => {
    setSelectedItem(item)
    onSelectItem(item)
  }, [onSelectItem])

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-80",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center border-b border-sidebar-border py-4 transition-all",
          collapsed ? "px-3 justify-center" : "px-6 gap-3",
        )}
      >
        {!collapsed && (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-sidebar-foreground">Templates</h1>
              <p className="text-xs text-muted-foreground">Browse all panels</p>
            </div>
          </>
        )}
        <button
          onClick={onToggleCollapse}
          className={cn(
            "flex items-center justify-center rounded-md p-2 transition-colors hover:bg-sidebar-accent",
            collapsed && "w-full",
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-5 w-5 text-sidebar-foreground" />
          ) : (
            <PanelLeftClose className="h-5 w-5 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Search - only show when expanded */}
      {!collapsed && (
        <div className="border-b border-sidebar-border px-4 py-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search panels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <span>Filters</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          {showFilters && (
            <div className="space-y-2 pt-2 border-t border-sidebar-border">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={responsiveFilter}
                  onChange={(e) => setResponsiveFilter(e.target.checked)}
                  className="rounded"
                />
                <span className="text-muted-foreground">Responsive Only</span>
              </label>
              <div className="text-xs">
                <p className="text-muted-foreground mb-1">Complexity:</p>
                <select
                  value={complexityFilter || ''}
                  onChange={(e) => setComplexityFilter(e.target.value || null)}
                  className="w-full px-2 py-1 text-xs bg-sidebar-accent border border-sidebar-border rounded text-foreground"
                >
                  <option value="">All</option>
                  <option value="simple">Simple</option>
                  <option value="moderate">Moderate</option>
                  <option value="complex">Complex</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {filteredPanels.map((panel) => (
            <PanelItem
              key={panel.id}
              panel={panel}
              isExpanded={expandedPanels.has(panel.id)}
              isCollapsed={collapsed}
              selectedItem={selectedItem}
              onToggle={togglePanel}
              onSelectItem={handleItemClick}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer - only show when expanded */}
      {!collapsed && (
        <div className="border-t border-sidebar-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            {filteredPanels.reduce((acc, panel) => acc + panel.subPanels.length, 0)} panels available
          </p>
          <p className="text-xs text-muted-foreground/70">
            {TEMPLATE_REGISTRY.totalTemplates} total templates ({TEMPLATE_REGISTRY.totalPanels} panels × 4 variations)
          </p>
        </div>
      )}
    </div>
  )
}
