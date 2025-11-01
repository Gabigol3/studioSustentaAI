'use server';

/**
 * @fileOverview Analyzes a product name and description for sustainability information.
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
  productDescription: z.string().optional().describe('A description of the product.'),
});
export type AnalyzeProductTextInput = z.infer<typeof AnalyzeProductTextInputSchema>;

const AnalyzeProductTextOutputSchema = z.object({
    isProduct: z.boolean().describe('Indica se o texto descreve um produto comercializável, incluindo alimentos (como uma maçã ou um pastel). Não considere conceitos abstratos, receitas, gráficos, pessoas, animais ou paisagens como produtos.'),
    productName: z.string().describe('O nome do produto.'),
    carbonFootprint: z.number().describe('A pegada de carbono do produto em kg CO₂eq, considerando produção, transporte e descarte.'),
    waterFootprint: z.number().describe('A pegada hídrica do produto em litros, incluindo água usada na produção e cadeia de suprimentos.'),
    energeticFootprint: z.number().describe('A pegada energética total em kWh, somando a energia de todas as fases do ciclo de vida.'),
    ecologicalFootprint: z.number().describe('A pegada ecológica em hectares globais (gha), representando a área biologicamente produtiva necessária.'),
    landUse: z.number().describe('A área de terra ocupada para a produção em metros quadrados (m²).'),
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
  prompt: `Você é um especialista em Análise de Ciclo de Vida (ACV) de produtos. Sua tarefa é analisar o nome e a descrição de um produto e estimar seu impacto socioambiental com base na metodologia ACV. Forneça todas as respostas em português.

Primeiro, determine se o texto descreve um produto comercializável. Se não for, defina 'isProduct' como 'false' e retorne valores padrão.

Se for um produto, siga a metodologia ACV ("do berço ao túmulo"):

**Metodologia de Análise de Ciclo de Vida (ACV):**

1.  **Extração de Matérias-Primas:**
    *   Identifique os materiais prováveis com base no nome e descrição (ex: algodão, plástico PET, metais).
    *   Estime a pegada de carbono (CO₂eq), hídrica (L), energética (kWh) e de uso da terra (m²) da extração/cultivo.

2.  **Processamento e Manufatura:**
    *   Considere a energia (kWh) gasta para transformar a matéria-prima no produto final.
    *   Inclua o consumo de água e as emissões de CO₂ em processos como tingimento, moldagem, etc.

3.  **Transporte e Distribuição:**
    *   Estime a origem provável e calcule as emissões do transporte e a energia consumida.

4.  **Fase de Uso:**
    *   Calcule o consumo de energia (kWh) ou outros recursos durante a vida útil.

5.  **Fim de Vida:**
    *   Analise o impacto do descarte (reciclagem, aterro).

**Campos a serem preenchidos:**

-   **isProduct**: 'true' se for um produto.
-   **productName**: O nome do produto fornecido.
-   **carbonFootprint**: A soma das emissões de CO₂eq de TODAS as fases da ACV (em kg CO₂eq).
-   **waterFootprint**: A soma do consumo de água em TODAS as fases (em litros).
-   **energeticFootprint**: A soma do consumo de energia em TODAS as fases (em kWh).
-   **ecologicalFootprint**: Estimativa da área produtiva necessária para sustentar o ciclo de vida (em gha).
-   **landUse**: A área de terra diretamente ocupada para a produção (em m²).
-   **environmentalImpactDescription**: Uma análise qualitativa detalhada, justificando as estimativas.
-   **economyScore** (0-100): Avalie durabilidade, reparabilidade, circularidade.
-   **societyScore** (0-100): Considere condições de trabalho, comércio justo.
-   **environmentScore** (0-100): Pontuação baseada no impacto ambiental consolidado.
-   **totalScore**: Média ponderada (40% environmentScore, 30% societyScore, 30% economyScore).
-   **sustainabilityCategory**:
    - 70-100: "Sustentável"
    - 40-69: "Regular"
    - 0-39: "Alto Impacto"

Dados para análise:
- Nome do produto: {{{productName}}}
- Descrição: {{{productDescription}}}

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
