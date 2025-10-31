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
  isProduct: z.boolean().describe('Indica se a imagem contém um produto comercializável, incluindo alimentos (como uma maçã ou um pastel). Não considere conceitos abstratos, receitas, gráficos, pessoas, animais ou paisagens como produtos.'),
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
  prompt: `Você é um especialista em Análise de Ciclo de Vida (ACV) de produtos. Sua tarefa é analisar a imagem de um produto e estimar seu impacto socioambiental com base na metodologia ACV. Forneça todas as respostas em português.

Primeiro, determine se a imagem contém um produto comercializável. Se não for, defina 'isProduct' como 'false' e retorne valores padrão.

Se for um produto, siga a metodologia ACV ("do berço ao túmulo"):

**Metodologia de Análise de Ciclo de Vida (ACV):**

1.  **Extração de Matérias-Primas:**
    *   Identifique os materiais principais (ex: algodão, plástico PET, metais).
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
-   **productName**: Nome do produto identificado.
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

Imagem do produto para análise: {{media url=productDataUri}}

Seja rigoroso e baseie sua análise em dados e princípios de ACV conhecidos. Forneça a resposta no formato JSON solicitado.`,
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
