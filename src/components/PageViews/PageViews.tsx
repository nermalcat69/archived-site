import { useEffect, useState } from 'react';

interface PageViewsProps {
  path: string;
  className?: string;
}

export function PageViews({ path, className = '' }: PageViewsProps) {
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // First, increment the page view
        const response = await fetch(`/api/pageviews${path}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to track page view');
        }

        const data = await response.json();
        setViews(data.views || 0);
      } catch (err) {
        console.error('Error tracking page view:', err);
        setError(true);
        
        // Fallback: try to get views without incrementing
        try {
          const fallbackResponse = await fetch(`/api/pageviews${path}`, {
            method: 'GET',
          });
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setViews(fallbackData.views || 0);
          }
        } catch (fallbackErr) {
          console.error('Error getting page views:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    trackPageView();
  }, [path]);

  if (loading) {
    return (
      <div className={`page-views ${className}`}>
        <span className="views-count">
          <span className="views-icon">👁️</span>
          <span className="views-text">Loading...</span>
        </span>
      </div>
    );
  }

  if (error && views === 0) {
    return null; // Don't show anything if there's an error and no views
  }

  return (
    <div className={`page-views ${className}`}>
      <span className="views-count">
        <span className="views-icon">👁️</span>
        <span className="views-text">
          {views.toLocaleString()} {views === 1 ? 'view' : 'views'}
        </span>
      </span>
    </div>
  );
}