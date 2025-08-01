'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useDictionary } from '@/lib/i18n/dictionary-provider';
import { textToSpeech } from '@/ai/flows/ai-text-to-speech';
import { useToast } from '@/hooks/use-toast';

type InspirationCategory = 'breathing' | 'music' | 'affirmations' | 'comfort';

export default function SafeSpacePage() {
  const { dictionary } = useDictionary();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const inspirationalSpaces = [
    {
      id: 'breathing' as InspirationCategory,
      icon: Icons.wind,
      title: dictionary.safeSpacePage.breathing.title,
      description: dictionary.safeSpacePage.breathing.description,
      message: dictionary.crisisModal.breathingDescription,
    },
    {
      id: 'music' as InspirationCategory,
      icon: Icons.headphones,
      title: dictionary.safeSpacePage.music.title,
      description: dictionary.safeSpacePage.music.description,
      message: dictionary.safeSpacePage.music.message,
    },
    {
      id: 'affirmations' as InspirationCategory,
      icon: Icons.sparkles,
      title: dictionary.safeSpacePage.affirmations.title,
      description: dictionary.safeSpacePage.affirmations.description,
      message: dictionary.safeSpacePage.affirmations.message,
    },
    {
      id: 'comfort' as InspirationCategory,
      icon: Icons.heart,
      title: dictionary.safeSpacePage.comfort.title,
      description: dictionary.safeSpacePage.comfort.description,
      message: dictionary.safeSpacePage.comfort.message,
    },
  ];
  
  // Effect to play audio when src is set
  useEffect(() => {
    if (audioSrc && audioRef.current) {
        audioRef.current.src = audioSrc;
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
        setIsPlaying(true);
    }
  }, [audioSrc]);


  const handlePlayPause = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed", e));
        }
        setIsPlaying(!isPlaying);
    }
  };
  
  const handleGenerateAudio = async (text: string, id: InspirationCategory) => {
    if (activeAudio === id && audioSrc) {
        handlePlayPause();
        return;
    }

    setIsGenerating(id);
    setAudioSrc(null);
    setIsPlaying(false);
    
    try {
      const response = await textToSpeech({ text });
      setActiveAudio(id);
      setAudioSrc(response.audioDataUri); // This will trigger the useEffect to play
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        title: dictionary.safeSpacePage.audioError.title,
        description: dictionary.safeSpacePage.audioError.description,
        variant: 'destructive',
      });
       setActiveAudio(null);
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 md:p-8">
       <audio 
            ref={audioRef} 
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        />

      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">{dictionary.safeSpacePage.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.safeSpacePage.subtitle}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {inspirationalSpaces.map((space) => {
          const isCurrentAudio = activeAudio === space.id;
          const isCurrentGenerator = isGenerating === space.id;

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
                <p className="text-muted-foreground mb-4 flex-grow h-16">{space.description}</p>
                <div className="w-full p-4 my-4 bg-primary/10 border border-primary/20 rounded-lg text-primary-foreground min-h-[120px] flex items-center justify-center">
                    <p className="font-semibold text-base leading-relaxed text-foreground">{space.message}</p>
                </div>
                <Button
                  variant="soft"
                  className="w-48 mt-auto"
                  onClick={() => handleGenerateAudio(space.message, space.id)}
                  disabled={!!isGenerating && !isCurrentGenerator}
                >
                    {isCurrentGenerator ? (
                        <>
                            <Icons.loader className="mr-2 animate-spin" />
                            {dictionary.safeSpacePage.generatingAudio}
                        </>
                    ) : isCurrentAudio ? (
                        isPlaying ? (
                            <>
                                <Icons.pause className="mr-2" />
                                {dictionary.safeSpacePage.pauseAudio}
                            </>
                        ) : (
                             <>
                                <Icons.play className="mr-2" />
                                {dictionary.safeSpacePage.playAudio}
                            </>
                        )
                    ) : (
                         <>
                            <Icons.headphones className="mr-2" />
                            {dictionary.safeSpacePage.listenAudio}
                        </>
                    )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
