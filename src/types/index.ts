export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'rider' | 'mechanic' | 'recycler';
  points: number;
  createdAt: string;
}

export interface WasteItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: WasteCategory;
  condition: WasteCondition;
  images: string[];
  price?: number;
  weight?: number;
  status: WasteStatus;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  createdAt: string;
}

export type WasteCategory = 
  | 'bulbs'
  | 'wires'
  | 'batteries'
  | 'electronics'
  | 'appliances'
  | 'computers'
  | 'phones'
  | 'other';

export type WasteCondition = 
  | 'repairable'
  | 'damaged'
  | 'working'
  | 'unknown';

export type WasteStatus = 
  | 'listed'
  | 'pending_pickup'
  | 'in_transit'
  | 'with_mechanic'
  | 'with_recycler'
  | 'completed';

export interface Pickup {
  id: string;
  wasteItemId: string;
  riderId: string;
  status: PickupStatus;
  scheduledTime: string;
  completedTime?: string;
  notes?: string;
  createdAt: string;
}

export type PickupStatus = 
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Seminar {
  id: string;
  title: string;
  description: string;
  speaker: string;
  date: string;
  time: string;
  platform: 'zoom' | 'google_meet' | 'teams';
  link: string;
  image?: string;
  recordingUrl?: string;
  attendees: number;
  createdAt: string;
}