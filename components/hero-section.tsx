"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const HEADLINE = "Transformamos Ideas en Soluciones Digitales".split(" ")
const ACCENT_FROM = 3 // "Soluciones Digitales" gets the accent color

const HIVE_CLASS =
  "h-full w-full object-contain [mask-image:radial-gradient(closest-side,black_70%,transparent)] pointer-events-none select-none"

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pt-32 pb-24 bg-background relative overflow-hidden">
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

          {/* 3D loop rendered on the exact page white; the mask fades its edges into the dot grid */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative aspect-square w-full max-w-md mx-auto lg:max-w-none lg:scale-125 lg:translate-x-6"
          >
            {shouldReduceMotion ? (
              <img src="/video/hero_hive-poster.jpg" alt="" aria-hidden="true" className={HIVE_CLASS} />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/hero_hive-poster.jpg"
                aria-hidden="true"
                className={HIVE_CLASS}
              >
                <source src="/video/hero_hive.webm" type="video/webm" />
                <source src="/video/hero_hive.mp4" type="video/mp4" />
              </video>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
