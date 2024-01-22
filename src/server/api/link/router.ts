import { 
  CreateLinkDto, 
  DeleteLinkDto, 
  SearchByPathDto, 
  SearchDto, 
  UpdateLinkDto } from '../../../dtos/link'
import { createTRPCRouter, protectedProcedure } from '../trpc'

import { 
  createLinkService, 
  deleteUserLinkService, 
  searchLinkByPathService, 
  searchUserLinksService, 
  updateLinkService 
} from './services'


export const linkRouter = createTRPCRouter({
  searchLinkByPath: protectedProcedure.input(SearchByPathDto)
  .query(({ ctx, input }) => {
    return searchLinkByPathService(ctx.db, {
      path: input.path,
    })
  }),
  getUserLinks: protectedProcedure.input(SearchDto)
  .query(({ ctx, input }) => {
    return searchUserLinksService(ctx.db, {
      ...input,
      createdById: ctx.session.user.id,
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