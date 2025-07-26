import { useState, useEffect } from 'react';

interface PostData {
  id: number;
  title: string;
  status: string;
  category: string;
  platform: string;
  content?: string;
  image?: string;
  image_url?: string;
  date?: string;
  author?: string; // Making author optional since it might not be in the backend data
}

interface PostReviewPageProps {
  postId?: string;
}

const PostReviewPage = ({ postId }: PostReviewPageProps) => {
  // State for post data, loading, and error
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch post data from the backend
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/posts/');

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();

        if (postId) {
          const postIdNum = parseInt(postId, 10);
          const foundPost = data.posts.find((p: PostData) => p.id === postIdNum);

          if (foundPost) {
            setPost(foundPost);
          } else {
            setError(`Post with ID ${postId} not found`);
          }
        } else if (data.posts.length > 0) {
          // If no postId provided, use the first post
          setPost(data.posts[0]);
        } else {
          setError('No posts available');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{author: string, text: string, timestamp: string, isAI?: boolean, reviewDate?: string}>>([
    {
      author: 'Marketing Intelligence',
      text: 'The headline could be more engaging. Consider adding more specific benefits to capture reader attention.',
      timestamp: '2023-06-18 14:32',
      isAI: true,
      reviewDate: '2023-06-18'
    },
    {
      author: 'Marketing Intelligence',
      text: 'Your key features section is well structured. I recommend adding quantifiable benefits for each feature to strengthen your value proposition.',
      timestamp: '2023-06-18 14:35',
      isAI: true,
      reviewDate: '2023-06-18'
    },
    {
      author: 'John Doe',
      text: 'Thanks for the feedback! I\'ll work on improving the headline and adding more specific benefits.',
      timestamp: '2023-06-18 15:10',
      reviewDate: '2023-06-18'
    },
    {
      author: 'Marketing Intelligence',
      text: 'I\'ve analyzed your target audience data. This announcement would perform 37% better with more technical details for your LinkedIn audience.',
      timestamp: '2023-06-19 09:22',
      isAI: true,
      reviewDate: '2023-06-19'
    },
    {
      author: 'Marketing Intelligence',
      text: 'The closing call-to-action could be stronger. Consider adding a specific date when users can access these features to create urgency.',
      timestamp: '2023-06-19 09:25',
      isAI: true,
      reviewDate: '2023-06-19'
    }
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      setComments([
        ...comments,
        {
          author: 'John Doe',
          text: comment,
          timestamp: now.toLocaleString(),
          reviewDate: currentDate
        }
      ]);
      setComment('');
    }
  };

  const handleApprove = () => {
    setPost({
      ...post,
      status: 'Ready to Publish'
    });
    // In a real app, we would send this update to the backend
    // Then redirect back to the dashboard
    setTimeout(() => {
      window.location.hash = '#/dashboard';
    }, 1500);
  };

  const handleReject = () => {
    // In a real app, we would update the status and add a rejection comment
    setComments([
      ...comments,
      {
        author: 'John Doe',
        text: 'This post needs revisions before it can be published.',
        timestamp: new Date().toLocaleString()
      }
    ]);
    // Then redirect back to the dashboard
    setTimeout(() => {
      window.location.hash = '#/dashboard';
    }, 1500);
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <div className="text-gray-800">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  // Show error message if there was an error
  if (error) {
    return (
      <div className="text-gray-800">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 mb-10">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg font-medium">Error loading post</h3>
          </div>
          <p className="mt-2">{error}</p>
          <button 
            onClick={() => window.location.hash = '#/dashboard'}
            className="mt-4 bg-red-100 text-red-800 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Show post content if post is available
  if (!post) {
    return (
      <div className="text-gray-800">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-6 mb-10">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <h3 className="text-lg font-medium">No post found</h3>
          </div>
          <p className="mt-2">The requested post could not be found.</p>
          <button 
            onClick={() => window.location.hash = '#/dashboard'}
            className="mt-4 bg-yellow-100 text-yellow-800 py-2 px-4 rounded-lg hover:bg-yellow-200 transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-800">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header section - similar to GitHub PR header */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                {post.title}
                <span className={`ml-3 px-3 py-1 text-xs font-medium rounded-full ${
                  post.status === 'Ready to Publish' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {post.status}
                </span>
              </h1>
              <div className="flex space-x-2">
                <button 
                  onClick={() => window.location.hash = '#/dashboard'}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="mr-4">#{post.id}</span>
              <span className="mr-4">
                <span className="font-medium text-gray-900">{post.author || 'Unknown'}</span> created this post
              </span>
              <span>Publish date: {post.date ? new Date(post.date).toLocaleDateString() : 'Unknown'}</span>
            </div>
          </div>
        </div>

        {/* Main content area with sidebar - similar to GitHub PR layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left side - Post content */}
          <div className="flex-grow p-6 md:w-3/4">
            {/* Author description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{post.title}</h2>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg border border-purple-200 mr-3">
                    {post.author ? post.author.split(' ').map(name => name[0]).join('') : 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{post.author || 'Unknown'}</div>
                    <div className="text-gray-500 text-sm">Author • {post.category} Specialist</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  {post.content ? 
                    post.content.split('\n').filter(line => !line.startsWith('#') && line.trim() !== '').slice(0, 1)[0] : 
                    "No description available from the author."}
                </p>
              </div>
            </div>

            {/* Timeline of changes */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Changes Timeline</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-4">
                  Showing changes from previous version
                </div>

                {/* Visual timeline with vertical line and dots */}
                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-purple-300" style={{ zIndex: 1 }}></div>

                  {/* Timeline events */}
                  <div className="space-y-8">
                    {/* Initial commit */}
                    <div className="relative pl-10">
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-6 h-6 rounded-full bg-purple-600 border-4 border-white shadow-sm flex items-center justify-center z-10">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </div>

                      {/* Event content */}
                      <div className="mb-1 flex items-center">
                        <h4 className="text-sm font-semibold text-gray-900">Initial draft created</h4>
                        <span className="ml-2 text-xs text-gray-500">June 15, 2023 • 10:23 AM</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">John Doe created the first draft of this post</p>
                      <div className="bg-white p-2 rounded border border-gray-200 text-sm">
                        # New Features Coming Soon

                        We're excited to announce new features coming to our platform next month.
                      </div>
                    </div>

                    {/* Review requested */}
                    <div className="relative pl-10">
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-6 h-6 rounded-full bg-amber-500 border-4 border-white shadow-sm flex items-center justify-center z-10">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                        </svg>
                      </div>

                      {/* Event content */}
                      <div className="mb-1 flex items-center">
                        <h4 className="text-sm font-semibold text-gray-900">Review requested</h4>
                        <span className="ml-2 text-xs text-gray-500">June 16, 2023 • 09:45 AM</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">John Doe requested review from Marketing Intelligence</p>
                    </div>

                    {/* AI feedback */}
                    <div className="relative pl-10">
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 border-4 border-white shadow-sm flex items-center justify-center z-10">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>

                      {/* Event content */}
                      <div className="mb-1 flex items-center">
                        <h4 className="text-sm font-semibold text-gray-900">Marketing Intelligence feedback</h4>
                        <span className="ml-2 text-xs text-gray-500">June 16, 2023 • 10:15 AM</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">AI suggested improvements to the headline and content</p>
                      <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-3 rounded border border-purple-100 text-sm">
                        The headline could be more engaging. Consider adding more specific benefits to capture reader attention.
                      </div>
                    </div>

                    {/* Changes made */}
                    <div className="relative pl-10">
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-sm flex items-center justify-center z-10">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </div>

                      {/* Event content */}
                      <div className="mb-1 flex items-center">
                        <h4 className="text-sm font-semibold text-gray-900">Changes made</h4>
                        <span className="ml-2 text-xs text-gray-500">June 17, 2023 • 02:30 PM</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">John Doe updated the post based on feedback</p>
                      <div className="space-y-2">
                        <div className="bg-red-50 p-2 rounded border-l-4 border-red-300 line-through">
                          # New Features Coming Soon
                        </div>
                        <div className="bg-green-50 p-2 rounded border-l-4 border-green-300">
                          # Exciting New Features Coming to Our Platform
                        </div>
                        <div className="bg-white p-2">
                          We're thrilled to announce several new features that will be rolling out next month. These enhancements are designed to improve user experience and productivity.
                        </div>
                      </div>
                    </div>

                    {/* Final review requested */}
                    <div className="relative pl-10">
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-6 h-6 rounded-full bg-amber-500 border-4 border-white shadow-sm flex items-center justify-center z-10">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                        </svg>
                      </div>

                      {/* Event content */}
                      <div className="mb-1 flex items-center">
                        <h4 className="text-sm font-semibold text-gray-900">Final review requested</h4>
                        <span className="ml-2 text-xs text-gray-500">June 18, 2023 • 11:20 AM</span>
                      </div>
                      <p className="text-sm text-gray-600">John Doe requested final review before publishing</p>
                    </div>

                    {/* Current status */}
                    <div className="relative pl-10">
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-sm flex items-center justify-center z-10">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>

                      {/* Event content */}
                      <div className="mb-1 flex items-center">
                        <h4 className="text-sm font-semibold text-gray-900">Ready for publishing</h4>
                        <span className="ml-2 text-xs text-gray-500">Today • 09:30 AM</span>
                      </div>
                      <p className="text-sm text-gray-600">All reviews completed, post is ready to be published</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LinkedIn Preview */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">LinkedIn Preview</h3>
              <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
                {/* LinkedIn header with profile info */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200 mr-3">
                      {post.author ? post.author.split(' ').map(name => name[0]).join('') : 'U'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{post.author || 'Unknown'}</div>
                      <div className="text-gray-500 text-sm">Marketing Director at OnBrand • 2nd</div>
                      <div className="text-gray-400 text-xs flex items-center mt-1">
                        <span>{post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Unknown'}</span>
                        <span className="mx-1">•</span>
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"></path>
                          <path d="M8 3a.75.75 0 01.75.75v3.5h3.5a.75.75 0 010 1.5h-4.25a.75.75 0 01-.75-.75v-4.25A.75.75 0 018 3z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LinkedIn post content */}
                <div className="p-4">
                  {post.content ? (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">
                        {post.title}
                      </h2>
                      <div className="text-gray-700 mb-4">
                        {post.content.split('\n').slice(0, 4).map((line, index) => {
                          // Remove markdown formatting for LinkedIn preview
                          let cleanLine = line
                            .replace(/^# /, '')
                            .replace(/^## /, '')
                            .replace(/^\d+\. /, '')
                            .replace(/^- /, '')
                            .replace(/\*\*(.*?)\*\*/g, '$1');

                          return cleanLine ? <p key={index} className="mb-2">{cleanLine}</p> : null;
                        })}
                        {post.content.split('\n').length > 4 && (
                          <span className="text-blue-600 cursor-pointer hover:underline">...see more</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No content available</p>
                  )}
                </div>

                {/* LinkedIn post image (if available) */}
                <div className="bg-gray-100  flex items-center justify-center border-t border-b border-gray-200">
                  {post.image ? (
                    <img 
                      src={"http://localhost:8000" + post.image}
                      alt="Post image" 
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>No image available</span>
                    </div>
                  )}
                </div>

                {/* LinkedIn engagement metrics */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <div className="flex -space-x-1 mr-2">
                      <div className="h-4 w-4 rounded-full bg-blue-500 border border-white"></div>
                      <div className="h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                      <div className="h-4 w-4 rounded-full bg-red-500 border border-white"></div>
                    </div>
                    <span>John Doe and 42 others</span>
                    <span className="mx-1">•</span>
                    <span>12 comments</span>
                  </div>
                </div>

                {/* LinkedIn action buttons */}
                <div className="flex justify-between p-2">
                  <button className="flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200 w-1/4">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                    </svg>
                    Like
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200 w-1/4">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                    Comment
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200 w-1/4">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                    Share
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200 w-1/4">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Comments section */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>

              <div className="space-y-6 mb-6">
                {/* Group comments by review date */}
                {Array.from(new Set(comments.map(c => c.reviewDate))).map(date => (
                  <div key={date} className="space-y-4">
                    {/* Date header */}
                    <div className="flex items-center">
                      <div className="flex-grow h-px bg-gray-200"></div>
                      <div className="px-4 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full border border-purple-200">
                        Review requested on {date}
                      </div>
                      <div className="flex-grow h-px bg-gray-200"></div>
                    </div>

                    {/* Comments for this date */}
                    {comments
                      .filter(c => c.reviewDate === date)
                      .map((c, index) => (
                        <div key={index} className={`flex ${c.isAI ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-3xl ${c.isAI ? 'mr-12' : 'ml-12'}`}>
                            {/* AI comment with chatbot styling */}
                            {c.isAI ? (
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mr-4">
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center text-white shadow-md">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center mb-1">
                                    <span className="font-medium text-gray-900 mr-2">{c.author}</span>
                                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full border border-purple-200 flex items-center">
                                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                      </svg>
                                      AI-powered
                                    </span>
                                    <span className="text-xs text-gray-500 ml-2">{c.timestamp}</span>
                                  </div>
                                  <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-4 rounded-lg border border-purple-100 shadow-sm">
                                    <p className="text-gray-700">{c.text}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* User comment */
                              <div className="flex items-start justify-end">
                                <div className="flex-1">
                                  <div className="flex items-center justify-end mb-1">
                                    <span className="text-xs text-gray-500 mr-2">{c.timestamp}</span>
                                    <span className="font-medium text-gray-900">{c.author}</span>
                                  </div>
                                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                                    <p className="text-gray-700">{c.text}</p>
                                  </div>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200">
                                    {c.author.split(' ').map(name => name[0]).join('')}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>

              {/* Add comment form */}
              <form onSubmit={handleAddComment} className="mt-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Add a comment..."
                  rows={3}
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 text-white py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right side - Sidebar with metadata */}
          <div className="bg-gray-50 p-6 md:w-1/4 border-t md:border-t-0 md:border-l border-gray-200">
            <div className="space-y-6">
              {/* Reviewers section */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Reviewers</h3>
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-2">
                    <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/17.jpg" alt="Reviewer" />
                    <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/4.jpg" alt="Reviewer" />
                  </div>
                  <button className="text-sm text-purple-600 hover:text-purple-800">
                    Add reviewers
                  </button>
                </div>
              </div>

              {/* Details section */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Details</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Category:</dt>
                    <dd className="text-sm font-medium text-gray-900">{post.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Platform:</dt>
                    <dd className="text-sm font-medium text-gray-900">{post.platform}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Created:</dt>
                    <dd className="text-sm font-medium text-gray-900">{post.date ? new Date(post.date).toLocaleDateString() : 'Unknown'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Word count:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {post.content ? post.content.split(/\s+/).filter(Boolean).length : 0}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* AI Analysis section */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Marketing Intelligence Analysis
                  </div>
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-4 rounded-lg border border-purple-100 shadow-sm text-sm">
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center text-white text-xs mr-2">
                      AI
                    </div>
                    <span className="font-medium text-purple-800">Content Analysis</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                      <span className="font-medium">Engagement score: 7.5/10</span>
                    </div>
                    <p className="text-gray-600 ml-4 mb-2">This post has good structure but could use more engaging language.</p>
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium">SEO score: 8.2/10</span>
                    </div>
                    <p className="text-gray-600 ml-4">Keywords are well distributed. Consider adding more specific product terms.</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleApprove}
                    className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 flex justify-center items-center ${
                      post.status === 'Ready to Publish'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                    disabled={post.status === 'Ready to Publish'}
                  >
                    {post.status === 'Ready to Publish' ? 'Approved' : 'Approve'}
                  </button>
                  <button
                    onClick={handleReject}
                    className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 flex justify-center items-center ${
                      post.status === 'Ready to Publish'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                    disabled={post.status === 'Ready to Publish'}
                  >
                    Request Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostReviewPage;
