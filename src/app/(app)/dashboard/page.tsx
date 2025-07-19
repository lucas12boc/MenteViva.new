"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useDictionary } from "@/lib/i18n/dictionary-provider"


export default function DashboardPage() {
  const { dictionary } = useDictionary()

  const features = [
     {
      icon: <Icons.sun className="w-8 h-8 text-yellow-500" />,
      title: dictionary.dashboard.dailyReflection.title,
      description: dictionary.dashboard.dailyReflection.description,
      isReflection: true,
      "data-ai-hint": "sunshine hope"
    },
    {
      icon: <Icons.bot className="w-8 h-8 text-primary" />,
      title: dictionary.dashboard.moodTracker.title,
      description: dictionary.dashboard.moodTracker.description,
      href: "/mood-tracker",
      cta: dictionary.dashboard.moodTracker.cta,
      "data-ai-hint": "journaling emotional"
    },
    {
      icon: <Icons.sprout className="w-8 h-8 text-green-500" />,
      title: dictionary.dashboard.emotionalGarden.title,
      description: dictionary.dashboard.emotionalGarden.description,
      href: "/garden",
      cta: dictionary.dashboard.emotionalGarden.cta,
      "data-ai-hint": "garden flowers"
    },
     {
      icon: <Icons.gem className="w-8 h-8 text-primary" />,
      title: dictionary.dashboard.resilienceSanctuary.title,
      description: dictionary.dashboard.resilienceSanctuary.description,
      href: "/sanctuary",
      cta: dictionary.dashboard.resilienceSanctuary.cta,
      "data-ai-hint": "gem diamond"
    },
    {
      icon: <Icons.brain className="w-8 h-8 text-primary" />,
      title: dictionary.dashboard.emotionalTraining.title,
      description: dictionary.dashboard.emotionalTraining.description,
      href: "/training",
      cta: dictionary.dashboard.emotionalTraining.cta,
      "data-ai-hint": "brain mind"
    },
    {
      icon: <Icons.heart className="w-8 h-8 text-pink-500" />,
      title: dictionary.dashboard.safeSpace.title,
      description: dictionary.dashboard.safeSpace.description,
      href: "/safe-space",
      cta: dictionary.dashboard.safeSpace.cta,
      "data-ai-hint": "calm meditation"
    },
  ]

  return (
    <div className="space-y-8 p-4 md:p-8 min-h-full">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight">{dictionary.dashboard.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.dashboard.subtitle}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col transform hover:-translate-y-1 transition-transform duration-300 ease-in-out border-primary/20 bg-card">
             <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                {feature.icon}
                <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-muted-foreground flex-grow">{feature.description}</p>
              {feature.cta && feature.href && (
                <Link href={feature.href} className="mt-6">
                    <Button className="w-full">{feature.cta}</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
