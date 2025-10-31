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
  isProduct: z.boolean().describe('Indica se a imagem contém um produto comercializável. Não considere alimentos, receitas, pessoas, animais ou paisagens como produtos.'),
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

export type AnalyzeProductImageOutput = z.infer<typeof AnalyzeProductImageOutputSchema>;

export async function analyzeProductImage(input: AnalyzeProductImageInput): Promise<AnalyzeProductImageOutput> {
  return analyzeProductImageFlow(input);
}

const analyzeProductImagePrompt = ai.definePrompt({
  name: 'analyzeProductImagePrompt',
  input: {schema: AnalyzeProductImageInputSchema},
  output: {schema: AnalyzeProductImageOutputSchema},
  prompt: `Você é um especialista em sustentabilidade e análise de ciclo de vida de produtos. Sua primeira tarefa é determinar se a imagem fornecida contém um produto comercializável. Itens como alimentos, receitas, pratos de comida, pessoas, animais ou paisagens não são considerados produtos. Se a imagem não for de um produto, defina 'isProduct' como 'false' e retorne valores padrão (string vazia, 0) para os outros campos.

  Se a imagem for de um produto, defina 'isProduct' como 'true' e analise-a para fornecer uma avaliação detalhada de seu impacto socioambiental. Forneça todas as respostas em português.

  Analise a imagem do produto e, com base em seu conhecimento sobre materiais, processos de fabricação e marcas, estime as seguintes métricas:

  - 'productName': Identifique o nome do produto.
  - 'carbonFootprint': Estime a pegada de carbono total (em kg CO₂eq). Considere a extração de matéria-prima, a pegada elétrica (consumo de energia) na produção, o transporte e o fim de vida.
  - 'waterFootprint': Estime a pegada hídrica (em litros). Inclua o consumo de água azul, verde e cinza. Dê contexto quando relevante (ex: alta pegada hídrica para irrigação de pomares em produtos agrícolas).
  - 'environmentalImpactDescription': Forneça uma análise qualitativa detalhada. Justifique suas estimativas. Discuta os materiais (são de fonte renovável, recicláveis, biodegradáveis?), o processo de produção (consome muita energia? gera poluição?) e o ciclo de vida esperado (é durável, de uso único, permite reparo?).
  - 'economyScore': Atribua uma pontuação de 0 a 100 para a sustentabilidade econômica. Considere fatores como durabilidade, possibilidade de reparo, modelo de negócio (venda, aluguel, serviço) e se incentiva uma economia circular.
  - 'societyScore': Atribua uma pontuação de 0 a 100 para o impacto social. Considere o respeito aos direitos humanos na cadeia de produção, práticas de comércio justo e o impacto do produto na saúde e bem-estar das comunidades.
  - 'environmentScore': Atribua uma pontuação de 0 a 100 para o impacto ambiental. Considere o uso de recursos naturais, a poluição gerada (ar, água, solo), a toxicidade dos materiais e o impacto na biodiversidade.
  - 'totalScore': Calcule uma pontuação geral de sustentabilidade (0-100). Use uma média ponderada: 40% para 'environmentScore', 30% para 'societyScore' e 30% para 'economyScore'.
  - 'sustainabilityCategory': Classifique o produto com base na 'totalScore':
    - 70-100: "Sustentável"
    - 40-69: "Regular"
    - 0-39: "Alto Impacto"

  Imagem do produto para análise: {{media url=productDataUri}}
  
  Seja rigoroso e baseie sua análise em dados e princípios de sustentabilidade conhecidos. Forneça a resposta no formato JSON solicitado.
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
