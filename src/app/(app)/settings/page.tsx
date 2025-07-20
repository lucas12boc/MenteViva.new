"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useDictionary } from "@/lib/i18n/dictionary-provider"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { getUserProfile, saveUserProfile, type EmotionalProfile } from "@/lib/firebase/services"
import { useAuth } from "@/context/auth-context"

const profileSchema = z.object({
  emotionalProfile: z.string().optional(),
  trainingGoals: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const { dictionary } = useDictionary()
  const { toast } = useToast()
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      emotionalProfile: "",
      trainingGoals: "",
    },
  })

  useEffect(() => {
    setIsMounted(true)
    const loadProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile();
          if (profile) {
            form.reset(profile);
          }
        } catch (error) {
          console.error("Failed to load user profile from Firestore", error)
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadProfile();
  }, [form, user])

  async function onSubmit(data: ProfileFormValues) {
    try {
      await saveUserProfile(data);
      toast({
        title: dictionary.settings.profile.saveSuccess.title,
        description: dictionary.settings.profile.saveSuccess.description,
      })
    } catch (error) {
      console.error("Failed to save user profile to Firestore", error)
      toast({
        title: dictionary.settings.profile.saveError.title,
        description: dictionary.settings.profile.saveError.description,
        variant: "destructive",
      })
    }
  }
  
  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">{dictionary.settings.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.settings.subtitle}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{dictionary.settings.profile.title}</CardTitle>
          <CardDescription>{dictionary.settings.profile.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Icons.loader className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="emotionalProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.trainingPage.form.emotionalProfileLabel}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={dictionary.trainingPage.form.emotionalProfilePlaceholder}
                          className="min-h-[120px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="trainingGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.trainingPage.form.trainingGoalsLabel}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={dictionary.trainingPage.form.trainingGoalsPlaceholder}
                          className="min-h-[120px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> : <Icons.user className="mr-2 h-4 w-4" />}
                  {dictionary.settings.profile.saveButton}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{dictionary.settings.appearance.title}</CardTitle>
          <CardDescription>
            {dictionary.settings.appearance.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSwitcher />
        </CardContent>
      </Card>
    </div>
  )
}
