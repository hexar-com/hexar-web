"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Rocket } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pt-16 pb-20 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-12 mt-5">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">
              Transformamos Ideas en <span className="text-accent">Soluciones Digitales</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
              Somos Hexar Software Factory, tu socio tecnológico especializado en crear soluciones de software
              completas, gestionar bases de datos y desarrollar productos innovadores que impulsan tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Comenzar Proyecto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Conocer Más
              </Button>
            </div>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Desarrollo de Software</h3>
              <p className="text-muted-foreground text-center">Soluciones personalizadas con las últimas tecnologías</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Gestión de Bases de Datos</h3>
              <p className="text-muted-foreground text-center">Arquitectura y optimización de datos empresariales</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Rocket className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Productos Activos</h3>
              <p className="text-muted-foreground text-center">Soluciones probadas en producción y funcionando</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
