
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { subscriptionPlans } from '@/data/mockData';
import { Settings, Save, RefreshCcw, Shield, Bell, DollarSign, Users } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    businessName: 'AquaClean Car Wash',
    businessEmail: 'admin@aquaclean.com',
    businessPhone: '+1 (555) 000-0000',
    businessAddress: '123 Clean Street, Wash City, WC 12345',
    // Pricing
    basicPrice: subscriptionPlans.basic.monthlyPrice,
    premiumPrice: subscriptionPlans.premium.monthlyPrice,
    luxuryPrice: subscriptionPlans.luxury.monthlyPrice,
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    // Security
    twoFactorAuth: false,
    sessionTimeout: 60,
    // General
    allowUserRegistration: true,
    requireEmailVerification: true,
    autoApproveUsers: false
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  const handleReset = () => {
    console.log('Resetting to defaults');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">System Settings</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} className="bg-wash-blue hover:bg-wash-blue-dark">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                type="email"
                value={settings.businessEmail}
                onChange={(e) => setSettings({ ...settings, businessEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input
                id="businessPhone"
                value={settings.businessPhone}
                onChange={(e) => setSettings({ ...settings, businessPhone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Textarea
              id="businessAddress"
              value={settings.businessAddress}
              onChange={(e) => setSettings({ ...settings, businessAddress: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Subscription Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Subscription Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="basicPrice">Basic Plan (Monthly)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="basicPrice"
                  type="number"
                  step="0.01"
                  value={settings.basicPrice}
                  onChange={(e) => setSettings({ ...settings, basicPrice: parseFloat(e.target.value) })}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">Current: ${subscriptionPlans.basic.monthlyPrice}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="premiumPrice">Premium Plan (Monthly)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="premiumPrice"
                  type="number"
                  step="0.01"
                  value={settings.premiumPrice}
                  onChange={(e) => setSettings({ ...settings, premiumPrice: parseFloat(e.target.value) })}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">Current: ${subscriptionPlans.premium.monthlyPrice}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="luxuryPrice">Luxury Plan (Monthly)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="luxuryPrice"
                  type="number"
                  step="0.01"
                  value={settings.luxuryPrice}
                  onChange={(e) => setSettings({ ...settings, luxuryPrice: parseFloat(e.target.value) })}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">Current: ${subscriptionPlans.luxury.monthlyPrice}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Send notifications via email</p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
            </div>
            <Switch
              id="smsNotifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="pushNotifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Send browser push notifications</p>
            </div>
            <Switch
              id="pushNotifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
            </div>
            <Switch
              id="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
              className="w-32"
            />
            <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
          </div>
        </CardContent>
      </Card>

      {/* User Management Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allowUserRegistration">Allow User Registration</Label>
              <p className="text-sm text-muted-foreground">Allow new users to register</p>
            </div>
            <Switch
              id="allowUserRegistration"
              checked={settings.allowUserRegistration}
              onCheckedChange={(checked) => setSettings({ ...settings, allowUserRegistration: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
              <p className="text-sm text-muted-foreground">Users must verify email before access</p>
            </div>
            <Switch
              id="requireEmailVerification"
              checked={settings.requireEmailVerification}
              onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoApproveUsers">Auto-approve Users</Label>
              <p className="text-sm text-muted-foreground">Automatically approve new registrations</p>
            </div>
            <Switch
              id="autoApproveUsers"
              checked={settings.autoApproveUsers}
              onCheckedChange={(checked) => setSettings({ ...settings, autoApproveUsers: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
