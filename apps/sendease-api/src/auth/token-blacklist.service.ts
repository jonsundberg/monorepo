import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TokenBlacklistService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async blacklistToken(token: string, expirationTime: number): Promise<void> {
    await this.cacheManager.set(`bl_${token}`, '1', expirationTime);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const result = await this.cacheManager.get(`bl_${token}`);
    return result === '1';
  }
}
