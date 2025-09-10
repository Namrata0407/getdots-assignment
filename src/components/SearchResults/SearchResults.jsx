import ResultItem from '../ResultItem/ResultItem';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import './SearchResults.css';

const SearchResults = ({ results, activeTab, isLoading }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  const filteredResults = results.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'files') return item.type === 'file' || item.type === 'video';
    if (activeTab === 'people') return item.type === 'person';
    return true;
  });

  return (
    <div className="search-results">
      {filteredResults.map((item, index) => (
        <ResultItem key={item.id || index} item={item} />
      ))}
    </div>
  );
};

export default SearchResults;