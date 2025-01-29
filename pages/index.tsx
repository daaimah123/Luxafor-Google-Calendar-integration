import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [status, setStatus] = useState<string | null>(null)

  const updateLuxafor = async () => {
    setStatus("Updating...")
    try {
      const response = await fetch("/api/update-luxafor", { method: "POST" })
      const data = await response.json()
      setStatus(data.message)
    } catch (error) {
      setStatus("Error updating Luxafor light")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Luxafor Google Calendar Integration</h1>
      <Button onClick={updateLuxafor}>Update Luxafor Light</Button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}

