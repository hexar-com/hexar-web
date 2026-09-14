"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Users, BarChart3, ShoppingCart, Zap } from "lucide-react"
import Image from "next/image"

export function ProductsSection() {
  const products = [
    {
      icon: BarChart3,
      title: "Velzo",
      description:
        "Plataforma de busqueda de proveedores de servicios para individuos, facilitando la conexión entre individuos y profesionales.",
      status: "Activo",
      users: "5000+ user",
      features: ["Búsqueda avanzada", "Reseñas y calificaciones", "Reservas en línea"],
      category: "Marketplace",
      link: "https://velzo.com.ar/home",
      logo: "/images/velzo-logo.png",
      dark: false,
    },
    {
      icon: BarChart3,
      title: "Places Layer",
      description:
        "Api de geolocalización que ofrece datos actualizados y precisos sobre lugares, con integración fácil y soporte para desarrolladores.",
      status: "Activo",
      users: "100+ user",
      features: ["Búsqueda de lugares", "SDK para desarrolladores", "Datos actualizados", "Integración fácil", "IA para geolocalización"],
      category: "API - SDK",
      link: "https://placeslayer.com",
      logo: "/images/placeslayer.png",
      dark: true,
    },
    {
      icon: BarChart3,
      title: "Archynt",
      description:
        "Plataforma de inteligencia de arquitectura: analiza tu código y tu sistema en ejecución y los fusiona en un grafo vivo para detectar drift, dependencias cíclicas y puntos únicos de falla.",
      status: "Activo",
      users: "Early access",
      features: ["Análisis estático polyglot", "Topología en runtime", "Diagramas C4 vivos", "Detección de drift", "Insights con IA + MCP"],
      category: "DevTools - IA",
      link: "https://archynt.com",
      logo: "/images/archynt-logo.png",
      dark: true,
      brand: "archynt",
    },
  ]

  // Paleta por tarjeta oscura. "archynt" usa los colores de su design system
  // (ink navy, electric blue, cyan glow) tomados de FE-ARCHYNT/app/globals.css.
  const darkThemes = {
    hexar: {
      card: "bg-primary",
      logoBg: "bg-accent/15",
      text: "text-primary-foreground",
      accentText: "text-accent",
      accentBg: "bg-accent/20",
      border: "border-accent/30",
      hover: "hover:bg-accent/10 hover:text-accent",
      cta: "bg-accent hover:bg-accent/90 text-accent-foreground",
    },
    archynt: {
      card: "bg-[oklch(0.17_0.032_263)] ring-1 ring-[oklch(0.66_0.19_258/0.35)] hover:shadow-[0_0_32px_oklch(0.66_0.19_258/0.35)]",
      logoBg: "bg-[oklch(0.66_0.19_258/0.15)]",
      text: "text-[oklch(0.95_0.012_250)]",
      accentText: "text-[oklch(0.82_0.13_210)]",
      accentBg: "bg-[oklch(0.82_0.13_210/0.15)]",
      border: "border-[oklch(0.66_0.19_258/0.4)]",
      hover: "hover:bg-[oklch(0.66_0.19_258/0.15)] hover:text-[oklch(0.82_0.13_210)]",
      cta: "bg-[oklch(0.66_0.19_258)] hover:bg-[oklch(0.66_0.19_258/0.9)] text-[oklch(0.99_0.01_250)]",
    },
  } as const

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const goToProduct = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <section id="products" className="pt-20 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Nuestros Productos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Productos de software desarrollados internamente que están activos en producción, sirviendo a empresas y
              usuarios reales.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {products.map((product, index) => (
              product.dark ? (() => {
                const t = darkThemes[(product.brand as keyof typeof darkThemes) ?? "hexar"]
                return (
                <Card
                  key={index}
                  className={`h-full transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden ${t.card} ${t.text}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${t.logoBg}`}>
                        <Image className="w-8 h-8 object-contain" src={product.logo} alt={product.title + " logo"}
                          width={32} height={32} />
                      </div>
                      <div className="flex gap-2">
                        <Badge className={`border-0 text-xs font-semibold ${t.accentBg} ${t.accentText}`}>
                          {product.status}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${t.border} ${t.text} opacity-70`}>{product.category}</Badge>
                      </div>
                    </div>
                    <CardTitle className={`text-xl mb-2 ${t.text}`}>
                      {product.title}
                    </CardTitle>
                    <div className={`flex items-center gap-2 text-sm mb-4 opacity-60 ${t.text}`}>
                      <Users className="h-4 w-4" />
                      {product.users}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-pretty text-sm opacity-70">{product.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm opacity-90">Características principales:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <Zap className={`h-3 w-3 flex-shrink-0 ${t.accentText}`} />
                            <span className="opacity-70">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex-1 bg-transparent ${t.border} ${t.text} ${t.hover}`}
                        onClick={scrollToContact}
                      >
                        Más Info
                      </Button>
                      <Button
                        size="sm"
                        className={`font-semibold ${t.cta}`}
                        onClick={goToProduct.bind(null, product.link)}
                      >
                        Ir al producto
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                )
              })()
              : (
                <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 object-contain" src={product.logo} alt={product.title + " logo"}
                          width={32} height={32} />
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant={product.status === "Activo" ? "default" : "secondary"}
                          className={
                            product.status === "Activo" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                          }
                        >
                          {product.status}
                        </Badge>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-card-foreground mb-2">{product.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Users className="h-4 w-4" />
                      {product.users}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 text-pretty">{product.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-card-foreground mb-3">Características principales:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="h-3 w-3 text-accent flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={scrollToContact}>
                        Más Info
                      </Button>
                      <Button
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={goToProduct.bind(null, product.link)}
                      >
                        Ir al producto
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>

        </div>
      </div>

      {/* Success Stories — full-bleed dark band, rompe el contenedor claro y le da peso a los números */}
      <div className="relative overflow-hidden bg-primary mt-16 py-16">
        <div aria-hidden="true" className="absolute inset-0 hex-dot-grid opacity-[0.05] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Productos en Producción</h3>
              <p className="text-white/60 max-w-2xl mx-auto text-pretty">
                Nuestros productos no son solo conceptos, son soluciones reales que están funcionando y generando valor
                para empresas y usuarios todos los días.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">5000+</div>
                <div className="text-white/60">Usuarios Activos</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">99.9%</div>
                <div className="text-white/60">Uptime Garantizado</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">24/7</div>
                <div className="text-white/60">Soporte Técnico</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
