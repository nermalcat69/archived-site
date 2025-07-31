import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  
  if (!id) {
    return new Response(JSON.stringify({ error: 'Tweet ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Get theme from query params
    const url = new URL(request.url);
    const theme = url.searchParams.get('theme') || 'light';
    
    // Construct the Twitter oEmbed URL
    const tweetUrl = `https://x.com/status/${id}`;
    const oembedUrl = new URL('https://publish.twitter.com/oembed');
    oembedUrl.searchParams.set('url', tweetUrl);
    oembedUrl.searchParams.set('omit_script', 'true');
    oembedUrl.searchParams.set('dnt', 'true');
    oembedUrl.searchParams.set('theme', theme);

    // Fetch from Twitter's oEmbed API
    const response = await fetch(oembedUrl.toString());
    
    if (!response.ok) {
      throw new Error(`Twitter API responded with ${response.status}`);
    }
    
    const tweetData = await response.json();
    
    // Return cached response with proper headers
    return new Response(JSON.stringify(tweetData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400', // Cache for 1 hour, CDN for 1 day
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
    
  } catch (error) {
    console.error(`Error fetching tweet ${id}:`, error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch tweet',
      message: error instanceof Error ? error.message : 'Unknown error',
      fallbackUrl: `https://x.com/status/${id}`
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  }
};

// Prerender static tweets at build time for known tweet IDs
export async function getStaticPaths() {
  // You can add known tweet IDs here for build-time generation
  const knownTweets = [
    '1867923551296389426', // Zerops tweet
    '1949459952587997550', // Twitter scraper
    '1943879045730509214', // Discord scraper
  ];

  return knownTweets.map(id => ({
    params: { id },
  }));
}