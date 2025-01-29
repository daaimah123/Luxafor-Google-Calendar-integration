import type { NextApiRequest, NextApiResponse } from "next"
import { checkAvailability } from "../../utils/googleCalendar"
import { updateLuxaforLight } from "../../utils/luxafor"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

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
    res.status(200).json({ message: `Luxafor light updated to ${color}` })
  } catch (error) {
    console.error("Error in update-luxafor API route:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

