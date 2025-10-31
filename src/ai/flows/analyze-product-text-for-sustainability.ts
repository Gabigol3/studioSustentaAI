'use server';

/**
 * @fileOverview Analyzes a product name for sustainability information.
 *
 * - analyzeProductText - A function that handles the product name analysis process.
 * - AnalyzeProductTextInput - The input type for the analyzeProductText function.
 * - AnalyzeProductImageOutput - The return type for the analyzeProductText function (shared with image analysis).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { AnalyzeProductImageOutput } from './analyze-product-image-for-sustainability';

const AnalyzeProductTextInputSchema = z.object({
  productName: z.string().describe('The name of a product.'),
});
export type AnalyzeProductTextInput = z.infer<typeof AnalyzeProductTextInputSchema>;

const AnalyzeProductTextOutputSchema = z.object({
    productName: z.string().describe('O nome do produto.'),
    carbonFootprint: z.number().describe('A pegada de carbono do produto em kg CO₂eq.'),
    waterFootprint: z.number().describe('A pegada hídrica do produto em litros.'),
    environmentalImpactDescription: z
      .string()
      .describe('Uma descrição resumida do impacto ambiental do produto.'),
    economyScore: z.number().describe('Uma pontuação que representa a sustentabilidade econômica do produto.'),
    societyScore: z.number().describe('Uma pontuação que representa o impacto social do produto.'),
    environmentScore: z.number().describe('Uma pontuação que representa o impacto ambiental do produto.'),
    totalScore: z.number().describe('A pontuação total de sustentabilidade do produto (0-100).'),
    sustainabilityCategory: z.string().describe('A categoria de sustentabilidade do produto (por exemplo, Sustentável, Regular, Alto Impacto).'),
  });
  

export async function analyzeProductText(input: AnalyzeProductTextInput): Promise<AnalyzeProductImageOutput> {
  return analyzeProductTextFlow(input);
}

const analyzeProductTextPrompt = ai.definePrompt({
  name: 'analyzeProductTextPrompt',
  input: {schema: AnalyzeProductTextInputSchema},
  output: {schema: AnalyzeProductTextOutputSchema},
  prompt: `Você é um assistente de IA projetado para analisar o impacto ambiental de produtos com base em seu nome. Forneça todas as respostas em português.

  Analise o nome do produto fornecido e forneça as seguintes informações:

  - productName: O nome do produto.
  - carbonFootprint: A pegada de carbono estimada do produto (em kg CO₂eq).
  - waterFootprint: A pegada hídrica estimada do produto (em litros).
  - environmentalImpactDescription: Uma breve descrição do impacto ambiental do produto.
  - economyScore: Uma pontuação (0-100) representando a sustentabilidade econômica do produto.
  - societyScore: Uma pontuação (0-100) representando o impacto social do produto.
  - environmentScore: Uma pontuação (0-100) representando os danos ecológicos diretos, como poluição e resíduos.
  - totalScore: Uma pontuação (0-100) representando a sustentabilidade total do produto.
  - sustainabilityCategory: Uma categoria com base no totalScore. Se a pontuação for:
    - 70-100: Sustentável
    - 40-69: Regular
    - 0-39: Alto Impacto

  Aqui está o nome do produto: {{{productName}}}
  Por favor, analise o produto e forneça as informações solicitadas em português.
  `,
});

const analyzeProductTextFlow = ai.defineFlow(
  {
    name: 'analyzeProductTextFlow',
    inputSchema: AnalyzeProductTextInputSchema,
    outputSchema: AnalyzeProductTextOutputSchema,
  },
  async input => {
    const {output} = await analyzeProductTextPrompt(input);
    return output!;
  }
);
