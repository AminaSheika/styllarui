"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import ImageUpload from "./ImageUpload"

export default function BodyMeasurementForm() {
  const router = useRouter()
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [leftImage, setLeftImage] = useState<File | null>(null)
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [gender, setGender] = useState<string>("1")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    if (frontImage) formData.append("front", frontImage)
    if (leftImage) formData.append("left", leftImage)
    formData.append("height", height)
    formData.append("weight", weight)
    formData.append("gender", gender)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to fetch measurements")
      }

      const data = await response.json()
      router.push(`/results?measurements=${encodeURIComponent(JSON.stringify(data.measurements))}`)
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred while fetching measurements")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="frontImage" className="text-white">
                Front Image
              </Label>
              <ImageUpload id="frontImage" onImageCapture={setFrontImage} />
            </div>
            <div>
              <Label htmlFor="leftImage" className="text-white">
                Left Image
              </Label>
              <ImageUpload id="leftImage" onImageCapture={setLeftImage} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="height" className="text-white">
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                className="bg-white text-primary rounded-full"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-white">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="bg-white text-primary rounded-full"
              />
            </div>
          </div>
          <div>
            <Label className="text-white">Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="male" />
                <Label htmlFor="male" className="text-white">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="female" />
                <Label htmlFor="female" className="text-white">
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-200 text-primary text-lg py-3 rounded-full"
          >
            {isLoading ? "Processing..." : "Get Measurements"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

