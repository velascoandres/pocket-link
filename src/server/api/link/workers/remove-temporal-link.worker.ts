import { type Job, Worker } from 'bullmq'

import { deleteLinkService } from '@/server/api/link/services'
import CONSTANTS from '@/server/constants'
import { db } from '@/server/db'
import { redisConn } from '@/server/redis'

export const removeTemporalLinkworker = new Worker(
  CONSTANTS.QUEUES.LINK_QUEUE,
  async (job: Job<{id: number}>) => {

    console.log('🚀 removing temporal link: ', job.data.id)
    
    await deleteLinkService(db, job.data.id)
  },
  {
    connection: redisConn,
    concurrency: 5,
    removeOnComplete: { count: CONSTANTS.JOB_DELAY_REMOVE_TIME },
    removeOnFail: { count: CONSTANTS.JOB_DELAY_REMOVE_TIME },
  }
)
