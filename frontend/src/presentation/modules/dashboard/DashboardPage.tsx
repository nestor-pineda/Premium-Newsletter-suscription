"use client"

import { useState } from "react"
import { Button } from "@/presentation/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card"
import { Badge } from "@/presentation/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog"
import { CreditCard, Calendar, TrendingUp, AlertCircle, Edit, X, ArrowUpCircle } from "lucide-react"
import { Skeleton } from "@/presentation/components/ui/skeleton"
import Link from "next/link"
import { useSubscriptionQuery, useInvoicesQuery, useSubscriptionActions } from "@/presentation/hooks/use-subscription"

export default function DashboardPage() {
  const { data: subscription, isLoading: isLoadingSub } = useSubscriptionQuery()
  const { data: invoices, isLoading: isLoadingInv } = useInvoicesQuery()
  const { cancelSubscription } = useSubscriptionActions()
  
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)

  const handleCancelSubscription = async () => {
    setIsCancelling(true)
    try {
      await cancelSubscription()
      setCancelDialogOpen(false)
    } finally {
      setIsCancelling(false)
    }
  }

  if (isLoadingSub || isLoadingInv) {
      return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <Skeleton className="h-10 w-48" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-64 lg:col-span-2" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        </div>
      )
  }

  // Fallback if no subscription
  if (!subscription) {
      return (
          <div className="container mx-auto px-4 py-8 text-center">
              <h1 className="text-2xl font-bold mb-4">No active subscription</h1>
              <Button asChild><Link href="/pricing">View Plans</Link></Button>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SaaS Platform</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/pricing">
                <Button variant="ghost">Planes</Button>
              </Link>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                JP
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Panel de Control</h1>
            <p className="text-muted-foreground">Gestiona tu suscripción y facturación</p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Subscription Status */}\n            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">Estado de Suscripción</CardTitle>
                    <CardDescription>Plan {subscription.planId}</CardDescription>
                  </div>
                  <Badge variant="default" className={subscription.status === 'active' ? "bg-success text-success-foreground" : "bg-destructive"}>
                    <span className="mr-1.5">●</span> {subscription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Próxima renovación</span>
                    </div>
                    <p className="text-2xl font-semibold">{subscription.currentPeriodEnd}</p>
                  </div>
                  {/* Amount would come from plan details or invoice */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>Monto a cobrar</span>
                    </div>
                    <p className="text-2xl font-semibold">
                      $29
                      <span className="text-base text-muted-foreground font-normal"> / mes</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button variant="default" asChild className="flex-1">
                    <Link href="/pricing">
                      <ArrowUpCircle className="mr-2 h-4 w-4" />
                      Actualizar Plan
                    </Link>
                  </Button>
                  <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <X className="mr-2 h-4 w-4" />
                        Cancelar Suscripción
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>¿Cancelar suscripción?</DialogTitle>
                        <DialogDescription>
                          Tu plan continuará activo hasta el {subscription.currentPeriodEnd}. Después de esa fecha,
                          perderás acceso a las funciones Pro.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Esta acción es reversible</p>
                          <p className="text-sm text-muted-foreground">
                            Puedes reactivar tu plan en cualquier momento desde la página de precios.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCancelDialogOpen(false)} disabled={isCancelling}>
                          Mantener suscripción
                        </Button>
                        <Button variant="destructive" onClick={handleCancelSubscription} disabled={isCancelling}>
                          {isCancelling ? "Cancelando..." : "Confirmar cancelación"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method - Hardcoded for MVP as per v0 design */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Método de Pago</CardTitle>
                <CardDescription>Tarjeta registrada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className=\"flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Visa</p>
                        <p className="text-sm text-muted-foreground">•••• 4242</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Expira 12/25</div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar método de pago
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Invoice History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Historial de Facturación</CardTitle>
              <CardDescription>Todas tus facturas y pagos recientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factura</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices?.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.currency} {invoice.amount}</TableCell>
                      <TableCell>
                        {invoice.status === "paid" ? (
                          <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                            Pagado
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-destructive/10 text-destructive hover:bg-destructive/20"
                          >
                            Fallido
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Descargar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

