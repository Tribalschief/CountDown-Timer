'use client'
import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
  initialMinutes: number
  initialSeconds: number
}

const Timer: React.FC<CountdownTimerProps> = ({ initialMinutes, initialSeconds }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinutes * 60 + initialSeconds)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isRunning, timeLeft])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleResume = () => setIsRunning(true)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(initialMinutes * 60 + initialSeconds)
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-center mb-4">
        Time Remaining: {formatTime(timeLeft)}
      </h2>
      {timeLeft === 0 && (
        <p className="text-2xl font-semibold text-red-600 text-center mb-4">
          Time`s up!
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {!isRunning && timeLeft === initialMinutes * 60 + initialSeconds && (
          <button
            onClick={handleStart}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={handleStop}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200"
          >
            Pause
          </button>
        )}
        {!isRunning && timeLeft < initialMinutes * 60 + initialSeconds && timeLeft > 0 && (
          <button
            onClick={handleResume}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Resume
          </button>
        )}
        {timeLeft !== initialMinutes * 60 + initialSeconds && (
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}


export default Timer