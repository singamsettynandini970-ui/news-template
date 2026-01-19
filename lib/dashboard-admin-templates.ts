import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Data Table templates with unique designs
const DATA_TABLE_TEMPLATES = [
  { 
    id: 1, 
    name: "Minimal Grid", 
    style: "minimal" as const, 
    code: `import { Search, Filter, Download, MoreHorizontal } from "lucide-react"
import { useState } from "react"

export default function MinimalGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-01-14" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive", lastLogin: "2024-01-10" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", lastLogin: "2024-01-16" }
  ]
  
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Users</h2>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={"inline-flex px-2 py-1 text-xs font-semibold rounded-full " + (user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 2, 
    name: "Card Layout", 
    style: "modern" as const, 
    code: `import { Search, Plus, Star, Calendar } from "lucide-react"
import { useState } from "react"

export default function CardLayout() {
  const [viewMode, setViewMode] = useState("grid")
  const projects = [
    { id: 1, name: "E-commerce Platform", status: "In Progress", progress: 75, team: 5, deadline: "2024-02-15", priority: "High" },
    { id: 2, name: "Mobile App Redesign", status: "Review", progress: 90, team: 3, deadline: "2024-01-30", priority: "Medium" },
    { id: 3, name: "API Integration", status: "Planning", progress: 25, team: 2, deadline: "2024-03-01", priority: "Low" },
    { id: 4, name: "Dashboard Analytics", status: "Completed", progress: 100, team: 4, deadline: "2024-01-20", priority: "High" }
  ]
  
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
          <p className="text-slate-600 mt-1">Manage your team projects</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex bg-white rounded-xl p-1 border border-slate-200">
          <button 
            onClick={() => setViewMode("grid")}
            className={"px-4 py-2 rounded-lg text-sm font-medium transition-colors " + (viewMode === "grid" ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:text-slate-900")}
          >
            Grid
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={"px-4 py-2 rounded-lg text-sm font-medium transition-colors " + (viewMode === "list" ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:text-slate-900")}
          >
            List
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2">{project.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={"px-2 py-1 text-xs font-medium rounded-full " + 
                    (project.status === "Completed" ? "bg-green-100 text-green-700" :
                     project.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                     project.status === "Review" ? "bg-yellow-100 text-yellow-700" :
                     "bg-gray-100 text-gray-700")}>
                    {project.status}
                  </span>
                  <span className={"px-2 py-1 text-xs font-medium rounded-full " +
                    (project.priority === "High" ? "bg-red-100 text-red-700" :
                     project.priority === "Medium" ? "bg-orange-100 text-orange-700" :
                     "bg-slate-100 text-slate-700")}>
                    {project.priority}
                  </span>
                </div>
              </div>
              <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <Star className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: project.progress + '%' }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{project.deadline}</span>
              </div>
              <span>{project.team} members</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}` 
  },
  { 
    id: 3, 
    name: "Terminal View", 
    style: "classic" as const, 
    code: `import { Terminal, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function TerminalView() {
  const [selectedRow, setSelectedRow] = useState(null)
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-01-14" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive", lastLogin: "2024-01-10" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", lastLogin: "2024-01-16" }
  ]
  
  return (
    <div className="w-full bg-black rounded-lg border border-green-500/30 font-mono shadow-2xl">
      <div className="p-4 border-b border-green-500/30 flex items-center gap-2 text-green-400">
        <Terminal className="h-5 w-5" />
        <span className="text-sm">USER_MANAGEMENT_SYSTEM v2.1.0</span>
        <div className="ml-auto flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="text-green-400 text-xs mb-4">
          <div>&gt; LOADING USER DATABASE...</div>
          <div>&gt; FOUND {data.length} ENTRIES</div>
          <div>&gt; DISPLAYING RESULTS:</div>
        </div>
        
        {data.map((user, idx) => (
          <div 
            key={user.id} 
            onClick={() => setSelectedRow(user.id)}
            className={"p-3 rounded border transition-all cursor-pointer " + 
              (selectedRow === user.id ? "border-green-500 bg-green-500/10" : "border-gray-700 hover:border-green-500/50")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs">&gt;</span>
                <div>
                  <div className="text-white font-bold">{user.name.toUpperCase()}</div>
                  <div className="text-gray-400 text-xs">{user.email}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={"text-xs font-bold " + (user.status === "Active" ? "text-green-400" : "text-red-400")}>
                  [{user.status}]
                </div>
                <div className="text-gray-500 text-xs">{user.role}</div>
              </div>
            </div>
            {selectedRow === user.id && (
              <div className="mt-2 pt-2 border-t border-green-500/30 text-xs text-green-400">
                <div>&gt; LAST_LOGIN: {user.lastLogin}</div>
                <div>&gt; ROLE: {user.role}</div>
                <div>&gt; STATUS: {user.status}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-green-500/30 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>READY</span>
          <span className="text-green-400 animate-pulse">● ONLINE</span>
        </div>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 4, 
    name: "Zebra Striped Table", 
    style: "bold" as const, 
    code: `import { Search, Filter, Download, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { useState } from "react"

export default function ZebraStripedTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState(null)
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-15", score: 95 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-01-14", score: 88 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive", lastLogin: "2024-01-10", score: 72 },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", lastLogin: "2024-01-16", score: 91 }
  ]
  
  return (
    <div className="w-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl border-2 border-purple-200">
      <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-white">USER DIRECTORY</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl font-bold transition-all transform hover:scale-105">
            <Download className="h-5 w-5" />
            EXPORT
          </button>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all font-bold">
            <Filter className="h-5 w-5" />
            FILTER
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600">
            <tr>
              {["Name", "Role", "Status", "Score", "Last Login", "Actions"].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-black text-white uppercase tracking-wider cursor-pointer hover:bg-white/20 transition-colors" onClick={() => setSortField(header)}>
                  <div className="flex items-center gap-2">
                    {header}
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-200">
            {data.map((user, idx) => (
              <tr key={user.id} className={idx % 2 === 0 ? "bg-white" : "bg-purple-50/50 hover:bg-purple-100 transition-colors"}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-3 py-1 text-xs font-black rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={"inline-flex px-3 py-1 text-xs font-black rounded-full " + 
                    (user.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-black text-purple-600">{user.score}</div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: user.score + '%' }} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="p-2 hover:bg-purple-100 rounded-full transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-purple-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}` 
  }
]

// Analytics Card templates with unique designs
const ANALYTICS_CARD_TEMPLATES = [
  { 
    id: 1, 
    name: "Metric Dashboard", 
    style: "minimal" as const, 
    code: `import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from "lucide-react"

export default function MetricDashboard() {
  const metrics = [
    { id: 1, title: "Total Revenue", value: "$45,231", change: "+12.5%", trend: "up", icon: DollarSign, color: "text-green-600", bgColor: "bg-green-50" },
    { id: 2, title: "Active Users", value: "2,345", change: "+8.2%", trend: "up", icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
    { id: 3, title: "Orders", value: "1,234", change: "-3.1%", trend: "down", icon: ShoppingCart, color: "text-orange-600", bgColor: "bg-orange-50" },
    { id: 4, title: "Page Views", value: "98,765", change: "+15.3%", trend: "up", icon: Eye, color: "text-purple-600", bgColor: "bg-purple-50" }
  ]
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const IconComponent = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
        
        return (
          <div key={metric.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={"p-3 rounded-lg " + metric.bgColor}>
                <IconComponent className={"h-6 w-6 " + metric.color} />
              </div>
              <div className={"flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium " + 
                (metric.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                <TrendIcon className="h-3 w-3" />
                {metric.change}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}` 
  },
  { 
    id: 2, 
    name: "Chart Cards", 
    style: "modern" as const, 
    code: `import { BarChart3, PieChart, Activity, Target } from "lucide-react"

export default function ChartCards() {
  const cards = [
    { 
      id: 1, 
      title: "Sales Performance", 
      value: "₹1,24,500", 
      subtitle: "This month", 
      icon: BarChart3,
      gradient: "from-blue-500 to-cyan-500",
      data: [40, 65, 45, 80, 60, 75, 90]
    },
    { 
      id: 2, 
      title: "Conversion Rate", 
      value: "3.24%", 
      subtitle: "Average", 
      icon: Target,
      gradient: "from-purple-500 to-pink-500",
      data: [20, 35, 60, 45, 70, 55, 80]
    },
    { 
      id: 3, 
      title: "User Activity", 
      value: "8,945", 
      subtitle: "Active sessions", 
      icon: Activity,
      gradient: "from-green-500 to-emerald-500",
      data: [30, 50, 35, 75, 45, 85, 65]
    },
    { 
      id: 4, 
      title: "Market Share", 
      value: "23.5%", 
      subtitle: "Industry position", 
      icon: PieChart,
      gradient: "from-orange-500 to-red-500",
      data: [55, 40, 70, 35, 85, 50, 75]
    }
  ]
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const IconComponent = card.icon
        const maxValue = Math.max(...card.data)
        
        return (
          <div key={card.id} className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className={"absolute inset-0 bg-gradient-to-br " + card.gradient + " opacity-5"} />
            
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={"p-3 rounded-xl bg-gradient-to-br " + card.gradient + " shadow-lg"}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                  <div className="text-sm text-gray-500">{card.subtitle}</div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{card.title}</h3>
              
              <div className="flex items-end gap-1 h-12">
                {card.data.map((value, idx) => (
                  <div 
                    key={idx}
                    className={"flex-1 bg-gradient-to-t " + card.gradient + " rounded-sm opacity-70"}
                    style={{ height: (value / maxValue) * 100 + '%' }}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}` 
  },
  { 
    id: 3, 
    name: "Glass Morphism Cards", 
    style: "classic" as const, 
    code: `import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

export default function GlassMorphismCards() {
  const stats = [
    { icon: Users, label: "Active Users", value: "24.5K", trend: "+12%", color: "from-blue-400 to-cyan-400" },
    { icon: DollarSign, label: "Revenue", value: "$89.2K", trend: "+8%", color: "from-green-400 to-emerald-400" },
    { icon: Activity, label: "Engagement", value: "94.3%", trend: "+15%", color: "from-purple-400 to-pink-400" },
    { icon: TrendingUp, label: "Growth", value: "156%", trend: "+23%", color: "from-orange-400 to-red-400" }
  ]
  
  return (
    <div className="relative w-full p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's'
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Analytics Overview</h2>
        
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon
            return (
              <div key={idx} className="relative group">
                <div className={"absolute inset-0 bg-gradient-to-r " + stat.color + " rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity"} />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={"p-3 rounded-xl bg-gradient-to-r " + stat.color}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-green-300 text-sm font-semibold">{stat.trend}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 4, 
    name: "Neon Glow Cards", 
    style: "bold" as const, 
    code: `import { Zap, Target, Rocket, Flame } from "lucide-react"

export default function NeonGlowCards() {
  const metrics = [
    { id: 1, title: "POWER LEVEL", value: "98%", icon: Zap, color: "text-yellow-400", glow: "shadow-yellow-400/50", bg: "from-yellow-500/20 to-orange-500/20" },
    { id: 2, title: "TARGET HIT", value: "156", icon: Target, color: "text-cyan-400", glow: "shadow-cyan-400/50", bg: "from-cyan-500/20 to-blue-500/20" },
    { id: 3, title: "LAUNCH COUNT", value: "2.4K", icon: Rocket, color: "text-purple-400", glow: "shadow-purple-400/50", bg: "from-purple-500/20 to-pink-500/20" },
    { id: 4, title: "FIRE RATE", value: "87%", icon: Flame, color: "text-red-400", glow: "shadow-red-400/50", bg: "from-red-500/20 to-orange-500/20" }
  ]
  
  return (
    <div className="w-full bg-black rounded-3xl p-6 border border-cyan-500/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const IconComponent = metric.icon
          return (
            <div key={metric.id} className="relative group">
              <div className={"absolute inset-0 bg-gradient-to-br " + metric.bg + " rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"} />
              <div className={"relative bg-black/80 border-2 border-current rounded-2xl p-6 " + metric.color + " " + metric.glow + " shadow-2xl group-hover:scale-105 transition-transform"}>
                <div className="flex flex-col items-center text-center">
                  <IconComponent className={"h-10 w-10 mb-4 " + metric.color + " animate-pulse"} />
                  <div className={"text-4xl font-black mb-2 " + metric.color}>{metric.value}</div>
                  <div className={"text-xs font-bold uppercase tracking-wider " + metric.color}>{metric.title}</div>
                </div>
                <div className={"absolute inset-0 border-2 border-current rounded-2xl opacity-20 animate-pulse"} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}` 
  }
]

// Status Indicator templates with unique designs
const STATUS_INDICATOR_TEMPLATES = [
  { 
    id: 1, 
    name: "System Health", 
    style: "minimal" as const, 
    code: `import { CheckCircle, AlertTriangle, XCircle, Clock, Server, Database, Wifi } from "lucide-react"

export default function SystemHealth() {
  const services = [
    { id: 1, name: "API Server", status: "operational", uptime: "99.9%", icon: Server, lastCheck: "2 min ago" },
    { id: 2, name: "Database", status: "operational", uptime: "99.8%", icon: Database, lastCheck: "1 min ago" },
    { id: 3, name: "CDN", status: "degraded", uptime: "98.5%", icon: Wifi, lastCheck: "3 min ago" },
    { id: 4, name: "Payment Gateway", status: "maintenance", uptime: "95.2%", icon: CheckCircle, lastCheck: "5 min ago" }
  ]
  
  const getStatusConfig = (status) => {
    switch (status) {
      case "operational":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500" }
      case "degraded":
        return { icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", dot: "bg-yellow-500" }
      case "maintenance":
        return { icon: Clock, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" }
      default:
        return { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" }
    }
  }
  
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
          <p className="text-sm text-gray-600 mt-1">All systems operational</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-600">Live</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {services.map((service) => {
          const config = getStatusConfig(service.status)
          const ServiceIcon = service.icon
          const StatusIcon = config.icon
          
          return (
            <div key={service.id} className={"flex items-center justify-between p-4 rounded-lg border " + config.bg + " " + config.border}>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ServiceIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <div className={"w-2 h-2 rounded-full " + config.dot} />
                  </div>
                  <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={"flex items-center gap-2 " + config.color}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="font-medium capitalize">{service.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{service.lastCheck}</p>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Overall System Health</span>
          <span className="font-medium text-green-600">98.6% Uptime</span>
        </div>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 2, 
    name: "Progress Bars", 
    style: "modern" as const, 
    code: `import { Server, Database, Wifi, Shield } from "lucide-react"

export default function ProgressBars() {
  const services = [
    { id: 1, name: "API Server", status: "operational", uptime: 99.9, icon: Server, color: "bg-green-500" },
    { id: 2, name: "Database", status: "operational", uptime: 99.8, icon: Database, color: "bg-blue-500" },
    { id: 3, name: "CDN", status: "degraded", uptime: 98.5, icon: Wifi, color: "bg-yellow-500" },
    { id: 4, name: "Security", status: "operational", uptime: 100, icon: Shield, color: "bg-purple-500" }
  ]
  
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Service Status</h2>
        <p className="text-slate-600">Real-time system monitoring</p>
      </div>
      
      <div className="space-y-6">
        {services.map((service) => {
          const IconComponent = service.icon
          return (
            <div key={service.id} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={"p-2 rounded-lg " + service.color + " bg-opacity-10"}>
                    <IconComponent className={"h-5 w-5 " + service.color.replace('bg-', 'text-')} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{service.name}</h3>
                    <p className="text-xs text-slate-500 capitalize">{service.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={"text-2xl font-bold " + service.color.replace('bg-', 'text-')}>{service.uptime}%</div>
                </div>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={"h-full rounded-full transition-all duration-1000 " + service.color}
                  style={{ width: service.uptime + '%' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}` 
  },
  { 
    id: 3, 
    name: "Badge Indicators", 
    style: "classic" as const, 
    code: `import { CheckCircle, AlertTriangle, XCircle, Clock, Activity } from "lucide-react"

export default function BadgeIndicators() {
  const services = [
    { id: 1, name: "Web Server", status: "operational", icon: CheckCircle, color: "green" },
    { id: 2, name: "Database", status: "operational", icon: CheckCircle, color: "green" },
    { id: 3, name: "Cache", status: "degraded", icon: AlertTriangle, color: "yellow" },
    { id: 4, name: "Queue", status: "maintenance", icon: Clock, color: "blue" },
    { id: 5, name: "Storage", status: "operational", icon: CheckCircle, color: "green" }
  ]
  
  const getColorClasses = (color) => {
    switch (color) {
      case "green":
        return { bg: "bg-green-100", text: "text-green-800", border: "border-green-300", icon: "text-green-600" }
      case "yellow":
        return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", icon: "text-yellow-600" }
      case "blue":
        return { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", icon: "text-blue-600" }
      default:
        return { bg: "bg-red-100", text: "text-red-800", border: "border-red-300", icon: "text-red-600" }
    }
  }
  
  return (
    <div className="w-full bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">System Status</h2>
          <p className="text-sm text-gray-600 mt-1">All services monitored</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-300 rounded-full">
          <Activity className="h-4 w-4 text-green-600 animate-pulse" />
          <span className="text-sm font-semibold text-green-800">LIVE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => {
          const colors = getColorClasses(service.color)
          const IconComponent = service.icon
          
          return (
            <div key={service.id} className={"p-4 rounded-lg border-2 " + colors.bg + " " + colors.border}>
              <div className="flex items-center gap-3">
                <IconComponent className={"h-6 w-6 " + colors.icon} />
                <div className="flex-1">
                  <h3 className={"font-semibold " + colors.text}>{service.name}</h3>
                  <p className={"text-xs capitalize " + colors.text + " opacity-75"}>{service.status}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}` 
  },
  { 
    id: 4, 
    name: "Neon Status Grid", 
    style: "bold" as const, 
    code: `import { Zap, Shield, Cpu, Radar, Server, Database } from "lucide-react"

export default function NeonStatusGrid() {
  const services = [
    { label: "POWER", value: "98%", icon: Zap, color: "text-yellow-400", ring: "stroke-yellow-400", status: "OPTIMAL" },
    { label: "SHIELD", value: "100%", icon: Shield, color: "text-blue-400", ring: "stroke-blue-400", status: "ACTIVE" },
    { label: "CORE", value: "87%", icon: Cpu, color: "text-green-400", ring: "stroke-green-400", status: "STABLE" },
    { label: "RADAR", value: "92%", icon: Radar, color: "text-purple-400", ring: "stroke-purple-400", status: "ONLINE" },
    { label: "SERVER", value: "95%", icon: Server, color: "text-cyan-400", ring: "stroke-cyan-400", status: "READY" },
    { label: "DATA", value: "89%", icon: Database, color: "text-pink-400", ring: "stroke-pink-400", status: "SYNCED" }
  ]
  
  return (
    <div className="relative w-full bg-black rounded-3xl p-8 border border-cyan-500/30 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
        {Array.from({ length: 30 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-px h-px bg-cyan-400/30"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: \`twinkle \${Math.random() * 3 + 1}s infinite\`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            ◊ SYSTEM STATUS ◊
          </h1>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const IconComponent = service.icon
            const percentage = parseInt(service.value)
            
            return (
              <div key={idx} className="relative flex flex-col items-center group">
                <div className="relative w-20 h-20 mb-3">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="32" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none" 
                      className="text-gray-700"
                    />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="32" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none" 
                      strokeDasharray={\`\${percentage * 2.01} 201\`}
                      className={service.ring}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className={"h-8 w-8 " + service.color + " group-hover:animate-pulse"} />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={"text-xl font-bold " + service.color}>{service.value}</div>
                  <div className="text-xs text-gray-400 tracking-wider mb-1">{service.label}</div>
                  <div className={"text-xs font-bold " + service.color}>{service.status}</div>
                </div>
                
                <div className="absolute -inset-2 border border-current opacity-20 rounded-lg group-hover:opacity-40 transition-opacity" style={{ borderColor: service.color.replace('text-', '') }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}` 
  }
]

// Action Button templates with unique designs
const ACTION_BUTTON_TEMPLATES = [
  { 
    id: 1, 
    name: "Command Palette", 
    style: "modern" as const, 
    code: `import { Plus, Download, Upload, Settings, Share2, Trash2, Edit, Copy } from "lucide-react"
import { useState } from "react"

export default function CommandPalette() {
  const [activeAction, setActiveAction] = useState(null)
  
  const primaryActions = [
    { id: 1, label: "Create New", icon: Plus, color: "bg-blue-600 hover:bg-blue-700", shortcut: "⌘N" },
    { id: 2, label: "Upload File", icon: Upload, color: "bg-green-600 hover:bg-green-700", shortcut: "⌘U" },
    { id: 3, label: "Download", icon: Download, color: "bg-purple-600 hover:bg-purple-700", shortcut: "⌘D" }
  ]
  
  const secondaryActions = [
    { id: 4, label: "Edit", icon: Edit, color: "bg-gray-600 hover:bg-gray-700" },
    { id: 5, label: "Copy", icon: Copy, color: "bg-gray-600 hover:bg-gray-700" },
    { id: 6, label: "Share", icon: Share2, color: "bg-gray-600 hover:bg-gray-700" },
    { id: 7, label: "Settings", icon: Settings, color: "bg-gray-600 hover:bg-gray-700" },
    { id: 8, label: "Delete", icon: Trash2, color: "bg-red-600 hover:bg-red-700" }
  ]
  
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Quick Actions</h2>
          <p className="text-slate-600">Streamline your workflow with keyboard shortcuts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {primaryActions.map((action) => {
            const IconComponent = action.icon
            return (
              <button
                key={action.id}
                onClick={() => setActiveAction(action.id)}
                className={"relative group p-6 rounded-2xl text-white font-semibold transition-all duration-300 transform hover:scale-105 " + action.color}
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className="h-6 w-6" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-lg">{action.shortcut}</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">{action.label}</h3>
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )
          })}
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">More Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {secondaryActions.map((action) => {
              const IconComponent = action.icon
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveAction(action.id)}
                  className={"flex items-center gap-3 p-3 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105 " + action.color}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
        
        {activeAction && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-800 font-medium">
              Action triggered: {[...primaryActions, ...secondaryActions].find(a => a.id === activeAction)?.label}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}` 
  },
  { 
    id: 2, 
    name: "Floating Action Menu", 
    style: "minimal" as const, 
    code: `import { Plus, X, Edit, Trash2, Share2, Download } from "lucide-react"
import { useState } from "react"

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)
  
  const actions = [
    { id: 1, label: "Edit", icon: Edit, color: "bg-blue-500" },
    { id: 2, label: "Share", icon: Share2, color: "bg-green-500" },
    { id: 3, label: "Download", icon: Download, color: "bg-purple-500" },
    { id: 4, label: "Delete", icon: Trash2, color: "bg-red-500" }
  ]
  
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <div className="relative">
        {isOpen && actions.map((action, idx) => {
          const IconComponent = action.icon
          const angle = (idx * 90) - 45
          const radius = 80
          const x = Math.cos(angle * Math.PI / 180) * radius
          const y = Math.sin(angle * Math.PI / 180) * radius
          
          return (
            <button
              key={action.id}
              onClick={() => setIsOpen(false)}
              className={"absolute w-12 h-12 rounded-full text-white shadow-lg transform transition-all duration-300 hover:scale-110 " + action.color}
              style={{
                transform: \`translate(\${x}px, \${y}px) scale(\${isOpen ? 1 : 0})\`,
                transitionDelay: idx * 50 + 'ms'
              }}
            >
              <IconComponent className="h-5 w-5 mx-auto" />
            </button>
          )
        })}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gray-800 text-white rounded-full shadow-xl flex items-center justify-center transform transition-transform hover:scale-110 z-10"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 3, 
    name: "Toolbar Buttons", 
    style: "classic" as const, 
    code: `import { Save, Undo, Redo, Print, Settings, HelpCircle } from "lucide-react"
import { useState } from "react"

export default function ToolbarButtons() {
  const [activeButton, setActiveButton] = useState(null)
  
  const buttons = [
    { id: 1, label: "Save", icon: Save, color: "bg-blue-600 hover:bg-blue-700", shortcut: "Ctrl+S" },
    { id: 2, label: "Undo", icon: Undo, color: "bg-gray-600 hover:bg-gray-700", shortcut: "Ctrl+Z" },
    { id: 3, label: "Redo", icon: Redo, color: "bg-gray-600 hover:bg-gray-700", shortcut: "Ctrl+Y" },
    { id: 4, label: "Print", icon: Print, color: "bg-gray-600 hover:bg-gray-700", shortcut: "Ctrl+P" },
    { id: 5, label: "Settings", icon: Settings, color: "bg-gray-600 hover:bg-gray-700" },
    { id: 6, label: "Help", icon: HelpCircle, color: "bg-gray-600 hover:bg-gray-700" }
  ]
  
  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <div className="flex items-center gap-2 flex-wrap">
        {buttons.map((button) => {
          const IconComponent = button.icon
          return (
            <button
              key={button.id}
              onClick={() => setActiveButton(button.id)}
              className={"flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all " + 
                (activeButton === button.id ? "ring-2 ring-offset-2 ring-blue-500" : "") + " " + button.color}
            >
              <IconComponent className="h-4 w-4" />
              <span className="text-sm">{button.label}</span>
              {button.shortcut && (
                <span className="text-xs opacity-75 ml-1">({button.shortcut})</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}` 
  },
  { 
    id: 4, 
    name: "Neon Action Grid", 
    style: "bold" as const, 
    code: `import { Zap, Rocket, Flame, Target, Shield, Star } from "lucide-react"
import { useState } from "react"

export default function NeonActionGrid() {
  const [activeAction, setActiveAction] = useState(null)
  
  const actions = [
    { id: 1, label: "POWER UP", icon: Zap, gradient: "from-yellow-400 to-orange-500", glow: "shadow-yellow-400/50" },
    { id: 2, label: "LAUNCH", icon: Rocket, gradient: "from-purple-400 to-pink-500", glow: "shadow-purple-400/50" },
    { id: 3, label: "BURN", icon: Flame, gradient: "from-red-400 to-orange-500", glow: "shadow-red-400/50" },
    { id: 4, label: "TARGET", icon: Target, gradient: "from-cyan-400 to-blue-500", glow: "shadow-cyan-400/50" },
    { id: 5, label: "SHIELD", icon: Shield, gradient: "from-green-400 to-emerald-500", glow: "shadow-green-400/50" },
    { id: 6, label: "STAR", icon: Star, gradient: "from-indigo-400 to-purple-500", glow: "shadow-indigo-400/50" }
  ]
  
  return (
    <div className="w-full bg-black rounded-3xl p-8 border border-cyan-500/30">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
          ACTION CENTER
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {actions.map((action) => {
          const IconComponent = action.icon
          return (
            <button
              key={action.id}
              onClick={() => setActiveAction(action.id)}
              className={"relative group p-6 rounded-2xl border-2 border-current overflow-hidden transition-all transform hover:scale-105 " + 
                action.gradient.replace('from-', 'from-').replace('to-', 'to-') + " " + action.glow + " shadow-2xl"}
            >
              <div className={"absolute inset-0 bg-gradient-to-br " + action.gradient + " opacity-20 group-hover:opacity-30 transition-opacity"} />
              <div className={"relative text-transparent bg-clip-text bg-gradient-to-r " + action.gradient}>
                <IconComponent className={"h-10 w-10 mx-auto mb-3 " + action.gradient.replace('from-', 'text-').split(' ')[0]} />
                <div className={"text-lg font-black " + action.gradient.replace('from-', 'text-').split(' ')[0]}>
                  {action.label}
                </div>
              </div>
              {activeAction === action.id && (
                <div className="absolute inset-0 border-2 border-current rounded-2xl animate-pulse" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}` 
  }
]

// Settings Panel templates with unique designs
const SETTINGS_PANEL_TEMPLATES = [
  { 
    id: 1, 
    name: "Preference Center", 
    style: "minimal" as const, 
    code: `import { Bell, Shield, Palette, Globe, User, Moon, Sun } from "lucide-react"
import { useState } from "react"

export default function PreferenceCenter() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
    privacy: "friends",
    autoSave: true,
    emailUpdates: false
  })
  
  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const settingSections = [
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { key: "notifications", label: "Push Notifications", description: "Receive notifications on your device" },
        { key: "emailUpdates", label: "Email Updates", description: "Get updates via email" }
      ]
    },
    {
      title: "Appearance",
      icon: Palette,
      items: [
        { key: "darkMode", label: "Dark Mode", description: "Use dark theme across the app" }
      ]
    },
    {
      title: "Privacy",
      icon: Shield,
      items: [
        { key: "autoSave", label: "Auto Save", description: "Automatically save your work" }
      ]
    }
  ]
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            <p className="text-sm text-gray-600">Manage your preferences</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        {settingSections.map((section) => {
          const SectionIcon = section.icon
          return (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-4">
                <SectionIcon className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => toggleSetting(item.key)}
                      className={"relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + 
                        (settings[item.key] ? "bg-blue-600" : "bg-gray-300")}
                    >
                      <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + 
                        (settings[item.key] ? "translate-x-6" : "translate-x-1")} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        
        <div className="pt-6 border-t border-gray-200">
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
              Reset to Default
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 2, 
    name: "Tabbed Settings", 
    style: "modern" as const, 
    code: `import { Bell, Shield, Palette, User, Settings } from "lucide-react"
import { useState } from "react"

export default function TabbedSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true
  })
  
  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "privacy", label: "Privacy", icon: Shield }
  ]
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-sm text-gray-600">Customize your experience</p>
          </div>
        </div>
        
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2 border-b-2 transition-colors " +
                  (activeTab === tab.id 
                    ? "border-blue-600 text-blue-600 font-semibold" 
                    : "border-transparent text-gray-600 hover:text-gray-900")}
              >
                <TabIcon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === "general" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-900">Auto Save</h4>
                <p className="text-sm text-gray-600">Automatically save your work</p>
              </div>
              <button
                onClick={() => toggleSetting("autoSave")}
                className={"relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + 
                  (settings.autoSave ? "bg-blue-600" : "bg-gray-300")}
              >
                <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + 
                  (settings.autoSave ? "translate-x-6" : "translate-x-1")} />
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-900">Push Notifications</h4>
                <p className="text-sm text-gray-600">Receive notifications on your device</p>
              </div>
              <button
                onClick={() => toggleSetting("notifications")}
                className={"relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + 
                  (settings.notifications ? "bg-blue-600" : "bg-gray-300")}
              >
                <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + 
                  (settings.notifications ? "translate-x-6" : "translate-x-1")} />
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "appearance" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-600">Use dark theme across the app</p>
              </div>
              <button
                onClick={() => toggleSetting("darkMode")}
                className={"relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + 
                  (settings.darkMode ? "bg-blue-600" : "bg-gray-300")}
              >
                <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + 
                  (settings.darkMode ? "translate-x-6" : "translate-x-1")} />
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "privacy" && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-semibold text-blue-900 mb-2">Privacy Settings</h4>
              <p className="text-sm text-blue-700">Your privacy is important to us</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}` 
  },
  { 
    id: 3, 
    name: "Sidebar Settings", 
    style: "classic" as const, 
    code: `import { Bell, Shield, Palette, User, Save } from "lucide-react"
import { useState } from "react"

export default function SidebarSettings() {
  const [activeSection, setActiveSection] = useState("profile")
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true
  })
  
  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Shield }
  ]
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex">
        <div className="w-64 border-r border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
          <nav className="space-y-2">
            {sections.map((section) => {
              const SectionIcon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={"w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors " +
                    (activeSection === section.id 
                      ? "bg-blue-100 text-blue-700 font-semibold" 
                      : "text-gray-700 hover:bg-gray-100")}
                >
                  <SectionIcon className="h-5 w-5" />
                  <span>{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
        
        <div className="flex-1 p-6">
          {activeSection === "profile" && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" defaultValue="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" defaultValue="john@example.com" />
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "notifications" && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Receive notifications on your device</p>
                  </div>
                  <button
                    onClick={() => toggleSetting("notifications")}
                    className={"relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + 
                      (settings.notifications ? "bg-blue-600" : "bg-gray-300")}
                  >
                    <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + 
                      (settings.notifications ? "translate-x-6" : "translate-x-1")} />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "appearance" && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Appearance Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Dark Mode</h4>
                    <p className="text-sm text-gray-600">Use dark theme across the app</p>
                  </div>
                  <button
                    onClick={() => toggleSetting("darkMode")}
                    className={"relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + 
                      (settings.darkMode ? "bg-blue-600" : "bg-gray-300")}
                  >
                    <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + 
                      (settings.darkMode ? "translate-x-6" : "translate-x-1")} />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "security" && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Change Password</h4>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Save className="h-4 w-4" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 4, 
    name: "Neon Control Panel", 
    style: "bold" as const, 
    code: `import { Zap, Shield, Eye, Cpu, Settings } from "lucide-react"
import { useState } from "react"

export default function NeonControlPanel() {
  const [settings, setSettings] = useState({
    power: true,
    shield: true,
    vision: false,
    core: true
  })
  
  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const controls = [
    { key: "power", label: "POWER SYSTEM", icon: Zap, color: "yellow", gradient: "from-yellow-400 to-orange-500" },
    { key: "shield", label: "SHIELD GENERATOR", icon: Shield, color: "blue", gradient: "from-blue-400 to-cyan-500" },
    { key: "vision", label: "NIGHT VISION", icon: Eye, color: "green", gradient: "from-green-400 to-emerald-500" },
    { key: "core", label: "CORE SYSTEM", icon: Cpu, color: "purple", gradient: "from-purple-400 to-pink-500" }
  ]
  
  return (
    <div className="w-full bg-black rounded-3xl p-8 border border-cyan-500/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
      {Array.from({ length: 20 }, (_, i) => (
        <div 
          key={i}
          className="absolute w-px h-px bg-cyan-400/30"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: \`twinkle \${Math.random() * 3 + 1}s infinite\`
          }}
        />
      ))}
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="h-8 w-8 text-cyan-400" />
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            CONTROL PANEL
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {controls.map((control) => {
            const IconComponent = control.icon
            const isActive = settings[control.key]
            
            return (
              <div 
                key={control.key}
                className={"relative p-6 rounded-2xl border-2 transition-all " + 
                  (isActive ? "border-current bg-gradient-to-br " + control.gradient + " bg-opacity-20" : "border-gray-700 bg-gray-900/50")}
                style={{ borderColor: isActive ? control.color.replace('yellow', '#facc15').replace('blue', '#3b82f6').replace('green', '#22c55e').replace('purple', '#a855f7') : undefined }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className={"h-8 w-8 " + (isActive ? "text-" + control.color + "-400" : "text-gray-600")} />
                    <div>
                      <h3 className={"font-bold text-lg " + (isActive ? "text-" + control.color + "-400" : "text-gray-400")}>
                        {control.label}
                      </h3>
                      <p className={"text-xs " + (isActive ? "text-" + control.color + "-300" : "text-gray-500")}>
                        {isActive ? "ACTIVE" : "INACTIVE"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting(control.key)}
                    className={"relative inline-flex h-8 w-14 items-center rounded-full transition-colors " + 
                      (isActive ? "bg-" + control.color + "-500" : "bg-gray-700")}
                  >
                    <span className={"inline-block h-6 w-6 transform rounded-full bg-white transition-transform " + 
                      (isActive ? "translate-x-7" : "translate-x-1")} />
                  </button>
                </div>
                
                {isActive && (
                  <div className={"h-1 bg-gradient-to-r " + control.gradient + " rounded-full animate-pulse"} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}` 
  }
]

function createDashboardPanel(id: string, name: string, templates: any[]): ExtendedPanel {
  const variations: TemplateVariation[] = templates.map((template) => ({
    id: `${id}-${template.style}-${template.id}`,
    name: template.name,
    description: `${name} - ${template.name} variation`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: [name, 'Responsive', 'Interactive'],
      useCases: ['Dashboard', 'Admin Panel', 'Analytics'],
      dependencies: [...COMMON_DEPENDENCIES.core]
    })
  }))

  return {
    id,
    name,
    description: `${name} component templates`,
    category: 'dashboard-admin',
    variations,
    tags: ['dashboard', 'admin', 'analytics']
  }
}

// Dashboard Widget templates with unique designs
const DASHBOARD_WIDGET_TEMPLATES = [
  { 
    id: 1, 
    name: "Neon Terminal", 
    style: "minimal" as const, 
    code: `import { Terminal, Cpu, HardDrive, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export default function NeonTerminal() {
  const [activeMetric, setActiveMetric] = useState(0)
  const metrics = [
    { label: "CPU_USAGE", value: "67%", status: "OPTIMAL", color: "text-green-400" },
    { label: "MEMORY", value: "4.2GB", status: "NORMAL", color: "text-cyan-400" },
    { label: "DISK_IO", value: "1.8MB/s", status: "HIGH", color: "text-yellow-400" },
    { label: "NETWORK", value: "245KB/s", status: "ACTIVE", color: "text-purple-400" }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="bg-black rounded-2xl p-6 font-mono border border-green-500/30 shadow-2xl">
      <div className="flex items-center gap-2 mb-6 text-green-400">
        <Terminal className="h-5 w-5" />
        <span className="text-sm">SYSTEM_MONITOR v2.1.0</span>
        <div className="ml-auto flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>
      
      <div className="space-y-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className={"flex items-center justify-between p-3 rounded border transition-all " + (idx === activeMetric ? "border-green-500/50 bg-green-500/10" : "border-gray-700")}>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs">></span>
              <span className={"font-bold " + metric.color}>{metric.label}</span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{metric.value}</div>
              <div className={"text-xs " + metric.color}>[{metric.status}]</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>UPTIME: 127d 14h 32m</span>
          <span className="text-green-400 animate-pulse">● ONLINE</span>
        </div>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 2, 
    name: "Glass Morphism", 
    style: "modern" as const, 
    code: `import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

export default function GlassMorphism() {
  const stats = [
    { icon: Users, label: "Active Users", value: "24.5K", trend: "+12%", color: "from-blue-400 to-cyan-400" },
    { icon: DollarSign, label: "Revenue", value: "$89.2K", trend: "+8%", color: "from-green-400 to-emerald-400" },
    { icon: Activity, label: "Engagement", value: "94.3%", trend: "+15%", color: "from-purple-400 to-pink-400" },
    { icon: TrendingUp, label: "Growth", value: "156%", trend: "+23%", color: "from-orange-400 to-red-400" }
  ]
  
  return (
    <div className="relative p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's'
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Analytics Overview</h2>
        
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon
            return (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r " + stat.color + " rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={"p-3 rounded-xl bg-gradient-to-r " + stat.color}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-green-300 text-sm font-semibold">{stat.trend}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 3, 
    name: "Retro CRT Monitor", 
    style: "classic" as const, 
    code: `import { Monitor, Wifi, Battery, Signal } from "lucide-react"
import { useState, useEffect } from "react"

export default function RetroCRTMonitor() {
  const [scanline, setScanline] = useState(0)
  const [flicker, setFlicker] = useState(false)
  
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanline(prev => (prev + 1) % 100)
    }, 50)
    
    const flickerInterval = setInterval(() => {
      setFlicker(true)
      setTimeout(() => setFlicker(false), 100)
    }, 3000)
    
    return () => {
      clearInterval(scanInterval)
      clearInterval(flickerInterval)
    }
  }, [])
  
  const systems = [
    { name: "MAINFRAME_01", status: "ONLINE", load: "67%", color: "text-green-400" },
    { name: "DATABASE_SRV", status: "ACTIVE", load: "89%", color: "text-yellow-400" },
    { name: "WEB_SERVER", status: "STABLE", load: "45%", color: "text-cyan-400" },
    { name: "BACKUP_SYS", status: "IDLE", load: "12%", color: "text-gray-400" }
  ]
  
  return (
    <div className="bg-gray-900 rounded-3xl p-8 border-8 border-gray-700 shadow-2xl relative overflow-hidden">
      <div className={"absolute inset-0 bg-green-500/5 " + (flicker ? "animate-pulse" : "")} />
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30 transition-all duration-75" style={{ transform: \`translateY(\${scanline * 4}px)\` }} />
      
      <div className="relative z-10 font-mono">
        <div className="flex items-center justify-between mb-6 text-green-400">
          <div className="flex items-center gap-2">
            <Monitor className="h-6 w-6" />
            <span className="text-lg font-bold">SYSTEM TERMINAL</span>
          </div>
          <div className="text-xs">
            <span className="animate-pulse">█</span> 1987
          </div>
        </div>
        
        <div className="bg-black/50 rounded-lg p-4 border border-green-500/30">
          <div className="text-green-400 text-sm mb-4">
            > SYSTEM STATUS REPORT
            <br />
            > TIMESTAMP: {new Date().toLocaleTimeString()}
            <br />
            > SCANNING ACTIVE PROCESSES...
          </div>
          
          <div className="space-y-2">
            {systems.map((system, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">></span>
                  <span className={system.color}>{system.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white">{system.load}</span>
                  <span className={"px-2 py-1 rounded text-xs " + system.color + " border border-current"}>\n                    {system.status}\n                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-green-500/30 text-xs text-green-400">
            <div className="flex justify-between">
              <span>MEMORY: 640KB FREE</span>
              <span>DISK: 1.44MB AVAILABLE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}` 
  },
  { 
    id: 4, 
    name: "Holographic HUD", 
    style: "bold" as const, 
    code: `import { Zap, Shield, Cpu, Radar } from "lucide-react"
import { useState, useEffect } from "react"

export default function HolographicHUD() {
  const [rotation, setRotation] = useState(0)
  const [pulse, setPulse] = useState(false)
  
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotation(prev => prev + 1)
    }, 100)
    
    const pulseInterval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 500)
    }, 2000)
    
    return () => {
      clearInterval(rotateInterval)
      clearInterval(pulseInterval)
    }
  }, [])
  
  const metrics = [
    { label: "POWER", value: "98%", icon: Zap, color: "text-yellow-400", ring: "stroke-yellow-400" },
    { label: "SHIELD", value: "100%", icon: Shield, color: "text-blue-400", ring: "stroke-blue-400" },
    { label: "CORE", value: "87%", icon: Cpu, color: "text-green-400", ring: "stroke-green-400" },
    { label: "RADAR", value: "92%", icon: Radar, color: "text-purple-400", ring: "stroke-purple-400" }
  ]
  
  return (
    <div className="relative bg-black rounded-3xl p-8 border border-cyan-500/30 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
        <div className="absolute inset-0">
          {Array.from({ length: 50 }, (_, i) => (
            <div 
              key={i}
              className="absolute w-px h-px bg-cyan-400/30"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: \`twinkle \${Math.random() * 3 + 1}s infinite\`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className={"text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 " + (pulse ? "animate-pulse" : "")}>
            ◊ HOLOGRAPHIC HUD ◊
          </h1>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          {metrics.map((metric, idx) => {
            const IconComponent = metric.icon
            const percentage = parseInt(metric.value)
            
            return (
              <div key={idx} className="relative flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  <svg className="w-full h-full transform -rotate-90" style={{ transform: \`rotate(\${rotation + idx * 90}deg)\` }}>
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none" 
                      className="text-gray-700"
                    />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeDasharray={\`\${percentage * 2.51} 251\`}
                      className={metric.ring}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className={"h-8 w-8 " + metric.color} />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={"text-2xl font-bold " + metric.color}>{metric.value}</div>
                  <div className="text-xs text-gray-400 tracking-wider">{metric.label}</div>
                </div>
                
                <div className="absolute -inset-2 border border-current opacity-20 rounded-lg" style={{ borderColor: metric.color.replace('text-', '') }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}` 
  }
]

export const DASHBOARD_WIDGET_PANEL_WITH_VARIATIONS = createDashboardPanel('dashboard-widget', 'Dashboard Widget', DASHBOARD_WIDGET_TEMPLATES)
export const DATA_TABLE_PANEL_WITH_VARIATIONS = createDashboardPanel('data-table', 'Data Table', DATA_TABLE_TEMPLATES)
export const ANALYTICS_CARD_PANEL_WITH_VARIATIONS = createDashboardPanel('analytics-card', 'Analytics Card', ANALYTICS_CARD_TEMPLATES)
export const STATUS_INDICATOR_PANEL_WITH_VARIATIONS = createDashboardPanel('status-indicator', 'Status Indicator', STATUS_INDICATOR_TEMPLATES)
export const ACTION_BUTTON_PANEL_WITH_VARIATIONS = createDashboardPanel('action-button', 'Action Button', ACTION_BUTTON_TEMPLATES)
export const SETTINGS_PANEL_PANEL_WITH_VARIATIONS = createDashboardPanel('settings-panel', 'Settings Panel', SETTINGS_PANEL_TEMPLATES)