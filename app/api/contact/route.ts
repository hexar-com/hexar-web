import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface ContactPayload {
  name: string
  email: string
  company?: string
  message: string
  captchaToken: string
}

async function verifyCaptcha(token: string): Promise<boolean> {
  const projectId = process.env.RECAPTCHA_PROJECT_ID
  const apiKey = process.env.RECAPTCHA_API_KEY
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!projectId || !apiKey || !siteKey) {
    console.error("reCAPTCHA Enterprise env vars not set (RECAPTCHA_PROJECT_ID, RECAPTCHA_API_KEY, NEXT_PUBLIC_RECAPTCHA_SITE_KEY)")
    return false
  }
  console.error("reCAPTCHA Enterprise: Verifying token with Google API...")

  const res = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: {
          token,
          siteKey,
          expectedAction: "submit_contact",
        },
      }),
    }
  )

  const data = await res.json()

  if (!data.tokenProperties?.valid) {
    console.error("reCAPTCHA Enterprise: invalid token", data.tokenProperties?.invalidReason)
    console.error("Full response:", data)
    return false
  }

  if (data.tokenProperties.action !== "submit_contact") {
    console.error("reCAPTCHA Enterprise: action mismatch", data.tokenProperties.action)
    return false
  }

  const score: number = data.riskAnalysis?.score ?? 0
  return score >= 0.5
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()
    const { name, email, company, message, captchaToken } = body

    // --- Validation ---
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 })
    }
    if (!captchaToken) {
      return NextResponse.json({ error: "Captcha requerido." }, { status: 400 })
    }

    // --- reCAPTCHA Enterprise verification ---
    const captchaOk = await verifyCaptcha(captchaToken)
    if (!captchaOk) {
      return NextResponse.json({ error: "Verificación de captcha fallida." }, { status: 400 })
    }

    // --- Send email ---
    const transporter = createTransporter()

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0F1F2E; color: #D9E1E8; border-radius: 8px;">
        <h2 style="color: #4FA3D1; margin-bottom: 24px;">Nuevo mensaje de contacto — Hexar</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #2F3A44; font-weight: bold; width: 120px; color: #8FD3F4;">Nombre</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #2F3A44;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #2F3A44; font-weight: bold; color: #8FD3F4;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #2F3A44;"><a href="mailto:${email}" style="color: #4FA3D1;">${email}</a></td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #2F3A44; font-weight: bold; color: #8FD3F4;">Empresa</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #2F3A44;">${company}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 0; font-weight: bold; vertical-align: top; color: #8FD3F4;">Mensaje</td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>

        <p style="margin-top: 32px; font-size: 12px; color: #3E4A55;">Enviado desde el formulario de contacto de hexar.com.ar</p>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `[Hexar Web] Nuevo contacto de ${name}${company ? ` (${company})` : ""}`,
      html: htmlBody,
      text: `Nombre: ${name}\nEmail: ${email}${company ? `\nEmpresa: ${company}` : ""}\n\nMensaje:\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact/route] Error:", err)
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 })
  }
}
