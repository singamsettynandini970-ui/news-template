import React, { useState } from 'react'
import { Clock, TrendingUp, Eye, MessageCircle, Share2, Bookmark, Filter, Search, Bell } from 'lucide-react'

const NewsContentPreview = () => {
  const [activeTab, setActiveTab] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const newsItems = [
    { id: 1, title: 'Breaking: Major Tech Announcement', category: 'Technology', time: '2 hours ago', views: 15420, comments: 89, trending: true },
    { id: 2, title: 'Market Analysis: Q4 Results', category: 'Business', time: '4 hours ago', views: 8930, comments: 45, trending: false },
    { id: 3, title: 'Climate Change Summit Updates', category: 'Environment', time: '6 hours ago', views: 12340, comments: 156, trending: true },
    { id: 4, title: 'Sports Championship Finals', category: 'Sports', time: '8 hours ago', views: 23450, comments: 234, trending: true },
    { id: 5, title: 'Health & Wellness Trends', category: 'Health', time: '12 hours ago', views: 6780, comments: 67, trending: false },
    { id: 6, title: 'Entertainment Industry News', category: 'Entertainment', time: '1 day ago', views: 18920, comments: 178, trending: false }
  ]

  const trendingTopics = [
    { topic: 'AI Revolution', posts: 1234 },
    { topic: 'Climate Action', posts: 987 },
    { topic: 'Tech Innovation', posts: 756 },
    { topic: 'Global Markets', posts: 543 }
  ]

  const mostRead = [
    { title: 'The Future of Remote Work', views: 45230 },
    { title: 'Cryptocurrency Market Update', views: 38940 },
    { title: 'Space Exploration Milestone', views: 32180 },
    { title: 'Sustainable Energy Solutions', views: 28760 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-blue-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                News & Content Templates
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Dynamic content layouts for news and media sites</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                <Bell className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* News Grid Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-blue-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  News Grid
                </h2>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <option value="all">All Categories</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map((item) => (
                  <div key={item.id} className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-blue-100 dark:border-gray-600">
                    <div className="aspect-video bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center relative">
                      <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      {item.trending && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {item.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {item.comments}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Bookmark className="h-4 w-4 hover:text-blue-500 cursor-pointer" />
                          <Share2 className="h-4 w-4 hover:text-blue-500 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Updates & Trending Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Live Updates */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-blue-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Live Updates
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white mb-1">
                        Breaking Update #{i}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        Latest developments in the ongoing story...
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {i * 5} minutes ago
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                View All Updates
              </button>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-blue-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Trending Topics
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {trendingTopics.map((topic, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">#{topic.topic}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{topic.posts} posts</p>
                      </div>
                    </div>
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Most Read Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-blue-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Most Read
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mostRead.map((article, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{article.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Eye className="h-4 w-4" />
                        <span>{article.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-blue-100 mb-6">Get the latest news delivered to your inbox</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500"
            />
            <button className="px-6 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsContentPreview