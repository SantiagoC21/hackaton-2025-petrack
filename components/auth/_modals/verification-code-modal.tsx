"use client"

import { useState, useRef } from "react"
import { ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VerificationCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: () => void
  email: string
  accentColor?: "primary" | "teal"
}

export function VerificationCodeModal({
  isOpen,
  onClose,
  onVerify,
  email,
  accentColor = "primary"
}: VerificationCodeModalProps) {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
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

  const handleResendCode = () => {
    setVerificationCode(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  const handleClose = () => {
    setVerificationCode(["", "", "", "", "", ""])
    onClose()
  }

  if (!isOpen) return null

  const isPrimary = accentColor === "primary"

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl">
      <div className="relative mx-4 w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center gap-5 text-center">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${isPrimary ? "bg-primary/10" : "bg-teal/10"}`}>
            <ShieldCheck className={`h-7 w-7 ${isPrimary ? "text-primary" : "text-teal"}`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl font-bold text-foreground">Verifica tu correo</h2>
            <p className="text-sm text-muted-foreground">
              Enviamos un codigo de 6 digitos a
            </p>
            <p className={`text-sm font-semibold break-all ${isPrimary ? "text-primary" : "text-teal"}`}>
              {email}
            </p>
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
                className={`h-12 w-10 rounded-xl border border-border bg-muted/50 text-center text-lg font-bold text-foreground outline-none transition-all ${
                  isPrimary 
                    ? "focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                    : "focus:border-teal focus:bg-background focus:ring-2 focus:ring-teal/20"
                }`}
              />
            ))}
          </div>

          <Button
            className={`w-full py-5 text-base font-semibold ${
              isPrimary
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-teal text-teal-foreground hover:bg-teal/90"
            }`}
            onClick={onVerify}
            disabled={verificationCode.some((d) => !d)}
          >
            Verificar cuenta
          </Button>

          <p className="text-xs text-muted-foreground">
            No recibiste el correo?{" "}
            <button
              type="button"
              className={`font-semibold transition-colors ${
                isPrimary
                  ? "text-primary hover:text-primary/80"
                  : "text-teal hover:text-teal/80"
              }`}
              onClick={handleResendCode}
            >
              Reenviar codigo
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
