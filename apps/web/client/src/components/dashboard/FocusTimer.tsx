
//type 2
import * as React from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FocusTimer() {
  const [isActive, setIsActive] = React.useState(false)
  const [mode, setMode] = React.useState<"focus" | "break">("focus")
  const [timeLeft, setTimeLeft] = React.useState(25 * 60)
  
  // Settings
  const [focusLength, setFocusLength] = React.useState(25)
  const [breakLength, setBreakLength] = React.useState(5)

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const toggleTimer = () => setIsActive(!isActive)
  
  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(mode === "focus" ? focusLength * 60 : breakLength * 60)
  }

  const handleLengthChange = (type: "focus" | "break", val: number) => {
    if (type === "focus") {
      setFocusLength(val)
      if (mode === "focus") {
        setTimeLeft(val * 60)
        setIsActive(false)
      }
    } else {
      setBreakLength(val)
      if (mode === "break") {
        setTimeLeft(val * 60)
        setIsActive(false)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Adjusted size for "Compressed" look
  const radius = 60 // Reduced from 80
  const circumference = 2 * Math.PI * radius
  const totalTime = mode === "focus" ? focusLength * 60 : breakLength * 60
  const progress = ((totalTime - timeLeft) / totalTime) * circumference

  return (
    // Reduced padding (p-4) and max-width to keep it tight
    <Card className="flex flex-row items-center gap-6 p-4 bg-[#F9F9F7] border-none shadow-none w-full">
      
      {/* Left Side: Circular Timer & Controls */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-40 w-40 flex items-center justify-center">
          <svg className="transform -rotate-90 w-full h-full">
            <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="6" fill="white" className="text-gray-200" />
            <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={circumference} strokeDashoffset={progress} strokeLinecap="round" className="text-[#5D836C] transition-all duration-1000 ease-linear" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold text-[#2C3E34] font-serif">{formatTime(timeLeft)}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{mode}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={toggleTimer} size="sm" className="bg-[#6B8E78] hover:bg-[#5a7a65] text-white rounded-full h-8 px-4 text-xs">
            {isActive ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" size="icon" onClick={resetTimer} className="rounded-full h-8 w-8 border-[#6B8E78] text-[#6B8E78]">
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Right Side: Settings (Stacked vertically now to save horizontal space) */}
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase">Session (Min)</span>
          <div className="flex gap-1">
            {[15, 25, 45, 60].map((val) => (
              <button
                key={val}
                onClick={() => handleLengthChange("focus", val)}
                className={cn(
                  "flex-1 py-1 rounded text-xs font-medium transition-colors border border-transparent",
                  focusLength === val ? "bg-[#6B8E78] text-white shadow-sm" : "bg-white text-gray-600 hover:border-gray-200"
                )}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">Break (Min)</span>
          <div className="flex gap-1">
            {[5, 10, 15].map((val) => (
              <button
                key={val}
                onClick={() => handleLengthChange("break", val)}
                className={cn(
                  "flex-1 py-1 rounded text-xs font-medium transition-colors border border-transparent",
                  breakLength === val ? "bg-[#5D836C] text-white shadow-sm" : "bg-white text-gray-600 hover:border-gray-200"
                )}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}