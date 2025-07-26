import { useState, useEffect } from 'react'
import './App.css'
import Layout from './components/layout/Layout'
import HomePage from './components/pages/HomePage'
import FeaturesPage from './components/pages/FeaturesPage'
import DashboardPage from './components/pages/DashboardPage'
import CreatePostPage from './components/pages/CreatePostPage'
import PostReviewPage from './components/pages/PostReviewPage'
import BrandProfilePage from './components/pages/BrandProfilePage'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [routeParams, setRouteParams] = useState<{[key: string]: string}>({})

  // Initialize the active page based on the URL hash
  useEffect(() => {
    const parseHash = (hash: string) => {
      // Remove the leading '#/'
      const path = hash.replace('#/', '');

      // Check if this is a route with parameters
      if (path.startsWith('post-review/')) {
        const postId = path.split('/')[1];
        setActivePage('post-review');
        setRouteParams({ postId });
      } else {
        setActivePage(path);
        setRouteParams({});
      }
    };

    const hash = window.location.hash;
    if (hash) {
      parseHash(hash);
    } else {
      // If no hash, set to home and update URL
      window.location.hash = '#/home';
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash) {
        parseHash(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Clean up event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigate = (page: string) => {
    window.location.hash = `#/${page}`;
    setActivePage(page);
  }

  const getPageTitle = () => {
    switch (activePage) {
      case 'home':
        return 'Welcome to on.brand'
      case 'dashboard':
        return 'Dashboard'
      case 'create-post':
        return 'Create New Post'
      case 'post-review':
        return 'Post Review'
      case 'brand-profile':
        return 'Brand Profile'
      case 'features':
        return 'Features'
      case 'pricing':
        return 'Pricing'
      case 'about':
        return 'About Us'
      default:
        return 'on.brand'
    }
  }

  const renderPage = () => {
    console.log(activePage);
    switch (activePage) {
      case 'home':
        return <HomePage />
      case 'dashboard':
        return <DashboardPage />
      case 'create-post':
        return <CreatePostPage />
      case 'post-review':
        return <PostReviewPage postId={routeParams.postId} />
      case 'brand-profile':
        return <BrandProfilePage />
      case 'features':
        return <FeaturesPage />
      case 'pricing':
        return <div className="placeholder-page">Pricing information coming soon!</div>
      case 'about':
        return <div className="placeholder-page">Learn more about our team and mission soon!</div>
      default:
        return <HomePage />
    }
  }

  // Cast the result of renderPage() to any to avoid TypeScript errors
  const pageContent = renderPage() as any;

  return (
    <Layout 
      activePage={activePage} 
      onNavigate={handleNavigate} 
      pageTitle={getPageTitle()}
    >
      {pageContent}
    </Layout>
  )
}

export default App
