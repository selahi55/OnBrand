import React, { useState } from 'react';

// Sample brand profile data for demonstration
const sampleBrandProfile = {
  brandName: "EcoTrek",
  brandDescription: "Outdoor gear company focused on sustainable, eco-friendly products for hiking and camping enthusiasts.",
  lastUpdated: "2023-11-15",
  contentAnalyzed: 42,
  toneAttributes: [
    { name: "Professional", score: 87 },
    { name: "Passionate", score: 82 },
    { name: "Friendly", score: 75 },
    { name: "Authoritative", score: 73 },
    { name: "Inspirational", score: 68 }
  ],
  voiceCharacteristics: [
    { name: "Direct", score: 85 },
    { name: "Conversational", score: 79 },
    { name: "Enthusiastic", score: 73 },
    { name: "Educational", score: 71 },
    { name: "Motivational", score: 65 }
  ],
  targetAudience: {
    primaryDemographics: [
      { name: "Age", value: "25-44 years" },
      { name: "Gender", value: "55% male, 45% female" },
      { name: "Location", value: "Urban centers & outdoor hubs" },
      { name: "Income", value: "$75,000 - $120,000" }
    ],
    psychographics: [
      "Environmentally conscious",
      "Adventure seekers",
      "Health & fitness oriented",
      "Outdoor enthusiasts",
      "Tech-savvy consumers"
    ],
    interests: [
      "Hiking & Trekking",
      "Environmental Sustainability",
      "Wildlife Conservation",
      "Adventure Travel",
      "Outdoor Photography"
    ]
  },
  keyPhrases: [
    "sustainable adventure",
    "eco-conscious exploration",
    "leave no trace",
    "environmentally responsible",
    "outdoor innovation",
    "adventure-ready gear",
    "planet-friendly products",
    "wilderness exploration"
  ],
  contentRecommendations: [
    "Highlight sustainability credentials more prominently",
    "Include more customer stories about real outdoor experiences",
    "Add more educational content about environmental conservation",
    "Focus on product durability and performance alongside eco-benefits",
    "Incorporate more adventure inspiration in social media content"
  ],
  competitiveAnalysis: {
    similarBrands: ["Patagonia", "REI", "The North Face", "Columbia"],
    differentiators: [
      "Stronger focus on sustainable materials",
      "More transparent supply chain information",
      "Closer community engagement with environmental causes",
      "More technical product descriptions with environmental impact data"
    ]
  }
};

// Tone attribute color mapping
const toneColors = {
  Professional: "bg-blue-500",
  Passionate: "bg-red-500",
  Friendly: "bg-green-500",
  Authoritative: "bg-purple-500",
  Inspirational: "bg-yellow-500",
  Direct: "bg-indigo-500",
  Conversational: "bg-pink-500",
  Enthusiastic: "bg-orange-500",
  Educational: "bg-teal-500",
  Motivational: "bg-cyan-500"
};

