'use client'

import React from 'react'
import { AppProgressBar as NProgressBar } from 'next-nprogress-bar'

export const ProgressBar = () => {
  return (
    <NProgressBar
      color="#FACC15"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}
