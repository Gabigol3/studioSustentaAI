import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { LucideIcon } from 'lucide-react';
import {
    HeartHandshake,
    Wheat,
    HeartPulse,
    BookOpen,
    PersonStanding,
    Droplets,
    Zap,
    Briefcase,
    Factory,
    ArrowLeftRight,
    Building,
    Recycle,
    CloudSun,
    Fish,
    Mountain,
    Scale,
    Globe
} from 'lucide-react';


export const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/ods', label: 'ODS' },
  { href: '/map', label: 'Pontos de Coleta' },
  { href: '/products', label: 'Produtos' },
  { href: '/about', label: 'Sobre Nós' },
];

export const ODS_DATA: {
    id?: number;
    title: string;
    description: string;
    icon?: LucideIcon | string;
    imageId?: string;
    highlighted?: boolean;
}[] = [
    { id: 1, title: "Erradicação da Pobreza", description: "Acabar com a pobreza em todas as suas formas, em todos os lugares.", icon: HeartHandshake },
    { id: 2, title: "Fome Zero e Agricultura Sustentável", description: "Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição e promover a agricultura sustentável.", icon: Wheat },
    { id: 3, title: "Saúde e Bem-Estar", description: "Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades.", icon: HeartPulse },
    { id: 4, title: "Educação de Qualidade", description: "Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos.", icon: BookOpen },
    { id: 5, title: "Igualdade de Gênero", description: "Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas.", icon: PersonStanding },
    { id: 6, title: "Água Potável e Saneamento", description: "Garantir disponibilidade e manejo sustentável da água e saneamento para todos.", icon: Droplets },
    { id: 7, title: "Energia Limpa e Acessível", description: "Garantir acesso à energia barata, confiável, sustentável e moderna para todos.", icon: Zap },
    { id: 8, title: "Trabalho Decente e Crescimento Econômico", description: "Promover o crescimento econômico sustentado, inclusivo e sustentável, emprego pleno e produtivo, e trabalho decente para todos.", icon: Briefcase },
    { id: 9, title: "Indústria, Inovação e Infraestrutura", description: "Construir infraestrutura resiliente, promover a industrialização inclusiva e sustentável e fomentar a inovação.", icon: Factory },
    { id: 10, title: "Redução das Desigualdades", description: "Reduzir a desigualdade dentro dos países e entre eles.", icon: ArrowLeftRight },
    { id: 11, title: "Cidades e Comunidades Sustentáveis", description: "Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.", icon: Building },
    { id: 12, title: "Consumo e Produção Responsáveis", description: "Assegurar padrões de produção e de consumo sustentáveis.", icon: Recycle },
    { id: 13, title: "Ação Contra a Mudança Global do Clima", description: "Tomar medidas urgentes para combater a mudança climática e seus impactos.", icon: CloudSun },
    { id: 14, title: "Vida na Água", description: "Conservar e usar sustentavelmente os oceanos, os mares e os recursos marinhos para o desenvolvimento sustentável.", icon: Fish },
    { id: 15, title: "Vida Terrestre", description: "Proteger, recuperar e promover o uso sustentável dos ecossistemas terrestres.", icon: Mountain },
    { id: 16, title: "Paz, Justiça e Instituições Eficazes", description: "Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável.", icon: Scale },
    { id: 17, title: "Povos Indígenas e Tribais", description: "Fortalecer os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável, com foco nos direitos e bem-estar dos povos indígenas.", imageId: "ods-indigenous", highlighted: true, icon: Globe },
];

export const TEAM_MEMBERS = [
    { name: "Gabriel Pedro Ramos", course: "Desenvolvimento e sistemas da informação", year: "1º Ano", role: "Desenvolvedor Principal", imageId: "team-member-1" },
    { name: "Pedro Henrique Marcelino", course: "Desenvolvimento e sistemas da informação", year: "1º Ano", role: "Desenvolvedor Secundário", imageId: "team-member-2" },
    { name: "Pedro Henrique de Lima Silveira", course: "Desenvolvimento e sistemas da informação", year: "1º Ano", role: "Designer", imageId: "team-member-3" },
    { name: "Vinícius Gabriel Landgraff de Carli", course: "Desenvolvimento e sistemas da informação", year: "1º Ano", role: "Designer", imageId: "team-member-4" },
    { name: "Rodrigo Fernandes de Oliveira", course: "Desenvolvimento e sistemas da informação", year: "1º Ano", role: "Analista de Dados", imageId: "team-member-5" },
];

