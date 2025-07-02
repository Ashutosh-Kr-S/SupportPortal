"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { RotateCcw } from "lucide-react"

interface CaptchaProps {
  onVerify: (verified: boolean) => void
  isEnabled?: boolean
  reset?: boolean
}

const Captcha = ({ onVerify, isEnabled = true, reset }: CaptchaProps) => {
  const [captchaText, setCaptchaText] = useState("")
  const [userCaptchaInput, setUserCaptchaInput] = useState("")
  const [message, setMessage] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotated, setRotated] = useState(false)

  const generateRandomString = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 180
    canvas.height = 48
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Clean government-style background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#f8fafc")
    gradient.addColorStop(1, "#f1f5f9")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Minimal noise for security
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(100, 116, 139, 0.1)`
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1)
    }

    // Professional character rendering
    const charWidth = canvas.width / 6
    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const x = i * charWidth + charWidth / 2
      const y = canvas.height / 2

      ctx.font = "22px 'Segoe UI', system-ui, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#1e40af" // Government blue

      ctx.save()
      const rotation = (Math.random() - 0.5) * 0.3
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.fillText(char, 0, 0)
      ctx.restore()
    }
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  useEffect(() => {
    if (reset !== undefined) {
      setUserCaptchaInput("")
      setMessage("")
      generateCaptcha()
    }
    // eslint-disable-next-line
  }, [reset])

  const generateCaptcha = () => {
    const random = generateRandomString()
    setCaptchaText(random)
    setUserCaptchaInput("")
    setMessage("")
    onVerify(false)

    setTimeout(() => {
      drawCaptcha(random)
    }, 50)
  }

  const verifyCaptcha = () => {
    if (!captchaText) {
      setMessage("CAPTCHA has expired. Generating a new one.")
      generateCaptcha()
      return false
    } else if (userCaptchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      setMessage("Invalid CAPTCHA text. Please try again.")
      setTimeout(() => {
        generateCaptcha()
      }, 2000)
      return false
    } else {
      onVerify(true)
      return true
    }
  }

  const handleVerify = (e: React.MouseEvent) => {
    e.preventDefault()
    verifyCaptcha()
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <canvas
            ref={canvasRef}
            width={180}
            height={48}
            className="border border-slate-300 rounded bg-white"
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
          />
        </div>
        <div className="flex-grow">
          <input
            type="text"
            required
            placeholder="Enter CAPTCHA text"
            value={userCaptchaInput}
            onChange={(e) => setUserCaptchaInput(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setRotated(!rotated)
            generateCaptcha()
          }}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50"
        >
          <RotateCcw className={`w-4 h-4 transition-transform duration-300 ${rotated ? "rotate-180" : ""}`} />
          Refresh
        </button>
        <button
          onClick={handleVerify}
          disabled={!isEnabled}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            isEnabled ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          Verify
        </button>
      </div>

      {message && (
        <div
          className={`p-3 rounded border ${
            message.includes("Invalid") || message.includes("expired")
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-green-50 text-green-700 border-green-200"
          }`}
        >
          {message}
        </div>
      )}

      <input type="hidden" name="randomString" value={captchaText} />
    </div>
  )
}

export default Captcha
