import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary, getLanguage } from "@/lib/i18n/i18n.server";
import Link from "next/link";

export default async function ForBusinessPage() {
  const lang = getLanguage();
  const dictionary = await getDictionary(lang);
  const t = dictionary.forBusinessPage;

  const benefits = [
    {
      icon: <Icons.trendingDown className="w-10 h-10 text-primary" />,
      title: t.benefits.one.title,
      description: t.benefits.one.description,
    },
    {
      icon: <Icons.trendingUp className="w-10 h-10 text-primary" />,
      title: t.benefits.two.title,
      description: t.benefits.two.description,
    },
    {
      icon: <Icons.heart className="w-10 h-10 text-primary" />,
      title: t.benefits.three.title,
      description: t.benefits.three.description,
    },
     {
      icon: <Icons.shield className="w-10 h-10 text-primary" />,
      title: t.benefits.four.title,
      description: t.benefits.four.description,
    },
  ];

  return (
    <div className="bg-transparent">
      <header className="relative isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30" />
        </div>
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              {t.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t.subtitle}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                    <a href="mailto:menteglobalempresarial@gmail.com">
                        <Icons.mail className="mr-2"/>
                        {t.cta}
                    </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                    <Link href="/dashboard">
                        {t.backToApp} <span aria-hidden="true">→</span>
                    </Link>
                </Button>
            </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">{t.features.eyebrow}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                {t.features.title}
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {t.features.description}
            </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex flex-col">
                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                            {benefit.icon}
                            <span className="font-headline text-xl">{benefit.title}</span>
                        </dt>
                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                            <p className="flex-auto">{benefit.description}</p>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
      </main>

       <div className="bg-secondary/20 backdrop-blur-sm">
            <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    {t.finalCta.title}
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    {t.finalCta.description}
                </p>
                <div className="mt-10">
                     <Button asChild size="lg">
                        <a href="mailto:menteglobalempresarial@gmail.com">
                            <Icons.mail className="mr-2"/>
                            {t.cta}
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
