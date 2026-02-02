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
  Building2,
  CheckCircle2,
  Star,
  Lock,
  Upload,
  Coins,
  AlertTriangle,
  FileText,
  Camera,
  Wallet,
  Shield,
  TrendingUp,
  Clock,
} from "lucide-react"

const recentRequests = [
  {
    id: 1,
    amount: 300,
    stake: 60,
    status: "approved",
    date: "15 Ene 2026",
    description: "Vacunas mensuales",
  },
  {
    id: 2,
    amount: 200,
    stake: 40,
    status: "approved",
    date: "10 Ene 2026",
    description: "Alimento premium",
  },
  {
    id: 3,
    amount: 150,
    stake: 30,
    status: "pending",
    date: "20 Ene 2026",
    description: "Material quirúrgico",
  },
]

export function ShelterDashboard() {
  const [requestAmount, setRequestAmount] = useState("")
  const [showStakingModal, setShowStakingModal] = useState(false)
  const stakePercentage = 20

  const calculatedStake = requestAmount ? (Number(requestAmount) * stakePercentage) / 100 : 0

  return (
    <div className="space-y-6">
      {/* Shelter Profile Header */}
      <div className="flex items-center justify-between rounded-2xl bg-card p-6 shadow-sm border border-border">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-success to-teal text-3xl">
              🏠
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-success">
              <CheckCircle2 className="h-4 w-4 text-success-foreground" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-foreground">Refugio Patitas Seguras</h2>
              <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                <Shield className="h-3 w-3" />
                Verificado
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Ciudad de México • 45 animales activos</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Reputation Score */}
          <div className="rounded-xl bg-warning/10 px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-5 w-5 fill-warning text-warning" />
              <span className="text-2xl font-bold text-foreground">98</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <p className="text-xs text-muted-foreground">Score de Reputación</p>
            <Badge className="mt-1 bg-success/20 text-success hover:bg-success/20">Nivel Alto</Badge>
          </div>
          {/* Wallet */}
          <div className="rounded-xl bg-muted px-4 py-3">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Balance:</span>
              <span className="font-semibold text-foreground">2,500 SYS</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Disponible para fianzas</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Vault Status - Main Card */}
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Estado de la Bóveda</CardTitle>
                </div>
                <Badge variant="outline" className="gap-1 border-success/30 text-success">
                  <TrendingUp className="h-3 w-3" />
                  Fondos Activos
                </Badge>
              </div>
              <CardDescription>
                Fondos donados disponibles para solicitar liberación
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Frozen Funds Display */}
              <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary/10 via-teal/5 to-success/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Fondos Congelados en Bóveda</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">1,000</span>
                      <span className="text-xl text-muted-foreground">SYS</span>
                    </div>
                    <p className="mt-1 text-sm text-success">Disponibles para solicitar</p>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-sm">
                    <Lock className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>

              {/* Request Action */}
              <Dialog open={showStakingModal} onOpenChange={setShowStakingModal}>
                <DialogTrigger asChild>
                  <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                    <FileText className="h-4 w-4" />
                    Crear Nueva Solicitud de Fondos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-card">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-warning" />
                      Solicitud de Liberación de Fondos
                    </DialogTitle>
                    <DialogDescription>
                      Debes depositar una fianza (staking) como garantía de uso correcto
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-5 pt-4">
                    {/* Upload Proof Section */}
                    <div className="space-y-2">
                      <Label className="text-foreground">Subir Prueba</Label>
                      <div className="rounded-xl border-2 border-dashed border-border bg-muted/50 p-6 text-center transition-colors hover:border-primary/50 hover:bg-muted">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Camera className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Subir Factura/Foto Prueba</p>
                            <p className="text-sm text-muted-foreground">
                              Arrastra o haz clic para seleccionar
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2 gap-1 bg-transparent">
                            <Upload className="h-4 w-4" />
                            Seleccionar Archivo
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-2">
                      <Label htmlFor="request-amount">Monto a Solicitar (SYS)</Label>
                      <Input
                        id="request-amount"
                        type="number"
                        placeholder="500"
                        value={requestAmount}
                        onChange={(e) => setRequestAmount(e.target.value)}
                        className="bg-background text-lg"
                      />
                      <p className="text-xs text-muted-foreground">
                        Máximo disponible: 1,000 SYS
                      </p>
                    </div>

                    {/* Staking Requirement - Critical Element */}
                    <div className="rounded-xl border-2 border-warning/50 bg-warning/10 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warning">
                          <Coins className="h-5 w-5 text-warning-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            Fianza Requerida (Staking)
                          </h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Debes depositar el {stakePercentage}% del monto solicitado como garantía
                          </p>
                          <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-warning">
                              {calculatedStake || 100}
                            </span>
                            <span className="text-lg text-muted-foreground">SYS</span>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Esta fianza será devuelta si la comunidad aprueba tu solicitud
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Warning Notice */}
                    <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-destructive">Importante:</span> Si la
                        comunidad rechaza tu solicitud, perderás la fianza depositada. Asegúrate de
                        subir pruebas claras y verídicas.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full gap-2 bg-success text-success-foreground hover:bg-success/90" size="lg">
                      <Coins className="h-4 w-4" />
                      Depositar Fianza y Enviar Solicitud
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Solicitudes Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-xl border border-border bg-muted/30 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{request.amount} SYS</span>
                    <Badge
                      variant={request.status === "approved" ? "default" : "secondary"}
                      className={
                        request.status === "approved"
                          ? "bg-success/20 text-success hover:bg-success/20"
                          : "bg-warning/20 text-warning hover:bg-warning/20"
                      }
                    >
                      {request.status === "approved" ? "Aprobado" : "Pendiente"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{request.description}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Fianza: {request.stake} SYS</span>
                    <span>{request.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <Card className="mt-4 border-border bg-card">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tasa de Aprobación</span>
                    <span className="font-semibold text-success">96%</span>
                  </div>
                  <Progress value={96} className="mt-2 h-2 bg-muted" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-success/10 p-3 text-center">
                    <p className="text-lg font-bold text-success">24</p>
                    <p className="text-xs text-muted-foreground">Aprobadas</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3 text-center">
                    <p className="text-lg font-bold text-primary">1</p>
                    <p className="text-xs text-muted-foreground">Rechazadas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
