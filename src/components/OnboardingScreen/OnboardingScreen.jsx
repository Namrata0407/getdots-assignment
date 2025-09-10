import './OnboardingScreen.css';

const OnboardingScreen = ({ onDismiss }) => {
  const searchExamples = [
    { text: 'Search for files', icon: '📄' },
    { text: 'Find people', icon: '👥' },
    { text: 'Browse chats', icon: '💬' },
    { text: 'Check lists', icon: '📝' }
  ];

  return (
    <div className="onboarding-screen">
      <div className="onboarding-content">
        <h1>Welcome to Dots</h1>
        <p className="subtitle">Your universal search companion</p>
        
        <div className="search-tips">
          <h2>Start searching</h2>
          <div className="examples-grid">
            {searchExamples.map((example, index) => (
              <div key={index} className="example-card">
                <span className="example-icon">{example.icon}</span>
                <span className="example-text">{example.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-tips">
          <h2>Quick Tips</h2>
          <ul>
            <li>🔍 Type anything to start searching</li>
            <li>⚡ Use tabs to filter results by type</li>
            <li>⚙️ Customize your search in settings</li>
          </ul>
        </div>

        <button className="dismiss-button" onClick={onDismiss}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
