import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="skeleton-item">
          <div className="skeleton-icon"></div>
          <div className="skeleton-content">
            <div className="skeleton-line-long"></div>
            <div className="skeleton-line-short"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
