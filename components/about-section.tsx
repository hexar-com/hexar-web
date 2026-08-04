import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Target, Award, Rocket } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Quiénes Somos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Hexar Software Factory es una empresa especializada en el desarrollo de soluciones tecnológicas integrales
              que transforman la manera en que las empresas operan y crecen.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Nuestra Misión</h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Creamos soluciones de software que no solo resuelven problemas actuales, sino que anticipan las
                necesidades futuras de nuestros clientes. Nos especializamos en arquitecturas robustas, bases de datos
                optimizadas y productos que escalan con tu negocio.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Experiencia Comprobada</h4>
                    <p className="text-muted-foreground">
                      Años de experiencia desarrollando soluciones para diversos sectores
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Tecnología de Vanguardia</h4>
                    <p className="text-muted-foreground">
                      Utilizamos las últimas tecnologías y mejores prácticas del mercado
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Soporte Continuo</h4>
                    <p className="text-muted-foreground">Acompañamos a nuestros clientes en cada etapa del proyecto</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Featured stat: solid accent fill, spans the full width — carries real visual weight */}
              <Card className="col-span-2 p-8 border-0 bg-accent text-accent-foreground">
                <CardContent className="p-0 flex items-center justify-between">
                  <div>
                    <h4 className="text-5xl font-bold mb-1">100%</h4>
                    <p className="text-accent-foreground/80">Proyectos completados y funcionando en producción</p>
                  </div>
                  <Users className="h-12 w-12 text-accent-foreground/40 shrink-0" />
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <Target className="h-6 w-6 text-accent mb-3" />
                  <h4 className="text-2xl font-bold text-primary mb-1">100%</h4>
                  <p className="text-muted-foreground text-sm">Satisfacción cliente</p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <Award className="h-6 w-6 text-accent mb-3" />
                  <h4 className="text-2xl font-bold text-primary mb-1">5+</h4>
                  <p className="text-muted-foreground text-sm">Años de experiencia</p>
                </CardContent>
              </Card>

              <Card className="col-span-2 p-6">
                <CardContent className="p-0 flex items-center gap-3">
                  <Rocket className="h-6 w-6 text-accent shrink-0" />
                  <p className="text-primary font-semibold">Soporte técnico 24/7 en cada etapa del proyecto</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
