import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { FileCacheService } from './server/services/file-cache.service';
import { TransferState, makeStateKey } from '@angular/core';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');


  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  const cacheService = new FileCacheService();

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine with caching
  server.get('*', async (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    
    // Extract merchantId directly from the URL path
    console.log('url',originalUrl);
    const merchantId = originalUrl.split('/')[1] || 'default';
    console.log('merchantId:', merchantId);
    console.log('url after',originalUrl);

    try {
      const cacheKey = `${merchantId}_${originalUrl.split('/').join('_')}`;
      console.log('cachekey',cacheKey);

      // Check cache first
      const cached = await cacheService.get(merchantId, cacheKey);
      if (cached) {
        console.log(`Cache hit for merchant ${merchantId}: ${originalUrl}`);
        return res.send(cached);
      }


      // If not in cache, render the page with merchant-specific meta tags
      const html = await commonEngine.render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
        ],
      });

      // Cache the rendered HTML
      await cacheService.set(merchantId, cacheKey, html);
      
      return res.send(html);
    } catch (error) {
      console.error('Rendering error:', error);
      return next(error);
    }
  });

  return server;
}



function run(): void {
  const port = process.env['PORT'] || 4000;
  console.clear(); // Clear terminal
  console.log('='.repeat(50));
  console.log('Starting SSR Server');
  console.log('='.repeat(50));
  
  const server = app();
  server.listen(port, () => {
    console.log('\n📁 Project root:', process.cwd());
    console.log('🌐 Server URL:', `http://localhost:${port}`);
    console.log('🔄 SSR enabled with caching');
    console.log('='.repeat(50));
  });
}

run();
