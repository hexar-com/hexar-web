"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Database, Cloud, Smartphone, Globe, Shield, ArrowRight } from "lucide-react"

function RevealItem({ children, delay }: { children: React.ReactNode; delay: number }) {
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
    <div ref={ref} className="reveal-up h-full">
      {children}
    </div>
  )
}

export function ServicesSection() {
  const services = [
    {
      icon: Code2,
      title: "Desarrollo de Software Personalizado",
      description:
        "Creamos aplicaciones web y de escritorio adaptadas a las necesidades específicas de tu negocio, utilizando las tecnologías más avanzadas.",
      features: ["Aplicaciones Web", "Sistemas Empresariales", "APIs RESTful", "Microservicios"],
    },
    {
      icon: Database,
      title: "Gestión y Optimización de Bases de Datos",
      description:
        "Diseñamos, implementamos y optimizamos bases de datos robustas que garantizan la integridad y disponibilidad de tu información.",
      features: ["Diseño de BD", "Optimización", "Migración de Datos", "Backup y Recuperación"],
    },
    {
      icon: Cloud,
      title: "Soluciones en la Nube",
      description:
        "Migramos y desplegamos tus aplicaciones en plataformas cloud, garantizando escalabilidad, seguridad y disponibilidad.",
      features: ["AWS/Azure/GCP", "DevOps", "Contenedores", "CI/CD"],
    },
    {
      icon: Smartphone,
      title: "Desarrollo de Aplicaciones Móviles",
      description:
        "Desarrollamos aplicaciones móviles nativas e híbridas que ofrecen una experiencia de usuario excepcional.",
      features: ["iOS/Android", "React Native", "Flutter", "PWA"],
    },
    {
      icon: Globe,
      title: "Desarrollo Web Full-Stack",
      description:
        "Creamos sitios web y aplicaciones web completas, desde el frontend hasta el backend, con tecnologías modernas.",
      features: ["React/Next.js", "Node.js", "TypeScript", "Responsive Design"],
    },
    {
      icon: Shield,
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
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Ofrecemos una gama completa de servicios de desarrollo de software para impulsar tu transformación digital
              y hacer crecer tu negocio.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <RevealItem key={index} delay={index * 90}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-pretty">{service.description}</p>
                      <ul className="space-y-2">
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

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">¿Necesitas una solución personalizada?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
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
          </div>
        </div>
      </div>
    </section>
  )
}
