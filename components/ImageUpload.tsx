"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Upload } from "lucide-react"
import CameraCapture from "./CameraCapture"

interface ImageUploadProps {
  id: string
  onImageCapture: (file: File) => void
}

export default function ImageUpload({ id, onImageCapture }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageCapture(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleCameraClick = () => {
    setShowCamera(true)
  }

  const handleCameraCapture = (imageSrc: string) => {
    setPreviewUrl(imageSrc)
    setShowCamera(false)

    // Convert base64 to blob
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" })
        onImageCapture(file)
      })
  }

  return (
    <div className="space-y-2">
      <Input type="file" id={id} accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
      <div className="flex space-x-2">
        <Button
          type="button"
          onClick={handleCameraClick}
          variant="outline"
          className="flex-1 bg-white text-primary hover:bg-gray-200 rounded-full"
        >
          <Camera className="mr-2 h-4 w-4" /> Capture
        </Button>
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="flex-1 bg-white text-primary hover:bg-gray-200 rounded-full"
        >
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </div>
      {previewUrl && (
        <div className="mt-2 border rounded-lg overflow-hidden">
          <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-auto" />
        </div>
      )}
      {showCamera && <CameraCapture onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />}
    </div>
  )
}

