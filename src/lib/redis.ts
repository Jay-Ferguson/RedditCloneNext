import {Redis} from '@upstash/redis'

export const redis = new Redis({
     url: process.env.REDIS_URL!,
     token:process.env.REDIS_SECRET!
})

  await redis.set('key', 'value');
  const data = await redis.get('key');