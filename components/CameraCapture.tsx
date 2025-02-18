"use client"

import type React from "react"
import { useRef, useState, useCallback } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void
  onClose: () => void
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null)
  const [isCaptureEnabled, setCaptureEnabled] = useState(false)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      onCapture(imageSrc)
    }
  }, [onCapture]) // Removed unnecessary webcamRef dependency

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">Camera Capture</h2>
          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full">
            <X className="h-6 w-6" />
          </Button>
        </div>
        {isCaptureEnabled ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
            className="w-full rounded-lg"
          />
        ) : (
          <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
            <Button onClick={() => setCaptureEnabled(true)} className="bg-primary text-white rounded-full">
              Enable Camera
            </Button>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <Button onClick={capture} disabled={!isCaptureEnabled} className="bg-primary text-white rounded-full">
            <Camera className="mr-2 h-5 w-5" /> Capture Photo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CameraCapture

