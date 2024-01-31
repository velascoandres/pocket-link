export async function register() {
  await import('@/server/redis')
  console.log('🚀 Redis connection initialized')

  await import('@/server/api/link/workers')
  console.log('🚀 Workers initialized')
}