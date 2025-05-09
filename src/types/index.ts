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
  _id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  images: string[]; // confirm this is not optional
  price: string;
  weight: string;
  address: string;
  status: string; // Added the missing 'status' property
  user: string;
  createdAt: string;
  updatedAt: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
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

export interface PickupRequest {
  id: string;
  userId: string;
  address: string;
  scheduledDate: string; // ISO format: YYYY-MM-DD
  scheduledTimeSlot: string; // e.g., "9 AM - 11 AM"
  items: Pickup[];
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
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