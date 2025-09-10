import React, { useState } from 'react';
import './ResultItem.css';

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 9.5L9.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 7.5L3.5 8.5C2.39543 9.60457 2.39543 11.3954 3.5 12.5C4.60457 13.6046 6.39543 13.6046 7.5 12.5L8.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.5 8.5L12.5 7.5C13.6046 6.39543 13.6046 4.60457 12.5 3.5C11.3954 2.39543 9.60457 2.39543 8.5 3.5L7.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NewTabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 2H14V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66666 9.33333L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.91666 7L5.83332 9.91667L11.0833 4.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ResultItem = ({ item }) => {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.link || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewTab = (e) => {
    e.stopPropagation();
    window.open(item.link || window.location.href, '_blank');
  };

  const getStatusDotColor = (status) => {
    if (status === 'active') return 'green';
    if (status === 'away') return 'yellow';
    if (status === 'unactivated') return 'red';
    return '';
  };

  const getIcon = (type) => {
    switch (type) {
      case 'person':
        return (
          <div className="item-icon">
            {item.image ? (
              <img src={item.image} alt={item.name} className="avatar" />
            ) : (
              <div className="avatar-placeholder">{item.name[0]}</div>
            )}
            {item.status && (
              <div className={`status-dot ${getStatusDotColor(item.status)}`} />
            )}
          </div>
        );
      case 'folder':
        return (
          <div className="file-icon">
            <span>📁</span>
          </div>
        );
      case 'file':
      case 'video':
        return (
          <div className="file-icon">
            <span>{type === 'video' ? '🎥' : '📄'}</span>
          </div>
        );
      default:
        return (
          <div className="file-icon">
            <span>📄</span>
          </div>
        );
    }
  };

  const getSubtext = () => {
    if (item.type === 'person') {
      return item.statusText;
    }
    return item.details;
  };

  return (
    <div 
      className="result-item"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {getIcon(item.type)}
      <div className="item-content">
        <div className="item-header">
          <span className="item-name">{item.name}</span>
          {item.fileCount && <span className="file-count">{item.fileCount}</span>}
        </div>
        <div className="item-subtext">{getSubtext()}</div>
      </div>
      {showActions && (
        <div className="item-actions">
          <button 
            className="action-button"
            onClick={handleCopyLink}
          >
            <LinkIcon />
            <span className="action-tooltip">
              {copied ? (
                <>
                  <CheckIcon /> Link copied!
                </>
              ) : (
                "Copy link"
              )}
            </span>
          </button>
          <button 
            className="action-button"
            onClick={handleNewTab}
          >
            <NewTabIcon />
            <span className="action-tooltip">New Tab</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultItem;