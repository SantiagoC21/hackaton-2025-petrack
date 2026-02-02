"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  Coins,
  ArrowUp,
  Bell,
  Gift,
  Star,
  TrendingUp,
  Clock,
} from "lucide-react"

const activityHistory = [
  {
    id: 1,
    type: "success",
    title: "¡Auditoría Exitosa!",
    description: "El Refugio Patitas Seguras recibió los fondos y recuperó su fianza.",
    xpGained: 50,
    timestamp: "Hace 2 horas",
    details: {
      shelter: "Refugio Patitas Seguras",
      amount: 500,
      yourVote: "yes",
      result: "approved",
    },
  },
  {
    id: 2,
    type: "success",
    title: "Donación Procesada",
    description: "Tu donación de 100 SYS ha sido depositada en la bóveda.",
    xpGained: 25,
    timestamp: "Hace 5 horas",
    details: {
      shelter: "Hogar Feliz",
      amount: 100,
    },
  },
  {
    id: 3,
    type: "rejected",
    title: "Solicitud Rechazada",
    description: "La comunidad rechazó la solicitud. La fianza fue redistribuida.",
    xpGained: 50,
    timestamp: "Hace 1 día",
    details: {
      shelter: "Refugio Esperanza",
      amount: 200,
      yourVote: "no",
      result: "rejected",
    },
  },
  {
    id: 4,
    type: "levelup",
    title: "¡Subiste de Nivel!",
    description: "Tu NFT evolucionó de Huevo Nvl 1 a Huevo Nvl 2.",
    xpGained: 0,
    timestamp: "Hace 2 días",
  },
]

export function ResultsScreen() {
  return (
    <div className="space-y-6">
      {/* Success Celebration Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-success/20 via-teal/10 to-warning/20 p-8 border border-success/30">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-success/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-warning/10 blur-3xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              {/* Glowing NFT */}
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-warning/30 via-accent/20 to-teal/30 shadow-lg">
                <span className="text-6xl animate-pulse">🥚</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 animate-pulse rounded-3xl bg-warning/20 blur-xl" />
              {/* Level badge */}
              <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-warning text-lg font-bold text-warning-foreground shadow-lg">
                2
              </div>
              {/* Sparkle */}
              <Sparkles className="absolute -left-2 -top-2 h-6 w-6 animate-pulse text-warning" />
              <Sparkles className="absolute -bottom-1 -right-4 h-5 w-5 animate-pulse text-success" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-success" />
                <h2 className="text-2xl font-bold text-foreground">¡Auditoría Exitosa!</h2>
              </div>
              <p className="mt-1 text-muted-foreground">
                El Refugio Patitas Seguras recibió los fondos y recuperó su fianza.
              </p>
              <div className="mt-3 flex items-center gap-4">
                <Badge className="gap-1 bg-success/20 text-success hover:bg-success/20">
                  <CheckCircle2 className="h-3 w-3" />
                  Votaste Correctamente
                </Badge>
                <Badge className="gap-1 bg-warning/20 text-warning hover:bg-warning/20">
                  <Sparkles className="h-3 w-3" />
                  +50 XP Ganados
                </Badge>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tu NFT está brillando</p>
            <div className="mt-2 flex items-center justify-end gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="text-lg font-semibold text-success">+50 XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* NFT Evolution Progress */}
        <div className="lg:col-span-1">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" />
                <CardTitle className="text-base">Progreso de Evolución</CardTitle>
              </div>
              <CardDescription>Tu NFT Guardián está creciendo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {/* Current NFT */}
                <div className="relative mb-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-warning/20 to-teal/20">
                    <span className="text-5xl">🥚</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                    Nivel 2
                  </div>
                </div>

                {/* XP Progress */}
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">XP Actual</span>
                    <span className="font-semibold text-foreground">500 / 1,000</span>
                  </div>
                  <Progress value={50} className="h-3 bg-muted" />
                </div>

                {/* Next Evolution Preview */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl opacity-50">
                      🥚
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Actual</p>
                  </div>
                  <ArrowUp className="h-5 w-5 rotate-90 text-muted-foreground" />
                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/20 text-2xl">
                      🐶
                    </div>
                    <p className="mt-1 text-xs font-medium text-warning">Siguiente</p>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  ¡500 XP más para convertirte en Cachorro Guardián!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <Card className="mt-4 border-border bg-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-success/10 p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-xl font-bold text-success">23</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Votos Correctos</p>
                </div>
                <div className="rounded-xl bg-primary/10 p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Coins className="h-4 w-4 text-primary" />
                    <span className="text-xl font-bold text-primary">850</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">SYS Donados</p>
                </div>
                <div className="rounded-xl bg-warning/10 p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-warning" />
                    <span className="text-xl font-bold text-warning">1,250</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">XP Total</p>
                </div>
                <div className="rounded-xl bg-teal/10 p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Gift className="h-4 w-4 text-teal" />
                    <span className="text-xl font-bold text-teal">3</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">NFTs Ganados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity History */}
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle>Historial de Actividad</CardTitle>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Últimos 7 días
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityHistory.map((activity) => (
                  <div
                    key={activity.id}
                    className={`rounded-xl border p-4 transition-all ${
                      activity.type === "success"
                        ? "border-success/30 bg-success/5"
                        : activity.type === "rejected"
                          ? "border-destructive/30 bg-destructive/5"
                          : "border-warning/30 bg-warning/5"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                          activity.type === "success"
                            ? "bg-success/20"
                            : activity.type === "rejected"
                              ? "bg-destructive/20"
                              : "bg-warning/20"
                        }`}
                      >
                        {activity.type === "success" ? (
                          <CheckCircle2
                            className={`h-5 w-5 ${
                              activity.type === "success" ? "text-success" : ""
                            }`}
                          />
                        ) : activity.type === "rejected" ? (
                          <XCircle className="h-5 w-5 text-destructive" />
                        ) : (
                          <Sparkles className="h-5 w-5 text-warning" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground">{activity.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {activity.description}
                        </p>

                        {/* Details */}
                        {activity.details && (
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {activity.details.shelter && (
                              <Badge variant="outline" className="text-xs">
                                {activity.details.shelter}
                              </Badge>
                            )}
                            {activity.details.amount && (
                              <Badge variant="outline" className="text-xs">
                                {activity.details.amount} SYS
                              </Badge>
                            )}
                            {activity.details.yourVote && (
                              <Badge
                                className={`text-xs ${
                                  activity.details.yourVote === "yes"
                                    ? "bg-success/20 text-success hover:bg-success/20"
                                    : "bg-destructive/20 text-destructive hover:bg-destructive/20"
                                }`}
                              >
                                Tu voto: {activity.details.yourVote === "yes" ? "SÍ" : "NO"}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* XP Gained */}
                        {activity.xpGained > 0 && (
                          <div className="mt-2 flex items-center gap-1">
                            <Sparkles className="h-4 w-4 text-warning" />
                            <span className="text-sm font-medium text-warning">
                              +{activity.xpGained} XP
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
