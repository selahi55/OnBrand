import './FeaturesPage.css';

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <section className="features-detail-section">
        <div className="feature-detail">
          <h3>Content Version Control</h3>
          <p>
            Just like developers use Git to track changes to code, on.brand provides a robust version control system for your marketing content. 
            Every change is tracked, allowing you to:
          </p>
          <ul>
            <li>View the complete history of your content</li>
            <li>Compare different versions side by side</li>
            <li>Revert to previous versions if needed</li>
            <li>Branch content for different campaigns or audiences</li>
            <li>Merge successful content variations back into the main version</li>
          </ul>
          <p>
            Never lose track of your content evolution again. Every edit, every improvement, and every iteration is preserved.
          </p>
        </div>

        <div className="feature-detail">
          <h3>Real-time AI Suggestions</h3>
          <p>
            As you write, our AI assistant provides real-time suggestions to improve your content:
          </p>
          <ul>
            <li>Grammar and style improvements</li>
            <li>Tone and voice consistency with your brand guidelines</li>
            <li>Engagement optimization based on platform-specific best practices</li>
            <li>SEO recommendations for better discoverability</li>
            <li>Sentiment analysis to ensure your message resonates with your audience</li>
          </ul>
          <p>
            The suggestions appear as you type, allowing you to accept or ignore them based on your judgment.
          </p>
        </div>

        <div className="feature-detail">
          <h3>Automated QA with Marketing Intelligence</h3>
          <p>
            Before your content goes live, our Marketing Intelligence AI performs a comprehensive review:
          </p>
          <ul>
            <li>Brand compliance check against your established guidelines</li>
            <li>Audience alignment analysis</li>
            <li>Platform-specific optimization recommendations</li>
            <li>Potential engagement prediction</li>
            <li>Content consistency verification across your marketing materials</li>
          </ul>
          <p>
            This automated QA step ensures that all your content meets your quality standards and brand requirements before publication.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
