import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CodeShowcase } from "@/components/code-showcase"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProductsSection } from "@/components/products-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CodeShowcase />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
