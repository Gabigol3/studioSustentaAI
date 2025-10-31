import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/ods', label: 'ODS' },
  { href: '/map', label: 'Mapa Verde' },
  { href: '/about', label: 'Sobre Nós' },
];

export const ODS_DATA = [
    { id: 1, title: "Erradicação da Pobreza", description: "Acabar com a pobreza em todas as suas formas, em todos os lugares.", icon: "1" },
    { id: 2, title: "Fome Zero e Agricultura Sustentável", description: "Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição e promover a agricultura sustentável.", icon: "2" },
    { id: 3, title: "Saúde e Bem-Estar", description: "Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades.", icon: "3" },
    { id: 4, title: "Educação de Qualidade", description: "Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos.", icon: "4" },
    { id: 5, title: "Igualdade de Gênero", description: "Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas.", icon: "5" },
    { id: 6, title: "Água Potável e Saneamento", description: "Garantir disponibilidade e manejo sustentável da água e saneamento para todos.", icon: "6" },
    { id: 7, title: "Energia Limpa e Acessível", description: "Garantir acesso à energia barata, confiável, sustentável e moderna para todos.", icon: "7" },
    { id: 8, title: "Trabalho Decente e Crescimento Econômico", description: "Promover o crescimento econômico sustentado, inclusivo e sustentável, emprego pleno e produtivo, e trabalho decente para todos.", icon: "8" },
    { id: 9, title: "Indústria, Inovação e Infraestrutura", description: "Construir infraestrutura resiliente, promover a industrialização inclusiva e sustentável e fomentar a inovação.", icon: "9" },
    { id: 10, title: "Redução das Desigualdades", description: "Reduzir a desigualdade dentro dos países e entre eles.", icon: "10" },
    { id: 11, title: "Cidades e Comunidades Sustentáveis", description: "Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.", icon: "11" },
    { id: 12, title: "Consumo e Produção Responsáveis", description: "Assegurar padrões de produção e de consumo sustentáveis.", icon: "12" },
    { id: 13, title: "Ação Contra a Mudança Global do Clima", description: "Tomar medidas urgentes para combater a mudança climática e seus impactos.", icon: "13" },
    { id: 14, title: "Vida na Água", description: "Conservar e usar sustentavelmente os oceanos, os mares e os recursos marinhos para o desenvolvimento sustentável.", icon: "14" },
    { id: 15, title: "Vida Terrestre", description: "Proteger, recuperar e promover o uso sustentável dos ecossistemas terrestres.", icon: "15" },
    { id: 16, title: "Paz, Justiça e Instituições Eficazes", description: "Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável.", icon: "16" },
    { id: 17, title: "Povos Indígenas e Tribais", description: "Fortalecer os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável, com foco nos direitos e bem-estar dos povos indígenas.", imageId: "ods-indigenous", highlighted: true },
];

export const TEAM_MEMBERS = [
    { name: "Alice Pereira", course: "Design UX", year: "3º Ano", role: "Designer UX/UI", imageId: "team-member-1" },
    { name: "Bruno Costa", course: "Engenharia de Software", year: "4º Ano", role: "Desenvolvedor Front-End", imageId: "team-member-2" },
    { name: "Carla Dias", course: "Ciência da Computação", year: "5º Ano", role: "Engenheira de IA", imageId: "team-member-3" },
    { name: "Daniel Martins", course: "Engenharia de Software", year: "4º Ano", role: "Desenvolvedor Back-End", imageId: "team-member-4" },
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
}

export const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
    {
      name: "Garrafa Térmica Ecológica",
      price: "R$ 89,90",
      summary: "Feita com 90% de aço inoxidável reciclado.",
      storeUrl: "#",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-bottle")
    },
    {
      name: "Camiseta de Algodão Orgânico",
      price: "R$ 129,90",
      summary: "Produção com baixo consumo de água e sem pesticidas.",
      storeUrl: "#",
      recommendation: "muito",
      sustainability: { label: "Sustentável", icon: "🌿" },
      image: PlaceHolderImages.find(p => p.id === "product-shirt")
    },
    {
      name: "Tênis de Material Reciclado",
      price: "R$ 249,90",
      summary: "Solado de borracha reciclada e tecido de garrafas PET.",
      storeUrl: "#",
      recommendation: "normal",
      sustainability: { label: "Equilibrado", icon: "⚖️" },
      image: PlaceHolderImages.find(p => p.id === "product-shoes")
    },
];

