"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function RevealItem({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("reveal-visible"), delay)
          io.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal-up h-full ${className ?? ""}`}>
      {children}
    </div>
  )
}

export function ServicesSection() {
  const services = [
    {
      image: "code",
      title: "Desarrollo de Software Personalizado",
      description:
        "Creamos aplicaciones web y de escritorio adaptadas a las necesidades específicas de tu negocio, utilizando las tecnologías más avanzadas.",
      features: ["Aplicaciones Web", "Sistemas Empresariales", "APIs RESTful", "Microservicios"],
    },
    {
      image: "database",
      title: "Gestión y Optimización de Bases de Datos",
      description:
        "Diseñamos, implementamos y optimizamos bases de datos robustas que garantizan la integridad y disponibilidad de tu información.",
      features: ["Diseño de BD", "Optimización", "Migración de Datos", "Backup y Recuperación"],
    },
    {
      image: "cloud",
      title: "Soluciones en la Nube",
      description:
        "Migramos y desplegamos tus aplicaciones en plataformas cloud, garantizando escalabilidad, seguridad y disponibilidad.",
      features: ["AWS/Azure/GCP", "DevOps", "Contenedores", "CI/CD"],
    },
    {
      image: "mobile",
      title: "Desarrollo de Aplicaciones Móviles",
      description:
        "Desarrollamos aplicaciones móviles nativas e híbridas que ofrecen una experiencia de usuario excepcional.",
      features: ["iOS/Android", "React Native", "Flutter", "PWA"],
    },
    {
      image: "web",
      title: "Desarrollo Web Full-Stack",
      description:
        "Creamos sitios web y aplicaciones web completas, desde el frontend hasta el backend, con tecnologías modernas.",
      features: ["React/Next.js", "Node.js", "TypeScript", "Responsive Design"],
    },
    {
      image: "security",
      title: "Consultoría y Auditoría Técnica",
      description:
        "Evaluamos tu infraestructura tecnológica actual y proporcionamos recomendaciones para mejorar el rendimiento y la seguridad.",
      features: ["Auditoría de Código", "Arquitectura", "Seguridad", "Performance"],
    },
  ]

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header — left-aligned, breaks the centered rhythm of the rest of the page */}
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Ofrecemos una gama completa de servicios de desarrollo de software para impulsar tu transformación digital
              y hacer crecer tu negocio.
            </p>
          </div>

          {/* Services Grid — bento: el primer servicio (el core del negocio) ocupa más espacio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
            {services.map((service, index) => {
              const featured = index === 0
              const wide = featured || index === services.length - 1
              return (
                <RevealItem
                  key={index}
                  delay={index * 90}
                  className={wide ? "md:col-span-2" : undefined}
                >
                  <Card className="group h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <img
                        src={`/images/services/${service.image}.webp`}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className={`-ml-3 -mt-2 mb-2 [mask-image:radial-gradient(closest-side,black_68%,transparent)] transition-transform duration-500 ease-out group-hover:-translate-y-2 motion-reduce:transition-none ${featured ? "w-36 h-36" : "w-28 h-28"}`}
                      />
                      <CardTitle className={featured ? "text-2xl text-card-foreground" : "text-xl text-card-foreground"}>
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-pretty">{service.description}</p>
                      <ul className={wide ? "grid grid-cols-2 gap-2" : "space-y-2"}>
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </RevealItem>
              )
            })}
          </div>

          {/* CTA Section — bloque sólido de acento, marca el cierre con más peso que las cards de arriba */}
          <div className="relative overflow-hidden rounded-lg bg-primary px-8 py-16 text-center md:py-12 md:pl-14 md:pr-6 md:text-left">
            <div aria-hidden="true" className="absolute inset-0 hex-dot-grid opacity-[0.06] pointer-events-none" />
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Necesitas una solución personalizada?</h3>
                <p className="text-white/60 mb-8 text-pretty">
                  Cada proyecto es único. Conversemos sobre tus necesidades específicas y diseñemos la solución perfecta
                  para tu negocio.
                </p>
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Solicitar Consulta Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/cta_stack-poster.jpg"
                aria-hidden="true"
                className="order-first h-56 w-56 shrink-0 pointer-events-none md:order-none md:-my-10 md:h-80 md:w-80 [mask-image:radial-gradient(closest-side,black_70%,transparent)] motion-reduce:hidden"
              >
                <source src="/video/cta_stack.webm" type="video/webm" />
                <source src="/video/cta_stack.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
