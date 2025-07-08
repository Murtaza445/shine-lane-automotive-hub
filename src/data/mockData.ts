
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  subscriptionType: 'basic' | 'premium' | 'luxury';
  subscriptionDuration: '1-month' | '6-month' | '1-year';
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  status: 'active' | 'expired' | 'cancelled';
  totalSpent: number;
  cars: Car[];
  appointments: Appointment[];
  feedback: Feedback[];
}

export interface Car {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  addedDate: string;
}

export interface Appointment {
  id: string;
  userId: string;
  carId: string;
  date: string;
  time: string;
  service: 'basic' | 'premium' | 'luxury';
  status: 'scheduled' | 'completed' | 'cancelled';
  washType: string;
}

export interface Feedback {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'reminder' | 'promotion' | 'system';
  date: string;
  read: boolean;
}

export interface Revenue {
  date: string;
  basic: number;
  premium: number;
  luxury: number;
  total: number;
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-01-15',
    subscriptionType: 'premium',
    subscriptionDuration: '6-month',
    subscriptionStartDate: '2024-01-15',
    subscriptionEndDate: '2024-07-15',
    status: 'active',
    totalSpent: 450,
    cars: [
      {
        id: '1',
        userId: '1',
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        color: 'White',
        licensePlate: 'ABC-123',
        addedDate: '2024-01-15'
      },
      {
        id: '2',
        userId: '1',
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        color: 'Black',
        licensePlate: 'XYZ-789',
        addedDate: '2024-02-10'
      }
    ],
    appointments: [
      {
        id: '1',
        userId: '1',
        carId: '1',
        date: '2024-07-10',
        time: '10:00 AM',
        service: 'premium',
        status: 'scheduled',
        washType: 'Exterior & Interior'
      }
    ],
    feedback: [
      {
        id: '1',
        userId: '1',
        rating: 5,
        comment: 'Excellent service! My car looks brand new.',
        date: '2024-06-15',
        serviceType: 'Premium Wash'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    joinDate: '2024-02-20',
    subscriptionType: 'luxury',
    subscriptionDuration: '1-year',
    subscriptionStartDate: '2024-02-20',
    subscriptionEndDate: '2025-02-20',
    status: 'active',
    totalSpent: 890,
    cars: [
      {
        id: '3',
        userId: '2',
        make: 'BMW',
        model: 'X5',
        year: 2023,
        color: 'Silver',
        licensePlate: 'BMW-001',
        addedDate: '2024-02-20'
      }
    ],
    appointments: [
      {
        id: '2',
        userId: '2',
        carId: '3',
        date: '2024-07-12',
        time: '2:00 PM',
        service: 'luxury',
        status: 'scheduled',
        washType: 'Full Detailing'
      }
    ],
    feedback: [
      {
        id: '2',
        userId: '2',
        rating: 5,
        comment: 'Amazing luxury service. Worth every penny!',
        date: '2024-06-20',
        serviceType: 'Luxury Detailing'
      }
    ]
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@email.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2024-03-10',
    subscriptionType: 'basic',
    subscriptionDuration: '1-month',
    subscriptionStartDate: '2024-06-10',
    subscriptionEndDate: '2024-07-10',
    status: 'active',
    totalSpent: 180,
    cars: [
      {
        id: '4',
        userId: '3',
        make: 'Ford',
        model: 'F-150',
        year: 2020,
        color: 'Blue',
        licensePlate: 'FORD-150',
        addedDate: '2024-03-10'
      }
    ],
    appointments: [],
    feedback: [
      {
        id: '3',
        userId: '3',
        rating: 4,
        comment: 'Good value for money. Basic wash was thorough.',
        date: '2024-06-25',
        serviceType: 'Basic Wash'
      }
    ]
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@email.com',
    phone: '+1 (555) 456-7890',
    joinDate: '2024-04-05',
    subscriptionType: 'premium',
    subscriptionDuration: '1-year',
    subscriptionStartDate: '2024-04-05',
    subscriptionEndDate: '2025-04-05',
    status: 'active',
    totalSpent: 720,
    cars: [
      {
        id: '5',
        userId: '4',
        make: 'Tesla',
        model: 'Model 3',
        year: 2023,
        color: 'Red',
        licensePlate: 'TESLA-3',
        addedDate: '2024-04-05'
      }
    ],
    appointments: [
      {
        id: '3',
        userId: '4',
        carId: '5',
        date: '2024-07-08',
        time: '11:30 AM',
        service: 'premium',
        status: 'completed',
        washType: 'Eco-Friendly Premium'
      }
    ],
    feedback: []
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 567-8901',
    joinDate: '2024-05-15',
    subscriptionType: 'basic',
    subscriptionDuration: '6-month',
    subscriptionStartDate: '2024-05-15',
    subscriptionEndDate: '2024-11-15',
    status: 'active',
    totalSpent: 240,
    cars: [
      {
        id: '6',
        userId: '5',
        make: 'Chevrolet',
        model: 'Malibu',
        year: 2019,
        color: 'Gray',
        licensePlate: 'CHEVY-M',
        addedDate: '2024-05-15'
      }
    ],
    appointments: [],
    feedback: [
      {
        id: '4',
        userId: '5',
        rating: 4,
        comment: 'Reliable service, good scheduling system.',
        date: '2024-06-30',
        serviceType: 'Basic Wash'
      }
    ]
  }
];

// Revenue Data
export const mockRevenue: Revenue[] = [
  { date: '2024-01', basic: 1200, premium: 2400, luxury: 1800, total: 5400 },
  { date: '2024-02', basic: 1350, premium: 2700, luxury: 2100, total: 6150 },
  { date: '2024-03', basic: 1100, premium: 2200, luxury: 1900, total: 5200 },
  { date: '2024-04', basic: 1450, premium: 2900, luxury: 2300, total: 6650 },
  { date: '2024-05', basic: 1600, premium: 3200, luxury: 2500, total: 7300 },
  { date: '2024-06', basic: 1800, premium: 3600, luxury: 2800, total: 8200 },
];

// Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Subscription Renewal Reminder',
    message: 'Your premium subscription expires in 5 days. Renew now to continue enjoying our services.',
    type: 'reminder',
    date: '2024-07-05',
    read: false
  },
  {
    id: '2',
    title: 'Summer Special Offer',
    message: '25% off on luxury detailing services this month!',
    type: 'promotion',
    date: '2024-07-01',
    read: true
  },
  {
    id: '3',
    userId: '2',
    title: 'Appointment Confirmed',
    message: 'Your luxury wash appointment is confirmed for July 12th at 2:00 PM.',
    type: 'system',
    date: '2024-07-03',
    read: false
  }
];

