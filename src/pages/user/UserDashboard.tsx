
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Calendar, CreditCard, Star, Clock, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const nextWash = user.appointments.find(apt => apt.status === 'scheduled');
  const subscriptionProgress = 60; // Mock progress
  const washesThisMonth = 3;
  const washesRemaining = user.subscriptionType === 'luxury' ? 'Unlimited' : 
                         user.subscriptionType === 'premium' ? '5' : '2';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-wash-blue-dark">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Here's your car wash overview</p>
        </div>
        <Button className="bg-wash-blue hover:bg-wash-blue-dark">
          <Calendar className="h-4 w-4 mr-2" />
          Book Wash
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-wash-blue hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Cars</CardTitle>
            <Car className="h-4 w-4 text-wash-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wash-blue-dark">{user.cars.length}</div>
            <p className="text-xs text-muted-foreground">
              Registered vehicles
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-wash-cyan hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Clock className="h-4 w-4 text-wash-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wash-blue-dark">{washesThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Washes completed
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-wash-teal hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <Calendar className="h-4 w-4 text-wash-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wash-blue-dark">{washesRemaining}</div>
            <p className="text-xs text-muted-foreground">
              Washes left
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wash-blue-dark">$127</div>
            <p className="text-xs text-muted-foreground">
              Saved this year
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Subscription Status */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wash-blue-dark">
              <CreditCard className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-purple-100 text-purple-800 capitalize">
                  {user.subscriptionType}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {user.subscriptionDuration} plan
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Next billing</p>
                <p className="text-sm text-muted-foreground">{user.subscriptionEndDate}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subscription progress</span>
                <span>{subscriptionProgress}%</span>
              </div>
              <Progress value={subscriptionProgress} className="h-2" />
            </div>

            <Button variant="outline" className="w-full">
              Manage Subscription
            </Button>
          </CardContent>
        </Card>

        {/* Next Appointment */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wash-blue-dark">
              <Calendar className="h-5 w-5" />
              Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextWash ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{nextWash.washType}</p>
                    <p className="text-sm text-muted-foreground">
                      {nextWash.date} at {nextWash.time}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {nextWash.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Main Location - Bay 2</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                <Button className="bg-wash-blue hover:bg-wash-blue-dark">
                  Schedule Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* My Cars */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wash-blue-dark">
            <Car className="h-5 w-5" />
            My Vehicles
          </CardTitle>
          <CardDescription>
            Manage your registered vehicles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {user.cars.map((car) => (
              <Card key={car.id} className="border-2 border-dashed border-gray-200 hover:border-wash-blue transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-wash-blue-dark">
                        {car.year} {car.make} {car.model}
                      </p>
                      <p className="text-sm text-muted-foreground">{car.color}</p>
                      <p className="text-xs text-muted-foreground mt-1">{car.licensePlate}</p>
                    </div>
                    <Badge variant="outline" className="bg-wash-blue/10 text-wash-blue">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-2 border-dashed border-gray-200 hover:border-wash-blue transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center justify-center h-full">
                <div className="text-center">
                  <Car className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Add Vehicle</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
