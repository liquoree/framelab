import { useRef, useState } from "react"
import { type Frame } from "../../frames"

export function usePlayer(frames: Frame[]) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playBtnIsShown, setPlayBtnIsShown] = useState(true)

  const intervalRef = useRef<number | null>(null)

  const play = (fps: number) => {
    setCurrentFrame(0)
    setPlayBtnIsShown(false)
    setIsPlaying(true)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentFrame(prev => {
        if (prev >= frames.length - 1) {
          finish()
          return prev
        }
        return prev + 1
      })
    }, 1000 / fps)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setCurrentFrame(0)
    setIsPlaying(false)
    setPlayBtnIsShown(true)
  }

    const finish = () => {
        if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        }
        setIsPlaying(false)
        setPlayBtnIsShown(true)
    }

  return {
    currentFrame,
    isPlaying,
    playBtnIsShown,
    play,
    stop,
  }
}
