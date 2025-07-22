"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { interpretDream, type InterpretDreamOutput } from "@/ai/flows/ai-dream-journal"
import { useDictionary } from "@/lib/i18n/dictionary-provider"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  dreamDescription: z.string().min(20, {
    message: "Por favor, describe tu sueño con más detalle.",
  }),
});

export default function DreamJournalPage() {
  const { dictionary } = useDictionary()
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<InterpretDreamOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dreamDescription: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setResponse(null)
    try {
      const res = await interpretDream({
        dreamDescription: values.dreamDescription,
      })
      setResponse(res)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error al interpretar el sueño",
        description: "No se pudo obtener la interpretación de tu sueño. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Diario de Sueños</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explora los paisajes de tu mente subconsciente.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Registra tu Sueño</CardTitle>
          <CardDescription>
            Describe tu sueño con el mayor detalle posible para obtener una interpretación perspicaz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="dreamDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del Sueño</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="¿Qué sucedió en tu sueño? ¿Quién estaba allí? ¿Cómo te sentiste?"
                        className="min-h-[150px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Icons.bot className="mr-2 h-4 w-4 animate-spin" /> : <Icons.sparkles className="mr-2 h-4 w-4" />}
                Interpretar mi Sueño
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analizando tu sueño...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
          </CardContent>
        </Card>
      )}

      {response && (
        <Card className="bg-secondary/50 border-primary/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Interpretación del Sueño</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div>
                <h3 className="font-headline text-lg mb-2">Análisis General</h3>
                <p className="text-base leading-relaxed">{response.interpretation}</p>
            </div>
             <div>
                <h3 className="font-headline text-lg mb-2">Emociones Asociadas</h3>
                <div className="flex flex-wrap gap-2">
                    {response.associatedEmotions.map((emotion) => (
                        <Badge key={emotion} variant="secondary">{emotion}</Badge>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="font-headline text-lg mb-2">Símbolos Clave</h3>
                 <div className="space-y-4">
                    {response.dreamSymbols.map((symbol) => (
                        <div key={symbol.symbol} className="p-3 bg-background/50 rounded-md">
                            <h4 className="font-bold">{symbol.symbol}</h4>
                            <p className="text-muted-foreground">{symbol.meaning}</p>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
