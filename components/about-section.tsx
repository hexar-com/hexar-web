import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Target, Award, Rocket } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Quiénes Somos</h2>
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

            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary mb-2">50+</h4>
                  <p className="text-muted-foreground">Proyectos Completados</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary mb-2">100%</h4>
                  <p className="text-muted-foreground">Satisfacción Cliente</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary mb-2">5+</h4>
                  <p className="text-muted-foreground">Años Experiencia</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary mb-2">24/7</h4>
                  <p className="text-muted-foreground">Soporte Técnico</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
