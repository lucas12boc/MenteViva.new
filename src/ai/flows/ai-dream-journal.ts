'use server';

/**
 * @fileOverview Interpreta los sueños de los usuarios utilizando un modelo de IA.
 *
 * - interpretDream - Una función que interpreta el sueño de un usuario.
 * - InterpretDreamInput - El tipo de entrada para la función interpretDream.
 * - InterpretDreamOutput - El tipo de retorno para la función interpretDream.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretDreamInputSchema = z.object({
  dreamDescription: z.string().describe('Una descripción detallada del sueño del usuario.'),
});
export type InterpretDreamInput = z.infer<typeof InterpretDreamInputSchema>;

const InterpretDreamOutputSchema = z.object({
  interpretation: z.string().describe('Una interpretación del sueño, explorando posibles significados, símbolos y emociones.'),
  associatedEmotions: z.array(z.string()).describe('Una lista de emociones que podrían estar asociadas con el sueño.'),
  dreamSymbols: z
    .array(z.object({
        symbol: z.string().describe("Un símbolo clave identificado en el sueño."),
        meaning: z.string().describe("La posible interpretación o significado de ese símbolo en el contexto del sueño.")
    }))
    .describe("Símbolos clave encontrados en el sueño y sus posibles significados."),
});
export type InterpretDreamOutput = z.infer<typeof InterpretDreamOutputSchema>;

export async function interpretDream(
  input: InterpretDreamInput
): Promise<InterpretDreamOutput> {
  return interpretDreamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretDreamPrompt',
  input: {schema: InterpretDreamInputSchema},
  output: {schema: InterpretDreamOutputSchema},
  prompt: `Eres un experto analista de sueños con conocimientos de psicología y simbolismo. Tu tarea es interpretar el sueño de un usuario de manera empática y perspicaz.

Descripción del Sueño: {{{dreamDescription}}}

Analiza la descripción del sueño para proporcionar:
1.  Una interpretación general que explore los posibles significados y temas subyacentes.
2.  Una lista de emociones que el sueño podría evocar o reflejar.
3.  Una lista de símbolos clave encontrados en el sueño, junto con sus posibles significados en el contexto del sueño.

Adopta un tono de apoyo y curiosidad. Evita hacer afirmaciones definitivas, en su lugar, utiliza frases como "podría sugerir", "a menudo simboliza" o "podrías estar explorando sentimientos de". El objetivo es ofrecer una perspectiva para la reflexión, no una respuesta definitiva.
`,
});

const interpretDreamFlow = ai.defineFlow(
  {
    name: 'interpretDreamFlow',
    inputSchema: InterpretDreamInputSchema,
    outputSchema: InterpretDreamOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
