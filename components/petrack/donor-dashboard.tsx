"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Wallet,
  Shield,
  CheckCircle2,
  Sparkles,
  Lock,
  Building2,
  Star,
  Info,
} from "lucide-react"

const shelters = [
  {
    id: 1,
    name: "Refugio Patitas Seguras",
    reputation: 98,
    location: "San Juan de Lurigancho",
    verified: true,
    animals: 45,
    image: "🏠",
  },
  {
    id: 2,
    name: "Hogar Feliz",
    reputation: 95,
    location: "San Isidro",
    verified: true,
    animals: 32,
    image: "🐕",
  },
  {
    id: 3,
    name: "Amigos de 4 Patas",
    reputation: 92,
    location: "San Martin de Porres",
    verified: true,
    animals: 28,
    image: "🐾",
  },
]

export function DonorDashboard() {
  const [selectedShelter, setSelectedShelter] = useState<typeof shelters[0] | null>(null)
  const [donationAmount, setDonationAmount] = useState("")

  return (
    <div className="space-y-6">
      {/* Header with user profile */}
      <div className="flex items-center justify-between rounded-2xl bg-card p-6 shadow-sm border border-border">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-teal text-2xl">
              🥚
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-success">
              <CheckCircle2 className="h-3 w-3 text-success-foreground" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">El Guardián</h2>
              <Badge variant="secondary" className="gap-1 bg-teal/10 text-teal">
                <Shield className="h-3 w-3" />
                Verificado por DNI
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Nivel 2 - Protector Emergente</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-muted px-4 py-2">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Wallet:</span>
              <span className="font-semibold text-foreground">5,000 SYS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* NFT & Gamification Section */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden border-border bg-card">
            <CardHeader className="bg-gradient-to-br from-primary/5 to-teal/5 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-warning" />
                <CardTitle className="text-base">Tu NFT Guardián</CardTitle>
              </div>
              <CardDescription>Evoluciona participando en auditorías</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                {/* NFT Display */}
                <div className="relative mb-6">
                  <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-warning/20 via-accent/10 to-teal/20 shadow-lg">
                    <span className="text-6xl animate-pulse">🥚</span>
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-warning text-sm font-bold text-warning-foreground shadow-md">
                    2
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">Huevo de Guardián</h3>
                <p className="mb-4 text-sm text-muted-foreground">Nivel 2</p>
                
                {/* XP Progress */}
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">XP para evolucionar</span>
                    <span className="font-medium text-foreground">450 / 1,000</span>
                  </div>
                  <Progress value={45} className="h-3 bg-muted" />
                  <p className="text-center text-xs text-muted-foreground">
                    ¡550 XP más para convertirte en Cachorro Guardián!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="mt-4 border-border bg-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-success/10 p-4 text-center">
                  <p className="text-2xl font-bold text-success">12</p>
                  <p className="text-xs text-muted-foreground">Auditorías</p>
                </div>
                <div className="rounded-xl bg-primary/10 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">850</p>
                  <p className="text-xs text-muted-foreground">SYS Donados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation Section - The Vault */}
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>La Bóveda - Refugios Verificados</CardTitle>
                </div>
                <Badge variant="outline" className="gap-1 border-success/30 text-success">
                  <CheckCircle2 className="h-3 w-3" />
                  Smart Contract Activo
                </Badge>
              </div>
              <CardDescription>
                Selecciona un refugio para donar. Tus fondos se aseguran en un Smart Contract.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shelters.map((shelter) => (
                  <div
                    key={shelter.id}
                    className={`group cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-primary/50 hover:bg-primary/5 ${
                      selectedShelter?.id === shelter.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedShelter(shelter)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                          {shelter.image}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{shelter.name}</h3>
                            {shelter.verified && (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {shelter.location}
                            </span>
                            <span>{shelter.animals} animales</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="font-semibold text-foreground">{shelter.reputation}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Reputación</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Donation Action */}
              {selectedShelter && (
                <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Donar a {selectedShelter.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Fondos protegidos por Smart Contract
                      </p>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                        <Lock className="h-4 w-4" />
                        Donar a la Bóveda del Refugio
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-primary" />
                          Donar a la Bóveda
                        </DialogTitle>
                        <DialogDescription>
                          Los fondos se guardan en un Smart Contract y solo se liberan tras
                          verificación comunitaria.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="rounded-xl bg-muted p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-xl">
                              {selectedShelter.image}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{selectedShelter.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Reputación: {selectedShelter.reputation}/100
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="amount">Cantidad a donar (SYS)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="100"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="bg-background"
                          />
                          <p className="text-xs text-muted-foreground">
                            Balance disponible: 5,000 SYS
                          </p>
                        </div>

                        <Button className="w-full gap-2 bg-success text-success-foreground hover:bg-success/90">
                          <CheckCircle2 className="h-4 w-4" />
                          Confirmar Donación
                        </Button>

                        <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <p className="text-xs text-muted-foreground">
                            Tus fondos se aseguran en un Smart Contract y solo se liberan tras
                            verificación comunitaria. El refugio deberá apostar sus propios fondos
                            como garantía.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    Tus fondos se aseguran en un Smart Contract y solo se liberan tras verificación
                    comunitaria.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
