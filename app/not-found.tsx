import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, MessageSquare } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted relative overflow-hidden flex flex-col items-center justify-center px-4">

      {/* Background decorations — mirrors HeroSection */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 hex-dot-grid opacity-[0.045]" />
        <div
          className="anim-orb w-[520px] h-[520px] -top-32 -left-40"
          style={{ background: "rgba(46,125,178,0.18)", animation: "floatA 14s ease-in-out infinite" }}
        />
        <div
          className="anim-orb w-[380px] h-[380px] -bottom-16 -right-24"
          style={{ background: "rgba(79,163,209,0.13)", animation: "floatB 11s ease-in-out infinite", animationDelay: "-5s" }}
        />
        <div
          className="anim-orb w-[240px] h-[240px] top-[45%] left-[48%]"
          style={{ background: "rgba(31,95,139,0.14)", animation: "floatC 8s ease-in-out infinite", animationDelay: "-3s" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-xl mx-auto">

        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-14 group">
          <Image
            src="/images/hexar-logo.png"
            alt="Hexar"
            width={0}
            height={0}
            sizes="48px"
            className="w-10 h-auto"
          />
          <span className="text-xl font-bold text-primary">
            Hexar <span className="text-accent">Software Factory</span>
          </span>
        </Link>

        {/* 404 number */}
        <div
          aria-hidden="true"
          className="text-[9rem] sm:text-[12rem] font-extrabold leading-none select-none mb-2"
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            background: "linear-gradient(135deg, rgba(46,125,178,0.25) 0%, rgba(79,163,209,0.15) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Página no encontrada
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-10 text-pretty leading-relaxed">
          La página que buscás no existe o fue movida a otra dirección.
          Podés volver al inicio o contactarnos si creés que es un error.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Volver al inicio
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#contact">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contactarnos
            </Link>
          </Button>
        </div>

      </div>
    </div>
  )
}
