// Timeline and Progress Indicator templates
// Timeline: 4 variations, Progress: 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Timeline templates
const TIMELINE_TEMPLATES = [
  {
    id: 1,
    name: "Vertical Timeline",
    description: "Vertical timeline layout",
    style: "minimal" as const,
    code: 'export default function VerticalTimeline() {\n  const events = [\n    { id: 1, title: "Started", date: "Jan 1", description: "Project kickoff" },\n    { id: 2, title: "Milestone 1", date: "Feb 15", description: "First release" },\n    { id: 3, title: "Milestone 2", date: "Mar 30", description: "Major update" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="space-y-8">\n        {events.map((event, idx) => (\n          <div key={event.id} className="flex gap-4">\n            <div className="flex flex-col items-center">\n              <div className="w-4 h-4 bg-primary rounded-full" />\n              {idx < events.length - 1 && <div className="w-1 h-16 bg-border mt-2" />}\n            </div>\n            <div className="pt-1">\n              <h3 className="font-semibold text-foreground">{event.title}</h3>\n              <p className="text-sm text-muted-foreground">{event.date}</p>\n              <p className="text-sm text-foreground mt-1">{event.description}</p>\n            </div>\n          </div>\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Horizontal Timeline",
    description: "Horizontal timeline layout",
    style: "modern" as const,
    code: 'export default function HorizontalTimeline() {\n  const events = [\n    { id: 1, label: "Q1", status: "completed" },\n    { id: 2, label: "Q2", status: "completed" },\n    { id: 3, label: "Q3", status: "active" },\n    { id: 4, label: "Q4", status: "pending" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="flex items-center justify-between">\n        {events.map((event, idx) => (\n          <div key={event.id} className="flex flex-col items-center flex-1">\n            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${\n              event.status === "completed" ? "bg-green-500 text-white" :\n              event.status === "active" ? "bg-primary text-primary-foreground" :\n              "bg-border text-muted-foreground"\n            }`}>\n              {idx + 1}\n            </div>\n            <p className="text-xs font-medium text-foreground mt-2">{event.label}</p>\n            {idx < events.length - 1 && (\n              <div className={`absolute w-12 h-1 mt-4 ${\n                event.status === "completed" ? "bg-green-500" : "bg-border"\n              }`} style={{ marginLeft: "2rem" }} />\n            )}\n          </div>\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Alternating Timeline",
    description: "Timeline with alternating layout",
    style: "classic" as const,
    code: 'export default function AlternatingTimeline() {\n  const events = [\n    { id: 1, title: "Event 1", date: "2024-01-01", side: "left" },\n    { id: 2, title: "Event 2", date: "2024-02-01", side: "right" },\n    { id: 3, title: "Event 3", date: "2024-03-01", side: "left" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="space-y-8">\n        {events.map(event => (\n          <div key={event.id} className={`flex ${event.side === "right" ? "flex-row-reverse" : ""} gap-4`}>\n            <div className="flex-1 text-right">\n              <h3 className="font-semibold text-foreground">{event.title}</h3>\n              <p className="text-sm text-muted-foreground">{event.date}</p>\n            </div>\n            <div className="flex flex-col items-center">\n              <div className="w-4 h-4 bg-primary rounded-full" />\n            </div>\n            <div className="flex-1" />\n          </div>\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Detailed Timeline",
    description: "Timeline with detailed information",
    style: "bold" as const,
    code: 'export default function DetailedTimeline() {\n  const events = [\n    { id: 1, title: "Launch", date: "Jan 15", description: "Product launched", icon: "🚀" },\n    { id: 2, title: "Growth", date: "Feb 20", description: "User base grew 100%", icon: "📈" },\n    { id: 3, title: "Success", date: "Mar 30", description: "Reached 10k users", icon: "🎉" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="space-y-6">\n        {events.map((event, idx) => (\n          <div key={event.id} className="flex gap-4">\n            <div className="flex flex-col items-center">\n              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl">\n                {event.icon}\n              </div>\n              {idx < events.length - 1 && <div className="w-1 h-20 bg-border mt-2" />}\n            </div>\n            <div className="pt-2 pb-4 border-l-2 border-border pl-4">\n              <h3 className="font-bold text-foreground">{event.title}</h3>\n              <p className="text-sm text-primary font-medium">{event.date}</p>\n              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>\n            </div>\n          </div>\n        ))}\n      </div>\n    </div>\n  )\n}',
  }
]

