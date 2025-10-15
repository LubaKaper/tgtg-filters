export interface StoreResult {
  id: string;
  name: string;
  cuisine: string;
  dietary: string[];
  priceBucket: string;
  distanceMi: number;
  pickupWindow: string;
  pickupDay: string;
  foodType: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  itemsLeft: number;
  image: string;
  img?: string; // Optional thumbnail URL
  tag?: "New" | "1 left" | "Popular" | null;
  isFavorite?: boolean;
}

export const mockResults: StoreResult[] = [
  {
    id: '1',
    name: 'Bella Vista Italian',
    cuisine: 'Italian',
    dietary: ['Vegetarian'],
    priceBucket: '$$',
    distanceMi: 0.8,
    pickupWindow: 'Evening',
    pickupDay: 'Today',
    foodType: 'Meals',
    rating: 4.5,
    originalPrice: 15.99,
    discountedPrice: 5.99,
    itemsLeft: 3,
    image: '🍝',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    tag: null,
    isFavorite: true
  },
  {
    id: '2',
    name: 'Golden Dragon',
    cuisine: 'Chinese',
    dietary: ['Vegan', 'Gluten-free'],
    priceBucket: '$',
    distanceMi: 1.2,
    pickupWindow: 'Lunch',
    pickupDay: 'Today',
    foodType: 'Meals',
    rating: 4.2,
    originalPrice: 12.50,
    discountedPrice: 4.50,
    itemsLeft: 7,
    image: '🥡',
    img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&crop=center',
    tag: 'Popular',
    isFavorite: false
  },
  {
    id: '3',
    name: 'Fresh Bakehouse',
    cuisine: 'French',
    dietary: ['Vegetarian'],
    priceBucket: '$',
    distanceMi: 0.5,
    pickupWindow: 'Morning',
    pickupDay: 'Tomorrow',
    foodType: 'Bakery',
    rating: 4.8,
    originalPrice: 8.99,
    discountedPrice: 3.99,
    itemsLeft: 12,
    image: '🥐',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center',
    tag: 'New',
    isFavorite: false
  },
  {
    id: '4',
    name: 'Spice Garden Indian',
    cuisine: 'Indian',
    dietary: ['Vegan', 'Vegetarian'],
    priceBucket: '$$',
    distanceMi: 2.1,
    pickupWindow: 'Evening',
    pickupDay: 'Today',
    foodType: 'Meals',
    rating: 4.6,
    originalPrice: 18.75,
    discountedPrice: 6.75,
    itemsLeft: 5,
    image: '🍛',
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center',
    tag: null,
    isFavorite: false
  },
  {
    id: '5',
    name: 'Tokyo Sushi Bar',
    cuisine: 'Japanese',
    dietary: ['Gluten-free'],
    priceBucket: '$$$',
    distanceMi: 1.8,
    pickupWindow: 'Lunch',
    pickupDay: 'Tomorrow',
    foodType: 'Meals',
    rating: 4.7,
    originalPrice: 24.99,
    discountedPrice: 8.99,
    itemsLeft: 2,
    image: '🍣',
    img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center',
    tag: '1 left',
    isFavorite: true
  },
  {
    id: '6',
    name: 'Corner Grocery',
    cuisine: 'American',
    dietary: [],
    priceBucket: '$',
    distanceMi: 0.3,
    pickupWindow: 'Late Night',
    pickupDay: 'Today',
    foodType: 'Groceries',
    rating: 4.1,
    originalPrice: 20.00,
    discountedPrice: 7.00,
    itemsLeft: 15,
    image: '🛒',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center',
    tag: null,
    isFavorite: false
  },
  {
    id: '7',
    name: 'Mediterranean Delights',
    cuisine: 'Mediterranean',
    dietary: ['Vegan', 'Gluten-free'],
    priceBucket: '$$',
    distanceMi: 1.5,
    pickupWindow: 'Lunch',
    pickupDay: 'Today',
    foodType: 'Meals',
    rating: 4.4,
    originalPrice: 16.50,
    discountedPrice: 5.50,
    itemsLeft: 8,
    image: '🥙',
    tag: null,
    isFavorite: false
  },
  {
    id: '8',
    name: 'Flower Power',
    cuisine: 'Other',
    dietary: [],
    priceBucket: '$',
    distanceMi: 0.9,
    pickupWindow: 'Morning',
    pickupDay: 'Tomorrow',
    foodType: 'Flowers',
    rating: 4.3,
    originalPrice: 12.99,
    discountedPrice: 4.99,
    itemsLeft: 6,
    image: '🌹',
    tag: null,
    isFavorite: false
  },
  {
    id: '9',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    dietary: ['Vegetarian'],
    priceBucket: '$',
    distanceMi: 1.1,
    pickupWindow: 'Evening',
    pickupDay: 'Today',
    foodType: 'Meals',
    rating: 4.5,
    originalPrice: 11.25,
    discountedPrice: 3.75,
    itemsLeft: 9,
    image: '🌮',
    tag: null,
    isFavorite: false
  },
  {
    id: '10',
    name: 'Pet Paradise',
    cuisine: 'Other',
    dietary: [],
    priceBucket: '$$',
    distanceMi: 2.5,
    pickupWindow: 'Morning',
    pickupDay: 'Tomorrow',
    foodType: 'Pet food',
    rating: 4.0,
    originalPrice: 22.50,
    discountedPrice: 8.50,
    itemsLeft: 4,
    image: '🐕',
    tag: null,
    isFavorite: false
  },
  // Additional diverse stores
  {
    id: '11',
    name: "Joe's Coffee",
    cuisine: 'American',
    dietary: ['Vegetarian', 'Vegan'],
    priceBucket: '$',
    distanceMi: 0.7,
    pickupWindow: 'Morning',
    pickupDay: 'Today',
    foodType: 'Bakery',
    rating: 4.4,
    originalPrice: 6.50,
    discountedPrice: 2.50,
    itemsLeft: 1,
    image: '☕',
    tag: '1 left'
  },
  {
    id: '12',
    name: 'Café François',
    cuisine: 'French',
    dietary: ['Vegetarian'],
    priceBucket: '$$',
    distanceMi: 1.4,
    pickupWindow: 'Lunch',
    pickupDay: 'Today',
    foodType: 'Bakery',
    rating: 4.6,
    originalPrice: 14.99,
    discountedPrice: 5.99,
    itemsLeft: 4,
    image: '🥯',
    tag: 'New'
  }
];