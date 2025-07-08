
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Car, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const UserCars: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState<string | null>(null);
  const [newCar, setNewCar] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    licensePlate: ''
  });

  const handleAddCar = () => {
    if (!user) return;
    
    const carToAdd = {
      id: Date.now().toString(),
      userId: user.id,
      ...newCar,
      addedDate: new Date().toISOString().split('T')[0]
    };

    const updatedUser = {
      ...user,
      cars: [...user.cars, carToAdd]
    };

    updateUser(updatedUser);
    setNewCar({ make: '', model: '', year: new Date().getFullYear(), color: '', licensePlate: '' });
    setShowAddForm(false);
  };

  const handleDeleteCar = (carId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      cars: user.cars.filter(car => car.id !== carId)
    };

    updateUser(updatedUser);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const carMakes = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
    'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus', 'Tesla', 'Jeep'
  ];

  const colors = [
    'Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Brown'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">My Cars</h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-wash-blue hover:bg-wash-blue-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Car
        </Button>
      </div>

      {/* Add Car Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Car</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Select value={newCar.make} onValueChange={(value) => setNewCar({ ...newCar, make: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {carMakes.map(make => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="Enter model"
                  value={newCar.model}
                  onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select value={newCar.year.toString()} onValueChange={(value) => setNewCar({ ...newCar, year: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select value={newCar.color} onValueChange={(value) => setNewCar({ ...newCar, color: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="licensePlate">License Plate</Label>
                <Input
                  id="licensePlate"
                  placeholder="Enter license plate"
                  value={newCar.licensePlate}
                  onChange={(e) => setNewCar({ ...newCar, licensePlate: e.target.value.toUpperCase() })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleAddCar}
                disabled={!newCar.make || !newCar.model || !newCar.licensePlate}
                className="bg-wash-blue hover:bg-wash-blue-dark"
              >
                Add Car
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user?.cars.map((car) => (
          <Card key={car.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-wash-blue/10 rounded-lg">
                    <Car className="h-6 w-6 text-wash-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-wash-blue-dark">
                      {car.year} {car.make}
                    </h3>
                    <p className="text-muted-foreground">{car.model}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditingCar(car.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteCar(car.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color:</span>
                  <span className="font-medium">{car.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License Plate:</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                    {car.licensePlate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Added:</span>
                  <span className="font-medium">{car.addedDate}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => console.log('Schedule wash for', car.id)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Wash
              </Button>
            </CardContent>
          </Card>
        ))}

        {(!user?.cars || user.cars.length === 0) && !showAddForm && (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No cars added yet</h3>
              <p className="text-muted-foreground mb-4">Add your first car to get started with our wash services</p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-wash-blue hover:bg-wash-blue-dark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Car
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
