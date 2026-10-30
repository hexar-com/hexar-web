"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ChevronDown, ExternalLink, Users, X, Zap } from "lucide-react"
import Image from "next/image"

type Brand = "velzo" | "hexar" | "archynt"

interface ProductLink {
  label: string
  href: string
}

interface ProductFeature {
  title: string
  text: string
}

interface Product {
  id: string
  title: string
  description: string
  status: string
  users: string
  features: string[]
  category: string
  link: string
  linkLabel: string
  logo: string
  brand: Brand
  tagline: string
  about: string[]
  steps: string[]
  details: ProductFeature[]
  audience: string[]
  facts: ProductFeature[]
  stack: string[]
  links: ProductLink[]
  schema: { applicationCategory: string; operatingSystem: string }
}

const PRODUCTS: Product[] = [
  {
    id: "velzo",
    title: "Velzo",
    description:
      "Plataforma de busqueda de proveedores de servicios para individuos, facilitando la conexión entre individuos y profesionales.",
    status: "Activo",
    users: "5000+ user",
    features: ["Búsqueda avanzada", "Reseñas y calificaciones", "Reservas en línea"],
    category: "Marketplace",
    link: "https://velzo.com.ar/home",
    linkLabel: "Velzo: profesionales de servicios en Argentina",
    logo: "/images/velzo-logo.png",
    brand: "velzo",
    tagline: "El marketplace argentino para encontrar y contratar profesionales de servicios.",
    about: [
      "Velzo conecta a personas que necesitan un servicio —carpintería, cerrajería, decoración y muchos rubros más— con prestadores verificados cerca suyo, en web y en apps nativas para iOS y Android.",
      "El cliente busca, compara perfiles con reseñas reales y pide presupuesto; el profesional responde, coordina por chat y presta el servicio. Publicar es gratis y sin comisiones, así que el trato queda entre las dos partes.",
    ],
    steps: [
      "Buscá por rubro o en el mapa los prestadores cercanos",
      "Compará perfiles, reseñas verificadas y calificaciones",
      "Pedí presupuesto y coordiná los detalles por chat",
      "Contratá directo con el profesional, sin intermediarios",
    ],
    details: [
      { title: "Búsqueda y mapa", text: "Filtros avanzados, mapa de servicios y, en la app, búsqueda en tiempo real de prestadores cercanos." },
      { title: "Prestadores verificados", text: "Cada prestador se verifica antes de poder ofrecer sus servicios." },
      { title: "Reseñas verificadas", text: "Perfiles con opiniones de usuarios reales que construyen la reputación de cada profesional." },
      { title: "Presupuestos con chat", text: "Los clientes piden presupuestos y los prestadores responden y coordinan dentro de la plataforma." },
      { title: "Sin comisiones", text: "Los profesionales publican gratis y tienen planes que acompañan cada etapa de su negocio." },
      { title: "Web y apps nativas", text: "La misma experiencia en el navegador, en Google Play y en App Store." },
    ],
    audience: ["Personas que necesitan contratar un servicio en Argentina", "Profesionales y prestadores independientes que quieren conseguir clientes"],
    facts: [
      { title: "5000+", text: "usuarios" },
      { title: "4.8/5", text: "valoración de usuarios" },
      { title: "iOS + Android", text: "apps nativas" },
    ],
    stack: ["Next.js", "React Native", "NestJS", "Microservicios"],
    links: [
      { label: "Buscar servicios en Velzo", href: "https://velzo.com.ar/services" },
      { label: "Publicar servicios como profesional", href: "https://velzo.com.ar/services/publish" },
      { label: "Velzo en Google Play", href: "https://play.google.com/store/apps/details?id=com.handymobile&hl=es_AR" },
      { label: "Velzo en App Store", href: "https://apps.apple.com/ar/app/velzo/id6754193331" },
    ],
    schema: { applicationCategory: "LifestyleApplication", operatingSystem: "Web, iOS, Android" },
  },
  {
    id: "places-layer",
    title: "Places Layer",
    description:
      "Api de geolocalización que ofrece datos actualizados y precisos sobre lugares, con integración fácil y soporte para desarrolladores.",
    status: "Activo",
    users: "100+ user",
    features: ["Búsqueda de lugares", "SDK para desarrolladores", "Datos actualizados", "Integración fácil", "IA para geolocalización"],
    category: "API - SDK",
    link: "https://placeslayer.com",
    linkLabel: "Places Layer: API de países, provincias y ciudades",
    logo: "/images/placeslayer.png",
    brand: "hexar",
    tagline: "API de datos geográficos para desarrolladores: países, provincias y ciudades de 196 países.",
    about: [
      "Places Layer resuelve los datos geográficos de cualquier aplicación sin que tengas que mantenerlos ni alojarlos: una API REST con respuestas JSON, autenticación por API key y componentes listos para formularios con autocompletado de ciudades.",
      "Devuelve los nombres también en su alfabeto original y suma un servidor MCP para que asistentes de IA como Claude o Cursor normalicen ciudades, comparen destinos y busquen lugares por criterio.",
    ],
    steps: [
      "Creá tu cuenta: el plan Free no pide tarjeta",
      "Generá la API key de tu organización",
      "Consultá con el header X-API-Key o instalá el SDK",
      "Seguí el consumo en el panel en tiempo real",
    ],
    details: [
      { title: "Países, provincias y ciudades", text: "Cobertura de 196 países, de América a Oceanía, en JSON y con cualquier lenguaje o framework." },
      { title: "Nombres nativos", text: "Con ?native=true devuelve nombres en griego, cirílico, árabe, armenio, hebreo, devanagari y más." },
      { title: "Autocompletado para React", text: "Componente CitiesDropdown tipado, personalizable y con navegación por teclado; funciona en Next.js y Vite." },
      { title: "SDKs JavaScript y React Native", text: "Paquetes @placeslayer/sdk, @placeslayer/sdk-react y @placeslayer/sdk-react-native publicados en npm." },
      { title: "Servidor MCP con IA", text: "Resolución de nombres mal escritos, insights de ciudades (costo de vida, clima, perfil), similitud vectorial y filtros por criterio." },
      { title: "Organizaciones y cuotas", text: "Varias organizaciones por cuenta, cada una con sus claves y su cuota, y contadores de uso en vivo." },
    ],
    audience: ["Desarrolladores que necesitan datos geográficos confiables", "Agencias que gestionan varios clientes", "Equipos que construyen agentes de IA con contexto geográfico"],
    facts: [
      { title: "196", text: "países" },
      { title: "< 50 ms", text: "latencia P99" },
      { title: "99,9%", text: "SLA de uptime" },
      { title: "2.000", text: "requests/mes gratis" },
    ],
    stack: ["Go", "API REST", "TypeScript SDK", "MCP"],
    links: [
      { label: "API de ciudades de Places Layer", href: "https://placeslayer.com/cities-api" },
      { label: "Autocompletado de ciudades para React", href: "https://placeslayer.com/places-autocomplete" },
      { label: "@placeslayer/sdk-react en npm", href: "https://www.npmjs.com/package/@placeslayer/sdk-react" },
      { label: "@placeslayer/mcp en npm", href: "https://www.npmjs.com/package/@placeslayer/mcp" },
    ],
    schema: { applicationCategory: "DeveloperApplication", operatingSystem: "Web" },
  },
  {
    id: "archynt",
    title: "Archynt",
    description:
      "Plataforma de inteligencia de arquitectura: analiza tu código y tu sistema en ejecución y los fusiona en un grafo vivo para detectar dependencias cíclicas, acoplamiento y puntos únicos de falla.",
    status: "Activo",
    users: "Early access",
    features: ["Análisis estático polyglot", "Topología en runtime", "Diagramas C4 vivos", "Alertas, logs y métricas", "Insights con IA + MCP"],
    category: "DevTools - IA",
    link: "https://archynt.com",
    linkLabel: "Archynt: monitoreo de Docker y Kubernetes con mapa de servicios",
    logo: "/images/archynt-logo.png",
    brand: "archynt",
    tagline: "Monitoreo para Docker y Kubernetes que se mapea solo, con la arquitectura de tu código al lado.",
    about: [
      "Un agente de solo lectura instalado en tus hosts descubre los contenedores, quién llama a quién y la carga de cada host, y arma un mapa de servicios vivo con logs, métricas y alertas. Sin cambios en el código, sin exporters que configurar y sin umbrales que ajustar.",
      "Del lado del código, analiza tus repositorios y genera diagramas C4 que se regeneran en cada análisis, detecta ciclos, acoplamiento fuerte, puntos únicos de falla y código muerto, y marca los problemas nuevos en cada pull request.",
    ],
    steps: [
      "Instalá el agente con docker compose o con Helm",
      "El mapa de servicios se completa solo al conectarse",
      "Conectá tus repositorios para generar diagramas C4",
      "Sumá los PR checks y el servidor MCP a tu equipo",
    ],
    details: [
      { title: "Mapa de servicios en vivo", text: "Lee el socket de Docker y la tabla de conexiones del kernel; cada host tiene su propia vista." },
      { title: "Métricas RED por eBPF", text: "Tasa, errores y latencia de cada servicio sin instrumentar la aplicación." },
      { title: "Alertas por línea base", text: "Cada host se compara con su propio historial: picos de CPU, fugas lentas, memoria, errores y contenedores caídos." },
      { title: "Logs sin shipper", text: "Leídos de los archivos de Docker y del kubelet, con búsqueda, filtros por nivel y tail en vivo." },
      { title: "Diagramas C4 y detectores", text: "Java, Node, Python y Go: de contexto a componente, con ciclos, acoplamiento y puntos únicos de falla." },
      { title: "PR checks, MCP e IA", text: "GitHub App o Action (gratis en repos públicos), grafo de arquitectura para Claude Code y Cursor, y análisis con IA." },
    ],
    audience: ["Equipos que corren servicios en Docker o Kubernetes", "CTOs y tech leads que necesitan ver la arquitectura real", "Desarrolladores que trabajan con asistentes de IA"],
    facts: [
      { title: "1 host gratis", text: "con 3 miembros, para siempre" },
      { title: "1 cluster = 1 host", text: "sin importar los nodos" },
      { title: "Solo lectura", text: "el agente nunca modifica lo que observa" },
    ],
    stack: ["Java + Spring WebFlux", "Go", "Neo4j", "eBPF", "Next.js"],
    links: [
      { label: "Planes y precios de Archynt", href: "https://archynt.com/pricing" },
      { label: "Documentación de Archynt", href: "https://archynt.com/docs" },
      { label: "Servidor MCP de arquitectura", href: "https://archynt.com/docs/mcp" },
      { label: "Checks de arquitectura en pull requests", href: "https://archynt.com/docs/pr-checks" },
    ],
    schema: { applicationCategory: "DeveloperApplication", operatingSystem: "Web, Docker, Kubernetes" },
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

const panelThemes: Record<Brand, { panel: string; muted: string; accentText: string; chip: string; divider: string; step: string; cta: string }> = {
  velzo: {
    panel: "bg-card text-card-foreground border border-border shadow-xl",
    muted: "text-muted-foreground",
    accentText: "text-accent",
    chip: "bg-accent/10 text-accent",
    divider: "border-border",
    step: "bg-accent text-accent-foreground",
    cta: "bg-accent hover:bg-accent/90 text-accent-foreground",
  },
  hexar: {
    panel: "bg-primary text-primary-foreground shadow-xl",
    muted: "text-primary-foreground/70",
    accentText: "text-accent",
    chip: "bg-accent/20 text-accent",
    divider: "border-white/10",
    step: "bg-accent text-accent-foreground",
    cta: "bg-accent hover:bg-accent/90 text-accent-foreground",
  },
  archynt: {
    panel: "bg-[oklch(0.17_0.032_263)] text-[oklch(0.95_0.012_250)] ring-1 ring-[oklch(0.66_0.19_258/0.35)] shadow-[0_0_48px_oklch(0.66_0.19_258/0.25)]",
    muted: "text-[oklch(0.95_0.012_250/0.7)]",
    accentText: "text-[oklch(0.82_0.13_210)]",
    chip: "bg-[oklch(0.82_0.13_210/0.15)] text-[oklch(0.82_0.13_210)]",
    divider: "border-[oklch(0.66_0.19_258/0.3)]",
    step: "bg-[oklch(0.66_0.19_258)] text-[oklch(0.99_0.01_250)]",
    cta: "bg-[oklch(0.66_0.19_258)] hover:bg-[oklch(0.66_0.19_258/0.9)] text-[oklch(0.99_0.01_250)]",
  },
}

const PRODUCTS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Productos de Hexar Solutions",
  itemListElement: PRODUCTS.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      name: product.title,
      url: product.link,
      description: product.tagline,
      applicationCategory: product.schema.applicationCategory,
      operatingSystem: product.schema.operatingSystem,
      sameAs: product.links.map((l) => l.href),
      publisher: { "@type": "Organization", name: "Hexar Solutions", legalName: "Hexar Software Factory S.R.L.", foundingDate: "2025", url: "https://www.hexar.com.ar" },
    },
  })),
}

