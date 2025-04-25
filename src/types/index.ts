export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  points: number;
}

export interface PickupRequest {
  id: string;
  userId: string;
  status: 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  items: WasteItem[];
  scheduledDate: string;
  scheduledTimeSlot: string;
  address: string;
  notes?: string;
  createdAt: string;
}

export interface WasteItem {
  id: string;
  category: WasteCategory;
  description: string;
  quantity: number;
  weight?: number;
  image?: string;
}

export type WasteCategory = 
  | 'electronics' 
  | 'batteries' 
  | 'appliances' 
  | 'computers' 
  | 'mobile_devices' 
  | 'peripherals' 
  | 'others';

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  acceptedItems: WasteCategory[];
  operatingHours: {
    day: string;
    hours: string;
  }[];
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: 'impact' | 'recycling' | 'disposal' | 'conservation';
  createdAt: string;
}

export interface ImpactMetrics {
  totalItemsRecycled: number;
  co2Saved: number;
  waterSaved: number;
  energySaved: number;
  treesEquivalent: number;
}