// Progress Indicator templates
const PROGRESS_TEMPLATES = [
  {
    id: 1,
    name: "Linear Progress",
    description: "Linear progress bar",
    style: "minimal" as const,
    code: 'export default function LinearProgress() {\n  const progress = 65\n\n  return (\n    <div className="w-full max-w-2xl space-y-4">\n      <div>\n        <div className="flex justify-between mb-2">\n          <span className="text-sm font-medium text-foreground">Download</span>\n          <span className="text-sm text-muted-foreground">{progress}%</span>\n        </div>\n        <div className="w-full h-2 bg-border rounded-full overflow-hidden">\n          <div\n            className="h-full bg-primary transition-all duration-300"\n            style={{ width: `${progress}%` }}\n          />\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Circular Progress",
    description: "Circular progress indicator",
    style: "modern" as const,
    code: 'export default function CircularProgress() {\n  const progress = 75\n  const circumference = 2 * Math.PI * 45\n  const offset = circumference - (progress / 100) * circumference\n\n  return (\n    <div className="w-full max-w-2xl flex justify-center">\n      <div className="relative w-32 h-32">\n        <svg className="w-full h-full transform -rotate-90">\n          <circle cx="64" cy="64" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />\n          <circle\n            cx="64"\n            cy="64"\n            r="45"\n            fill="none"\n            stroke="currentColor"\n            strokeWidth="8"\n            strokeDasharray={circumference}\n            strokeDashoffset={offset}\n            className="text-primary transition-all duration-300"\n          />\n        </svg>\n        <div className="absolute inset-0 flex items-center justify-center">\n          <span className="text-2xl font-bold text-foreground">{progress}%</span>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Segmented Progress",
    description: "Segmented progress indicator",
    style: "classic" as const,
    code: 'export default function SegmentedProgress() {\n  const segments = 5\n  const completed = 3\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="flex gap-2">\n        {Array.from({ length: segments }).map((_, idx) => (\n          <div\n            key={idx}\n            className={`flex-1 h-2 rounded-full transition-colors ${\n              idx < completed ? "bg-primary" : "bg-border"\n            }`}\n          />\n        ))}\n      </div>\n      <p className="text-sm text-muted-foreground mt-2">\n        Step {completed} of {segments}\n      </p>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Labeled Progress",
    description: "Progress with labels",
    style: "bold" as const,
    code: 'export default function LabeledProgress() {\n  const steps = [\n    { label: "Personal", completed: true },\n    { label: "Address", completed: true },\n    { label: "Payment", completed: false },\n    { label: "Review", completed: false },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="flex justify-between mb-8">\n        {steps.map((step, idx) => (\n          <div key={idx} className="flex flex-col items-center flex-1">\n            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-2 ${\n              step.completed ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"\n            }`}>\n              {idx + 1}\n            </div>\n            <p className="text-xs font-medium text-foreground text-center">{step.label}</p>\n          </div>\n        ))}\n      </div>\n      <div className="flex gap-1">\n        {steps.map((step, idx) => (\n          <div\n            key={idx}\n            className={`flex-1 h-1 rounded-full ${\n              step.completed ? "bg-primary" : "bg-border"\n            }`}\n          />\n        ))}\n      </div>\n    </div>\n  )\n}',
  }
]

export function createTimelinePanel(): ExtendedPanel {
  const variations: TemplateVariation[] = TIMELINE_TEMPLATES.map((template) => ({
    id: `timeline-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Timeline', 'Events', 'Vertical/Horizontal', 'Responsive'],
      useCases: ['History', 'Process Steps', 'Milestones', 'Events'],
      dependencies: [...COMMON_DEPENDENCIES.core],
      implementationNotes: ['Multiple layouts', 'Event display', 'Responsive design', 'Accessible']
    })
  }))

  return {
    id: 'timeline',
    name: 'Timeline',
    description: 'Timeline components for displaying events and milestones',
    category: 'content-display',
    variations,
    tags: ['timeline', 'content-display', 'events']
  }
}

export function createProgressIndicatorPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = PROGRESS_TEMPLATES.map((template) => ({
    id: `progress-indicator-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Progress Indicator', 'Visual Feedback', 'Animations', 'Responsive'],
      useCases: ['Loading States', 'Process Steps', 'Completion Tracking', 'Uploads'],
      dependencies: [...COMMON_DEPENDENCIES.core],
      implementationNotes: ['Multiple styles', 'Smooth animations', 'Accessible', 'Responsive']
    })
  }))

  return {
    id: 'progress-indicator',
    name: 'Progress Indicator',
    description: 'Progress indicator components for showing completion status',
    category: 'content-display',
    variations,
    tags: ['progress', 'content-display', 'feedback']
  }
}

export const TIMELINE_PANEL_WITH_VARIATIONS = createTimelinePanel()
export const PROGRESS_INDICATOR_PANEL_WITH_VARIATIONS = createProgressIndicatorPanel()
