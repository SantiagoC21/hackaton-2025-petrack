"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Wallet, Building2, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useShelterRegisterForm from "@/features/auth/hooks/useShelterRegisterForm"
import { Controller } from "react-hook-form"
import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css';
import { VerificationCodeModal } from "@/components/auth/_modals/verification-code-modal"

type AuthMode = "login" | "register"

interface ShelterAuthScreenProps {
  onBack: () => void
  onAuthenticated: () => void
}

const TEST_CREDENTIALS = { email: "refugio@test.com", password: "refugio123" }

export function ShelterAuthScreen({ onBack, onAuthenticated }: ShelterAuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showVerificationCodeModal, setShowVerificationCodeModal] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState("")
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Register hook
  const {
    passwordValue,
    passwordStrength,
    handleRegisterForSubmit,
    register,
    control,
    errors,
    handlePasswordChange
  } = useShelterRegisterForm({
    setShowVerificationCodeModal,
    setEmail: setVerificationEmail
  })

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (loginEmail === TEST_CREDENTIALS.email && loginPassword === TEST_CREDENTIALS.password) {
      onAuthenticated()
    } else {
      setLoginError(`Credenciales incorrectas. Usa: ${TEST_CREDENTIALS.email} / ${TEST_CREDENTIALS.password}`)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="relative flex w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {/* Left Side - Form */}
        <div className="flex w-full flex-col justify-center px-8 py-10 sm:px-12 lg:w-1/2">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-6 flex w-fit items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Cambiar rol
          </button>

          {/* Header */}
          <div className="mb-8 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal">
                <Building2 className="h-5 w-5 text-teal-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {mode === "login" ? "Iniciar Sesion" : "Crear Cuenta"}
                </h1>
                <p className="text-sm font-medium text-teal">Cuenta de Refugio</p>
              </div>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {mode === "login"
                ? "Ingresa tus credenciales para acceder a tu cuenta."
                : "Registra tu refugio para recibir donaciones verificadas."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={mode === "login" ? handleLoginSubmit : handleRegisterForSubmit} className="flex flex-col gap-5">
            {/* Error Message - Login */}
            {mode === "login" && loginError && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                {loginError}
              </div>
            )}

            {/* Test Credentials Hint */}
            {mode === "login" && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
                <strong>Credenciales de prueba:</strong><br />
                Email: <code className="rounded bg-muted px-1">{TEST_CREDENTIALS.email}</code><br />
                Password: <code className="rounded bg-muted px-1">{TEST_CREDENTIALS.password}</code>
              </div>
            )}

            {/* Nombre del Refugio - solo registro */}
            {mode === "register" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nombre del Refugio
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nombre del refugio"
                    className="pl-10"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-destructive">{errors.name.message}</span>
                )}
              </div>
            )}

            {/* Ubicacion del Refugio - solo registro */}
            {mode === "register" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="address" className="text-sm font-medium text-foreground">
                  Ubicacion del Refugio
                </Label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="Ciudad, Pais"
                    className="pl-10"
                    {...register("address")}
                  />
                </div>
                {errors.address && (
                  <span className="text-xs text-destructive">{errors.address.message}</span>
                )}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo Electronico
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                {mode === "login" ? (
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                ) : (
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    {...register("email")}
                  />
                )}
              </div>
              {mode === "register" && errors.email && (
                <span className="text-xs text-destructive">{errors.email.message}</span>
              )}
            </div>

            {/* Contrasena */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                {mode === "login" ? (
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contrasena segura"
                    className="pr-10 pl-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                ) : (
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contrasena segura"
                    className="pr-10 pl-10"
                    {...register("password", {
                      onChange: handlePasswordChange
                    })}
                  />
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {mode === "register" && errors.password && (
                <span className="text-xs text-destructive">{errors.password.message}</span>
              )}
              {mode === "register" && passwordStrength.label && (
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 rounded-full bg-muted">
                    <div 
                      className={`h-1 rounded-full transition-all ${
                        passwordStrength.score <= 2 ? "bg-destructive w-1/4" :
                        passwordStrength.score <= 4 ? "bg-warning w-1/2" :
                        passwordStrength.score <= 6 ? "bg-primary w-3/4" :
                        "bg-success w-full"
                      }`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{passwordStrength.label}</span>
                </div>
              )}
            </div>

            {/* Confirmar Contrasena - solo registro */}
            {mode === "register" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                  Confirmar Contrasena
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repite tu contrasena"
                    className="pr-10 pl-10"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-xs text-destructive">{errors.confirmPassword.message}</span>
                )}
              </div>
            )}

            {/* Telefono de contacto - solo registro */}
            {mode === "register" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone_number" className="text-sm font-medium text-foreground">
                  Telefono de Contacto
                </Label>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      international
                      defaultCountry="PE"
                      placeholder="Ingresa tu numero"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.phone_number && (
                  <span className="text-xs text-destructive">{errors.phone_number.message}</span>
                )}
              </div>
            )}

            {/* Olvidaste contrasena - solo login */}
            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-teal transition-colors hover:text-teal/80"
                >
                  Olvidaste tu contrasena?
                </button>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="mt-1 w-full py-5 text-base font-semibold bg-teal text-teal-foreground hover:bg-teal/90"
            >
              {mode === "login" ? "Iniciar Sesion" : "Crear Cuenta"}
            </Button>

            {/* Wallet Connect Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">o continua con</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Wallet Connect */}
            <Button
              type="button"
              variant="outline"
              className="flex w-full items-center gap-2 py-5 text-sm font-medium"
              onClick={onAuthenticated}
            >
              <Wallet className="h-4 w-4" />
              Conectar Wallet (MetaMask)
            </Button>
          </form>

          {/* Toggle Mode */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "No tienes una cuenta?" : "Ya tienes una cuenta?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-semibold text-teal transition-colors hover:text-teal/80"
            >
              {mode === "login" ? "Registrate aqui" : "Inicia sesion"}
            </button>
          </p>
        </div>

        {/* Verification Code Modal */}
        <VerificationCodeModal
          isOpen={showVerificationCodeModal}
          onClose={() => setShowVerificationCodeModal(false)}
          onVerify={onAuthenticated}
          email={verificationEmail}
          accentColor="teal"
        />

        {/* Right Side - Image */}
        <div className="relative hidden lg:block lg:w-1/2">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-teal/60 via-teal/20 to-transparent" />
          <Image
            src="/images/shelter-auth.jpg"
            alt="Refugio de animales"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/90 backdrop-blur-sm">
              <PawIcon className="h-6 w-6 text-card" />
            </div>
            <h2 className="text-2xl font-bold text-card text-balance">
              Transparencia que genera confianza
            </h2>
            <p className="text-sm leading-relaxed text-card/90 text-pretty">
              Demuestra el impacto real de tu refugio con pruebas verificables en blockchain y construye una reputacion solida.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-card/20 px-3 py-1 text-xs font-medium text-card backdrop-blur-sm">
                +150 refugios registrados
              </span>
              <span className="rounded-full bg-card/20 px-3 py-1 text-xs font-medium text-card backdrop-blur-sm">
                98% tasa de aprobacion
              </span>
            </div>
          </div>
        </div>
      </div>
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
