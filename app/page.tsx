"use client"

import { useState } from "react"
import { DonorDashboard } from "@/components/petrack/donor-dashboard"
import { ShelterDashboard } from "@/components/petrack/shelter-dashboard"
import { VotingCenter } from "@/components/petrack/voting-center"
import { ResultsScreen } from "@/components/petrack/results-screen"
import { RoleSelector } from "@/components/auth/_components/role-selection"
import { AuthScreen } from "@/components/auth/_components/auth-screen"

type AppState = "role-selection" | "auth" | "dashboard"

export default function PetrackMockup() {
  const [appState, setAppState] = useState<AppState>("role-selection")
  const [selectedRole, setSelectedRole] = useState<"donor" | "shelter" | null>(null)
  const [activeScreen, setActiveScreen] = useState<string>("")

  const handleSelectRole = (role: "donor" | "shelter") => {
    setSelectedRole(role)
    setAppState("auth")
  }

  const handleBackToRoleSelection = () => {
    setSelectedRole(null)
    setAppState("role-selection")
  }

  const handleAuthenticated = () => {
    setActiveScreen(selectedRole === "donor" ? "donor" : "shelter")
    setAppState("dashboard")
  }

  const handleLogout = () => {
    setSelectedRole(null)
    setAppState("role-selection")
  }

  // Show role selection screen
  if (appState === "role-selection") {
    return <RoleSelector onSelect={handleSelectRole} />
  }

  // Show auth screen
  if (appState === "auth" && selectedRole) {
    return (
      <AuthScreen
        role={selectedRole}
        onBack={handleBackToRoleSelection}
        onAuthenticated={handleAuthenticated}
      />
    )
  }

  // Screens filtered by role
  const donorScreens = [
    { id: "donor", name: "Mi Panel", component: <DonorDashboard /> },
    { id: "voting", name: "Votación", component: <VotingCenter /> },
    { id: "results", name: "Resultados", component: <ResultsScreen /> },
  ]

  const shelterScreens = [
    { id: "shelter", name: "Mi Refugio", component: <ShelterDashboard /> },
    { id: "results", name: "Resultados", component: <ResultsScreen /> },
  ]

  const screens = selectedRole === "donor" ? donorScreens : shelterScreens

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
            <button
              onClick={handleLogout}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Cerrar Sesión
            </button>
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
