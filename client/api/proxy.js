// api/proxy.js - Vercel Serverless Function to proxy requests to Railway
const { createProxyMiddleware } = require('http-proxy-middleware');

// Target backend URL
const BACKEND_URL = 'https://icyizere-v2-production.up.railway.app';

// Export the middleware factory function
module.exports = (req, res) => {
  // Don't allow this to be used in a browser
  res.setHeader('x-content-type-options', 'nosniff');
  
  // Create the proxy middleware (configured to match your needs)
  let proxy = createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true, // Changes the origin of the host header to the target URL
    pathRewrite: {
      '^/api': '/api', // No rewriting needed since we're keeping /api prefix
    },
    secure: true, // Verify SSL certificates
    onProxyReq: (proxyReq, req, res) => {
      // Add any custom headers for the backend
      proxyReq.setHeader('x-forwarded-host', req.headers.host);
      console.log('Proxying request:', req.method, req.url, 'to:', BACKEND_URL + req.url);
    },
    onProxyRes: (proxyRes, req, res) => {
      // Log the response from the backend
      console.log('Received response:', proxyRes.statusCode, 'from:', BACKEND_URL + req.url);
    },
    onError: (err, req, res) => {
      // Handle any errors that occur during proxying
      console.error('Proxy error:', err);
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Proxy error', error: err.message }));
    }
  });

  // Run the proxy
  return proxy(req, res);
};
