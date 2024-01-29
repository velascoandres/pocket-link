import { linkRouter } from '@/server/api/link/router'
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  link: linkRouter
})


export const createCaller = createCallerFactory(appRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
