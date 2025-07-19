"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { moodTracker } from "@/ai/flows/ai-mood-tracker"
import { useDictionary } from "@/lib/i18n/dictionary-provider"
import { addMoodEntry, getMoodHistory, addResilienceGem, type MoodEntry } from "@/lib/firebase/services"
import { useAuth } from "@/context/auth-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts'
import type { ChartConfig } from "@/components/ui/chart"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const chartConfig = {
  moodScore: {
    label: "Puntuación de Ánimo",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function MoodTrackerPage() {
  const { dictionary, language } = useDictionary()
  const { user } = useAuth();
  const [loading, setLoading] = useState(false)
  const [lastResponse, setLastResponse] = useState<MoodEntry | null>(null)
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [historyLoading, setHistoryLoading] = useState(true);
  const { toast } = useToast()

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        setHistoryLoading(true);
        try {
          const history = await getMoodHistory();
          setMoodHistory(history);
        } catch (error) {
          console.error("Failed to load mood history from Firestore", error);
          toast({
            title: "Error",
            description: "No se pudo cargar tu historial de ánimo.",
            variant: "destructive",
          });
        } finally {
          setHistoryLoading(false);
        }
      }
    };
    fetchHistory();
  }, [user, toast]);

  const formSchema = z.object({
    moodLog: z.string().min(10, {
      message: dictionary.moodTrackerPage.form.validationError,
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moodLog: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setLastResponse(null)
    try {
      const res = await moodTracker({ moodLog: values.moodLog, userProfile: user?.uid });
      const newEntryData = {
        ...res,
        moodLog: values.moodLog,
      };
      
      const newEntry = await addMoodEntry(newEntryData);
      
      setLastResponse(newEntry);
      setMoodHistory(prev => [newEntry, ...prev]);
      
      form.reset()

    } catch (error) {
      console.error(error)
      toast({
        title: dictionary.moodTrackerPage.form.errorToast.title,
        description: dictionary.moodTrackerPage.form.errorToast.description,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  
  const handleSaveToSanctuary = async () => {
    if (!lastResponse) return;
    try {
      await addResilienceGem(lastResponse);
      toast({
        title: dictionary.resilienceSanctuary.saveSuccess.title,
        description: dictionary.resilienceSanctuary.saveSuccess.description,
      });
    } catch (error) {
       console.error("Failed to save to sanctuary", error);
       toast({
        title: dictionary.resilienceSanctuary.saveError.title,
        description: dictionary.resilienceSanctuary.saveError.description,
        variant: "destructive",
      });
    }
  }

  const chartData = moodHistory
    .map(entry => ({
      date: new Date(entry.timestamp),
      moodScore: entry.moodScore,
    }))
    .filter(entry => entry.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Last 7 days
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(entry => ({
        ...entry,
        date: format(entry.date, "d MMM", { locale: language === 'es' ? es : undefined }),
    }))

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">{dictionary.moodTrackerPage.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.moodTrackerPage.subtitle}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{dictionary.moodTrackerPage.card.title}</CardTitle>
          <CardDescription>
            {dictionary.moodTrackerPage.card.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="moodLog"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.moodTrackerPage.form.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={dictionary.moodTrackerPage.form.placeholder}
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
                {dictionary.moodTrackerPage.form.submitButton}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Icons.bot className="w-6 h-6"/> {dictionary.moodTrackerPage.loadingState}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[70%]" />
            </CardContent>
         </Card>
      )}

      {lastResponse && (
        <Card className="bg-accent/50 border-accent">
          <CardHeader className="flex flex-row justify-between items-start">
            <div className="space-y-1.5">
                <CardTitle className="font-headline flex items-center gap-2">
                <Icons.bot className="w-6 h-6 text-accent-foreground" />
                {dictionary.moodTrackerPage.response.title}
                </CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={handleSaveToSanctuary}>
              <Icons.gem className="mr-2 h-4 w-4" />
              {dictionary.resilienceSanctuary.saveButton}
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed text-accent-foreground">{lastResponse.therapeuticResponse}</p>
          </CardContent>
           <CardFooter className="text-sm text-accent-foreground font-semibold">
              {dictionary.moodTrackerPage.response.moodScore}: {lastResponse.moodScore} / 10
          </CardFooter>
        </Card>
      )}
      
      {historyLoading ? (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">{dictionary.moodTrackerPage.history.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-center h-[250px]">
                  <Icons.loader className="w-8 h-8 animate-spin" />
                </div>
            </CardContent>
        </Card>
      ) : moodHistory.length > 0 && (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">{dictionary.moodTrackerPage.history.title}</CardTitle>
                <CardDescription>{dictionary.moodTrackerPage.history.subtitle7Days}</CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length > 1 ? (
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis domain={[1, 10]} tickLine={false} axisLine={false} tickMargin={8} />
                             <RechartsTooltip 
                                content={<ChartTooltipContent indicator="dot" />} 
                                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: "3 3" }}
                            />
                            <Line type="monotone" dataKey="moodScore" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                ) : (
                    <div className="flex items-center justify-center h-[250px] text-muted-foreground bg-muted/50 rounded-lg">
                        <p>{dictionary.moodTrackerPage.history.notEnoughData}</p>
                    </div>
                )}
            </CardContent>
        </Card>
      )}

      {historyLoading ? null : moodHistory.length > 0 && (
        <div className="space-y-4">
            <h3 className="text-2xl font-headline text-center">{dictionary.moodTrackerPage.history.entriesTitle}</h3>
            <Accordion type="single" collapsible className="w-full">
            {moodHistory.slice(0, 10).map((entry, index) => (
                <AccordionItem value={`item-${index}`} key={entry.id}>
                <AccordionTrigger className="font-semibold text-base">
                    {new Date(entry.timestamp).toLocaleString(language, {dateStyle: 'long', timeStyle: 'short'})} - {dictionary.moodTrackerPage.response.moodScore}: {entry.moodScore}/10
                </AccordionTrigger>
                <AccordionContent className="space-y-4 text-base p-4 bg-background/50 rounded-b-md">
                    <p><strong>{dictionary.moodTrackerPage.history.yourEntry}:</strong> {entry.moodLog}</p>
                    <p><strong>{dictionary.moodTrackerPage.response.title}:</strong> {entry.therapeuticResponse}</p>
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </div>
      )}

    </div>
  )
}
