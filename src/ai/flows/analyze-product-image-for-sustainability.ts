'use server';

/**
 * @fileOverview Analyzes a product image for sustainability information.
 *
 * - analyzeProductImage - A function that handles the product image analysis process.
 * - AnalyzeProductImageInput - The input type for the analyzeProductImage function.
 * - AnalyzeProductImageOutput - The return type for the analyzeProductImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeProductImageInputSchema = z.object({
  productDataUri: z
    .string()
    .describe(
      "A photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeProductImageInput = z.infer<typeof AnalyzeProductImageInputSchema>;

const AnalyzeProductImageOutputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  carbonFootprint: z.number().describe('The carbon footprint of the product in kg CO₂eq.'),
  waterFootprint: z.number().describe('The water footprint of the product in liters.'),
  environmentalImpactDescription: z
    .string()
    .describe('A summarized description of the environmental impact of the product.'),
  economyScore: z.number().describe('A score representing the economic sustainability of the product.'),
  societyScore: z.number().describe('A score representing the social impact of the product.'),
  environmentScore: z.number().describe('A score representing the environmental impact of the product.'),
  totalScore: z.number().describe('The total sustainability score of the product (0-100).'),
  sustainabilityCategory: z.string().describe('The sustainability category of the product (e.g., Sustainable, Regular, High Impact).'),
});

export type AnalyzeProductImageOutput = z.infer<typeof AnalyzeProductImageOutputSchema>;

export async function analyzeProductImage(input: AnalyzeProductImageInput): Promise<AnalyzeProductImageOutput> {
  return analyzeProductImageFlow(input);
}

const analyzeProductImagePrompt = ai.definePrompt({
  name: 'analyzeProductImagePrompt',
  input: {schema: AnalyzeProductImageInputSchema},
  output: {schema: AnalyzeProductImageOutputSchema},
  prompt: `You are an AI assistant designed to analyze the environmental impact of products based on images.

  Analyze the provided product image and provide the following information:

  - productName: The name of the product in the image.
  - carbonFootprint: The estimated carbon footprint of the product (in kg CO₂eq).
  - waterFootprint: The estimated water footprint of the product (in liters).
  - environmentalImpactDescription: A short description of the product's environmental impact.
  - economyScore: A score (0-100) representing the economic sustainability of the product.
  - societyScore: A score (0-100) representing the social impact of the product.
  - environmentScore: A score (0-100) representing the direct ecological damages, such as pollution and waste.
  - totalScore: A score (0-100) representing the total sustainability of the product.
  - sustainabilityCategory: A category based on the totalScore. If the score is:
    - 70-100: Sustainable
    - 40-69: Regular
    - 0-39: High Impact

  Here is the product image: {{media url=productDataUri}}
  Please analyze the product shown in the image and provide the requested information.
  `,
});

const analyzeProductImageFlow = ai.defineFlow(
  {
    name: 'analyzeProductImageFlow',
    inputSchema: AnalyzeProductImageInputSchema,
    outputSchema: AnalyzeProductImageOutputSchema,
  },
  async input => {
    const {output} = await analyzeProductImagePrompt(input);
    return output!;
  }
);
