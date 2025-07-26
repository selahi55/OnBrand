const DashboardPage = () => {
  // Sample data for the posts table
  const posts = [
    {
      id: 1,
      title: 'Summer Campaign Launch',
      status: 'Ready to Publish',
      publishDate: '2023-06-15',
      category: 'Marketing',
      author: 'Jane Smith',
      platform: 'Instagram'
    },
    {
      id: 2,
      title: 'Product Feature Announcement',
      status: 'Needs Review',
      publishDate: '2023-06-20',
      category: 'Product',
      author: 'John Doe',
      platform: 'LinkedIn'
    },
    {
      id: 3,
      title: 'Customer Success Story',
      status: 'Ready to Publish',
      publishDate: '2023-06-18',
      category: 'Case Study',
      author: 'Emily Johnson',
      platform: 'Blog'
    },
    {
      id: 4,
      title: 'Industry Trend Analysis',
      status: 'Needs Review',
      publishDate: '2023-06-25',
      category: 'Research',
      author: 'Michael Brown',
      platform: 'Twitter'
    },
    {
      id: 5,
      title: 'Holiday Promotion Preview',
      status: 'Needs Review',
      publishDate: '2023-07-01',
      category: 'Promotion',
      author: 'Sarah Wilson',
      platform: 'Facebook'
    }
  ];

  return (
    <div className="text-gray-800 p-4 md:p-6">
        {/* Header with search and filter options */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">

          <div className="flex space-x-2 ml-auto">
            <button 
              onClick={() => window.location.hash = '#/create-post'}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center hover:opacity-90"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Create Post
            </button>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search posts..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* Table stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center">
            <div className="bg-purple-100 p-3.5 rounded-lg mr-5 border border-purple-200">
              <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-purple-800 text-sm font-medium uppercase tracking-wide">Total Posts</p>
              <p className="text-3xl font-bold text-purple-900">{posts.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center">
            <div className="bg-green-100 p-3.5 rounded-lg mr-5 border border-green-200">
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-green-800 text-sm font-medium uppercase tracking-wide">Ready to Publish</p>
              <p className="text-3xl font-bold text-green-900">{posts.filter(post => post.status === 'Ready to Publish').length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center">
            <div className="bg-amber-100 p-3.5 rounded-lg mr-5 border border-amber-200">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div>
              <p className="text-amber-800 text-sm font-medium uppercase tracking-wide">Needs Review</p>
              <p className="text-3xl font-bold text-amber-900">{posts.filter(post => post.status === 'Needs Review').length}</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-purple-600 text-white border-b border-purple-700">
                <th className="px-8 py-5 text-left font-semibold tracking-wider uppercase text-xs">Title</th>
                <th className="px-8 py-5 text-left font-semibold tracking-wider uppercase text-xs">Status</th>
                <th className="px-8 py-5 text-left font-semibold tracking-wider uppercase text-xs">Category</th>
                <th className="px-8 py-5 text-left font-semibold tracking-wider uppercase text-xs">Platform</th>
                <th className="px-8 py-5 text-left font-semibold tracking-wider uppercase text-xs">Publish Date</th>
                <th className="px-8 py-5 text-left font-semibold tracking-wider uppercase text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post, index) => (
                <tr 
                  key={post.id} 
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-purple-50 cursor-pointer transition-all duration-200`}
                  onClick={() => window.location.hash = `#/post-review/${post.id}`}
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 hover:text-purple-700 transition-colors">{post.title}</span>
                      <span className="text-sm text-gray-500 flex items-center mt-1">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        {post.author}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {post.status === 'Needs Review' ? (
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mr-2.5 animate-pulse"></span>
                        {post.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2.5"></span>
                        {post.status}
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      {post.platform === 'Instagram' && (
                        <span className="flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-md border border-purple-200">
                          <svg className="w-4 h-4 mr-1.5 text-pink-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"></path>
                            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z"></path>
                            <circle cx="18.406" cy="5.594" r="1.44"></circle>
                          </svg>
                          {post.platform}
                        </span>
                      )}
                      {post.platform === 'LinkedIn' && (
                        <span className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md border border-blue-200">
                          <svg className="w-4 h-4 mr-1.5 text-blue-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                          </svg>
                          {post.platform}
                        </span>
                      )}
                      {post.platform === 'Blog' && (
                        <span className="flex items-center px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200">
                          <svg className="w-4 h-4 mr-1.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                          </svg>
                          {post.platform}
                        </span>
                      )}
                      {post.platform === 'Twitter' && (
                        <span className="flex items-center px-3 py-1.5 bg-sky-100 text-sky-800 rounded-md border border-sky-200">
                          <svg className="w-4 h-4 mr-1.5 text-sky-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                          </svg>
                          {post.platform}
                        </span>
                      )}
                      {post.platform === 'Facebook' && (
                        <span className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md border border-blue-200">
                          <svg className="w-4 h-4 mr-1.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                          </svg>
                          {post.platform}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {post.publishDate}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex space-x-4">
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 border border-blue-200">
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
            Showing <span className="font-medium text-purple-700">1</span> to <span className="font-medium text-purple-700">{posts.length}</span> of <span className="font-medium text-purple-700">{posts.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center" disabled>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-purple-600 text-white transition-all duration-200">
              1
            </button>
            <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center" disabled>
              Next
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
    </div>
  );
};

export default DashboardPage;
