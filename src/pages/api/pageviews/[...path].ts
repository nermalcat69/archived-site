import type { APIRoute } from 'astro';
import { incrementPageView, getPageViews } from '../../../lib/redis';

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const path = params.path || '';
    const decodedPath = decodeURIComponent(Array.isArray(path) ? path.join('/') : path);
    
    const views = await getPageViews(`/${decodedPath}`);
    
    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error getting page views:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get page views',
      views: 0 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const path = params.path || '';
    const decodedPath = decodeURIComponent(Array.isArray(path) ? path.join('/') : path);
    
    // Only increment if this is not a bot/crawler
    const userAgent = request.headers.get('user-agent') || '';
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    
    if (isBot) {
      const views = await getPageViews(`/${decodedPath}`);
      return new Response(JSON.stringify({ views }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
    }
    
    const views = await incrementPageView(`/${decodedPath}`);
    
    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error incrementing page views:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to increment page views',
      views: 0 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  }
};