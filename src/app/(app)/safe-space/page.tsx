'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useDictionary } from '@/lib/i18n/dictionary-provider';
import { cn } from '@/lib/utils';

type InspirationCategory = 'breathing' | 'music' | 'affirmations' | 'comfort';

export default function SafeSpacePage() {
  const { dictionary } = useDictionary();
  const [activeMessage, setActiveMessage] = useState<InspirationCategory | null>(null);

  const inspirationalSpaces = [
    {
      id: 'breathing' as InspirationCategory,
      icon: Icons.wind,
      title: dictionary.safeSpacePage.breathing.title,
      description: dictionary.safeSpacePage.breathing.description,
      message: dictionary.crisisModal.breathingDescription,
      messageIcon: Icons.wind,
    },
    {
      id: 'music' as InspirationCategory,
      icon: Icons.headphones,
      title: dictionary.safeSpacePage.music.title,
      description: "Encuentra la calma en el silencio y la melodía de tus pensamientos.",
      message: "Cierra los ojos. Imagina una melodía suave que te envuelve. No hay prisa, solo el ritmo de tu propia paz interior. Deja que la música de tu alma calme cualquier tormenta.",
      messageIcon: Icons.headphones,
    },
    {
      id: 'affirmations' as InspirationCategory,
      icon: Icons.sparkles,
      title: dictionary.safeSpacePage.affirmations.title,
      description: "Recárgate con palabras de poder y autoaceptación.",
      message: "Soy fuerte, soy capaz y merezco la paz. Cada día es una nueva oportunidad para brillar. Acepto mis emociones y me permito sentir, sabiendo que soy más que ellas. ✨",
      messageIcon: Icons.sparkles,
    },
    {
      id: 'comfort' as InspirationCategory,
      icon: Icons.heart,
      title: dictionary.safeSpacePage.comfort.title,
      description: "Recibe un recordatorio de que no estás solo/a y eres valioso/a.",
      message: "Recuerda que está bien no estar bien. Eres una persona valiosa e increíble, incluso en los días difíciles. Te envío un abrazo virtual lleno de calma y fuerza. ❤️",
      messageIcon: Icons.heart,
    },
  ];

  const handleToggleMessage = (category: InspirationCategory) => {
    if (activeMessage === category) {
      setActiveMessage(null);
    } else {
      setActiveMessage(category);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">{dictionary.safeSpacePage.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.safeSpacePage.subtitle}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {inspirationalSpaces.map((space) => {
          const isMessageVisible = activeMessage === space.id;
          
          return (
            <Card
              key={space.id}
              className="flex flex-col text-center items-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-card"
            >
              <div className="p-4 bg-primary/20 rounded-full mb-4">
                <space.icon className="w-10 h-10 text-primary" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-2xl">{space.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2 flex-grow flex flex-col items-center w-full">
                <p className="text-muted-foreground mb-4 flex-grow">{space.description}</p>
                
                {isMessageVisible ? (
                   <div className="w-full p-4 my-4 bg-primary/10 border border-primary/20 rounded-lg text-primary-foreground">
                      <div className="flex flex-col items-center gap-4 text-center">
                         <space.messageIcon className="w-8 h-8 text-primary" />
                         <p className="font-semibold text-lg leading-relaxed text-foreground">{space.message}</p>
                      </div>
                   </div>
                ) : (
                  <div className="min-h-[142px] flex items-center justify-center"></div>
                )}

                <Button
                  variant="soft"
                  className="w-40 mt-auto"
                  onClick={() => handleToggleMessage(space.id)}
                >
                  {isMessageVisible ? <Icons.close className="mr-2" /> : <Icons.book className="mr-2" />}
                  {isMessageVisible ? 'Ocultar Mensaje' : 'Ver Mensaje'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
