"use client"

import { useState } from "react"
import { DonorDashboard } from "@/components/petrack/donor-dashboard"
import { ShelterDashboard } from "@/components/petrack/shelter-dashboard"
import { VotingCenter } from "@/components/petrack/voting-center"
import { ResultsScreen } from "@/components/petrack/results-screen"

export default function PetrackMockup() {
  const [activeScreen, setActiveScreen] = useState<number>(1)

  const screens = [
    { id: 1, name: "Donante", component: <DonorDashboard /> },
    { id: 2, name: "Refugio", component: <ShelterDashboard /> },
    { id: 3, name: "Votación", component: <VotingCenter /> },
    { id: 4, name: "Resultados", component: <ResultsScreen /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center">
              <PawIcon className="h-10 w-10 object-contain" />
            </div>
            <span className="text-xl font-bold text-foreground">Petrack</span>
          </div>
          <nav className="flex items-center gap-1 rounded-full bg-muted p-1">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeScreen === screen.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {screen.name}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Mockup UI</span>
          </div>
        </div>
      </header>

      {/* Screen Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {screens.find((s) => s.id === activeScreen)?.component}
      </main>
    </div>
  )
}

function PawIcon({ className }: { className?: string }) {
  return (
    <img
      src="/petrack.png"
      alt="Petrack Logo"
      className={className}
    />
  )
}