// Popular Car Models Analytics
export const getPopularCarModels = () => {
  const carCounts: { [key: string]: number } = {};
  
  mockUsers.forEach(user => {
    user.cars.forEach(car => {
      const model = `${car.make} ${car.model}`;
      carCounts[model] = (carCounts[model] || 0) + 1;
    });
  });
  
  return Object.entries(carCounts)
    .map(([model, count]) => ({ model, count }))
    .sort((a, b) => b.count - a.count);
};

// Subscription Distribution
export const getSubscriptionDistribution = () => {
  const distribution = { basic: 0, premium: 0, luxury: 0 };
  
  mockUsers.forEach(user => {
    if (user.status === 'active') {
      distribution[user.subscriptionType]++;
    }
  });
  
  return distribution;
};

// Get analytics data
export const getAnalytics = () => {
  const totalUsers = mockUsers.length;
  const activeSubscriptions = mockUsers.filter(user => user.status === 'active').length;
  const totalCars = mockUsers.reduce((sum, user) => sum + user.cars.length, 0);
  const totalRevenue = mockRevenue[mockRevenue.length - 1]?.total || 0;
  const averageRating = mockUsers
    .flatMap(user => user.feedback)
    .reduce((sum, feedback, _, arr) => sum + feedback.rating / arr.length, 0);
  
  return {
    totalUsers,
    activeSubscriptions,
    totalCars,
    totalRevenue,
    averageRating: Math.round(averageRating * 10) / 10,
    popularModels: getPopularCarModels(),
    subscriptionDistribution: getSubscriptionDistribution(),
    revenueData: mockRevenue
  };
};

// Current user (for demo purposes)
export let currentUser: User | null = null;

export const setCurrentUser = (user: User | null) => {
  currentUser = user;
};

export const getCurrentUser = () => currentUser;

// Subscription Plans
export const subscriptionPlans = {
  basic: {
    name: 'Basic Wash',
    monthlyPrice: 29.99,
    features: ['Exterior wash', 'Basic interior cleaning', 'Tire cleaning', '1 wash per week'],
    color: 'bg-blue-500'
  },
  premium: {
    name: 'Premium Clean',
    monthlyPrice: 49.99,
    features: ['Everything in Basic', 'Interior detailing', 'Wax protection', 'Wheel cleaning', '2 washes per week'],
    color: 'bg-purple-500'
  },
  luxury: {
    name: 'Luxury Detailing',
    monthlyPrice: 89.99,
    features: ['Everything in Premium', 'Paint protection', 'Leather treatment', 'Engine cleaning', 'Unlimited washes'],
    color: 'bg-gold-500'
  }
};