function ProductDetail({
  product,
  open,
  onClose,
  onContact,
}: {
  product: Product
  open: boolean
  onClose: () => void
  onContact: () => void
}) {
  const p = panelThemes[product.brand]
  const region = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (region.current) region.current.inert = !open
  }, [open])

  return (
    <div
      ref={region}
      id={`producto-${product.id}`}
      role="region"
      aria-label={`Detalles de ${product.title}`}
      className={`grid transition-[grid-template-rows,opacity,margin] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100 mb-12" : "grid-rows-[0fr] opacity-0 mb-0"
      }`}
    >
      <div className="overflow-hidden">
        <article
          className={`rounded-2xl p-6 md:p-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            open ? "translate-y-0" : "-translate-y-4"
          } ${p.panel}`}
        >
          <header className={`flex items-start justify-between gap-6 pb-6 mb-8 border-b ${p.divider}`}>
            <div className="flex items-center gap-4">
              <Image className="w-12 h-12 object-contain" src={product.logo} alt="" width={48} height={48} />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">{product.title}</h3>
                <p className={`mt-1 text-pretty ${p.muted}`}>{product.tagline}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={`Cerrar detalles de ${product.title}`}
              className={`shrink-0 rounded-full p-2 transition-colors hover:bg-current/10 ${p.muted}`}
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                {product.about.map((paragraph) => (
                  <p key={paragraph} className={`text-pretty leading-relaxed ${p.muted}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mb-4">Cómo funciona</h4>
                <ol className="grid gap-4 sm:grid-cols-2">
                  {product.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${p.step}`}>
                        {i + 1}
                      </span>
                      <span className={`text-sm pt-1 ${p.muted}`}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Funcionalidades</h4>
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {product.details.map((detail) => (
                    <div key={detail.title} className="flex items-start gap-3">
                      <Zap className={`h-4 w-4 mt-1 shrink-0 ${p.accentText}`} />
                      <div>
                        <p className="font-medium text-sm">{detail.title}</p>
                        <p className={`text-sm text-pretty ${p.muted}`}>{detail.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-8">
              <dl className="grid grid-cols-2 gap-4">
                {product.facts.map((fact) => (
                  <div key={fact.title}>
                    <dt className={`text-xl font-bold ${p.accentText}`}>{fact.title}</dt>
                    <dd className={`text-xs ${p.muted}`}>{fact.text}</dd>
                  </div>
                ))}
              </dl>

              <div>
                <h4 className="font-semibold mb-3 text-sm">Para quién es</h4>
                <ul className="space-y-2">
                  {product.audience.map((who) => (
                    <li key={who} className={`text-sm ${p.muted}`}>
                      {who}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-sm">Cómo lo construimos</h4>
                <div className="flex flex-wrap gap-2">
                  {product.stack.map((tech) => (
                    <span key={tech} className={`rounded-full px-3 py-1 text-xs font-medium ${p.chip}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-sm">Enlaces</h4>
                <ul className="space-y-2">
                  {[{ label: product.linkLabel, href: product.link }, ...product.links].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener"
                        className={`group inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline ${p.accentText}`}
                      >
                        {l.label}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className={`w-full font-semibold ${p.cta}`} onClick={onContact}>
                Quiero un producto así
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </aside>
          </div>
        </article>
      </div>
    </div>
  )
}

export function ProductsSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const panels = useRef<Record<string, HTMLDivElement | null>>({})

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggle = (id: string) => {
    const next = openId === id ? null : id
    setOpenId(next)
    if (next) {
      window.setTimeout(() => panels.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" }), 120)
    }
  }

  const detailsButton = (product: Product, className: string) => (
    <Button
      variant="outline"
      size="sm"
      className={`flex-1 bg-transparent ${className}`}
      onClick={() => toggle(product.id)}
      aria-expanded={openId === product.id}
      aria-controls={`producto-${product.id}`}
    >
      {openId === product.id ? "Ocultar detalles" : "Ver detalles"}
      <ChevronDown
        className={`ml-1 h-4 w-4 transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
      />
    </Button>
  )

  return (
    <section id="products" className="pt-20 pb-24 bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCTS_SCHEMA) }} />
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
            {PRODUCTS.map((product) => {
              const selected = openId === product.id
              return product.brand !== "velzo" ? (() => {
                const t = darkThemes[product.brand]
                return (
                <Card
                  key={product.id}
                  className={`h-full transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden ${t.card} ${t.text} ${
                    selected ? "-translate-y-1 ring-2 ring-accent" : ""
                  }`}
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
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <Zap className={`h-3 w-3 flex-shrink-0 ${t.accentText}`} />
                            <span className="opacity-70">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      {detailsButton(product, `${t.border} ${t.text} ${t.hover}`)}
                      <Button asChild size="sm" className={`font-semibold ${t.cta}`}>
                        <a href={product.link} target="_blank" rel="noopener" title={product.linkLabel}>
                          Ir al producto
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                )
              })()
              : (
                <Card
                  key={product.id}
                  className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    selected ? "-translate-y-1 shadow-lg ring-2 ring-accent" : ""
                  }`}
                >
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
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="h-3 w-3 text-accent flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      {detailsButton(product, "")}
                      <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <a href={product.link} target="_blank" rel="noopener" title={product.linkLabel}>
                          Ir al producto
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Paneles de detalle: siempre en el DOM (indexables), se expanden de a uno */}
          {PRODUCTS.map((product) => (
            <div key={product.id} className="scroll-mt-24" ref={(el) => { panels.current[product.id] = el }}>
              <ProductDetail
                product={product}
                open={openId === product.id}
                onClose={() => setOpenId(null)}
                onContact={scrollToContact}
              />
            </div>
          ))}

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
