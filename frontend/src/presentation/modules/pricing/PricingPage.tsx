"use client"

import { useState } from "react"
import { Button } from "@/presentation/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/presentation/components/ui/card"
import { Badge } from "@/presentation/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { useSubscriptionActions } from "@/presentation/hooks/use-subscription"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const plans = [
  {
    name: "Free",
    id: "free",
    price: "$0",
    description: "Para proyectos personales y pruebas",
    features: [
      "Hasta 1,000 solicitudes/mes",
      "Acceso API básico",
      "Soporte por email",
      "1 proyecto",
      "Documentación completa",
    ],
    cta: "Comenzar gratis",
    popular: false,
  },
  {
    name: "Pro",
    id: "pro",
    price: "$29",
    description: "Para desarrolladores profesionales",
    features: [
      "Hasta 100,000 solicitudes/mes",
      "Acceso API completo",
      "Soporte prioritario 24/7",
      "Proyectos ilimitados",
      "Analíticas avanzadas",
      "Webhooks personalizados",
      "Entorno de staging",
    ],
    cta: "Activar plan Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    id: "enterprise",
    price: "Custom",
    description: "Para equipos y empresas grandes",
    features: [
      "Solicitudes ilimitadas",
      "SLA garantizado 99.99%",
      "Soporte dedicado",
      "Usuarios ilimitados",
      "Auditoría de seguridad",
      "Onboarding personalizado",
      "Infraestructura dedicada",
      "Contratos personalizados",
    ],
    cta: "Contactar ventas",
    popular: false,
  },
]

export default function PricingPage() {
  const [activatingPlan, setActivatingPlan] = useState<string | null>(null)
  const { updatePlan } = useSubscriptionActions()
  const router = useRouter()

  const handleActivatePlan = async (planId: string) => {
    setActivatingPlan(planId)
    try {
        await updatePlan(planId)
        toast.success("Plan activado correctamente")
        router.push('/dashboard')
    } catch (e: any) {
        console.error("Failed to update plan", e)
        const errorMessage = e?.response?.data?.message || e?.message || "Error al activar el plan. Por favor, inicia sesión primero."
        toast.error(errorMessage)
        
        // If 401 Unauthorized, redirect to auth page
        if (e?.response?.status === 401) {
          setTimeout(() => {
            router.push('/auth')
          }, 2000)
        }
    } finally {
        setActivatingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">Planes y Precios</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Elige el plan perfecto para tu proyecto. Comienza gratis y actualiza cuando lo necesites.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">Más popular</Badge>
                  </div>
                )}

                <CardHeader className="space-y-4">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/mes</span>}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    disabled={activatingPlan === plan.id}
                    onClick={() => handleActivatePlan(plan.id)}
                  >
                    {activatingPlan === plan.id ? "Activando..." : plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth" className="text-primary hover:underline font-medium">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

