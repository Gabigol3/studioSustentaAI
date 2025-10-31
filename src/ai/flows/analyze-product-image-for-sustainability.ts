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
    *   Estime a pegada de carbono (CO₂eq), hídrica (L), energética (kWh) e de uso da terra (m²) da extração/cultivo. (Ex: mineração de alumínio consome muita energia; cultivo de algodão consome muita água e terra).

2.  **Processamento e Manufatura:**
    *   Considere a energia (kWh) gasta para transformar a matéria-prima no produto final.
    *   Inclua o consumo de água e as emissões de CO₂ em processos como tingimento, moldagem, etc.

3.  **Transporte e Distribuição:**
    *   Estime a origem provável e calcule as emissões do transporte (navio, caminhão, avião) e a energia consumida.

4.  **Fase de Uso:**
    *   Para eletrônicos, calcule o consumo de energia (kWh) durante a vida útil. Fórmula: Potência (kW) × Horas de uso × Vida útil (anos).
    *   Para roupas, considere água e energia gastas em lavagens.

5.  **Fim de Vida:**
    *   Analise o impacto do descarte. Reciclagem pode gerar "crédito" de carbono/energia. Aterro gera emissões de metano.

**Campos a serem preenchidos:**

-   **isProduct**: 'true' se for um produto.
-   **productName**: Nome do produto identificado.
-   **carbonFootprint**: A soma das emissões de CO₂eq de TODAS as fases da ACV (em kg CO₂eq).
-   **waterFootprint**: A soma do consumo de água em TODAS as fases (em litros).
-   **energeticFootprint**: A soma do consumo de energia em TODAS as fases (em kWh).
-   **ecologicalFootprint**: Estimativa da área produtiva necessária para sustentar o ciclo de vida do produto (em gha - hectares globais). Considere terra para cultivo/extração, infraestrutura e absorção de CO₂.
-   **landUse**: A área de terra diretamente ocupada para a produção (em m²).
-   **environmentalImpactDescription**: Uma análise qualitativa detalhada, justificando as estimativas. Descreva os "hotspots" (as fases de maior impacto).
-   **economyScore** (0-100): Avalie a durabilidade, reparabilidade e circularidade.
-   **societyScore** (0-100): Considere as condições de trabalho e práticas de comércio justo.
-   **environmentScore** (0-100): Pontuação baseada no impacto ambiental consolidado.
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
