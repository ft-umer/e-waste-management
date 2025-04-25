import { EducationalContent, PickupRequest, RecyclingCenter, User, WasteItem } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Green St, Eco City',
    phone: '555-123-4567',
    points: 250,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    address: '456 Park Ave, Sustainable Town',
    phone: '555-765-4321',
    points: 180,
  },
];

// Mock Waste Items
export const wasteItems: WasteItem[] = [
  {
    id: '1',
    category: 'electronics',
    description: 'Old LCD monitor',
    quantity: 1,
    weight: 5.2,
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    category: 'mobile_devices',
    description: 'iPhone 8',
    quantity: 1,
    weight: 0.15,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    category: 'batteries',
    description: 'AA and AAA batteries',
    quantity: 12,
    weight: 0.3,
    image: 'https://images.pexels.com/photos/47634/pexels-photo-47634.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    category: 'appliances',
    description: 'Microwave oven',
    quantity: 1,
    weight: 15,
    image: 'https://images.pexels.com/photos/4108810/pexels-photo-4108810.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// Mock Pickup Requests
export const pickupRequests: PickupRequest[] = [
  {
    id: '1',
    userId: '1',
    status: 'scheduled',
    items: [wasteItems[0], wasteItems[2]],
    scheduledDate: '2025-05-15',
    scheduledTimeSlot: '09:00-12:00',
    address: '123 Green St, Eco City',
    notes: 'Please ring the doorbell',
    createdAt: '2025-05-10T14:30:00Z',
  },
  {
    id: '2',
    userId: '2',
    status: 'pending',
    items: [wasteItems[1]],
    scheduledDate: '2025-05-18',
    scheduledTimeSlot: '13:00-16:00',
    address: '456 Park Ave, Sustainable Town',
    createdAt: '2025-05-12T10:15:00Z',
  },
  {
    id: '3',
    userId: '1',
    status: 'completed',
    items: [wasteItems[3]],
    scheduledDate: '2025-05-05',
    scheduledTimeSlot: '09:00-12:00',
    address: '123 Green St, Eco City',
    createdAt: '2025-04-29T09:45:00Z',
  },
];

// Mock Recycling Centers
export const recyclingCenters: RecyclingCenter[] = [
  {
    id: '1',
    name: 'EcoRecycle Center',
    address: '789 Recycle Blvd, Green Valley',
    phone: '555-987-6543',
    email: 'info@ecorecycle.com',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
    acceptedItems: ['electronics', 'batteries', 'computers', 'mobile_devices'],
    operatingHours: [
      { day: 'Monday-Friday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
  },
  {
    id: '2',
    name: 'TechWaste Solutions',
    address: '101 Tech Dr, Innovation City',
    phone: '555-456-7890',
    email: 'contact@techwaste.com',
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
    acceptedItems: ['electronics', 'computers', 'peripherals', 'appliances'],
    operatingHours: [
      { day: 'Monday-Thursday', hours: '8:00 AM - 7:00 PM' },
      { day: 'Friday', hours: '8:00 AM - 5:00 PM' },
      { day: 'Saturday-Sunday', hours: '10:00 AM - 2:00 PM' },
    ],
  },
];

// Mock Educational Content
export const educationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'The Hidden Dangers of E-Waste',
    description: 'Learn about the environmental and health impacts of improper e-waste disposal.',
    content: `Electronic waste contains toxic materials like lead, mercury, and cadmium that can leach into soil and water systems when improperly disposed of. These toxins can cause severe health issues in humans and wildlife.

    A single smartphone contains dozens of materials including rare earth elements that require significant resources to mine and process. Recycling helps recover these valuable materials and reduces the need for new mining operations.
    
    When electronics end up in landfills, they contribute to pollution and waste valuable resources that could be reused. By recycling your electronics, you help create a circular economy where materials are reused instead of wasted.`,
    imageUrl: 'https://images.pexels.com/photos/159751/book-read-literature-pages-159751.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'impact',
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: '2',
    title: 'How E-Waste Recycling Works',
    description: 'A step-by-step guide to what happens to your electronics after collection.',
    content: `The e-waste recycling process begins with collection from homes, businesses, or drop-off centers. Items are then sorted by type and condition to determine if they can be refurbished or need to be recycled.

    Devices that can be repaired are refurbished and resold, extending their useful life. Those that can't be repaired are disassembled into components like circuit boards, plastics, metals, and batteries.
    
    These materials are then processed through specialized equipment that separates valuable materials like gold, silver, copper, and rare earth elements. The recovered materials are then used to manufacture new products, completing the recycling loop.`,
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'recycling',
    createdAt: '2025-02-10T10:30:00Z',
  },
  {
    id: '3',
    title: 'Preparing Your Electronics for Recycling',
    description: 'Important steps to take before recycling your electronic devices.',
    content: `Before recycling your electronic devices, it's crucial to back up and then properly erase all personal data. For computers and smartphones, perform a factory reset after backing up your important files.

    Remove batteries from devices when possible, as they often need to be recycled separately. Many retailers and recycling centers have special collection bins just for batteries.
    
    If your device is still working, consider donating it to a charitable organization instead of recycling. This extends the life of the device and helps someone in need.`,
    imageUrl: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'disposal',
    createdAt: '2025-03-05T14:15:00Z',
  },
  {
    id: '4',
    title: 'The Environmental Benefits of E-Waste Recycling',
    description: 'How your recycling efforts help protect our planet.',
    content: `Recycling one million laptops saves the energy equivalent to electricity used by over 3,500 homes in a year. E-waste recycling significantly reduces energy consumption compared to mining raw materials.

    Proper e-waste recycling prevents toxic substances like lead, mercury, and flame retardants from contaminating soil, water, and air. This protects ecosystems and wildlife that would otherwise be harmed by these pollutants.
    
    Many electronics contain valuable materials like gold, silver, copper, and rare earth elements. Recycling recovers these materials, reducing the need for environmentally destructive mining operations.`,
    imageUrl: 'https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'conservation',
    createdAt: '2025-04-20T09:45:00Z',
  },
];