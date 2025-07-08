
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockUsers, Appointment } from '@/data/mockData';
import { Search, Calendar, CheckCircle, XCircle, Clock, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AdminAppointments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');

  // Get all appointments from all users
  const allAppointments = mockUsers.flatMap(user => 
    user.appointments.map(appointment => ({
      ...appointment,
      ownerName: user.name,
      ownerEmail: user.email,
      carDetails: user.cars.find(car => car.id === appointment.carId)
    }))
  );

  const filteredAppointments = allAppointments.filter(appointment => {
    const matchesSearch = appointment.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.carDetails?.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.carDetails?.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesService = filterService === 'all' || appointment.service === filterService;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.scheduled;
  };

  const getServiceBadge = (service: string) => {
    const variants = {
      basic: 'bg-gray-100 text-gray-800',
      premium: 'bg-purple-100 text-purple-800',
      luxury: 'bg-yellow-100 text-yellow-800'
    };
    return variants[service as keyof typeof variants] || variants.basic;
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

  const statusCounts = {
    total: allAppointments.length,
    scheduled: allAppointments.filter(a => a.status === 'scheduled').length,
    completed: allAppointments.filter(a => a.status === 'completed').length,
    cancelled: allAppointments.filter(a => a.status === 'cancelled').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">Appointment Management</h1>
        <Button className="bg-wash-blue hover:bg-wash-blue-dark">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-wash-blue/10 rounded-lg">
                <Calendar className="h-6 w-6 text-wash-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-wash-blue-dark">{statusCounts.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.scheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.cancelled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search appointments by customer or car..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterService} onValueChange={setFilterService}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Customer</th>
                  <th className="text-left p-3">Vehicle</th>
                  <th className="text-left p-3">Date & Time</th>
                  <th className="text-left p-3">Service</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-wash-blue-dark">{appointment.ownerName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.ownerEmail}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">
                          {appointment.carDetails?.make} {appointment.carDetails?.model}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.carDetails?.licensePlate}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{appointment.date}</div>
                        <div className="text-sm text-muted-foreground">{appointment.time}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <Badge className={getServiceBadge(appointment.service)}>
                          {appointment.service}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {appointment.washType}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(appointment.status)}
                        <Badge className={getStatusBadge(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {appointment.status === 'scheduled' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                              Complete
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === 'cancelled' && (
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Reschedule
                          </Button>
                        )}
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
