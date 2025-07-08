
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionPlans } from '@/data/mockData';
import { Crown, Star, Check, Calendar, CreditCard, Gift } from 'lucide-react';

export const UserSubscription: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<'1-month' | '6-month' | '1-year'>('1-month');

  const handleUpgrade = (planType: string) => {
    if (!user) return;

    const endDate = new Date();
    switch (selectedDuration) {
      case '6-month':
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case '1-year':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      default:
        endDate.setMonth(endDate.getMonth() + 1);
    }

    const updatedUser = {
      ...user,
      subscriptionType: planType as 'basic' | 'premium' | 'luxury',
      subscriptionDuration: selectedDuration,
      subscriptionStartDate: new Date().toISOString().split('T')[0],
      subscriptionEndDate: endDate.toISOString().split('T')[0],
      status: 'active' as const
    };

    updateUser(updatedUser);
    setSelectedPlan(null);
  };

  const getDiscountedPrice = (monthlyPrice: number, duration: string) => {
    switch (duration) {
      case '6-month':
        return monthlyPrice * 6 * 0.9; // 10% discount
      case '1-year':
        return monthlyPrice * 12 * 0.8; // 20% discount
      default:
        return monthlyPrice;
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'luxury':
        return <Crown className="h-8 w-8 text-yellow-600" />;
      case 'premium':
        return <Star className="h-8 w-8 text-purple-600" />;
      default:
        return <Check className="h-8 w-8 text-blue-600" />;
    }
  };

  const getCurrentPlanDetails = () => {
    if (!user) return null;
    return subscriptionPlans[user.subscriptionType];
  };

  const currentPlan = getCurrentPlanDetails();
  const daysUntilExpiry = user ? Math.ceil((new Date(user.subscriptionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">My Subscription</h1>
      </div>

      {/* Current Subscription */}
      {user && (
        <Card className="border-wash-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {getPlanIcon(user.subscriptionType)}
                <div>
                  <h3 className="text-xl font-bold text-wash-blue-dark">
                    {currentPlan?.name}
                  </h3>
                  <p className="text-muted-foreground">
                    ${currentPlan?.monthlyPrice}/month
                  </p>
                </div>
              </div>
              <Badge 
                className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
              >
                {user.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-wash-blue" />
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{user.subscriptionStartDate}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-wash-blue" />
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{user.subscriptionEndDate}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Gift className="h-6 w-6 mx-auto mb-2 text-wash-blue" />
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="font-medium text-wash-blue">{daysUntilExpiry > 0 ? daysUntilExpiry : 'Expired'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Features Included:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentPlan?.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {daysUntilExpiry <= 7 && daysUntilExpiry > 0 && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 font-medium">
                  ⚠️ Your subscription expires in {daysUntilExpiry} days. Renew now to avoid service interruption.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-wash-blue-dark mb-4">Available Plans</h2>
        
        {/* Duration Selection */}
        <div className="flex gap-2 mb-6">
          {(['1-month', '6-month', '1-year'] as const).map((duration) => (
            <Button
              key={duration}
              variant={selectedDuration === duration ? "default" : "outline"}
              onClick={() => setSelectedDuration(duration)}
              className={selectedDuration === duration ? "bg-wash-blue hover:bg-wash-blue-dark" : ""}
            >
              {duration === '1-month' && '1 Month'}
              {duration === '6-month' && '6 Months (10% off)'}
              {duration === '1-year' && '1 Year (20% off)'}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(subscriptionPlans).map(([key, plan]) => {
            const isCurrentPlan = user?.subscriptionType === key;
            const discountedPrice = getDiscountedPrice(plan.monthlyPrice, selectedDuration);
            const monthlyEquivalent = selectedDuration === '1-month' ? discountedPrice : discountedPrice / (selectedDuration === '6-month' ? 6 : 12);

            return (
              <Card 
                key={key} 
                className={`relative hover:shadow-lg transition-shadow ${
                  key === 'premium' ? 'border-purple-200 bg-purple-50/30' : ''
                } ${isCurrentPlan ? 'border-wash-blue bg-wash-blue/5' : ''}`}
              >
                {key === 'premium' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    {getPlanIcon(key)}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-wash-blue-dark">
                      ${monthlyEquivalent.toFixed(2)}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </p>
                    {selectedDuration !== '1-month' && (
                      <p className="text-sm text-muted-foreground">
                        ${discountedPrice.toFixed(2)} total for {selectedDuration.replace('-', ' ')}
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      key === 'premium' 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : key === 'luxury'
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-wash-blue hover:bg-wash-blue-dark'
                    }`}
                    disabled={isCurrentPlan}
                    onClick={() => handleUpgrade(key)}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
