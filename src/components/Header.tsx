
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const Header: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-wash-blue/20 bg-white/60 backdrop-blur-sm px-6 py-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-wash-blue hover:bg-wash-blue/10" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-wash-blue/20 bg-white/80 focus:outline-none focus:ring-2 focus:ring-wash-blue/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-wash-blue" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-wash-blue text-white">
              {user?.name.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-wash-blue-dark">{user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'Administrator' : 'Customer'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
