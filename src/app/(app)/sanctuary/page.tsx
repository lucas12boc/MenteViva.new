"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useDictionary } from "@/lib/i18n/dictionary-provider"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getResilienceGems, removeResilienceGem, type ResilienceGem } from "@/lib/firebase/services"
import { useAuth } from "@/context/auth-context"

export default function ResilienceSanctuaryPage() {
  const { dictionary, language } = useDictionary();
  const { user } = useAuth();
  const [gems, setGems] = useState<ResilienceGem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGems = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const fetchedGems = await getResilienceGems();
          setGems(fetchedGems);
        } catch (error) {
          console.error("Failed to load resilience gems from Firestore", error);
          toast({
            title: "Error",
            description: "No se pudieron cargar tus gemas de resiliencia.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchGems();
  }, [user, toast]);

  const handleRemoveGem = async (gemId: string) => {
    try {
        await removeResilienceGem(gemId);
        setGems(prevGems => prevGems.filter(gem => gem.id !== gemId));
        toast({
            title: dictionary.resilienceSanctuary.removeSuccess.title,
            description: dictionary.resilienceSanctuary.removeSuccess.description,
        });
    } catch (error) {
        console.error("Failed to remove gem from Firestore", error);
        toast({
            title: dictionary.resilienceSanctuary.removeError.title,
            description: dictionary.resilienceSanctuary.removeError.description,
            variant: "destructive",
        });
    }
  }
    
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
        <h1 className="text-4xl font-headline font-bold">{dictionary.resilienceSanctuary.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.resilienceSanctuary.subtitle}
        </p>
      </div>

      {gems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {gems.map((gem) => (
            <Card key={gem.id} className="flex flex-col bg-secondary/30 border-secondary/50">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">
                        {new Date(gem.timestamp).toLocaleString(language, {dateStyle: 'long', timeStyle: 'short'})}
                    </CardTitle>
                    <CardDescription>
                        {dictionary.moodTrackerPage.response.moodScore}: {gem.moodScore}/10
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <div>
                        <h4 className="font-semibold mb-1">{dictionary.moodTrackerPage.history.yourEntry}</h4>
                        <p className="text-muted-foreground bg-background/50 p-3 rounded-md">{gem.moodLog}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">{dictionary.moodTrackerPage.response.title}</h4>
                        <p className="text-muted-foreground bg-background/50 p-3 rounded-md">{gem.therapeuticResponse}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                                <Icons.trash className="mr-2 h-4 w-4" />
                                {dictionary.resilienceSanctuary.removeButton}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>{dictionary.resilienceSanctuary.confirmRemove.title}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {dictionary.resilienceSanctuary.confirmRemove.description}
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>{dictionary.resilienceSanctuary.confirmRemove.cancel}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemoveGem(gem.id!)}>
                                {dictionary.resilienceSanctuary.confirmRemove.confirm}
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-10 px-6 bg-secondary/20">
            <Icons.gem className="w-16 h-16 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-2xl font-headline font-semibold">{dictionary.resilienceSanctuary.empty.title}</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">{dictionary.resilienceSanctuary.empty.description}</p>
            <Button asChild className="mt-6">
                <Link href="/mood-tracker">{dictionary.resilienceSanctuary.empty.cta}</Link>
            </Button>
        </Card>
      )}
    </div>
  );
}
