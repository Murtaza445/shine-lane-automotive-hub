
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Eye, EyeOff, Car } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        
        // Redirect based on user type
        setTimeout(() => {
          if (email === 'admin@carwash.com') {
            navigate('/admin/dashboard');
          } else {
            navigate('/user/dashboard');
          }
        }, 1000);
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wash-blue via-wash-cyan to-wash-teal p-4">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-wash-blue to-wash-cyan shadow-lg">
                <Droplets className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-wash-blue-dark">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your AquaClean account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-wash-blue/20 focus:ring-wash-blue/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-wash-blue/20 focus:ring-wash-blue/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-wash-blue to-wash-cyan hover:from-wash-blue-dark hover:to-wash-cyan-dark text-white shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-wash-blue hover:text-wash-blue-dark transition-colors">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-wash-blue/10 rounded-lg">
              <h3 className="font-semibold text-wash-blue-dark mb-2">Demo Credentials:</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Admin:</strong> admin@carwash.com / admin123</p>
                <p><strong>User:</strong> john.smith@email.com / password123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center space-x-8 text-white/80">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            <span className="text-sm">Professional Service</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            <span className="text-sm">Eco-Friendly</span>
          </div>
        </div>
      </div>
    </div>
  );
};
