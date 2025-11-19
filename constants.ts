import { Cookie } from './types';

export const COOKIES: Cookie[] = [
  {
    id: 'c1',
    name: 'iChoco Pro Max',
    tagline: 'O chocolate mais avançado até hoje.',
    description: 'Três tipos de chocolate belga fundidos em um núcleo macio. Poder de processamento de açúcar inigualável.',
    price: 3.90,
    imageUrl: 'https://images.unsplash.com/photo-1618923860182-f1e291d09273?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Chocolate Belga 70%', 'Chocolate ao Leite', 'Cacau em Pó', 'Manteiga'],
    color: 'text-amber-900'
  },
  {
    id: 'c2',
    name: 'Red Velvet Air',
    tagline: 'Incrivelmente leve.',
    description: 'Tão leve que você esquece que está comendo. Notas de cream cheese em uma arquitetura vermelha aveludada.',
    price: 3.50,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Cacau', 'Cream Cheese', 'Baunilha', 'Corante Natural'],
    color: 'text-red-700'
  },
  {
    id: 'c3',
    name: 'Macadamia Studio',
    tagline: 'Para os criativos.',
    description: 'Macadâmia premium com chocolate branco. Projetado para inspirar sua próxima grande ideia.',
    price: 4.20,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Macadâmia', 'Chocolate Branco', 'Açúcar Mascavo', 'Flor de Sal'],
    color: 'text-yellow-600'
  },
  {
    id: 'c4',
    name: 'Matcha Mini',
    tagline: 'Pequeno no tamanho. Gigante no Zen.',
    description: 'O poder do chá verde cerimonial. Uma experiência de sabor que cabe no seu bolso (não coloque no bolso).',
    price: 3.00,
    imageUrl: 'https://images.unsplash.com/photo-1619148514797-0a8a2569f845?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Matcha Premium', 'Chocolate Branco', 'Manteiga', 'Ovos'],
    color: 'text-green-700'
  },
  {
    id: 'c5',
    name: 'Dark Mode',
    tagline: 'Preto absoluto.',
    description: '85% Cacau. Para quem trabalha até tarde e prefere a interface escura da vida.',
    price: 3.80,
    imageUrl: 'https://images.unsplash.com/photo-1559557229-838f5319579c?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Cacau 85%', 'Carvão Ativado', 'Sal Negro', 'Espresso'],
    color: 'text-gray-900'
  },
  {
    id: 'c6',
    name: 'Classic One',
    tagline: 'O original. Reinventado.',
    description: 'Apenas gotas de chocolate e massa de baunilha. Simplicidade é a máxima sofisticação.',
    price: 2.50,
    imageUrl: 'https://images.unsplash.com/photo-1564842497547-09a72652691a?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Gotas de Chocolate', 'Extrato de Baunilha', 'Farinha', 'Amor'],
    color: 'text-orange-600'
  }
];