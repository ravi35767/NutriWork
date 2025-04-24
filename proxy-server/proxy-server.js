import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy configuration
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/api': '/api'
  },
  onProxyReq: (proxyReq, req) => {
    // Log the proxied request
    console.log('Proxying request to:', req.url);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy Error');
  }
}));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 