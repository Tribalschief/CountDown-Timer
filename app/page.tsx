'use client'
import React, { useState } from 'react';
import Timer from '../components/Timer';

const Home: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [showTimer, setShowTimer] = useState<boolean>(false)

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setMinutes(isNaN(value) ? 0 : value)
  }

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setSeconds(isNaN(value) ? 0 : Math.min(59, value))
  }

  const handleSetTimer = () => {
    setShowTimer(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Countdown Timer</h1>
        {!showTimer ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <label className="flex flex-col">
                <span className="mb-1 font-medium">Minutes:</span>
                <input
                  type="number"
                  value={minutes}
                  onChange={handleMinutesChange}
                  min="0"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1 font-medium">Seconds:</span>
                <input
                  type="number"
                  value={seconds}
                  onChange={handleSecondsChange}
                  min="0"
                  max="59"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
            <button
              onClick={handleSetTimer}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Set Timer
            </button>
          </div>
        ) : (
          <Timer initialMinutes={minutes} initialSeconds={seconds} />
        )}
      </div>
    </div>
  )
}

export default Home;