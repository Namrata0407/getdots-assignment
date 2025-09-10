import './SearchBar.css';

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

const SearchBar = ({ value, onSearch, isLoading }) => {
  const handleClear = () => {
    onSearch('');
  };

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <div className="search-icon">
          {isLoading ? <LoadingSpinner /> : <SearchIcon />}
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Searching is easier"
          className="search-input"
        />
        {value ? (
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        ) : (
          <div className="quick-access">
            <span className="shortcut-key">S</span>
            <span className="quick-access-text">quick access</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;