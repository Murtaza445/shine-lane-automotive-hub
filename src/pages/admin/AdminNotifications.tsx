
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockNotifications, mockUsers } from '@/data/mockData';
import { Send, Bell, AlertCircle, Gift, Settings, Plus, Eye, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AdminNotifications: React.FC = () => {
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'system' as 'reminder' | 'promotion' | 'system',
    recipients: 'all' as 'all' | 'specific'
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'promotion':
        return <Gift className="h-4 w-4 text-green-600" />;
      default:
        return <Settings className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      reminder: 'bg-orange-100 text-orange-800',
      promotion: 'bg-green-100 text-green-800',
      system: 'bg-blue-100 text-blue-800'
    };
    return variants[type as keyof typeof variants] || variants.system;
  };

  const handleSendNotification = () => {
    console.log('Sending notification:', newNotification);
    // Reset form
    setNewNotification({
      title: '',
      message: '',
      type: 'system',
      recipients: 'all'
    });
  };

  const notificationStats = {
    total: mockNotifications.length,
    unread: mockNotifications.filter(n => !n.read).length,
    reminders: mockNotifications.filter(n => n.type === 'reminder').length,
    promotions: mockNotifications.filter(n => n.type === 'promotion').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">Notification Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-wash-blue/10 rounded-lg">
                <Bell className="h-6 w-6 text-wash-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold text-wash-blue-dark">{notificationStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reminders</p>
                <p className="text-2xl font-bold text-orange-600">{notificationStats.reminders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Promotions</p>
                <p className="text-2xl font-bold text-green-600">{notificationStats.promotions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-blue-600">{mockUsers.filter(u => u.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Send New Notification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send New Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Notification title"
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={newNotification.type} onValueChange={(value: any) => setNewNotification({ ...newNotification, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Enter your notification message..."
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Recipients</label>
            <Select value={newNotification.recipients} onValueChange={(value: any) => setNewNotification({ ...newNotification, recipients: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active Subscribers Only</SelectItem>
                <SelectItem value="expired">Expired Subscriptions</SelectItem>
                <SelectItem value="specific">Specific Users</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSendNotification} 
            className="bg-wash-blue hover:bg-wash-blue-dark"
            disabled={!newNotification.title || !newNotification.message}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div key={notification.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(notification.type)}
                      <h3 className="font-medium text-wash-blue-dark">{notification.title}</h3>
                      <Badge className={getTypeBadge(notification.type)}>
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <Badge variant="secondary">Unread</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Sent on {notification.date}
                      {notification.userId && ' • Targeted notification'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
