"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, AlertCircle } from "lucide-react"
import ModalSuccess from "./ui/modal-success"

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void
        execute: (siteKey: string, options: { action: string }) => Promise<string>
      }
    }
  }
}

// Animated inline field error — replaces browser tooltip
function FieldError({ message }: { message: string }) {
  return (
    <p className="field-error flex items-center gap-1.5 mt-1.5 text-xs text-destructive">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  )
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!formData.name.trim())    e.name    = "El nombre es requerido."
    if (!formData.email.trim())   e.email   = "El email es requerido."
    else if (!EMAIL_RE.test(formData.email)) e.email = "Ingresá un email válido."
    if (!formData.message.trim()) e.message = "El mensaje es requerido."
    return e
  }

  // Clear a single field error as the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    const fieldErrors = validate()
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setErrors({})

    setStatus("loading")
    try {
      const captchaToken = await new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha?.enterprise) {
          reject(new Error("reCAPTCHA no está disponible. Recargá la página e intentá nuevamente."))
          return
        }
        window.grecaptcha.enterprise.ready(async () => {
          try {
            const token = await window.grecaptcha.enterprise.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
              { action: "submit_contact" }
            )
            resolve(token)
          } catch (err) {
            reject(err)
          }
        })
      })

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Error desconocido")

      setFormData({ name: "", email: "", company: "", message: "" })
      setStatus("success")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al enviar el mensaje. Intentá nuevamente."
      setErrorMsg(message)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Hablemos de tu Proyecto</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              ¿Tenés una idea? ¿Necesitás una solución tecnológica? Estamos aquí para ayudarte a convertir tus
              objetivos en realidad.
            </p>
          </div>

          <ModalSuccess visible={status === "success"} onClose={() => setStatus("idle")} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  Envianos un Mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Nombre *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        className={errors.name ? "border-destructive focus-visible:ring-destructive/40" : ""}
                      />
                      {errors.name && <FieldError message={errors.name} />}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className={errors.email ? "border-destructive focus-visible:ring-destructive/40" : ""}
                      />
                      {errors.email && <FieldError message={errors.email} />}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Empresa
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Contanos sobre tu proyecto o necesidades..."
                      rows={5}
                      className={errors.message ? "border-destructive focus-visible:ring-destructive/40" : ""}
                    />
                    {errors.message && <FieldError message={errors.message} />}
                  </div>

                  {/* General API / captcha error */}
                  {(status === "error" || errorMsg) && errorMsg && (
                    <div className="field-error flex items-start gap-2 rounded-md bg-destructive/10 border border-destructive/30 px-3 py-2.5 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      {errorMsg}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
                    {status !== "loading" && <Send className="ml-2 h-4 w-4" />}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Este sitio está protegido por reCAPTCHA Enterprise de Google.{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                      Política de privacidad
                    </a>{" "}
                    y{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
                      Términos de servicio
                    </a>.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">info@hexar.com.ar</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Teléfono</h4>
                      <p className="text-muted-foreground">+54 11-7238-8272</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Ubicación</h4>
                      <p className="text-muted-foreground">
                        Las palmas 2779, piso 3 depto A
                        <br />
                        CABA, Buenos Aires
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Horario</h4>
                      <p className="text-muted-foreground">
                        Lun - Vie: 9:00 AM - 6:00 PM
                        <br />
                        Sáb: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                <h3 className="font-semibold text-foreground mb-2">Respuesta Rápida</h3>
                <p className="text-muted-foreground text-sm">
                  Nos comprometemos a responder todos los mensajes en un plazo máximo de 24 horas durante días
                  laborables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
