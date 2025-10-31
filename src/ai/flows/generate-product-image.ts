'use server';

/**
 * @fileOverview Generates an image for a product based on its name.
 *
 * - generateProductImage - A function that takes a product name and returns an image data URI.
 * - GenerateProductImageInput - The input type for the generateProductImage function.
 * - GenerateProductImageOutput - The return type for the generateProductImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProductImageInputSchema = z.object({
  productName: z.string().describe('The name of the product to generate an image for.'),
});
export type GenerateProductImageInput = z.infer<typeof GenerateProductImageInputSchema>;

const GenerateProductImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateProductImageOutput = z.infer<typeof GenerateProductImageOutputSchema>;

export async function generateProductImage(input: GenerateProductImageInput): Promise<GenerateProductImageOutput> {
  return generateProductImageFlow(input);
}

const generateProductImageFlow = ai.defineFlow(
  {
    name: 'generateProductImageFlow',
    inputSchema: GenerateProductImageInputSchema,
    outputSchema: GenerateProductImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Uma fotografia de alta qualidade de um(a) ${input.productName}, em um fundo branco, estilo e-commerce.`,
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a data URI.');
    }

    return { imageDataUri: media.url };
  }
);
