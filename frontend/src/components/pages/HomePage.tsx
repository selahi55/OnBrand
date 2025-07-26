import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h2>Version Control for Marketing Content</h2>
          <p className="hero-subtitle">
            Streamline your marketing workflow with AI-powered content management
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            {/* In a real app, you would use an actual image here */}
            <div className="placeholder-text">Platform Preview</div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h3 className="section-title">Key Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h4>Content Version Control</h4>
            <p>Track changes to your marketing content like developers track code. Never lose a version again.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h4>Real-time Suggestions</h4>
            <p>Get AI-powered suggestions as you write to improve engagement and brand consistency.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h4>Automated QA</h4>
            <p>Marketing Intelligence reviews your content changes to ensure quality and brand alignment.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h4>Seamless Collaboration</h4>
            <p>Work together with your team on content creation and approval workflows.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h3 className="section-title">How It Works</h3>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Upload Your Content</h4>
              <p>Add your posts and captions to the platform to start tracking versions.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Make Changes with AI Assistance</h4>
              <p>Edit your content with real-time AI suggestions to improve quality.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Automated QA Review</h4>
              <p>Let Marketing Intelligence review your changes for brand consistency.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Publish with Confidence</h4>
              <p>Deploy your approved content knowing it meets your brand standards.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
