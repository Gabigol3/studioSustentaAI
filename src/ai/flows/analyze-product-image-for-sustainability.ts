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

export type AnalyzeProductImageOutput = z.infer<typeof AnalyzeProductImageOutputSchema>;

export async function analyzeProductImage(input: AnalyzeProductImageInput): Promise<AnalyzeProductImageOutput> {
  return analyzeProductImageFlow(input);
}

const analyzeProductImagePrompt = ai.definePrompt({
  name: 'analyzeProductImagePrompt',
  input: {schema: AnalyzeProductImageInputSchema},
  output: {schema: AnalyzeProductImageOutputSchema},
  prompt: `Você é um assistente de IA projetado para analisar o impacto ambiental de produtos com base em imagens. Forneça todas as respostas em português.

  Analise a imagem do produto fornecida e forneça as seguintes informações:

  - productName: O nome do produto na imagem.
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

  Aqui está a imagem do produto: {{media url=productDataUri}}
  Por favor, analise o produto mostrado na imagem e forneça as informações solicitadas em português.
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
