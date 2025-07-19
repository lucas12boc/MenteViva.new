"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { useDictionary } from "@/lib/i18n/dictionary-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getMoodHistory, type MoodEntry } from "@/lib/firebase/services"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

type GardenItem = {
  type: 'flower' | 'plant' | 'rain';
  score: number;
  date: string;
};

const getGardenItem = (score: number): 'flower' | 'plant' | 'rain' => {
  if (score >= 8) return 'flower';
  if (score >= 4) return 'plant';
  return 'rain';
}

const itemIcons = {
  flower: Icons.flower,
  plant: Icons.leaf,
  rain: Icons.cloudRain,
};

const itemColors = {
    flower: "text-primary",
    plant: "text-green-500",
    rain: "text-blue-400",
}

export default function EmotionalGardenPage() {
  const { dictionary, language } = useDictionary();
  const { user } = useAuth();
  const { toast } = useToast();
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const history = await getMoodHistory();
          setMoodHistory(history);
        } catch (error) {
          console.error("Failed to load mood history from Firestore", error);
           toast({
            title: "Error",
            description: "No se pudo cargar tu jardín emocional.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchHistory();
  }, [user, toast]);

  const gardenData: GardenItem[] = moodHistory
    .slice(0, 30) // Limit to last 30 entries for a nice grid
    .map(entry => ({
      type: getGardenItem(entry.moodScore),
      score: entry.moodScore,
      date: new Date(entry.timestamp).toLocaleDateString(language, { day: 'numeric', month: 'short' }),
    }));
    
  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <Icons.loader className="w-10 h-10 animate-spin" />
        </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">{dictionary.emotionalGarden.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.emotionalGarden.subtitle}
        </p>
      </div>

      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-3">
             <Icons.sun className="w-8 h-8 text-yellow-500" />
            {dictionary.emotionalGarden.garden.title}
          </CardTitle>
          <CardDescription>
            {dictionary.emotionalGarden.garden.description1}
            {' '}
            {gardenData.length > 1 ? dictionary.emotionalGarden.garden.descriptionPlural : dictionary.emotionalGarden.garden.descriptionSingular}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {gardenData.length > 0 ? (
            <div className="grid grid-cols-5 md:grid-cols-10 gap-4 p-4 rounded-lg bg-background/50">
              {gardenData.map((item, index) => {
                 const Icon = itemIcons[item.type];
                 return (
                    <div key={index} className="flex flex-col items-center justify-center aspect-square group">
                        <Icon className={cn("w-10 h-10 transition-transform duration-300 group-hover:scale-125", itemColors[item.type])} />
                        <span className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{item.date}</span>
                        <span className="text-xs font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">({item.score})</span>
                    </div>
                 )
              })}
            </div>
          ) : (
            <div className="text-center py-10 px-6 bg-background/50 rounded-lg">
                <Icons.sprout className="w-16 h-16 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-xl font-headline font-semibold">{dictionary.emotionalGarden.empty.title}</h3>
                <p className="mt-2 text-muted-foreground">{dictionary.emotionalGarden.empty.description}</p>
                <Button asChild className="mt-6">
                    <Link href="/mood-tracker">{dictionary.emotionalGarden.empty.cta}</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
