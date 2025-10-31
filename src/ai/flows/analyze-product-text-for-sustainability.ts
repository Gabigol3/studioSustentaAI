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
  prompt: `Você é um especialista em Análise de Ciclo de Vida (ACV) de produtos. Sua tarefa é analisar o nome de um produto e estimar seu impacto socioambiental com base na metodologia ACV. Forneça todas as respostas em português.

Primeiro, determine se o texto descreve um produto comercializável. Se não for, defina 'isProduct' como 'false' e retorne valores padrão.

Se for um produto, siga a metodologia ACV ("do berço ao túmulo"):

**Metodologia de Análise de Ciclo de Vida (ACV):**

1.  **Extração de Matérias-Primas:**
    *   Identifique os materiais prováveis (ex: algodão, plástico PET, metais).
    *   Estime a pegada de carbono e hídrica da extração/cultivo. (Ex: mineração de alumínio consome muita energia; cultivo de algodão consome muita água).

2.  **Processamento e Manufatura:**
    *   Considere a energia gasta para transformar a matéria-prima no produto final (ex: tecelagem, moldagem de plástico, montagem de eletrônicos).
    *   Inclua o consumo de água em processos como tingimento de tecidos.

3.  **Transporte e Distribuição:**
    *   Estime a origem provável dos materiais e do produto final (ex: China, Brasil).
    *   Calcule as emissões do transporte (considere o modal: navio é mais eficiente que avião).

4.  **Fase de Uso (se aplicável):**
    *   Para eletrônicos, calcule o consumo de energia durante a vida útil. Fórmula: Potência (kW) × Horas de uso × Vida útil (anos) × Fator de emissão da matriz energética.
    *   Para produtos como roupas, considere a água e energia gastas em lavagens.

5.  **Fim de Vida:**
    *   Analise o impacto do descarte. A reciclagem pode gerar um "crédito" de carbono (negativo). O aterro gera emissões de metano. Incineração gera CO₂.

**Campos a serem preenchidos:**

-   **isProduct**: 'true' se for um produto.
-   **productName**: O nome do produto fornecido.
-   **carbonFootprint**: A soma das emissões de CO₂eq de TODAS as fases da ACV.
-   **waterFootprint**: A soma do consumo de água em TODAS as fases ("água virtual").
-   **environmentalImpactDescription**: Uma análise qualitativa detalhada, justificando as estimativas. Descreva os "hotspots" (as fases de maior impacto).
-   **economyScore** (0-100): Avalie a durabilidade, reparabilidade e circularidade do produto.
-   **societyScore** (0-100): Considere as condições de trabalho e práticas de comércio justo na cadeia produtiva.
-   **environmentScore** (0-100): Pontuação baseada no impacto ambiental consolidado (uso de recursos, poluição, etc.).
-   **totalScore**: Média ponderada (40% environmentScore, 30% societyScore, 30% economyScore).
-   **sustainabilityCategory**:
    - 70-100: "Sustentável"
    - 40-69: "Regular"
    - 0-39: "Alto Impacto"

Nome do produto para análise: {{{productName}}}

Seja rigoroso e baseie sua análise em dados e princípios de ACV conhecidos. Forneça a resposta no formato JSON solicitado.
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