export type RecommendedProduct = {
  name: string;
  price: string;
  summary: string;
  storeUrl: string;
  recommendation: "muito" | "normal";
  sustainability: {
    label: "Sustentável" | "Equilibrado" | "Alto Impacto";
    icon: string;
  };
  image: ImagePlaceholder | undefined;
  electricalFootprint?: number;
  usesWood?: boolean;
  ecologicalFootprint?: 'Baixa' | 'Média' | 'Alta';
}

export const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
    {
      name: "Garrafa Térmica Ecológica",
      price: "R$ 89,90",
      summary: "Feita com 90% de aço inoxidável reciclado, reduzindo a necessidade de extração de novos materiais.",
      storeUrl: "https://www.google.com/search?tbm=shop&q=garrafa+térmica+ecológica",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-bottle"),
      electricalFootprint: 5.2,
      usesWood: false,
    },
    {
      name: "Camiseta de Algodão Orgânico",
      price: "R$ 129,90",
      summary: "Produção com baixo consumo de água e sem pesticidas, protegendo o solo e os trabalhadores.",
      storeUrl: "https://www.google.com/search?tbm=shop&q=camiseta+algodão+orgânico",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-shirt"),
      electricalFootprint: 1.8,
      usesWood: false,
    },
    {
      name: "Tênis de Material Reciclado",
      price: "R$ 249,90",
      summary: "Solado de borracha reciclada e tecido de garrafas PET, dando nova vida a resíduos plásticos.",
      storeUrl: "https://www.google.com/search?tbm=shop&q=tênis+material+reciclado",
      recommendation: "normal",
      sustainability: { label: "Equilibrado", icon: "⚖️" },
      image: PlaceHolderImages.find(p => p.id === "product-shoes"),
      electricalFootprint: 8.5,
      usesWood: false,
    },
    {
        name: "Cadeira de Madeira Certificada",
        price: "R$ 499,90",
        summary: "Madeira de reflorestamento com selo FSC, garantindo manejo florestal responsável.",
        storeUrl: "https://www.google.com/search?tbm=shop&q=cadeira+madeira+certificada+fsc",
        recommendation: "muito",
        sustainability: { label: "Sustentável", icon: "🌿" },
        image: PlaceHolderImages.find(p => p.id === "product-chair"),
        electricalFootprint: 3.1,
        usesWood: true,
        ecologicalFootprint: 'Baixa',
    },
    {
      name: "Canudos de Inox Reutilizáveis",
      price: "R$ 29,90",
      summary: "Kit de canudos de metal com escova de limpeza para substituir canudos de plástico descartáveis.",
      storeUrl: "https://www.mercadolivre.com.br/kit-4-canudos-em-inox-reutilizavel-com-escova-para-limpeza/p/MLB15148383",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-straws"),
      electricalFootprint: 0.8,
      usesWood: false,
    },
    {
      name: "Lâmpadas de LED (Kit com 10)",
      price: "R$ 75,00",
      summary: "Lâmpadas de alta eficiência que consomem até 85% menos energia que as incandescentes.",
      storeUrl: "https://www.amazon.com.br/Kit-L%C3%A2mpada-Bulbo-Bivolt-Branco/dp/B077T512X2/",
      recommendation: "normal",
      sustainability: { label: "Equilibrado", icon: "⚖️" },
      image: PlaceHolderImages.find(p => p.id === "product-led-bulbs"),
      electricalFootprint: 0.1,
      usesWood: false,
    },
    {
      name: "Composteira Doméstica",
      price: "R$ 199,00",
      summary: "Transforme resíduos orgânicos em adubo para suas plantas, reduzindo o lixo enviado a aterros.",
      storeUrl: "https://www.shopee.com.br/Composteira-Dom%C3%A9stica-i.310118005.4552467389",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-composter"),
      electricalFootprint: 0,
      usesWood: true,
      ecologicalFootprint: 'Baixa',
    },
    {
      name: "Shampoo em Barra Natural",
      price: "R$ 45,00",
      summary: "Produto sólido que dispensa embalagem plástica e utiliza ingredientes naturais e biodegradáveis.",
      storeUrl: "https://www.amazon.com.br/s?k=shampoo+em+barra",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-shampoo-bar"),
      electricalFootprint: 0.5,
      usesWood: false,
    },
];
