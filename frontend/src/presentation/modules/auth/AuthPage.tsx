"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/presentation/components/ui/button"
import { Input } from "@/presentation/components/ui/input"
import { Label } from "@/presentation/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/presentation/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs"
import Link from "next/link"
import { CreditCard } from "lucide-react"
import { useAuth } from "@/presentation/hooks/use-auth"

export default function AuthPage() {
  const { login, register, isLoading } = useAuth()
  
  // Login State
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  
  // Register State
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email: loginEmail })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    await register({ email: registerEmail, name: registerName, password: registerPassword })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">SaaS Platform</span>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Bienvenido</CardTitle>
                <CardDescription>Ingresa tu email y contraseña para continuar</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      required 
                      disabled={isLoading}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      disabled={isLoading}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Crear cuenta</CardTitle>
                <CardDescription>Ingresa tus datos para comenzar gratis</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Juan Pérez" 
                      required 
                      disabled={isLoading}
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      required 
                      disabled={isLoading}
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      required 
                      disabled={isLoading}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground text-center w-full">
                  Al registrarte, aceptas nuestros{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Términos
                  </Link>{" "}
                  y{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacidad
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

