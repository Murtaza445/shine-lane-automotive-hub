
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, Car, Plus, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const UserAppointments: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [showBookForm, setShowBookForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    carId: '',
    date: '',
    time: '',
    service: 'basic' as 'basic' | 'premium' | 'luxury',
    washType: ''
  });

  const washTypes = {
    basic: ['Exterior Wash', 'Basic Interior', 'Quick Wash'],
    premium: ['Exterior & Interior', 'Premium Detailing', 'Eco-Friendly Premium'],
    luxury: ['Full Detailing', 'Luxury Complete', 'Paint Protection']
  };

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleBookAppointment = () => {
    if (!user) return;

    const appointment = {
      id: Date.now().toString(),
      userId: user.id,
      ...newAppointment,
      status: 'scheduled' as const
    };

    const updatedUser = {
      ...user,
      appointments: [...user.appointments, appointment]
    };

    updateUser(updatedUser);
    setNewAppointment({
      carId: '',
      date: '',
      time: '',
      service: 'basic',
      washType: ''
    });
    setShowBookForm(false);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      appointments: user.appointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
      )
    };

    updateUser(updatedUser);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.scheduled;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getServicePrice = (service: string) => {
    const prices = { basic: 29.99, premium: 49.99, luxury: 89.99 };
    return prices[service as keyof typeof prices] || 0;
  };

  const upcomingAppointments = user?.appointments.filter(apt => apt.status === 'scheduled') || [];
  const pastAppointments = user?.appointments.filter(apt => apt.status !== 'scheduled') || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">My Appointments</h1>
        <Button 
          onClick={() => setShowBookForm(true)}
          className="bg-wash-blue hover:bg-wash-blue-dark"
          disabled={!user?.cars?.length}
        >
          <Plus className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {!user?.cars?.length && (
        <Card>
          <CardContent className="p-8 text-center">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No cars added</h3>
            <p className="text-muted-foreground">You need to add a car before booking appointments</p>
          </CardContent>
        </Card>
      )}

      {/* Book New Appointment */}
      {showBookForm && (
        <Card>
          <CardHeader>
            <CardTitle>Book New Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Car</label>
                <Select value={newAppointment.carId} onValueChange={(value) => setNewAppointment({ ...newAppointment, carId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your car" />
                  </SelectTrigger>
                  <SelectContent>
                    {user?.cars.map(car => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.year} {car.make} {car.model} - {car.licensePlate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <Select value={newAppointment.service} onValueChange={(value: any) => setNewAppointment({ ...newAppointment, service: value, washType: '' })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic - ${getServicePrice('basic')}</SelectItem>
                    <SelectItem value="premium">Premium - ${getServicePrice('premium')}</SelectItem>
                    <SelectItem value="luxury">Luxury - ${getServicePrice('luxury')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Wash Type</label>
                <Select value={newAppointment.washType} onValueChange={(value) => setNewAppointment({ ...newAppointment, washType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wash type" />
                  </SelectTrigger>
                  <SelectContent>
                    {washTypes[newAppointment.service].map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wash-blue/20"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Time</label>
                <Select value={newAppointment.time} onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleBookAppointment}
                disabled={!newAppointment.carId || !newAppointment.date || !newAppointment.time || !newAppointment.washType}
                className="bg-wash-blue hover:bg-wash-blue-dark"
              >
                Book Appointment
              </Button>
              <Button variant="outline" onClick={() => setShowBookForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => {
                const car = user?.cars.find(c => c.id === appointment.carId);
                return (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-wash-blue/10 rounded-lg">
                          <Calendar className="h-6 w-6 text-wash-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-wash-blue-dark">
                            {car?.year} {car?.make} {car?.model}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-purple-100 text-purple-800">
                              {appointment.service}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {appointment.washType}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(appointment.status)}
                          <Badge className={getStatusBadge(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Appointment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => {
                const car = user?.cars.find(c => c.id === appointment.carId);
                return (
                  <div key={appointment.id} className="border rounded-lg p-4 opacity-75">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Calendar className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700">
                            {car?.year} {car?.make} {car?.model}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-gray-100 text-gray-800">
                              {appointment.service}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {appointment.washType}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(appointment.status)}
                          <Badge className={getStatusBadge(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        {appointment.status === 'completed' && (
                          <Button variant="ghost" size="sm" className="text-wash-blue">
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Book Again
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {(!user?.appointments || user.appointments.length === 0) && !showBookForm && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No appointments yet</h3>
            <p className="text-muted-foreground mb-4">Book your first car wash appointment</p>
            {user?.cars?.length ? (
              <Button 
                onClick={() => setShowBookForm(true)}
                className="bg-wash-blue hover:bg-wash-blue-dark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Book First Appointment
              </Button>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
