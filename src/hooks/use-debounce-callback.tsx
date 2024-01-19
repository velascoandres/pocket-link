import React from 'react'

const DEFAULT_DEBOUNCE_TIME = 500

type CallBack = () => void

export const useDebounceCallback = (delay?: number) => {
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  const debounceCallback = React.useCallback((cb: CallBack) => {
    cleanTimer()

    timerRef.current = setTimeout(() => {  
      cb()
    }, delay ?? DEFAULT_DEBOUNCE_TIME)
  }, [delay])

  const cleanTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  React.useEffect(() => {  
    return () => {
      cleanTimer()
    }
  }, [delay])

  return debounceCallback
}