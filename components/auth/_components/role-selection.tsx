"use client"

import { Heart, Building2, ShieldCheck, ArrowRight } from "lucide-react"

interface RoleSelectorProps {
  onSelect: (role: "donor" | "shelter") => void
}

export function RoleSelector({ onSelect }: RoleSelectorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Logo and Header */}
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <PawIcon className="h-9 w-9 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">
          Bienvenido a <span className="text-primary">Petrack</span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          Donaciones transparentes para refugios de animales, verificadas por la comunidad en blockchain.
        </p>
      </div>

      {/* Role Cards */}
      <div className="flex w-full max-w-2xl flex-col gap-5 sm:flex-row">
        {/* Donor Card */}
        <button
          onClick={() => onSelect("donor")}
          className="group relative flex flex-1 cursor-pointer flex-col items-center gap-5 rounded-2xl border-2 border-border bg-card p-8 text-card-foreground shadow-sm transition-all hover:border-primary hover:shadow-md"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold text-foreground">Soy Donante</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Dona a refugios verificados, vota en auditorias y gana recompensas NFT por tu participacion.
            </p>
          </div>
          <ul className="flex flex-col gap-2 text-left text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
              <span>Fondos protegidos por Smart Contract</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
              <span>Vota y verifica el uso de los fondos</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
              <span>Gana XP y evoluciona tu NFT Guardian</span>
            </li>
          </ul>
          <div className="mt-auto flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all group-hover:gap-3">
            Ingresar como Donante
            <ArrowRight className="h-4 w-4" />
          </div>
        </button>

        {/* Shelter Card */}
        <button
          onClick={() => onSelect("shelter")}
          className="group relative flex flex-1 cursor-pointer flex-col items-center gap-5 rounded-2xl border-2 border-border bg-card p-8 text-card-foreground shadow-sm transition-all hover:border-teal hover:shadow-md"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal/10 transition-colors group-hover:bg-teal/20">
            <Building2 className="h-10 w-10 text-teal" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold text-foreground">Soy Refugio</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Registra tu refugio, recibe donaciones verificadas y solicita fondos con transparencia total.
            </p>
          </div>
          <ul className="flex flex-col gap-2 text-left text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-teal" />
              <span>Recibe fondos directos de la comunidad</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-teal" />
              <span>Sube pruebas y solicita retiros</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-teal" />
              <span>Construye reputacion verificada</span>
            </li>
          </ul>
          <div className="mt-auto flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-teal-foreground transition-all group-hover:gap-3">
            Ingresar como Refugio
            <ArrowRight className="h-4 w-4" />
          </div>
        </button>
      </div>

      {/* Footer note */}
      <p className="mt-10 max-w-md text-center text-xs leading-relaxed text-muted-foreground">
        Petrack utiliza contratos inteligentes en blockchain para garantizar que cada donacion sea transparente, verificable y segura.
      </p>
    </div>
  )
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-4.5-4c.83 0 1.5-.67 1.5-1.5S8.33 9 7.5 9 6 9.67 6 10.5 6.67 12 7.5 12zm9 0c.83 0 1.5-.67 1.5-1.5S17.33 9 16.5 9 15 9.67 15 10.5s.67 1.5 1.5 1.5zm-4.5-6c.83 0 1.5-.67 1.5-1.5S12.83 3 12 3s-1.5.67-1.5 1.5S11.17 6 12 6z" />
    </svg>
  )
}
