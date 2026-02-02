"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  Zap,
  Eye,
  Users,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  ZoomIn,
} from "lucide-react"

const pendingVotes = [
  {
    id: 1,
    shelter: "Refugio Patitas Seguras",
    amount: 500,
    stake: 100,
    reputation: 98,
    description: "Cirugía de emergencia para un perro rescatado",
    proofImage: "🧾",
    timeRemaining: "14h 30m",
    currentVotes: { yes: 60, no: 40 },
    totalVoters: 45,
    xpReward: 50,
  },
  {
    id: 2,
    shelter: "Hogar Feliz",
    amount: 300,
    stake: 60,
    reputation: 95,
    description: "Compra mensual de alimento premium",
    proofImage: "📄",
    timeRemaining: "23h 15m",
    currentVotes: { yes: 75, no: 25 },
    totalVoters: 32,
    xpReward: 50,
  },
]

export function VotingCenter() {
  const [selectedVote, setSelectedVote] = useState<number | null>(null)
  const [hasVoted, setHasVoted] = useState<{ [key: number]: "yes" | "no" | null }>({})

  const handleVote = (voteId: number, decision: "yes" | "no") => {
    setHasVoted((prev) => ({ ...prev, [voteId]: decision }))
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-teal/5 to-warning/10 p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-warning" />
              <h1 className="text-2xl font-bold text-foreground">Misiones de Verificación</h1>
            </div>
            <p className="mt-1 text-muted-foreground">
              Audita solicitudes de refugios y gana XP para evolucionar tu NFT
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-card px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Auditorías hoy:</span>
                <span className="font-bold text-foreground">3/5</span>
              </div>
            </div>
            <div className="rounded-xl bg-warning/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning" />
                <span className="font-bold text-warning">+150 XP</span>
                <span className="text-sm text-muted-foreground">disponibles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voting Cards */}
      <div className="space-y-6">
        {pendingVotes.map((vote) => (
          <Card
            key={vote.id}
            className={`overflow-hidden border-border bg-card transition-all ${
              selectedVote === vote.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning">
                    <Clock className="h-3 w-3" />
                    {vote.timeRemaining}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Zap className="h-3 w-3 text-warning" />
                    +{vote.xpReward} XP
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium text-foreground">{vote.reputation}/100</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Side - The Proof */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-foreground">La Prueba</h3>
                  </div>

                  {/* Proof Image/Document */}
                  <div
                    className="group relative cursor-pointer rounded-xl border border-border bg-muted/50 p-8 text-center transition-all hover:border-primary/50"
                    onClick={() => setSelectedVote(selectedVote === vote.id ? null : vote.id)}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-card text-5xl shadow-sm">
                        {vote.proofImage}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Recibo Veterinario</p>
                        <p className="text-sm text-muted-foreground">
                          Cirugía realizada el 18 Ene 2026
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 opacity-0 transition-opacity group-hover:opacity-100 bg-transparent"
                      >
                        <ZoomIn className="h-4 w-4" />
                        Ver Detalle
                      </Button>
                    </div>
                  </div>

                  {/* Proof Details */}
                  <div className="rounded-lg bg-muted/30 p-3">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Descripción:</span>{" "}
                      {vote.description}
                    </p>
                  </div>
                </div>

                {/* Right Side - The Decision */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-foreground">La Decisión</h3>
                  </div>

                  {/* Request Info */}
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-xl">
                        🏠
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{vote.shelter}</p>
                        <p className="text-sm text-muted-foreground">
                          Solicita{" "}
                          <span className="font-semibold text-foreground">{vote.amount} SYS</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        Fianza: {vote.stake} SYS
                      </Badge>
                    </div>
                  </div>

                  {/* Current Votes Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Votos actuales</span>
                      <span className="text-muted-foreground">{vote.totalVoters} votantes</span>
                    </div>
                    <div className="flex h-4 overflow-hidden rounded-full">
                      <div
                        className="bg-success transition-all"
                        style={{ width: `${vote.currentVotes.yes}%` }}
                      />
                      <div
                        className="bg-destructive transition-all"
                        style={{ width: `${vote.currentVotes.no}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-success">
                        <ThumbsUp className="h-3 w-3" />
                        {vote.currentVotes.yes}% SÍ
                      </span>
                      <span className="flex items-center gap-1 text-destructive">
                        <ThumbsDown className="h-3 w-3" />
                        {vote.currentVotes.no}% NO
                      </span>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  {hasVoted[vote.id] ? (
                    <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-center">
                      <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
                      <p className="mt-2 font-medium text-foreground">
                        ¡Votaste{" "}
                        <span
                          className={
                            hasVoted[vote.id] === "yes" ? "text-success" : "text-destructive"
                          }
                        >
                          {hasVoted[vote.id] === "yes" ? "SÍ" : "NO"}
                        </span>
                        !
                      </p>
                      <p className="text-sm text-muted-foreground">+{vote.xpReward} XP ganados</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        className="h-14 gap-2 bg-success text-success-foreground hover:bg-success/90"
                        size="lg"
                        onClick={() => handleVote(vote.id, "yes")}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold">APROBAR</div>
                          <div className="text-xs opacity-80">+{vote.xpReward} XP</div>
                        </div>
                      </Button>
                      <Button
                        className="h-14 gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        size="lg"
                        onClick={() => handleVote(vote.id, "no")}
                      >
                        <XCircle className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold">RECHAZAR</div>
                          <div className="text-xs opacity-80">+{vote.xpReward} XP</div>
                        </div>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
