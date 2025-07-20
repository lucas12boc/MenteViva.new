"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useDictionary } from "@/lib/i18n/dictionary-provider"

export default function ProfilePage() {
  const { dictionary } = useDictionary()

  const features = [
    {
      icon: <Icons.bot className="w-8 h-8 text-primary" />,
      title: dictionary.profilePage.tools.moodTracker.title,
      description: dictionary.profilePage.tools.moodTracker.description,
      href: "/mood-tracker",
      cta: dictionary.profilePage.tools.moodTracker.cta,
    },
    {
      icon: <Icons.sprout className="w-8 h-8 text-primary" />,
      title: dictionary.profilePage.tools.emotionalGarden.title,
      description: dictionary.profilePage.tools.emotionalGarden.description,
      href: "/garden",
      cta: dictionary.profilePage.tools.emotionalGarden.cta,
    },
    {
      icon: <Icons.gem className="w-8 h-8 text-primary" />,
      title: dictionary.profilePage.tools.resilienceSanctuary.title,
      description: dictionary.profilePage.tools.resilienceSanctuary.description,
      href: "/sanctuary",
      cta: dictionary.profilePage.tools.resilienceSanctuary.cta,
    },
    {
      icon: <Icons.brain className="w-8 h-8 text-primary" />,
      title: dictionary.profilePage.tools.emotionalTraining.title,
      description: dictionary.profilePage.tools.emotionalTraining.description,
      href: "/training",
      cta: dictionary.profilePage.tools.emotionalTraining.cta,
    },
    {
      icon: <Icons.heart className="w-8 h-8 text-primary" />,
      title: dictionary.profilePage.tools.safeSpace.title,
      description: dictionary.profilePage.tools.safeSpace.description,
      href: "/safe-space",
      cta: dictionary.profilePage.tools.safeSpace.cta,
    },
     {
      icon: <Icons.shield className="w-8 h-8 text-destructive" />,
      title: dictionary.profilePage.tools.crisisMode.title,
      description: dictionary.profilePage.tools.crisisMode.description,
      href: "#",
      cta: dictionary.profilePage.tools.crisisMode.cta,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight">{dictionary.profilePage.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.profilePage.subtitle}
        </p>
      </div>
      <Card className="bg-secondary/50">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{dictionary.profilePage.about.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-secondary-foreground">{dictionary.profilePage.about.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{dictionary.profilePage.support.title}</CardTitle>
          <CardDescription>{dictionary.profilePage.support.description}</CardDescription>
        </CardHeader>
        <CardContent>
           <Button asChild className="w-full">
            <a href="https://www.buymeacoffee.com/menteviva" target="_blank" rel="noopener noreferrer">
              <Icons.heart className="mr-2" />
              {dictionary.profilePage.support.cta}
            </a>
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{dictionary.profilePage.contact.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <a href="mailto:menteglobalempresarial@gmail.com" className="flex items-center gap-3 group">
                    <Icons.mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm group-hover:underline">menteglobalempresarial@gmail.com</span>
                </a>
                <a href="https://wa.me/542246496971" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <Icons.whatsapp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm group-hover:underline">+54 2246 49-6971</span>
                </a>
            </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-headline font-bold text-center">{dictionary.profilePage.tools.title}</h2>
         <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
                {feature.href !== "#" && (
                  <Link href={feature.href} className="mt-4">
                    <Button className="w-full" variant="soft">{feature.cta}</Button>
                  </Link>
                )}
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
