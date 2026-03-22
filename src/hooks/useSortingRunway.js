import { useState, useRef, useCallback, useEffect } from 'react'
import { ALGORITHMS } from '../data/algorithms'

const ARRAY_SIZE = 12

function generateArray() {
  return Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 82) + 12)
}

function speedToDelay(speed) {
  // SPEED 1–100 → 220ms–5ms 
  return Math.round(220 - (speed - 1) * (215 / 99))
}

const INITIAL_STATE = {
  array: generateArray(),
  comparing: [],
  swapping: [],
  sorted: [],
  isRunning: false,
  isDone: false,
  steps: 0,
  swaps: 0,
}

export function useSortingRunway() {
  const [algorithmId, setAlgorithmId] = useState('bubble')
  const [state, setState] = useState(INITIAL_STATE)
  const [speed, setSpeedState] = useState(50)

  const genRef     = useRef(null)
  const intervalRef = useRef(null)
  const stepsRef   = useRef(0)
  const swapsRef   = useRef(0)
  const speedRef   = useRef(50)
  const baseArray  = useRef(INITIAL_STATE.array)
  const isRunningRef = useRef(false)

  speedRef.current = speed

  // CLEARING INTERVAL --------------------------
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const tick = useCallback(() => {
    if (!genRef.current) return
    const result = genRef.current.next()

    if (result.done) {
      clearTimer()
      isRunningRef.current = false
      setState(prev => ({
        ...prev,
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: prev.array.length }, (_, i) => i),
        isRunning: false,
        isDone: true,
        steps: stepsRef.current,
        swaps: swapsRef.current,
      }))
      return
    }

    const { array, comparing, swapping, sorted, isSwap } = result.value
    stepsRef.current++
    if (isSwap) swapsRef.current++

    setState(prev => ({
      ...prev,
      array,
      comparing,
      swapping,
      sorted,
      steps: stepsRef.current,
      swaps: swapsRef.current,
    }))
  }, [clearTimer])

  // STARTING INTERVAL --------------------------
  const startTimer = useCallback(() => {
    clearTimer()
    intervalRef.current = setInterval(tick, speedToDelay(speedRef.current))
  }, [clearTimer, tick])

  // SETTING SPEED --------------------------
  const setSpeed = useCallback((newSpeed) => {
    setSpeedState(newSpeed)
    speedRef.current = newSpeed
    if (isRunningRef.current) {
      clearTimer()
      intervalRef.current = setInterval(tick, speedToDelay(newSpeed))
    }
  }, [clearTimer, tick])

  // STARTING THE SORT --------------------------
  const start = useCallback(() => {
    if (isRunningRef.current || state.isDone) return
    const algo = ALGORITHMS[algorithmId]
    if (!algo) return

    const arr = [...baseArray.current]
    genRef.current = algo.gen(arr)
    stepsRef.current = 0
    swapsRef.current = 0
    isRunningRef.current = true

    setState(prev => ({ ...prev, isRunning: true, isDone: false, steps: 0, swaps: 0 }))
    startTimer()
  }, [algorithmId, state.isDone, startTimer])

  // RESETING / SHUFFLING --------------------------
  const reset = useCallback((newAlgoId) => {
    clearTimer()
    genRef.current = null
    isRunningRef.current = false
    stepsRef.current = 0
    swapsRef.current = 0

    const newArray = generateArray()
    baseArray.current = newArray

    if (newAlgoId && newAlgoId !== algorithmId) {
      setAlgorithmId(newAlgoId)
    }

    setState({
      array: newArray,
      comparing: [],
      swapping: [],
      sorted: [],
      isRunning: false,
      isDone: false,
      steps: 0,
      swaps: 0,
    })
  }, [clearTimer, algorithmId])

  // SWITCHING ALGOS --------------------------
  const switchAlgorithm = useCallback((id) => {
    if (id === algorithmId && !state.isRunning) {
      reset(id)
      return
    }
    clearTimer()
    genRef.current = null
    isRunningRef.current = false
    stepsRef.current = 0
    swapsRef.current = 0

    const newArray = generateArray()
    baseArray.current = newArray
    setAlgorithmId(id)

    setState({
      array: newArray,
      comparing: [],
      swapping: [],
      sorted: [],
      isRunning: false,
      isDone: false,
      steps: 0,
      swaps: 0,
    })
  }, [algorithmId, state.isRunning, clearTimer, reset])

  // CLEANING UP --------------------------
  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  const meta = ALGORITHMS[algorithmId]

  return {
    algorithm: algorithmId,
    meta,
    state,
    speed,
    setSpeed,
    start,
    reset: () => reset(),
    switchAlgorithm,
  }
}