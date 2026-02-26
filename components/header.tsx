"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link className='flex items-center' href="/" >
              <Image className=' w-10 md:w-16' src="/images/hexar-logo.png" alt="Hexar" width={0}
                height={0}
                sizes="60vw" />
              <h1 className="text-2xl font-bold text-primary">
                Hexar <span className="text-accent">Software Factory</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Productos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Comenzar Proyecto
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <button
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors w-full text-left"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors w-full text-left"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors w-full text-left"
              >
                Productos
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors w-full text-left"
              >
                Contacto
              </button>
              <div className="px-3 py-2">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                >
                  Comenzar Proyecto
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
