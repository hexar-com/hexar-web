"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                Hexar <span className="text-accent">Software Factory</span>
              </h3>
              <p className="text-primary-foreground/80 mb-6 max-w-md text-pretty">
                Transformamos ideas en soluciones digitales. Somos tu socio tecnológico especializado en desarrollo de
                software, gestión de bases de datos y productos innovadores.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:text-accent hover:bg-primary-foreground/10"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:text-accent hover:bg-primary-foreground/10"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:text-accent hover:bg-primary-foreground/10"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Nosotros
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("products")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Productos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-3">
                {/* <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">contacto@hexarsoftware.com</span>
                </li>*/}
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">+54 11-7238-8272</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80 text-sm">
                    Las palmas 2779, piso 3 depto A
                    <br />
                    CABA, Buenos Aires
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-foreground/60 text-sm">
              © 2024 Hexar Software Factory. Todos los derechos reservados.
            </div>

            <div className="flex items-center gap-6">
              {/*<button className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Política de Privacidad
              </button>
              <button className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Términos de Servicio
              </button>*/}
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-primary-foreground hover:text-accent hover:bg-primary-foreground/10"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
