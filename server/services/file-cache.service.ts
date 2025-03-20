import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import * as crypto from 'crypto';

export class FileCacheService {
  private cacheDir: string;
  private DEFAULT_TTL = 3600; // 1 hour in seconds

  constructor() {
    this.cacheDir = join(process.cwd(), 'cache');
    this.ensureCacheDirectory();
  }

  private async ensureCacheDirectory() {
    try {
      await fs.mkdir(this.cacheDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create cache directory:', error);
    }
  }

  private getCacheFilePath(merchantId: string, path: string): string {
    const hash = crypto.createHash('md5').update(path).digest('hex');
    return join(this.cacheDir, `${merchantId}_${hash}.html`);
  }

  async get(merchantId: string, path: string): Promise<string | null> {
    const filePath = this.getCacheFilePath(merchantId, path);
    try {
      const stats = await fs.stat(filePath);
      const age = (Date.now() - stats.mtimeMs) / 1000;

      if (age > this.DEFAULT_TTL) {
        await fs.unlink(filePath);
        return null;
      }

      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      return null;
    }
  }

  async set(merchantId: string, path: string, content: string): Promise<void> {
    const filePath = this.getCacheFilePath(merchantId, path);
    try {
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      console.error('Failed to write cache:', error);
    }
  }

  async invalidateMerchantCache(merchantId: string): Promise<void> {
    try {
      const files = await fs.readdir(this.cacheDir);
      const merchantFiles = files.filter(file => file.startsWith(`${merchantId}_`));
      
      await Promise.all(
        merchantFiles.map(file => 
          fs.unlink(join(this.cacheDir, file))
        )
      );
    } catch (error) {
      console.error('Failed to invalidate cache:', error);
    }
  }

  async cleanup(): Promise<void> {
    try {
      const files = await fs.readdir(this.cacheDir);
      const now = Date.now();

      await Promise.all(
        files.map(async (file) => {
          const filePath = join(this.cacheDir, file);
          const stats = await fs.stat(filePath);
          const age = (now - stats.mtimeMs) / 1000;

          if (age > this.DEFAULT_TTL) {
            await fs.unlink(filePath);
          }
        })
      );
    } catch (error) {
      console.error('Failed to cleanup cache:', error);
    }
  }
}