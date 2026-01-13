// Feedback Form templates - Rating, Comment, Survey, Quick
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const FEEDBACK_FORM_TEMPLATES = [
  {
    id: 1,
    name: "Rating Feedback Form",
    description: "Feedback with star rating",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { Star } from "lucide-react"\n\nexport default function RatingFeedbackForm() {\n  const [rating, setRating] = useState(0)\n  const [comment, setComment] = useState("")\n  const [submitted, setSubmitted] = useState(false)\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    setSubmitted(true)\n    setTimeout(() => {\n      setRating(0)\n      setComment("")\n      setSubmitted(false)\n    }, 2000)\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3 sm:space-y-4 px-2 sm:px-4">\n      {submitted ? (\n        <div className="p-3 sm:p-4 bg-accent text-accent-foreground rounded-lg text-center text-sm sm:text-base">\n          ✓ Thank you for your feedback!\n        </div>\n      ) : (\n        <>\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">\n              How would you rate your experience?\n            </label>\n            <div className="flex gap-1 sm:gap-2">\n              {[1, 2, 3, 4, 5].map((star) => (\n                <button\n                  key={star}\n                  type="button"\n                  onClick={() => setRating(star)}\n                  className="transition-transform hover:scale-110"\n                >\n                  <Star\n                    className={`h-6 w-6 sm:h-8 sm:w-8 ${\n                      star <= rating\n                        ? "fill-primary text-primary"\n                        : "text-border"\n                    }`}\n                  />\n                </button>\n              ))}\n            </div>\n          </div>\n\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">\n              Additional Comments\n            </label>\n            <textarea\n              value={comment}\n              onChange={(e) => setComment(e.target.value)}\n              rows={3}\n              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"\n              placeholder="Tell us what you think..."\n            />\n          </div>\n\n          <button\n            type="submit"\n            disabled={rating === 0}\n            className="w-full px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base disabled:opacity-50"\n          >\n            Submit Feedback\n          </button>\n        </>\n      )}\n    </form>\n  )\n}',
  },
  {
    id: 2,
    name: "Comment Feedback Form",
    description: "Detailed feedback with comments",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { Send, User, Mail } from "lucide-react"\n\nexport default function CommentFeedbackForm() {\n  const [formData, setFormData] = useState({ name: "", email: "", comment: "" })\n  const [submitted, setSubmitted] = useState(false)\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    setSubmitted(true)\n    setTimeout(() => {\n      setFormData({ name: "", email: "", comment: "" })\n      setSubmitted(false)\n    }, 2000)\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3 sm:space-y-4 px-2 sm:px-4">\n      {submitted ? (\n        <div className="p-3 sm:p-4 bg-accent text-accent-foreground rounded-lg text-sm sm:text-base">\n          ✓ Your feedback has been received\n        </div>\n      ) : (\n        <>\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">Name</label>\n            <div className="relative">\n              <input\n                type="text"\n                value={formData.name}\n                onChange={(e) => setFormData({ ...formData, name: e.target.value })}\n                required\n                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 pl-8 sm:pl-9 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"\n                placeholder="Your name"\n              />\n              <User className="absolute left-2.5 sm:left-3 top-2 sm:top-2.5 h-4 w-4 text-muted-foreground" />\n            </div>\n          </div>\n\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">Email</label>\n            <div className="relative">\n              <input\n                type="email"\n                value={formData.email}\n                onChange={(e) => setFormData({ ...formData, email: e.target.value })}\n                required\n                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 pl-8 sm:pl-9 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"\n                placeholder="your@email.com"\n              />\n              <Mail className="absolute left-2.5 sm:left-3 top-2 sm:top-2.5 h-4 w-4 text-muted-foreground" />\n            </div>\n          </div>\n\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">Your Feedback</label>\n            <textarea\n              value={formData.comment}\n              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}\n              required\n              rows={4}\n              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"\n              placeholder="Share your thoughts and suggestions..."\n            />\n          </div>\n\n          <button\n            type="submit"\n            className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"\n          >\n            <Send className="h-4 w-4" />\n            Send Feedback\n          </button>\n        </>\n      )}\n    </form>\n  )\n}',
  },
  {
    id: 3,
    name: "Survey Feedback Form",
    description: "Multi-question survey form",
    style: "classic" as const,
    code: 'import { useState } from "react"\n\nexport default function SurveyFeedbackForm() {\n  const [responses, setResponses] = useState({ q1: "", q2: "", q3: "" })\n  const [submitted, setSubmitted] = useState(false)\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    setSubmitted(true)\n    setTimeout(() => {\n      setResponses({ q1: "", q2: "", q3: "" })\n      setSubmitted(false)\n    }, 2000)\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 sm:space-y-6 px-2 sm:px-4">\n      {submitted ? (\n        <div className="p-3 sm:p-4 bg-accent text-accent-foreground rounded-lg text-center text-sm sm:text-base">\n          ✓ Survey submitted successfully\n        </div>\n      ) : (\n        <>\n          <div>\n            <h3 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3">\n              How satisfied are you with our service?\n            </h3>\n            <div className="space-y-2">\n              {["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"].map((option) => (\n                <label key={option} className="flex items-center gap-2 sm:gap-3 cursor-pointer">\n                  <input\n                    type="radio"\n                    name="q1"\n                    value={option}\n                    checked={responses.q1 === option}\n                    onChange={(e) => setResponses({ ...responses, q1: e.target.value })}\n                    className="h-4 w-4 rounded-full border-border text-primary focus:ring-primary"\n                  />\n                  <span className="text-xs sm:text-sm text-foreground">{option}</span>\n                </label>\n              ))}\n            </div>\n          </div>\n\n          <div>\n            <h3 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3">\n              How likely are you to recommend us?\n            </h3>\n            <div className="space-y-2">\n              {["Very Likely", "Likely", "Unlikely", "Very Unlikely"].map((option) => (\n                <label key={option} className="flex items-center gap-2 sm:gap-3 cursor-pointer">\n                  <input\n                    type="radio"\n                    name="q2"\n                    value={option}\n                    checked={responses.q2 === option}\n                    onChange={(e) => setResponses({ ...responses, q2: e.target.value })}\n                    className="h-4 w-4 rounded-full border-border text-primary focus:ring-primary"\n                  />\n                  <span className="text-xs sm:text-sm text-foreground">{option}</span>\n                </label>\n              ))}\n            </div>\n          </div>\n\n          <div>\n            <h3 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3">\n              What could we improve?\n            </h3>\n            <textarea\n              value={responses.q3}\n              onChange={(e) => setResponses({ ...responses, q3: e.target.value })}\n              rows={3}\n              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"\n              placeholder="Your suggestions..."\n            />\n          </div>\n\n          <button\n            type="submit"\n            className="w-full px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"\n          >\n            Submit Survey\n          </button>\n        </>\n      )}\n    </form>\n  )\n}',
  },
  {
    id: 4,
    name: "Quick Feedback Form",
    description: "Quick one-question feedback",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { ThumbsUp, ThumbsDown } from "lucide-react"\n\nexport default function QuickFeedbackForm() {\n  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(null)\n  const [submitted, setSubmitted] = useState(false)\n\n  const handleFeedback = (type: "helpful" | "not-helpful") => {\n    setFeedback(type)\n    setSubmitted(true)\n    setTimeout(() => {\n      setFeedback(null)\n      setSubmitted(false)\n    }, 2000)\n  }\n\n  return (\n    <div className="w-full max-w-sm px-2 sm:px-4">\n      {submitted ? (\n        <div className="p-3 sm:p-4 bg-accent text-accent-foreground rounded-lg text-center text-xs sm:text-sm">\n          ✓ Thank you for your feedback!\n        </div>\n      ) : (\n        <div className="space-y-2 sm:space-y-3">\n          <p className="text-xs sm:text-sm font-medium text-foreground">\n            Was this helpful?\n          </p>\n          <div className="flex gap-2 sm:gap-3">\n            <button\n              onClick={() => handleFeedback("helpful")}\n              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-border rounded-lg hover:bg-accent transition-colors text-xs sm:text-sm font-medium"\n            >\n              <ThumbsUp className="h-4 w-4" />\n              <span className="hidden sm:inline">Yes</span>\n            </button>\n            <button\n              onClick={() => handleFeedback("not-helpful")}\n              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-border rounded-lg hover:bg-accent transition-colors text-xs sm:text-sm font-medium"\n            >\n              <ThumbsDown className="h-4 w-4" />\n              <span className="hidden sm:inline">No</span>\n            </button>\n          </div>\n        </div>\n      )}\n    </div>\n  )\n}',
  }
]

export function createFeedbackFormPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = FEEDBACK_FORM_TEMPLATES.map((template) => ({
    id: `feedback-form-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Feedback Form', 'Rating System', 'Survey', 'User Input'],
      useCases: ['User Feedback', 'Surveys', 'Product Reviews', 'Customer Satisfaction'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Multiple feedback collection methods',
        'Star rating and quick feedback options',
        'Survey with multiple questions',
        'Responsive design for all devices'
      ]
    })
  }))

  return {
    id: 'feedback-form',
    name: 'Feedback Form',
    description: 'Various feedback collection forms for user input',
    category: 'forms-input',
    variations,
    tags: ['form', 'feedback', 'survey', 'rating']
  }
}

export const FEEDBACK_FORM_PANEL_WITH_VARIATIONS = createFeedbackFormPanel()
