
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockUsers, Car } from '@/data/mockData';
import { Search, Edit, Trash2, Eye, Plus, Car as CarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AdminCars: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState<string>('all');

  // Get all cars from all users
  const allCars = mockUsers.flatMap(user => 
    user.cars.map(car => ({
      ...car,
      ownerName: user.name,
      ownerEmail: user.email,
      subscriptionType: user.subscriptionType
    }))
  );

  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMake = filterMake === 'all' || car.make.toLowerCase() === filterMake.toLowerCase();
    
    return matchesSearch && matchesMake;
  });

  const uniqueMakes = [...new Set(allCars.map(car => car.make))];

  const getSubscriptionBadge = (type: string) => {
    const variants = {
      basic: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800',
      luxury: 'bg-yellow-100 text-yellow-800'
    };
    return variants[type as keyof typeof variants] || variants.basic;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">Car Management</h1>
        <Button className="bg-wash-blue hover:bg-wash-blue-dark">
          <Plus className="h-4 w-4 mr-2" />
          Add Car
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-wash-blue/10 rounded-lg">
                <CarIcon className="h-6 w-6 text-wash-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cars</p>
                <p className="text-2xl font-bold text-wash-blue-dark">{allCars.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {uniqueMakes.slice(0, 3).map((make, index) => (
          <Card key={make}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-wash-cyan/10 rounded-lg">
                  <CarIcon className="h-6 w-6 text-wash-cyan" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{make}</p>
                  <p className="text-2xl font-bold text-wash-blue-dark">
                    {allCars.filter(car => car.make === make).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cars by make, model, license plate, or owner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterMake} onValueChange={setFilterMake}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {uniqueMakes.map(make => (
                  <SelectItem key={make} value={make.toLowerCase()}>{make}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cars Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cars ({filteredCars.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Vehicle</th>
                  <th className="text-left p-3">Owner</th>
                  <th className="text-left p-3">License Plate</th>
                  <th className="text-left p-3">Subscription</th>
                  <th className="text-left p-3">Added Date</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-wash-blue-dark">
                          {car.year} {car.make} {car.model}
                        </div>
                        <div className="text-sm text-muted-foreground">Color: {car.color}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{car.ownerName}</div>
                        <div className="text-sm text-muted-foreground">{car.ownerEmail}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                        {car.licensePlate}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge className={getSubscriptionBadge(car.subscriptionType)}>
                        {car.subscriptionType}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="text-sm">{car.addedDate}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
