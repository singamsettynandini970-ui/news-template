// Table Display templates - Simple, Striped, Hover, Sortable
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const TABLE_DISPLAY_TEMPLATES = [
  {
    id: 1,
    name: "Simple Table",
    description: "Basic table display",
    style: "minimal" as const,
    code: 'export default function SimpleTable() {\n  const data = [\n    { id: 1, name: "John", email: "john@example.com", status: "Active" },\n    { id: 2, name: "Jane", email: "jane@example.com", status: "Active" },\n    { id: 3, name: "Bob", email: "bob@example.com", status: "Inactive" },\n  ]\n\n  return (\n    <div className="w-full overflow-x-auto">\n      <table className="w-full text-xs sm:text-sm md:text-base">\n        <thead>\n          <tr className="border-b border-border">\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Name</th>\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Email</th>\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Status</th>\n          </tr>\n        </thead>\n        <tbody>\n          {data.map(row => (\n            <tr key={row.id} className="border-b border-border hover:bg-accent transition-colors">\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-foreground">{row.name}</td>\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-muted-foreground">{row.email}</td>\n              <td className="px-2 sm:px-4 py-2 sm:py-3">\n                <span className={`px-2 py-1 rounded text-xs font-medium ${\n                  row.status === "Active" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"\n                }`}>\n                  {row.status}\n                </span>\n              </td>\n            </tr>\n          ))}\n        </tbody>\n      </table>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Striped Table",
    description: "Table with alternating row colors",
    style: "modern" as const,
    code: 'export default function StripedTable() {\n  const data = [\n    { id: 1, product: "Laptop", price: "$999", quantity: 5 },\n    { id: 2, product: "Mouse", price: "$29", quantity: 15 },\n    { id: 3, product: "Keyboard", price: "$79", quantity: 8 },\n    { id: 4, product: "Monitor", price: "$299", quantity: 3 },\n  ]\n\n  return (\n    <div className="w-full overflow-x-auto">\n      <table className="w-full text-xs sm:text-sm md:text-base">\n        <thead>\n          <tr className="bg-accent border-b border-border">\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Product</th>\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Price</th>\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Quantity</th>\n          </tr>\n        </thead>\n        <tbody>\n          {data.map((row, idx) => (\n            <tr key={row.id} className={`border-b border-border ${\n              idx % 2 === 0 ? "bg-background" : "bg-accent/50"\n            }`}>\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-foreground">{row.product}</td>\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-foreground">{row.price}</td>\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-foreground">{row.quantity}</td>\n            </tr>\n          ))}\n        </tbody>\n      </table>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Hover Table",
    description: "Table with hover effects",
    style: "classic" as const,
    code: 'export default function HoverTable() {\n  const data = [\n    { id: 1, date: "2024-01-15", amount: "$1,200", type: "Invoice" },\n    { id: 2, date: "2024-01-14", amount: "$850", type: "Payment" },\n    { id: 3, date: "2024-01-13", amount: "$2,100", type: "Invoice" },\n  ]\n\n  return (\n    <div className="w-full overflow-x-auto">\n      <table className="w-full text-xs sm:text-sm md:text-base">\n        <thead>\n          <tr className="border-b-2 border-border">\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Date</th>\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Amount</th>\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-foreground">Type</th>\n          </tr>\n        </thead>\n        <tbody>\n          {data.map(row => (\n            <tr\n              key={row.id}\n              className="border-b border-border hover:bg-primary/10 transition-colors cursor-pointer group"\n            >\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-foreground group-hover:font-medium transition-all">{row.date}</td>\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-foreground group-hover:font-medium transition-all">{row.amount}</td>\n              <td className="px-2 sm:px-4 py-2 sm:py-3">\n                <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-primary-foreground">\n                  {row.type}\n                </span>\n              </td>\n            </tr>\n          ))}\n        </tbody>\n      </table>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Sortable Table",
    description: "Table with sortable columns",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { ArrowUpDown } from "lucide-react"\n\nexport default function SortableTable() {\n  const [sortBy, setSortBy] = useState("name")\n  const [sortOrder, setSortOrder] = useState("asc")\n  \n  let data = [\n    { id: 1, name: "Alice", score: 95 },\n    { id: 2, name: "Bob", score: 87 },\n    { id: 3, name: "Charlie", score: 92 },\n  ]\n\n  data = [...data].sort((a, b) => {\n    const aVal = a[sortBy as keyof typeof a]\n    const bVal = b[sortBy as keyof typeof b]\n    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0\n    return sortOrder === "asc" ? cmp : -cmp\n  })\n\n  const toggleSort = (column: string) => {\n    if (sortBy === column) {\n      setSortOrder(sortOrder === "asc" ? "desc" : "asc")\n    } else {\n      setSortBy(column)\n      setSortOrder("asc")\n    }\n  }\n\n  return (\n    <div className="w-full overflow-x-auto">\n      <table className="w-full text-xs sm:text-sm md:text-base">\n        <thead>\n          <tr className="border-b border-border bg-accent">\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3">\n              <button\n                onClick={() => toggleSort("name")}\n                className="flex items-center gap-1 sm:gap-2 font-semibold text-foreground hover:text-primary transition-colors"\n              >\n                Name\n                <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />\n              </button>\n            </th>\n            <th className="text-left px-2 sm:px-4 py-2 sm:py-3">\n              <button\n                onClick={() => toggleSort("score")}\n                className="flex items-center gap-1 sm:gap-2 font-semibold text-foreground hover:text-primary transition-colors"\n              >\n                Score\n                <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />\n              </button>\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          {data.map(row => (\n            <tr key={row.id} className="border-b border-border hover:bg-accent transition-colors">\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-foreground">{row.name}</td>\n              <td className="px-2 sm:px-4 py-2 sm:py-3 text-foreground">{row.score}</td>\n            </tr>\n          ))}\n        </tbody>\n      </table>\n    </div>\n  )\n}',
  }
]

export function createTableDisplayPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = TABLE_DISPLAY_TEMPLATES.map((template) => ({
    id: `table-display-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Table Display', 'Sorting', 'Responsive', 'Status Indicators'],
      useCases: ['Data Display', 'Reports', 'Lists', 'Analytics'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Responsive tables', 'Sortable columns', 'Status badges', 'Hover effects']
    })
  }))

  return {
    id: 'table-display',
    name: 'Table Display',
    description: 'Table display components with various features',
    category: 'content-display',
    variations,
    tags: ['table', 'content-display', 'data']
  }
}

export const TABLE_DISPLAY_PANEL_WITH_VARIATIONS = createTableDisplayPanel()
