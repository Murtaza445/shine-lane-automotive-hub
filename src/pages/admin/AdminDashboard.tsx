
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAnalytics } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Car, CreditCard, Star, TrendingUp, DollarSign } from 'lucide-react';

const COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B'];

export const AdminDashboard: React.FC = () => {
  const analytics = getAnalytics();
  
  const subscriptionChartData = [
    { name: 'Basic', value: analytics.subscriptionDistribution.basic, color: '#3B82F6' },
    { name: 'Premium', value: analytics.subscriptionDistribution.premium, color: '#8B5CF6' },
    { name: 'Luxury', value: analytics.subscriptionDistribution.luxury, color: '#F59E0B' },
  ];

  const revenueChartData = analytics.revenueData.map(data => ({
    month: data.date.split('-')[1],
    basic: data.basic,
    premium: data.premium,
    luxury: data.luxury,
    total: data.total
  }));

  const popularModelsData = analytics.popularModels.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-wash-blue hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-wash-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wash-blue-dark">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.activeSubscriptions} active subscriptions
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-wash-cyan hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-wash-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wash-blue-dark">{analytics.totalCars}</div>
            <p className="text-xs text-muted-foreground">
              Registered vehicles
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-wash-teal hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-wash-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wash-blue-dark">${analytics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wash-blue-dark">{analytics.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              Based on customer feedback
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Subscription Distribution */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-wash-blue-dark">Subscription Distribution</CardTitle>
            <CardDescription>
              Active subscriptions by plan type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trends */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-wash-blue-dark">Revenue Trends</CardTitle>
            <CardDescription>
              Monthly revenue by subscription type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Line type="monotone" dataKey="basic" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="premium" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="luxury" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Popular Car Models */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-wash-blue-dark">Popular Car Models</CardTitle>
          <CardDescription>
            Most registered car models in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularModelsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="model" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#14B8A6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
