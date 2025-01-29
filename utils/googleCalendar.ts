import { google } from "googleapis"
import { JWT } from "google-auth-library"

// Parse the credentials from the environment variable
const credentials = JSON.parse(process.env.GOOGLE_CALENDAR_CREDENTIALS || "{}")

// Create a new JWT client using the credentials
const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
})

// Create a Calendar client
const calendar = google.calendar({
  version: "v3",
  auth: auth as any, // Type assertion to avoid TypeScript error
})

export async function checkAvailability(): Promise<"busy" | "available" | "no meetings"> {
  const now = new Date()
  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999)

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: "primary" }],
      },
    })

    const busyPeriods = response.data.calendars?.primary.busy || []

    if (busyPeriods.length === 0) {
      return "no meetings"
    }

    const currentEvent = busyPeriods.find((period) => {
      const start = new Date(period.start || "")
      const end = new Date(period.end || "")
      return now >= start && now < end
    })

    return currentEvent ? "busy" : "available"
  } catch (error) {
    console.error("Error checking calendar availability:", error)
    throw error
  }
}
