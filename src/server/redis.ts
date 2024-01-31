import Redis from 'ioredis'

import { env } from '@/env'

const globalForRedis = globalThis as unknown as {
    redis: Redis | undefined;
  }
  
export const redisConn = globalForRedis.redis ?? new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
})
  
if (env.NODE_ENV !== 'production') globalForRedis.redis = redisConn
