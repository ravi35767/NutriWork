const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { Buffer } = require('node:buffer');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy configuration
app.use('/api', createProxyMiddleware({
  target: 'https://dev-api.nutriwork.app',
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/api': '/api'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Log the proxied request
    console.log('Proxying request to:', req.url);
  },
  onProxyRes: (proxyRes, req, res) => {
    let body = [];
    proxyRes.on('data', (chunk) => {
      body.push(chunk);
    });
    proxyRes.on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('Response from:', req.url, 'Body:', body);
    });
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy Error');
  }
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 