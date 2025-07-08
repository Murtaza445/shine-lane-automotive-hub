
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Car, Star, Shield, Clock, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Car,
      title: 'Multiple Vehicle Management',
      description: 'Register and manage multiple vehicles with ease'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book appointments that fit your schedule'
    },
    {
      icon: Star,
      title: 'Premium Service',
      description: 'Professional car wash with attention to detail'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data and vehicles are safe with us'
    }
  ];

  const plans = [
    {
      name: 'Basic Wash',
      price: '$29.99',
      period: '/month',
      features: ['Exterior wash', 'Basic interior cleaning', 'Tire cleaning', '1 wash per week'],
      color: 'from-wash-blue to-wash-blue-dark',
      popular: false
    },
    {
      name: 'Premium Clean',
      price: '$49.99',
      period: '/month',
      features: ['Everything in Basic', 'Interior detailing', 'Wax protection', 'Wheel cleaning', '2 washes per week'],
      color: 'from-purple-500 to-purple-700',
      popular: true
    },
    {
      name: 'Luxury Detailing',
      price: '$89.99',
      period: '/month',
      features: ['Everything in Premium', 'Paint protection', 'Leather treatment', 'Engine cleaning', 'Unlimited washes'],
      color: 'from-yellow-500 to-orange-500',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wash-blue via-wash-cyan to-wash-teal">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">AquaClean</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-white text-wash-blue hover:bg-white/90">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-8">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm animate-float">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-yellow-400 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Premium Car Wash
            <span className="block text-yellow-300">Management System</span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 sm:text-xl">
            Experience the future of car care with our comprehensive management system. 
            Book, track, and manage your vehicle maintenance with ease.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-white text-wash-blue hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-wash-blue-dark sm:text-4xl">
              Why Choose AquaClean?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to manage your car wash experience
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-wash-blue to-wash-cyan">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-wash-blue-dark">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-wash-blue-dark sm:text-4xl">
              Choose Your Plan
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Flexible pricing options for every need
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'transform scale-105 ring-2 ring-purple-500' : 'hover:-translate-y-2'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-wash-blue-dark mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-wash-blue-dark">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white shadow-lg`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-wash-blue to-wash-cyan py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to transform your car wash experience?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Join thousands of satisfied customers who trust AquaClean
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button 
                size="lg"
                className="bg-white text-wash-blue hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wash-blue-dark py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">AquaClean</span>
            </div>
          </div>
          <p className="mt-4 text-center text-white/70">
            © 2024 AquaClean. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
