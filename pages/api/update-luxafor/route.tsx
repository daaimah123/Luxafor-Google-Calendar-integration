import { NextResponse } from "next/server"
import { checkAvailability } from "../../../utils/googleCalendar"
import { updateLuxaforLight } from "../../../utils/luxafor"

export async function POST() {
  try {
    const availability = await checkAvailability()
    let color: "red" | "green" | "off"

    switch (availability) {
      case "busy":
        color = "red"
        break
      case "available":
        color = "green"
        break
      case "no meetings":
        color = "off"
        break
    }

    await updateLuxaforLight(color)
    return NextResponse.json({ message: `Luxafor light updated to ${color}` }, { status: 200 })
  } catch (error) {
    console.error("Error in update-luxafor API route:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "API is working" }, { status: 200 })
}

