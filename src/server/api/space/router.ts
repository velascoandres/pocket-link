import { 
  CreateSpaceDto, 
  CreateSpaceLinkDto, 
  DeleteSpaceDto, 
  DeleteSpaceLinkDto, 
  SearchByIdDto, 
  SearchSpaceByNameDto, 
  SearchSpaceDto, 
  UpdateSpaceDto, 
  UpdateSpaceLinkDto
} from '@/dtos'

import { createTRPCRouter, protectedProcedure } from '../trpc'

import { 
  createSpaceLinkService, 
  createSpaceService, 
  deleteSpaceService, 
  detachSpaceLinkService, 
  searchSpaceByIdService, 
  searchSpaceByNameService, 
  searchSpaceService, 
  switchSpaceLinkService, 
  updateSpaceService,
} from './services'


export const spaceRouter = createTRPCRouter({
  createSpace: protectedProcedure.input(CreateSpaceDto)
  .mutation(({ ctx, input }) => createSpaceService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  createSpaceLink: protectedProcedure.input(CreateSpaceLinkDto)
  .mutation(({ ctx, input }) => createSpaceLinkService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  updateSpace: protectedProcedure.input(UpdateSpaceDto)
  .mutation(({ ctx, input }) => updateSpaceService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  switchSpaceLink: protectedProcedure.input(UpdateSpaceLinkDto)
  .mutation(({ ctx, input }) => switchSpaceLinkService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  detachSpaceLink: protectedProcedure.input(DeleteSpaceLinkDto)
  .mutation(({ ctx, input }) => detachSpaceLinkService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  deleteSpace: protectedProcedure.input(DeleteSpaceDto)
  .mutation(({ ctx, input }) => deleteSpaceService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  searchSpace: protectedProcedure.input(SearchSpaceDto)
  .query(({ ctx, input }) => searchSpaceService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  searchSpaceByName: protectedProcedure.input(SearchSpaceByNameDto)
  .query(({ ctx, input }) => searchSpaceByNameService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  searchSpaceById: protectedProcedure.input(SearchByIdDto)
  .query(({ ctx, input }) => searchSpaceByIdService(
    ctx.db,
    {
      ...input,
      userId: ctx.session.user.id,
    }
  )),
  
})