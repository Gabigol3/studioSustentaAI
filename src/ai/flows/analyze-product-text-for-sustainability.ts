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
    isProduct: z.boolean().describe('Indica se o texto descreve um produto comercializável, incluindo alimentos (como uma maçã ou um pastel). Não considere conceitos abstratos, receitas, gráficos, pessoas, animais ou paisagens como produtos.'),
    productName: z.string().describe('O nome do produto.'),
    carbonFootprint: z.number().describe('A pegada de carbono do produto em kg CO₂eq, considerando produção, transporte e descarte.'),
    waterFootprint: z.number().describe('A pegada hídrica do produto em litros, incluindo água usada na produção e cadeia de suprimentos.'),
    environmentalImpactDescription: z
      .string()
      .describe('Uma descrição detalhada e justificada do impacto ambiental, abordando materiais, processo de fabricação e ciclo de vida.'),
    economyScore: z.number().describe('Uma pontuação de 0 a 100 para a sustentabilidade econômica (ex: durabilidade, reparabilidade, circularidade).'),
    societyScore: z.number().describe('Uma pontuação de 0 a 100 para o impacto social (ex: condições de trabalho, comércio justo, impacto na comunidade).'),
    environmentScore: z.number().describe('Uma pontuação de 0 a 100 para o impacto ambiental direto (ex: uso de recursos, poluição, biodiversidade).'),
    totalScore: z.number().describe('A pontuação total de sustentabilidade do produto (0-100), calculada como uma média ponderada dos outros escores.'),
    sustainabilityCategory: z.string().describe('A categoria de sustentabilidade baseada na pontuação total (Sustentável, Regular, Alto Impacto).'),
  });
  

export async function analyzeProductText(input: AnalyzeProductTextInput): Promise<AnalyzeProductImageOutput> {
  return analyzeProductTextFlow(input);
}

const analyzeProductTextPrompt = ai.definePrompt({
  name: 'analyzeProductTextPrompt',
  input: {schema: AnalyzeProductTextInputSchema},
  output: {schema: AnalyzeProductTextOutputSchema},
  prompt: `Você é um especialista em sustentabilidade e análise de ciclo de vida de produtos. Sua primeira tarefa é determinar se o texto fornecido descreve um produto comercializável, incluindo alimentos (como "maçã" ou "pastel de frango"). No entanto, conceitos abstratos, receitas, gráficos, pessoas, animais ou paisagens não são considerados produtos. Se o texto não for sobre um produto, defina 'isProduct' como 'false' e retorne valores padrão (string vazia, 0) para os outros campos.

  Se o texto for sobre um produto, defina 'isProduct' como 'true' e analise-o para fornecer uma avaliação detalhada de seu impacto socioambiental. Forneça todas as respostas em português.

  Analise o nome do produto e, com base em seu conhecimento sobre categorias de produtos, materiais e processos de fabricação, estime as seguintes métricas:

  - 'productName': O nome do produto fornecido.
  - 'carbonFootprint': Estime a pegada de carbono total (em kg CO₂eq). Considere a extração de matéria-prima, a pegada elétrica na produção, o transporte refrigerado e o fim de vida.
  - 'waterFootprint': Estime a pegada hídrica (em litros). Inclua o consumo de água azul, verde e cinza. Dê contexto quando relevante. Exemplo: para uma maçã, a maior parte da pegada hídrica virá da irrigação.
  - 'environmentalImpactDescription': Forneça uma análise qualitativa detalhada. Justifique suas estimativas. Discuta os materiais prováveis (são recicláveis, de fonte renovável?), o processo de produção típico (consome muita energia? usa agrotóxicos?) e o ciclo de vida esperado. Para produtos agrícolas, considere o impacto do uso da terra e da monocultura na biodiversidade.
  - 'economyScore': Atribua uma pontuação de 0 a 100 para a sustentabilidade econômica. Considere durabilidade, reparabilidade e circularidade.
  - 'societyScore': Atribua uma pontuação de 0 a 100 para o impacto social. Considere condições de trabalho na cadeia de produção e práticas de comércio justo.
  - 'environmentScore': Atribua uma pontuação de 0 a 100 para o impacto ambiental. Considere uso de recursos, poluição (agrotóxicos), e impacto na biodiversidade, conforme detalhado na 'environmentalImpactDescription'.
  - 'totalScore': Calcule uma pontuação geral de sustentabilidade (0-100). Use uma média ponderada: 40% para 'environmentScore', 30% para 'societyScore' e 30% para 'economyScore'.
  - 'sustainabilityCategory': Classifique o produto com base na 'totalScore':
    - 70-100: "Sustentável"
    - 40-69: "Regular"
    - 0-39: "Alto Impacto"

  Nome do produto para análise: {{{productName}}}
  
  Seja rigoroso e baseie sua análise em dados e princípios de sustentabilidade conhecidos. Forneça a resposta no formato JSON solicitado.
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
