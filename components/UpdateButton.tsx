"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function UpdateButton() {
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
    <>
      <Button onClick={updateLuxafor}>Update Luxafor Light</Button>
      {status && <p className="mt-4">{status}</p>}
    </>
  )
}

