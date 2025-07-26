import { useState, useRef, ChangeEvent } from 'react';

const CreatePostPage = () => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Needs Review');
  const [platform, setPlatform] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Categories based on the existing posts
  const categories = [
    'Marketing',
    'Product',
    'Case Study',
    'Research',
    'Promotion'
  ];
  
  // Platforms for publishing
  const platforms = [
    'LinkedIn',
    'Facebook',
    'Instagram',
    'Twitter',
    'Blog'
  ];

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      setImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle removing uploaded image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the data to an API
    console.log({
      title,
      content,
      category,
      platform,
      status,
      image: image ? image.name : null,
      publishDate: new Date().toISOString().split('T')[0], // Today's date
      author: 'Current User' // In a real app, this would be the logged-in user
    });
    
    // Navigate back to dashboard
    window.location.hash = '#/dashboard';
  };

  // Handle cancel
  const handleCancel = () => {
    window.location.hash = '#/dashboard';
  };

  return (
    <div className="text-gray-800">
      <section className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-gray-100 max-w-5xl mx-auto">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
            Create New Post
          </h3>
          <p className="text-gray-600">Fill in the details below to create a new marketing post.</p>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter post title"
              required
            />
          </div>
  
          {/* Content field - 70ch wide */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="mx-auto" style={{ width: "70ch" }}>
              <div className="rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-purple-600 focus-within:border-transparent">
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-5 py-4 border-0 focus:outline-none resize-y text-base"
                  placeholder="What do you want to share? Write your post content here..."
                  required
                ></textarea>
                
                {/* Post toolbar */}
                <div className="flex items-center px-4 py-2 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>AI suggestions will appear as you type</span>
                  </div>
                </div>
              </div>
              
              {/* Large gray drop area for image upload */}
              <div 
                className={`mt-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg transition-colors ${!imagePreview ? 'hover:border-purple-400 hover:bg-gray-50' : ''}`}
                onClick={!imagePreview ? triggerFileInput : undefined}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!imagePreview) {
                    e.currentTarget.classList.add('border-purple-400', 'bg-gray-50');
                  }
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  if (!imagePreview) {
                    e.currentTarget.classList.remove('border-purple-400', 'bg-gray-50');
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (!imagePreview && e.dataTransfer.files && e.dataTransfer.files[0]) {
                    const file = e.dataTransfer.files[0];
                    if (file.type.startsWith('image/')) {
                      setImage(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }}
              >
                {!imagePreview ? (
                  <div className="flex flex-col items-center justify-center py-10 px-4 cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-sm text-gray-600 text-center mb-1">Drag and drop an image here, or click to select a file</p>
                    <p className="text-xs text-gray-500 text-center">JPG, PNG, GIF up to 10MB</p>
                  </div>
                ) : (
                  <div className="relative p-4">
                    <img 
                      src={imagePreview} 
                      alt="Upload preview" 
                      className="max-h-80 rounded-lg mx-auto shadow-sm" 
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="absolute top-6 right-6 bg-gray-800 bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-90 transition-opacity"
                      title="Remove image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
  
          {/* Two column layout for category and platform */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Platform field */}
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
                Platform <span className="text-red-500">*</span>
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option value="" disabled>Select a platform</option>
                {platforms.map((plat) => (
                  <option key={plat} value={plat}>{plat}</option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Status field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="needs-review"
                  name="status"
                  value="Needs Review"
                  checked={status === 'Needs Review'}
                  onChange={() => setStatus('Needs Review')}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <label htmlFor="needs-review" className="ml-2 block text-sm text-gray-700">
                  Needs Review
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="ready-to-publish"
                  name="status"
                  value="Ready to Publish"
                  checked={status === 'Ready to Publish'}
                  onChange={() => setStatus('Ready to Publish')}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <label htmlFor="ready-to-publish" className="ml-2 block text-sm text-gray-700">
                  Ready to Publish
                </label>
              </div>
            </div>
          </div>
  
          {/* AI Quality Check */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-purple-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <h4 className="text-sm font-medium text-purple-800">Marketing Intelligence QA</h4>
            </div>
            <p className="text-sm text-purple-700">
              Your post will be automatically reviewed by our AI for brand consistency and engagement optimization.
            </p>
          </div>
  
          {/* Form actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-7 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              Create Post
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreatePostPage;
