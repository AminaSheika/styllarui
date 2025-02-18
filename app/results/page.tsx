"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import MeasurementsDisplay from "../../components/MeasurementsDisplay"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Results() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [measurements, setMeasurements] = useState<Record<string, number> | null>(null)

  useEffect(() => {
    const measurementsParam = searchParams.get("measurements")
    if (measurementsParam) {
      try {
        const parsedMeasurements = JSON.parse(decodeURIComponent(measurementsParam))
        setMeasurements(parsedMeasurements)
      } catch (error) {
        console.error("Error parsing measurements:", error)
      }
    }
  }, [searchParams])

  if (!measurements) {
    return (
      <div className="text-center text-lg text-primary">No measurements available. Please perform a scan first.</div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">Your Body Measurements</h1>
      <MeasurementsDisplay measurements={measurements} />
      <div className="mt-8 text-center">
        <Button
          onClick={() => router.push("/scan")}
          className="bg-white hover:bg-gray-200 text-primary text-lg px-6 py-3 rounded-full"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Perform Another Scan
        </Button>
      </div>
    </div>
  )
}

