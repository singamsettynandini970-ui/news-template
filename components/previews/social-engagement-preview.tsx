import React, { useState } from 'react'
import { MessageCircle, Heart, Share2, Star, UserPlus, Users, ThumbsUp, Send, MoreHorizontal, User } from 'lucide-react'

const SocialEngagementPreview = () => {
  const [liked, setLiked] = useState(false)
  const [following, setFollowing] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const comments = [
    { id: 1, user: 'Alice Johnson', avatar: '/api/placeholder/40/40', text: 'This is amazing! Love the design.', time: '2h ago', likes: 12 },
    { id: 2, user: 'Bob Smith', avatar: '/api/placeholder/40/40', text: 'Great work on this project. Very inspiring!', time: '4h ago', likes: 8 },
    { id: 3, user: 'Carol Davis', avatar: '/api/placeholder/40/40', text: 'Can you share more details about the implementation?', time: '6h ago', likes: 5 }
  ]

  const socialFeed = [
    { id: 1, user: 'Tech Innovator', handle: '@techinnovator', time: '1h ago', content: 'Just launched our new product! Excited to share it with the community.', likes: 234, comments: 45, shares: 12 },
    { id: 2, user: 'Design Studio', handle: '@designstudio', time: '3h ago', content: 'Working on some amazing UI concepts. What do you think about this color palette?', likes: 189, comments: 23, shares: 8 },
    { id: 3, user: 'Code Master', handle: '@codemaster', time: '5h ago', content: 'New tutorial series coming soon! Stay tuned for advanced React patterns.', likes: 156, comments: 34, shares: 19 }
  ]

  const userProfile = {
    name: 'John Developer',
    handle: '@johndeveloper',
    bio: 'Full-stack developer passionate about creating amazing user experiences',
    followers: 1234,
    following: 567,
    posts: 89
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-pink-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Social & Engagement Templates
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Interactive social components for community building</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors">
                <Users className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Comment System */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-pink-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Comment System
              </h2>
            </div>
            <div className="p-6">
              {/* Comment Input */}
              <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-rose-200 dark:from-gray-600 dark:to-gray-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.length}/280 characters
                      </span>
                      <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-rose-200 dark:from-gray-600 dark:to-gray-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 dark:text-white">{comment.user}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.text}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          {comment.likes}
                        </button>
                        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 transition-colors">
                          Reply
                        </button>
                        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rating System & Follow Button */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Rating System */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-pink-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Rating System
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Rate this product</h3>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {rating > 0 ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">5 stars</span>
                  <div className="flex-1 mx-3 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full w-3/5"></div>
                  </div>
                  <span className="text-gray-800 dark:text-white">60%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">4 stars</span>
                  <div className="flex-1 mx-3 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full w-1/4"></div>
                  </div>
                  <span className="text-gray-800 dark:text-white">25%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">3 stars</span>
                  <div className="flex-1 mx-3 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full w-1/12"></div>
                  </div>
                  <span className="text-gray-800 dark:text-white">8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-pink-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Follow Button
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-gray-600 dark:to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Sarah Wilson</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">UI/UX Designer</p>
                <div className="flex items-center justify-center gap-6 mb-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 dark:text-white">2.1K</div>
                    <div className="text-gray-600 dark:text-gray-300">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 dark:text-white">456</div>
                    <div className="text-gray-600 dark:text-gray-300">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 dark:text-white">89</div>
                    <div className="text-gray-600 dark:text-gray-300">Posts</div>
                  </div>
                </div>
                <button
                  onClick={() => setFollowing(!following)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto ${
                    following
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  {following ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Feed */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-pink-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Social Feed
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {socialFeed.map((post) => (
                  <div key={post.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-gray-600 dark:to-gray-500 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800 dark:text-white">{post.user}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{post.handle}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">•</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{post.time}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{post.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-pink-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              User Profile
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-gray-600 dark:to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{userProfile.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{userProfile.handle}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md mx-auto">{userProfile.bio}</p>
              
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{userProfile.followers.toLocaleString()}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{userProfile.following}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{userProfile.posts}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Posts</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium">
                  Follow
                </button>
                <button className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialEngagementPreview