import { useCallback, useEffect, useRef, useState } from 'react'

export const TIMER_MODES = Object.freeze({
  focus: Object.freeze({
    label: 'Focus 25',
    name: 'Focus session',
    seconds: 1500,
  }),
  shortBreak: Object.freeze({
    label: 'Short break 5',
    name: 'Short break',
    seconds: 300,
  }),
  longBreak: Object.freeze({
    label: 'Long break 15',
    name: 'Long break',
    seconds: 900,
  }),
})

const TICK_INTERVAL_MS = 250

export function useCountdown(onComplete) {
  const [mode, setMode] = useState('focus')
  const [remainingSeconds, setRemainingSeconds] = useState(TIMER_MODES.focus.seconds)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const deadlineRef = useRef(null)
  const intervalRef = useRef(null)
  const generationRef = useRef(0)
  const completedGenerationRef = useRef(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const clearActiveInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const completeGeneration = useCallback(
    (generation, completedMode) => {
      if (
        generation !== generationRef.current ||
        completedGenerationRef.current === generation
      ) {
        return false
      }

      completedGenerationRef.current = generation
      clearActiveInterval()
      setRemainingSeconds(0)
      setIsRunning(false)
      onCompleteRef.current(completedMode)
      return true
    },
    [clearActiveInterval],
  )

  const completeIfElapsed = useCallback(() => {
    if (
      !isRunning ||
      deadlineRef.current === null ||
      deadlineRef.current > Date.now()
    ) {
      return false
    }

    return completeGeneration(generationRef.current, mode)
  }, [completeGeneration, isRunning, mode])

  useEffect(() => {
    if (!isRunning) {
      return undefined
    }

    const generation = generationRef.current

    const tick = () => {
      if (generation !== generationRef.current || deadlineRef.current === null) {
        return
      }

      const nextSeconds = Math.max(
        0,
        Math.ceil((deadlineRef.current - Date.now()) / 1000),
      )

      if (nextSeconds === 0) {
        completeGeneration(generation, mode)
        return
      }

      setRemainingSeconds(nextSeconds)
    }

    const intervalId = window.setInterval(tick, TICK_INTERVAL_MS)
    intervalRef.current = intervalId
    tick()

    return () => {
      window.clearInterval(intervalId)
      if (intervalRef.current === intervalId) {
        intervalRef.current = null
      }
    }
  }, [completeGeneration, isRunning, mode])

  useEffect(() => clearActiveInterval, [clearActiveInterval])

  const start = useCallback(() => {
    if (isRunning || remainingSeconds <= 0) {
      return
    }

    deadlineRef.current = Date.now() + remainingSeconds * 1000
    setHasStarted(true)
    setIsRunning(true)
  }, [isRunning, remainingSeconds])

  const pause = useCallback(() => {
    if (!isRunning || deadlineRef.current === null) {
      return
    }

    if (completeIfElapsed()) {
      return
    }

    const pausedSeconds = Math.max(
      0,
      Math.ceil((deadlineRef.current - Date.now()) / 1000),
    )

    clearActiveInterval()
    setRemainingSeconds(pausedSeconds)
    setIsRunning(false)
  }, [clearActiveInterval, completeIfElapsed, isRunning])

  const reset = useCallback(() => {
    completeIfElapsed()
    generationRef.current += 1
    completedGenerationRef.current = null
    deadlineRef.current = null
    clearActiveInterval()
    setRemainingSeconds(TIMER_MODES[mode].seconds)
    setIsRunning(false)
    setHasStarted(false)
  }, [clearActiveInterval, completeIfElapsed, mode])

  const selectMode = useCallback(
    (nextMode) => {
      if (!TIMER_MODES[nextMode] || nextMode === mode) {
        return
      }

      completeIfElapsed()
      generationRef.current += 1
      completedGenerationRef.current = null
      deadlineRef.current = null
      clearActiveInterval()
      setMode(nextMode)
      setRemainingSeconds(TIMER_MODES[nextMode].seconds)
      setIsRunning(false)
      setHasStarted(false)
    },
    [clearActiveInterval, completeIfElapsed, mode],
  )

  return {
    mode,
    remainingSeconds,
    isRunning,
    hasStarted,
    start,
    pause,
    reset,
    selectMode,
  }
}