const BrandProfilePage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSampleProfile, setShowSampleProfile] = useState(true);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      setUploadSuccess(false);
      setErrorMessage('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      setSelectedFiles(fileArray);
      setUploadSuccess(false);
      setErrorMessage('');
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('Please select files to upload');
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      setSelectedFiles([]);
      setShowSampleProfile(true);
    }, 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Helper function to get color for tone attribute
  const getToneColor = (name: string): string => {
    return toneColors[name as keyof typeof toneColors] || "bg-gray-500";
  };

  return (
    <div className="text-gray-800 p-4 md:p-6">
      <section className="bg-white p-6 md:p-10 rounded-lg shadow-sm">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-purple-600 mb-4">Brand Profile</h3>
          <p className="text-gray-600 mb-2">
            Upload your marketing content in bulk to build your brand profile. 
            This helps our AI understand your brand voice and style.
          </p>
          <p className="text-gray-600">
            Supported file types: .docx, .pdf, .txt, .jpg, .png
          </p>
        </div>

        {/* Upload area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 
            ${selectedFiles.length > 0 ? 'border-purple-300 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            
            <h4 className="text-lg font-medium text-gray-700 mb-2">
              Drag & drop files here
            </h4>
            <p className="text-gray-500 mb-4">or</p>
            
            <label className="bg-purple-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
              Browse Files
              <input 
                type="file" 
                multiple 
                onChange={handleFileSelect}
                className="hidden" 
                accept=".docx,.pdf,.txt,.jpg,.png"
              />
            </label>
          </div>
        </div>

        {/* Selected files list */}
        {selectedFiles.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Selected Files ({selectedFiles.length})</h4>
            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Type</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedFiles.map((file, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">{file.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{file.type || 'Unknown'}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{formatFileSize(file.size)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        {uploadSuccess && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Files uploaded successfully! Your brand profile is being analyzed.
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            {/* Toggle sample profile for demo purposes */}
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={showSampleProfile}
                onChange={() => setShowSampleProfile(!showSampleProfile)}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-600">Show demo brand profile</span>
            </label>
          </div>
          
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
            className={`py-2 px-6 rounded-lg flex items-center ${
              selectedFiles.length === 0 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            } transition-colors`}
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Upload Files
              </>
            )}
          </button>
        </div>

        {/* Brand Profile Information */}
        <div className="mt-12 border-t pt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Your Brand Profile</h3>
            {showSampleProfile && (
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                Last updated: {sampleBrandProfile.lastUpdated}
              </span>
            )}
          </div>
          
          {!showSampleProfile ? (
            // Empty state
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h4 className="text-lg font-medium text-gray-700 mb-2">No brand profile yet</h4>
              <p className="text-gray-500">
                Upload your marketing content to start building your brand profile. 
                Once processed, you'll see key insights about your brand voice and style here.
              </p>
            </div>
          ) : (
            // Sample brand profile
            <div>
              {/* Brand Overview */}
              <div className="bg-purple-50 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-bold text-purple-800 mb-3">{sampleBrandProfile.brandName}</h4>
                <p className="text-gray-700 mb-4">{sampleBrandProfile.brandDescription}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>{sampleBrandProfile.contentAnalyzed} content pieces analyzed</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Brand Voice & Tone */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Brand Voice & Tone</h4>
                  
                  <div className="mb-6">
                    <h5 className="text-sm uppercase text-gray-500 font-medium mb-3">Tone Attributes</h5>
                    <div className="space-y-3">
                      {sampleBrandProfile.toneAttributes.map(attr => (
                        <div key={attr.name} className="relative">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{attr.name}</span>
                            <span className="text-sm font-medium text-gray-700">{attr.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${getToneColor(attr.name)} h-2 rounded-full`} 
                              style={{ width: `${attr.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm uppercase text-gray-500 font-medium mb-3">Voice Characteristics</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {sampleBrandProfile.voiceCharacteristics.map(char => (
                        <div key={char.name} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getToneColor(char.name)}`}></div>
                          <span className="text-sm text-gray-700">{char.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Target Audience */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Target Audience</h4>
                  
                  <div className="mb-6">
                    <h5 className="text-sm uppercase text-gray-500 font-medium mb-3">Demographics</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {sampleBrandProfile.targetAudience.primaryDemographics.map(demo => (
                        <div key={demo.name} className="mb-2">
                          <span className="text-sm text-gray-500">{demo.name}</span>
                          <p className="text-sm font-medium text-gray-700">{demo.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm uppercase text-gray-500 font-medium mb-3">Psychographics</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sampleBrandProfile.targetAudience.psychographics.map((psycho, index) => (
                        <span 
                          key={index} 
                          className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full"
                        >
                          {psycho}
                        </span>
                      ))}
                    </div>
                    
                    <h5 className="text-sm uppercase text-gray-500 font-medium mb-3">Key Interests</h5>
                    <div className="flex flex-wrap gap-2">
                      {sampleBrandProfile.targetAudience.interests.map((interest, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Key Phrases */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Brand Language</h4>
                  <h5 className="text-sm uppercase text-gray-500 font-medium mb-3">Key Phrases</h5>
                  <div className="flex flex-wrap gap-2">
                    {sampleBrandProfile.keyPhrases.map((phrase, index) => (
                      <span 
                        key={index} 
                        className="bg-purple-100 text-purple-800 text-sm px-3 py-1.5 rounded-full"
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Competitive Analysis */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Competitive Analysis</h4>
                  <h5 className="text-sm uppercase text-gray-500 font-medium mb-3">Similar Brands</h5>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sampleBrandProfile.competitiveAnalysis.similarBrands.map((brand, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                  
                  <h5 className="text-sm uppercase text-gray-500 font-medium mb-3">Brand Differentiators</h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1.5">
                    {sampleBrandProfile.competitiveAnalysis.differentiators.map((diff, index) => (
                      <li key={index}>{diff}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Content Recommendations */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Content Recommendations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleBrandProfile.contentRecommendations.map((rec, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50"
                    >
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Call to action */}
              <div className="mt-8 text-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Generate Content Using Brand Profile
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Use your brand profile to generate content that aligns with your brand voice and audience needs.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrandProfilePage;
