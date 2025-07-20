"use client"

import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useDictionary } from "@/lib/i18n/dictionary-provider"
import { completeOnboarding } from "@/lib/firebase/services"
import { useToast } from "@/hooks/use-toast"

export default function WelcomePage() {
  const { dictionary } = useDictionary()
  const router = useRouter()
  const { toast } = useToast()

  const handleGetStarted = async () => {
    try {
      await completeOnboarding()
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to complete onboarding", error)
      toast({
        title: "Error",
        description: "Could not save onboarding status. Please try again.",
        variant: "destructive",
      })
      // Fallback redirection
      router.push("/dashboard")
    }
  }

  const features = [
    {
      icon: <Icons.bot className="w-8 h-8 text-primary" />,
      title: dictionary.profilePage.tools.moodTracker.title,
      description: "Registra tus emociones y recibe apoyo de la IA.",
    },
    {
      icon: <Icons.sprout className="w-8 h-8 text-green-500" />,
      title: dictionary.profilePage.tools.emotionalGarden.title,
      description: "Observa cómo tus emociones se convierten en un jardín visual.",
    },
    {
      icon: <Icons.gem className="w-8 h-8 text-secondary" />,
      title: dictionary.profilePage.tools.resilienceSanctuary.title,
      description: "Guarda tus momentos de fortaleza y claridad.",
    },
    {
      icon: <Icons.brain className="w-8 h-8 text-primary" />,
      title: dictionary.profilePage.tools.emotionalTraining.title,
      description: "Crea entrenamientos de IA para fortalecer tu mente.",
    },
    {
      icon: <Icons.heart className="w-8 h-8 text-pink-500" />,
      title: dictionary.profilePage.tools.safeSpace.title,
      description: "Encuentra mensajes de calma y afirmaciones positivas.",
    },
    {
      icon: <Icons.shield className="w-8 h-8 text-destructive" />,
      title: dictionary.profilePage.tools.crisisMode.title,
      description: "Activa el protocolo de calma en momentos de crisis.",
    },
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <Icons.logo className="w-16 h-16 mx-auto text-primary" />
          <CardTitle className="text-4xl font-headline mt-4">¡Bienvenido/a a MenteViva!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Tu compañero personal para el bienestar emocional. Aquí tienes un vistazo rápido de las herramientas a tu disposición:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full" onClick={handleGetStarted}>
            Comenzar mi viaje
            <Icons.arrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
