"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { generateEmotionalTraining, type EmotionalTrainingOutput } from "@/ai/flows/ai-emotional-training"
import { useDictionary } from "@/lib/i18n/dictionary-provider"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { getUserProfile } from "@/lib/firebase/services"
import { useAuth } from "@/context/auth-context"

const formSchema = z.object({
  emotionalProfile: z.string().min(20, {
    message: "Por favor, proporciona más detalles sobre tus patrones emocionales.",
  }),
  trainingGoals: z.string().min(10, {
    message: "Por favor, describe qué te gustaría lograr con este entrenamiento.",
  }),
});

export default function EmotionalTrainingPage() {
  const { dictionary } = useDictionary()
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<EmotionalTrainingOutput | null>(null)
  const { toast } = useToast()
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emotionalProfile: "",
      trainingGoals: "",
    },
  })

  useEffect(() => {
    const loadProfile = async () => {
        if (user) {
            try {
                const profile = await getUserProfile();
                if (profile) {
                    form.reset(profile);
                }
            } catch (error) {
                console.error("Failed to load user profile from Firestore", error);
            }
        }
    };
    loadProfile();
  }, [form, user]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setResponse(null)
    try {
      const res = await generateEmotionalTraining({
        emotionalProfile: values.emotionalProfile,
        trainingGoals: values.trainingGoals,
      })
      setResponse(res)
    } catch (error) {
      console.error(error)
      toast({
        title: dictionary.trainingPage.form.errorToast.title,
        description: dictionary.trainingPage.form.errorToast.description,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">{dictionary.trainingPage.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.trainingPage.subtitle}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{dictionary.trainingPage.card.title}</CardTitle>
          <CardDescription>
            {dictionary.trainingPage.card.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
