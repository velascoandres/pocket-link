export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('@/server/redis')
    console.log('🚀 Redis connection initialized')

    await import('@/server/api/link/workers')
    console.log('🚀 Workers initialized')
  }
  
}