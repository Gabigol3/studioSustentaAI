import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { LucideIcon } from 'lucide-react';
import {
    Users,
    Wheat,
    HeartPulse,
    BookOpen,
    Scale,
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
    Bird,
    Handshake
} from 'lucide-react';


export const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/ods', label: 'ODS' },
  { href: '/map', label: 'Pontos de Coleta' },
  { href: '/products', label: 'Produtos' },
  { href: '/about', label: 'Sobre Nós' },
];

export type OdsDataItem = {
    id?: number;
    title: string;
    description: string;
    icon: LucideIcon;
    highlighted?: boolean;
    color: string;
};


export const ODS_DATA: OdsDataItem[] = [
    { id: 1, title: "Erradicação da Pobreza", description: "Acabar com a pobreza em todas as suas formas, em todos os lugares.", icon: Users, color: "2, 76%, 52%" },
    { id: 2, title: "Fome Zero", description: "Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição e promover a agricultura sustentável.", icon: Wheat, color: "45, 87%, 59%" },
    { id: 3, title: "Saúde e Bem-Estar", description: "Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades.", icon: HeartPulse, color: "145, 63%, 49%" },
    { id: 4, title: "Educação de Qualidade", description: "Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos.", icon: BookOpen, color: "358, 72%, 46%" },
    { id: 5, title: "Igualdade de Gênero", description: "Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas.", icon: Scale, color: "18, 96%, 58%" },
    { id: 6, title: "Água Potável e Saneamento", description: "Garantir disponibilidade e manejo sustentável da água e saneamento para todos.", icon: Droplets, color: "206, 90%, 65%" },
    { id: 7, title: "Energia Limpa e Acessível", description: "Garantir acesso à energia barata, confiável, sustentável e moderna para todos.", icon: Zap, color: "51, 100%, 50%" },
    { id: 8, title: "Trabalho Decente e Crescimento Econômico", description: "Promover o crescimento econômico sustentado, inclusivo e sustentável, emprego pleno e produtivo, e trabalho decente para todos.", icon: Briefcase, color: "350, 65%, 40%" },
    { id: 9, title: "Indústria, Inovação e Infraestrutura", description: "Construir infraestrutura resiliente, promover a industrialização inclusiva e sustentável e fomentar a inovação.", icon: Factory, color: "27, 91%, 62%" },
    { id: 10, title: "Redução das Desigualdades", description: "Reduzir a desigualdade dentro dos países e entre eles.", icon: ArrowLeftRight, color: "326, 89%, 45%" },
    { id: 11, title: "Cidades e Comunidades Sustentáveis", description: "Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.", icon: Building, color: "39, 92%, 63%" },
    { id: 12, title: "Consumo e Produção Responsáveis", description: "Assegurar padrões de produção e de consumo sustentáveis.", icon: Recycle, color: "40, 48%, 40%" },
    { id: 13, title: "Ação Contra a Mudança Global do Clima", description: "Tomar medidas urgentes para combater a mudança climática e seus impactos.", icon: CloudSun, color: "100, 50%, 40%" },
    { id: 14, title: "Vida na Água", description: "Conservar e usar sustentavelmente os oceanos, os mares e os recursos marinhos para o desenvolvimento sustentável.", icon: Fish, color: "205, 80%, 50%" },
    { id: 15, title: "Vida Terrestre", description: "Proteger, recuperar e promover o uso sustentável dos ecossistemas terrestres.", icon: Mountain, color: "120, 60%, 45%" },
    { id: 16, title: "Paz, Justiça e Instituições Eficazes", description: "Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável.", icon: Bird, color: "210, 70%, 40%" },
    { id: 17, title: "Parcerias e Meios de Implementação", description: "Fortalecer os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável.", icon: Handshake, color: "220, 50%, 35%", highlighted: true },
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
      storeUrl: "https://www.google.com/search?tbm=shop&q=canudos+de+inox",
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
      storeUrl: "https://www.google.com/search?tbm=shop&q=lâmpadas+de+led",
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
      storeUrl: "https://www.google.com/search?tbm=shop&q=composteira+doméstica",
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
      storeUrl: "https://www.google.com/search?tbm=shop&q=shampoo+em+barra",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-shampoo-bar"),
      electricalFootprint: 0.5,
      usesWood: false,
    },
    {
      name: "Ecobag (Sacola Ecológica)",
      price: "R$ 19,90",
      summary: "Substitua sacolas plásticas por esta sacola reutilizável de algodão ou material reciclado.",
      storeUrl: "https://www.shopee.com.br/search?keyword=ecobag",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-ecobag"),
      electricalFootprint: 0.2,
      usesWood: false,
    },
    {
      name: "Escova de Dentes de Bambu",
      price: "R$ 14,90",
      summary: "Alternativa biodegradável às escovas de plástico, com cerdas macias e cabo compostável.",
      storeUrl: "https://www.amazon.com.br/s?k=escova+de+dente+de+bambu",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-bamboo-toothbrush"),
      electricalFootprint: 0.1,
      usesWood: true,
      ecologicalFootprint: 'Baixa',
    },
    {
      name: "Café Orgânico Certificado",
      price: "R$ 39,90",
      summary: "Grãos cultivados sem agrotóxicos e com respeito ao meio ambiente e aos produtores.",
      storeUrl: "https://www.amazon.com.br/s?k=café+orgânico",
      recommendation: "normal",
      sustainability: { label: "Equilibrado", icon: "⚖️" },
      image: PlaceHolderImages.find(p => p.id === "product-organic-coffee"),
      electricalFootprint: 2.5,
      usesWood: false,
    },
    {
      name: "Marmita de Vidro",
      price: "R$ 45,90",
      summary: "Substitua potes de plástico por uma opção durável e segura para armazenar seus alimentos.",
      storeUrl: "https://www.shopee.com.br/search?keyword=marmita+de+vidro",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-glass-container"),
      electricalFootprint: 1.2,
      usesWood: false,
    }
];
