const LUXAFOR_API_URL = "https://api.luxafor.com/webhook/v1/actions/solid_color"

type LuxaforColor = "red" | "green" | "off"

export async function updateLuxaforLight(color: LuxaforColor): Promise<void> {
  const colorMap: Record<LuxaforColor, string> = {
    red: "#FF0000",
    green: "#00FF00",
    off: "#000000",
  }

  const payload = {
    userId: process.env.LUXAFOR_WEBHOOK_API_KEY,
    actionFields: {
      color: colorMap[color],
    },
  }

  try {
    const response = await fetch(LUXAFOR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error("Error updating Luxafor light:", error)
    throw error
  }
}

