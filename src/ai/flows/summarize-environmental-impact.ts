'use server';

/**
 * @fileOverview Summarizes the environmental impact of a product based on its data.
 *
 * - summarizeEnvironmentalImpact - A function that takes product data and returns a summary of its environmental impact.
 * - SummarizeEnvironmentalImpactInput - The input type for the summarizeEnvironmentalImpact function.
 * - SummarizeEnvironmentalImpactOutput - The return type for the summarizeEnvironmentalImpact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEnvironmentalImpactInputSchema = z.object({
  pegadaCarbono: z.number().describe('The carbon footprint of the product in kg CO₂eq.'),
  pegadaHidrica: z.number().describe('The water footprint of the product in liters.'),
  impacto: z.string().describe('A general description of the product impact (e.g., low, medium, high).'),
  economia: z.number().describe('Economic sustainability score (0-100).'),
  sociedade: z.number().describe('Social impact score (0-100).'),
  meioAmbiente: z.number().describe('Environmental impact score (0-100).'),
  pontuacaoFinal: z.number().describe('The final sustainability score of the product (0-100).'),
});
export type SummarizeEnvironmentalImpactInput = z.infer<typeof SummarizeEnvironmentalImpactInputSchema>;

const SummarizeEnvironmentalImpactOutputSchema = z.object({
  summary: z.string().describe('A summarized description of the product\'s environmental impact.'),
});
export type SummarizeEnvironmentalImpactOutput = z.infer<typeof SummarizeEnvironmentalImpactOutputSchema>;

export async function summarizeEnvironmentalImpact(
  input: SummarizeEnvironmentalImpactInput
): Promise<SummarizeEnvironmentalImpactOutput> {
  return summarizeEnvironmentalImpactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEnvironmentalImpactPrompt',
  input: {schema: SummarizeEnvironmentalImpactInputSchema},
  output: {schema: SummarizeEnvironmentalImpactOutputSchema},
  prompt: `You are an AI assistant specializing in summarizing the environmental impact of products.

  Based on the following data, create a concise and informative summary (in Portuguese) of the product's environmental impact.
  The summary should include the overall impact level, and one key aspect (high emissions, low water usage, etc.)

  Carbon Footprint: {{pegadaCarbono}} kg CO₂eq
  Water Footprint: {{pegadaHidrica}} liters
  Impact Level: {{impacto}}
  Economic Score: {{economia}}
  Social Score: {{sociedade}}
  Environmental Score: {{meioAmbiente}}
  Final Score: {{pontuacaoFinal}}
  `,
});

const summarizeEnvironmentalImpactFlow = ai.defineFlow(
  {
    name: 'summarizeEnvironmentalImpactFlow',
    inputSchema: SummarizeEnvironmentalImpactInputSchema,
    outputSchema: SummarizeEnvironmentalImpactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
