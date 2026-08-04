"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const HEADLINE = "Transformamos Ideas en Soluciones Digitales".split(" ")
const ACCENT_FROM = 3 // "Soluciones Digitales" gets the accent color

const readout = [
  { label: "proyectos_completados", value: "100%" },
  { label: "uptime_productos_activos", value: "99.9%" },
  { label: "soporte", value: "24/7" },
]

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pt-32 pb-24 bg-gradient-to-br from-background to-muted relative overflow-hidden">
      {/* Technical background: static dot grid + single scanning accent line */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 hex-dot-grid opacity-[0.05]" />
        <div className="hex-scanline top-0" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-6xl mx-auto">
          {/* Headline column — 7/12, left-aligned */}
          <div className="lg:col-span-7">
            <h1 className="text-5xl md:text-6xl xl:text-[5rem] xl:leading-[0.95] font-bold text-primary mb-6 text-balance flex flex-wrap">
              {HEADLINE.map((word, i) => (
                <span key={i} className="overflow-hidden mr-[0.28em] pb-1">
                  <motion.span
                    className={`inline-block ${i >= ACCENT_FROM ? "text-accent" : ""}`}
                    initial={shouldReduceMotion ? undefined : { y: "110%" }}
                    animate={shouldReduceMotion ? undefined : { y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-xl"
            >
              Somos Hexar Software Factory, tu socio tecnológico especializado en crear soluciones de software
              completas, gestionar bases de datos y desarrollar productos innovadores que impulsan tu negocio.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
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
            </motion.div>
          </div>

          {/* Status panel — 5/12, terminal-style readout, sets it apart from a 3rd identical card */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-primary text-primary-foreground rounded-lg border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-primary-foreground/10">
                <Terminal className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs text-primary-foreground/70">hexar --status</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-3">
                {readout.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <span className="text-primary-foreground/60">{row.label}</span>
                    <span className="text-accent font-semibold">{row.value}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-primary-foreground/10 flex items-center gap-2 text-primary-foreground/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  productos en producción
                  <span className="cursor-blink text-accent">_</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
