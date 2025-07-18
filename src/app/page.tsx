"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "@/lib/firebase/client-app";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setGoogleLoading(false);
    }
  };
  
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any)
{
      console.error("Email Sign-In Error:", error);
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Email Sign-Up Error:", error);
       toast({
        title: "Error de registro",
        description: "No se pudo crear la cuenta. El correo puede estar en uso o la contraseña es muy débil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
       <div className="absolute inset-0 -z-20 h-full w-full bg-background" />
       <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
       <div className="absolute -bottom-1/2 -right-1/2 w-[150%] h-[150%] rounded-full bg-primary/10 -z-10" />

      {googleLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <Icons.loader className="w-12 h-12 mx-auto animate-spin text-primary" />
                    <CardTitle className="text-2xl font-headline mt-4">Redirigiendo a la app...</CardTitle>
                    <CardDescription>Por favor, espera un momento.</CardDescription>
                </CardHeader>
            </Card>
        </div>
      )}

      <Tabs defaultValue="login" className="w-full max-w-sm">
        <Card>
            <CardHeader className="text-center">
                <Icons.logo className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="text-2xl font-headline mt-4">Bienvenido a MenteViva</CardTitle>
                <CardDescription>Inicia sesión o regístrate para continuar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
                    {loading ? <Icons.loader className="mr-2 h-5 w-5 animate-spin" /> : <Icons.bot className="mr-2 h-5 w-5" />}
                    Ingresar con Google
                </Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                        O continuar con
                    </span>
                    </div>
                </div>
                 <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" disabled={loading}>Ingresar</TabsTrigger>
                    <TabsTrigger value="signup" disabled={loading}>Registrarse</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                   <form onSubmit={handleEmailSignIn}>
                        <div className="space-y-2">
                            <Label htmlFor="email-login">Email</Label>
                            <Input id="email-login" type="email" placeholder="tu@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading}/>
                        </div>
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="password-login">Contraseña</Label>
                            <Input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading}/>
                        </div>
                        <Button className="w-full mt-6" type="submit" disabled={loading}>
                             {loading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
                             Ingresar
                        </Button>
                   </form>
                </TabsContent>
                <TabsContent value="signup">
                   <form onSubmit={handleEmailSignUp}>
                       <div className="space-y-2">
                            <Label htmlFor="email-signup">Email</Label>
                            <Input id="email-signup" type="email" placeholder="tu@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading}/>
                        </div>
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="password-signup">Contraseña</Label>
                            <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading}/>
                        </div>
                         <Button className="w-full mt-6" type="submit" disabled={loading}>
                            {loading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
                            Crear cuenta
                        </Button>
                   </form>
                </TabsContent>
            </CardContent>
             <CardFooter className="flex flex-col gap-4">
                 <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:underline">
                    Política de Privacidad
                 </Link>
                <div className="flex items-center justify-center gap-2 pt-2">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Tu seguridad y privacidad son nuestra prioridad.</p>
                </div>
            </CardFooter>
        </Card>
      </Tabs>
    </div>
  );
}
