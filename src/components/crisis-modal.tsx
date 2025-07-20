"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "./icons"
import { useDictionary } from "@/lib/i18n/dictionary-provider"

export function CrisisModal() {
  const { dictionary } = useDictionary()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
            variant="default"
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 flex flex-col items-center justify-center gap-1 animate-pulse"
        >
          <Icons.shield className="h-8 w-8 text-primary-foreground" />
          <span className="text-xs font-bold">{dictionary.crisisModal.trigger}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline text-2xl text-center">{dictionary.crisisModal.title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {dictionary.crisisModal.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-headline text-lg mb-2">{dictionary.crisisModal.anchoringTitle}</h3>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li><strong>5:</strong> {dictionary.crisisModal.anchoringSteps["5"]}</li>
              <li><strong>4:</strong> {dictionary.crisisModal.anchoringSteps["4"]}</li>
              <li><strong>3:</strong> {dictionary.crisisModal.anchoringSteps["3"]}</li>
              <li><strong>2:</strong> {dictionary.crisisModal.anchoringSteps["2"]}</li>
              <li><strong>1:</strong> {dictionary.crisisModal.anchoringSteps["1"]}</li>
            </ul>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-headline text-lg mb-2">{dictionary.crisisModal.breathingTitle}</h3>
            <p className="text-muted-foreground">
              {dictionary.crisisModal.breathingDescription}
            </p>
          </div>
           <div className="p-4 bg-destructive/20 border border-destructive/50 rounded-lg text-center">
            <h3 className="font-headline text-lg mb-2 text-destructive-foreground">{dictionary.crisisModal.emergency.title}</h3>
            <p className="text-muted-foreground mb-4">
              {dictionary.crisisModal.emergency.description}
            </p>
             <div className="flex justify-center gap-4">
                 <Button variant="destructive" asChild>
                    <a href="tel:911">
                        <Icons.phone className="mr-2" />
                        {dictionary.crisisModal.emergency.police}
                    </a>
                </Button>
                <Button variant="destructive" asChild>
                    <a href="tel:911">
                        <Icons.ambulance className="mr-2" />
                        {dictionary.crisisModal.emergency.ambulance}
                    </a>
                </Button>
             </div>
          </div>
        </div>
        <AlertDialogFooter className="flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
           <p className="text-xs text-center text-muted-foreground sm:text-left">{dictionary.crisisModal.emergency.footer}</p>
           <AlertDialogCancel asChild>
                <Button variant="outline" className="w-full sm:w-auto">{dictionary.crisisModal.closeButton}</Button>
           </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
