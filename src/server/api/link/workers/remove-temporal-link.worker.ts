import { type Job, Worker } from 'bullmq'

import CONSTANTS from '@/server/constants'
import { redisConn } from '@/server/redis'

export const removeTemporalLinkworker = new Worker(
  CONSTANTS.QUEUES.LINK_QUEUE,
  async (job: Job<{link: {id: string}}>) => {
    
    console.log(job.data.link)
  },
  {
    connection: redisConn,
    concurrency: 5,
    removeOnComplete: { count: CONSTANTS.JOB_DELAY_REMOVE_TIME },
    removeOnFail: { count: CONSTANTS.JOB_DELAY_TIME },
  }
)
