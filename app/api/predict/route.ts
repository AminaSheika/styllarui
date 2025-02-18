import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const frontImage = formData.get("front") as File
  const leftImage = formData.get("left") as File
  const height = formData.get("height")
  const weight = formData.get("weight")
  const gender = formData.get("gender")

  const flaskApiUrl = process.env.FLASK_API_URL || "http://127.0.0.1:5000/predict"

  const flaskFormData = new FormData()
  flaskFormData.append("front", frontImage)
  flaskFormData.append("left", leftImage)
  flaskFormData.append("height", height as string)
  flaskFormData.append("weight", weight as string)
  flaskFormData.append("gender", gender as string)

  try {
    const flaskResponse = await fetch(flaskApiUrl, {
      method: "POST",
      body: flaskFormData,
    })

    if (!flaskResponse.ok) {
      throw new Error("Flask API request failed")
    }

    const data = await flaskResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 })
  }
}

