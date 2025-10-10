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
      title: "Handy",
      description:
        "Plataforma de busqueda de proveedores de servicios para individuos, facilitando la conexión entre individuos y profesionales.",
      status: "Activo",
      users: "500+ user",
      features: ["Búsqueda avanzada", "Reseñas y calificaciones", "Reservas en línea"],
      category: "Marketplace",
      link: "https://joinhandy.com/home"
    }
  ]

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
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nuestros Productos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Productos de software desarrollados internamente que están activos en producción, sirviendo a empresas y
              usuarios reales.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {products.map((product, index) => {
              const IconComponent = product.icon
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Image className='w-24 pb-5 m-auto' src='/images/handy-logo.webp' alt='logo' 
                          width={0}
                          height={0}
                          sizes="100vw" />
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
            })}
          </div>

          {/* Success Stories */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Productos en Producción</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                Nuestros productos no son solo conceptos, son soluciones reales que están funcionando y generando valor
                para empresas y usuarios todos los días.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-muted-foreground">Usuarios Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime Garantizado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-muted-foreground">Soporte Técnico</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
