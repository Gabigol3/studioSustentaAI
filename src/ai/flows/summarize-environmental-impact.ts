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
  productName: z.string().describe('O nome do produto.'),
  carbonFootprint: z.number().describe('A pegada de carbono do produto em kg CO₂eq.'),
  waterFootprint: z.number().describe('A pegada hídrica do produto em litros.'),
  sustainabilityCategory: z.string().describe('A categoria de sustentabilidade do produto (Sustentável, Regular, Alto Impacto).'),
});
export type SummarizeEnvironmentalImpactInput = z.infer<typeof SummarizeEnvironmentalImpactInputSchema>;

const SummarizeEnvironmentalImpactOutputSchema = z.object({
  summary: z.string().describe('Um resumo conciso e informativo do impacto ambiental do produto.'),
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
  prompt: `Você é um especialista em comunicação de sustentabilidade. Sua tarefa é criar um resumo curto, claro e impactante sobre o impacto ambiental de um produto, usando os dados fornecidos. A resposta deve ser em português.

O resumo deve ter no máximo 2 frases.

Dados do Produto:
- Nome: {{{productName}}}
- Pegada de Carbono: {{carbonFootprint}} kg CO₂eq
- Pegada Hídrica: {{waterFootprint}} litros
- Categoria de Sustentabilidade: {{sustainabilityCategory}}

Exemplo de Saída:
"A produção de um(a) {{{productName}}} tem um impacto classificado como '{{sustainabilityCategory}}'. Envolve uma pegada de carbono de {{carbonFootprint}} kg CO₂eq e um consumo de {{waterFootprint}} litros de água."

Crie um resumo similar para o produto fornecido.
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
