import { 
  CreateLinkDto, 
  DeleteLinkDto, 
  SearchByPathDto, 
  SearchDto, 
  SearchLinkAnalyticsDto, 
  UpdateLinkDto 
} from '@/dtos/link'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

import { searchInteractionAnalyticsService } from './services/search-interaction-analytics.service'
import { 
  createLinkService, 
  createTemporalLinkService, 
  deleteUserLinkService, 
  searchLinkByPathService, 
  searchLinksService, 
  updateLinkService,
} from './services'


export const linkRouter = createTRPCRouter({
  searchInteractionAnalytics: protectedProcedure.input(SearchLinkAnalyticsDto)
  .query(({ ctx, input }) => searchInteractionAnalyticsService(ctx.db, {
    linkId: input.linkId,
    startDate: input.startDate,
    endDate: input.endDate,
  })),
  searchLinkByPath: publicProcedure.input(SearchByPathDto)
  .query(({ ctx, input }) => {
    return searchLinkByPathService(ctx.db, {
      path: input.path,
    })
  }),
  getUserLinks: protectedProcedure.input(SearchDto)
  .query(({ ctx, input }) => {
    return searchLinksService(ctx.db, {
      ...input,
      createdById: ctx.session.user.id,
    })
  }),
  getTemporalLinks: publicProcedure.input(SearchDto)
  .query(({ ctx, input }) => {
    return searchLinksService(ctx.db, {
      ...input,
      isPublic: true,
    })
  }),
  deleteUserLink: protectedProcedure.input(DeleteLinkDto)
  .mutation(({ ctx, input }) => {
    return deleteUserLinkService(ctx.db, {
      id: input.id,
      createdById: ctx.session.user.id,
    })
  }),
  create: protectedProcedure.input(CreateLinkDto)
  .mutation(({ ctx, input }) => {

    const options = {
      name: input.name,
      path: input.path,
      originalLink: input.originalLink,
      createdById: ctx.session.user.id,
    }

    return createLinkService(
      ctx.db, options
    )
  }),
  createTemporalLink: publicProcedure.input(CreateLinkDto)
  .mutation(({ ctx, input }) => {

    const options = {
      name: input.name,
      path: input.path,
      originalLink: input.originalLink,
    }

    return createTemporalLinkService(
      ctx.db, options
    )
  }),
  update: protectedProcedure.input(UpdateLinkDto)
  .mutation(({ ctx, input }) => {

    const options = {
      id: input.id,
      name: input.name,
      path: input.path,
      originalLink: input.originalLink,
      createdById: ctx.session.user.id,
    }

    return updateLinkService(
      ctx.db, options
    )
  })
})
