import { createProxyMiddleware } from 'http-proxy-middleware';
import { env } from '../../config/env.js';
import { logger } from '../logger/logger.js';

export const authProxy = createProxyMiddleware({
  pathFilter: ['/auth', '/user', '/session'],

  target: env.AUTH_SERVICE_URL,
  changeOrigin: true,

  on: {
    proxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('x-target-audience', env.APP_NAME);
      proxyReq.setHeader('x-forwarded-for', req.ip || req.socket.remoteAddress);

      logger.info(
        `[Gateway] Proxying Full Path: ${req.originalUrl} -> ${env.AUTH_SERVICE_URL}${req.url}`,
      );
    },
    error: (err, req, res) => {
      res.status(502).json({
        success: false,
        message: 'Auth Service unreachable.',
      });
    },
  },
});
