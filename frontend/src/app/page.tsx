import Link from "next/link"
import { Button } from "@/presentation/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Nueva plataforma disponible
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Gestiona tu SaaS con <span className="text-primary">simplicidad</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Control total de suscripciones, facturación y pagos en una sola plataforma profesional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="text-base">
              <Link href="/auth">
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
              <Link href="/pricing">Ver planes</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
