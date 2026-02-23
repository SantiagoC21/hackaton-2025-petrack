"use client"

import { useState, useRef } from "react"
import { Controller } from "react-hook-form"
import Image from "next/image"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Wallet, Heart, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useDonorRegisterForm from "@/features/auth/hooks/useDonorRegisterForm"
import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css';

type AuthMode = "login" | "register"

interface DonorAuthScreenProps {
  onBack: () => void
  onAuthenticated: () => void
}

const TEST_CREDENTIALS = { email: "donante@test.com", password: "donante123" }

export function DonorAuthScreen({ onBack, onAuthenticated }: DonorAuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [showVerificationCodeModal, setShowVerificationCodeModal] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState(["" ,"", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newCode = [...verificationCode]
    newCode[index] = value.slice(-1)
    setVerificationCode(newCode)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newCode = [...verificationCode]
    pasted.split("").forEach((char, i) => { newCode[i] = char })
    setVerificationCode(newCode)
    const nextEmpty = newCode.findIndex((v) => !v)
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus()
  }

  const {
    register,
    control,
    errors,
    handleRegisterForSubmit,
    passwordValue,
    passwordStrength,
    handlePasswordChange,
  } = useDonorRegisterForm({
    setShowVerificationCodeModal,
    setEmail: setVerificationEmail,
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {mode === "login" ? "Iniciar Sesion" : "Crear Cuenta"}
                </h1>
                <p className="text-sm font-medium text-primary">Cuenta de Donante</p>
              </div>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {mode === "login"
                ? "Ingresa tus credenciales para acceder a tu cuenta."
                : "Registrate para donar, votar y ganar recompensas NFT."}
            </p>
          </div>

          {/* Form - Login */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              {loginError && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {loginError}
                </div>
              )}

              <div className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
                <strong>Credenciales de prueba:</strong><br />
                Email: <code className="rounded bg-muted px-1">{TEST_CREDENTIALS.email}</code><br />
                Password: <code className="rounded bg-muted px-1">{TEST_CREDENTIALS.password}</code>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="login-email" className="text-sm font-medium text-foreground">
                  Correo Electronico
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="login-password" className="text-sm font-medium text-foreground">
                  Contrasena
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contrasena segura"
                    className="pr-10 pl-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Olvidaste tu contrasena?
                </button>
              </div>

              <Button
                type="submit"
                className="mt-1 w-full py-5 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Iniciar Sesion
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">o continua con</span>
                <div className="h-px flex-1 bg-border" />
              </div>

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
          )}

          {/* Form - Register */}
          {mode === "register" && (
            <form onSubmit={handleRegisterForSubmit} className="flex flex-col gap-5">
              {/* Nombre */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nombre
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    className="pl-10"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Apellido Paterno */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="paternal_last_name" className="text-sm font-medium text-foreground">
                  Apellido Paterno
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="paternal_last_name"
                    type="text"
                    placeholder="Tu apellido paterno"
                    className="pl-10"
                    {...register("paternal_last_name")}
                  />
                </div>
                {errors.paternal_last_name && (
                  <p className="text-xs text-destructive">{errors.paternal_last_name.message}</p>
                )}
              </div>

              {/* Apellido Materno */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="maternal_last_name" className="text-sm font-medium text-foreground">
                  Apellido Materno
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="maternal_last_name"
                    type="text"
                    placeholder="Tu apellido materno"
                    className="pl-10"
                    {...register("maternal_last_name")}
                  />
                </div>
                {errors.maternal_last_name && (
                  <p className="text-xs text-destructive">{errors.maternal_last_name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo Electronico
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Telefono */}
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Telefono
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
                      className="phone-input-custom"
                    />
                  )}
                />
                {errors.phone_number && (
                  <p className="text-xs text-destructive">{errors.phone_number.message}</p>
                )}
              </div>

              {/* Contrasena */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Contrasena
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contrasena segura"
                    className="pr-10 pl-10"
                    {...register("password")}
                    onChange={handlePasswordChange}
                    value={passwordValue}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* Confirmar Contrasena */}
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
                  <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-1 w-full py-5 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Crear Cuenta
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">o continua con</span>
                <div className="h-px flex-1 bg-border" />
              </div>

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
          )}

          {/* Toggle Mode */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "No tienes una cuenta?" : "Ya tienes una cuenta?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {mode === "login" ? "Registrate aqui" : "Inicia sesion"}
            </button>
          </p>
        </div>

        {/* Verification Code Modal */}
        {showVerificationCodeModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl">
            <div className="relative mx-4 w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
              <button
                onClick={() => setShowVerificationCodeModal(false)}
                className="absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col items-center gap-5 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2 className="text-xl font-bold text-foreground">Verifica tu correo</h2>
                  <p className="text-sm text-muted-foreground">
                    Enviamos un codigo de 6 digitos a
                  </p>
                  <p className="text-sm font-semibold text-primary break-all">{verificationEmail}</p>
                </div>

                <div className="flex gap-2" onPaste={handleCodePaste}>
                  {verificationCode.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(i, e)}
                      className="h-12 w-10 rounded-xl border border-border bg-muted/50 text-center text-lg font-bold text-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                    />
                  ))}
                </div>

                <Button
                  className="w-full py-5 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    onAuthenticated()
                  }}
                  disabled={verificationCode.some((d) => !d)}
                >
                  Verificar cuenta
                </Button>

                <p className="text-xs text-muted-foreground">
                  No recibiste el correo?{" "}
                  <button
                    type="button"
                    className="font-semibold text-primary transition-colors hover:text-primary/80"
                    onClick={() => setVerificationCode(["", "", "", "", "", ""])}
                  >
                    Reenviar codigo
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Right Side - Image */}
        <div className="relative hidden lg:block lg:w-1/2">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
          <Image
            src="/images/donor-auth.jpg"
            alt="Persona rescatando un animal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/90 backdrop-blur-sm">
              <PawIcon className="h-6 w-6 text-card" />
            </div>
            <h2 className="text-2xl font-bold text-card text-balance">
              Cada donacion transforma una vida
            </h2>
            <p className="text-sm leading-relaxed text-card/90 text-pretty">
              Tus fondos son protegidos por contratos inteligentes y verificados por la comunidad antes de ser liberados.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-card/20 px-3 py-1 text-xs font-medium text-card backdrop-blur-sm">
                +2,400 donantes activos
              </span>
              <span className="rounded-full bg-card/20 px-3 py-1 text-xs font-medium text-card backdrop-blur-sm">
                100% verificado en blockchain
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
