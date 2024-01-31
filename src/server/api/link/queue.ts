import { Queue } from 'bullmq'

import CONSTANTS from '@/server/constants'
import { redisConn } from '@/server/redis'


export const linkQueue = new Queue(CONSTANTS.QUEUES.LINK_QUEUE, {
  connection: redisConn,
  defaultJobOptions: {
    attempts: 2,
    delay: CONSTANTS.JOB_DELAY_TIME,
    backoff: {
      type: 'exponential',
      delay: CONSTANTS.JOB_BACKOFF_DELAY_TIME,
    },
  },
})