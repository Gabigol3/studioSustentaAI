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
  { href: '/map', label: 'Mapa Verde' },
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
      storeUrl: "https://www.google.com/search?q=comprar+garrafa+térmica+ecológica",
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
      storeUrl: "https://www.google.com/search?q=comprar+camiseta+algodão+orgânico",
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
      storeUrl: "https://www.google.com/search?q=comprar+tênis+de+material+reciclado",
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
        storeUrl: "https://www.google.com/search?q=comprar+cadeira+madeira+certificada+fsc",
        recommendation: "muito",
        sustainability: { label: "Sustentável", icon: "🌿" },
        image: PlaceHolderImages.find(p => p.id === "product-chair"),
        electricalFootprint: 3.1,
        usesWood: true,
        ecologicalFootprint: 'Baixa',
      },
];
