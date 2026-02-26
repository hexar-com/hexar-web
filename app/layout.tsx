import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hexar Software Factory - Soluciones de Software Profesionales",
  description:
    "Creamos soluciones de software completas, gestionamos bases de datos y desarrollamos productos innovadores. Tu socio tecnológico de confianza.",
  generator: "Hexar Software Factory",
  icons: {
    icon: "/images/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <title>Hexar - Inicio</title>
        <meta name="description" content="Hexar Software Factory - Soluciones de Software Profesionales" />
        <meta name="keywords" content="Hexar, Software Factory, Desarrollo de Software, Soluciones de Software, Gestión de Bases de Datos, Productos de Software, Innovación Tecnológica" />
        <meta name="author" content="Hexar Software Factory" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
