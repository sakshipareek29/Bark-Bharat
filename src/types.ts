export type TabType = 'explore' | 'details' | 'states' | 'care';

export type DogSize = 'Small' | 'Medium' | 'Large' | 'Giant';

export interface RegionalPrice {
  state: string;
  stateCode: string;
  priceRange: string;
  minPrice: number;
  maxPrice: number;
}

export interface BreedTrait {
  name: string;
  score: number; // 1-5
  description: string;
}

export interface Breed {
  id: string;
  name: string;
  tagline?: string;
  image: string;
  size: DogSize;
  origin: string;
  avgPriceIndia: string;
  minPrice: number;
  maxPrice: number;
  isAdoptable?: boolean;
  tags: string[];
  description: string;
  climateAdvisory: {
    text: string;
    heatTolerance: number; // 1 to 3 or 5 stars
    heatToleranceText: string;
  };
  costs: {
    monthlyFood: string;
    monthlyFoodNote: string;
    vaccinations: string;
    vaccinationsNote: string;
    maintenanceLevel: 'Low' | 'Medium' | 'High';
    maintenanceNote: string;
  };
  regionalPrices: RegionalPrice[];
  traits: {
    energyLevel: number;
    groomingNeeds: number;
    trainability: number;
    apartmentFriendly: number;
    barkingLevel: number;
    kidFriendly: number;
  };
  lifespan: string;
  weight: string;
  exerciseNeeds: string;
}

export interface StateTopBreed {
  rank: number;
  breedId: string;
  breedName: string;
  priceRange: string;
  image: string;
}

export interface StateGuide {
  id: string;
  name: string;
  shortCode: string;
  headline: string;
  demandSummary: string;
  avgInitialCost: string;
  monthlyCare: string;
  mapImage: string;
  kciRules: string[];
  topBreeds: StateTopBreed[];
  pricingFactors: {
    title: string;
    description: string;
    percentage: number;
    icon: string;
  }[];
  vetInfrastructure: string;
}

export interface Shelter {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  dogsAvailable: number;
  adoptionFee: string;
  types: string[];
  verified: boolean;
  description: string;
  visitingHours: string;
}
