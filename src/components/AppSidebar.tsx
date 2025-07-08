
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Car,
  Calendar,
  Settings,
  Bell,
  Home,
  CreditCard,
  User,
  MessageSquare,
  LogOut,
  Droplets
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: BarChart3 },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Cars', url: '/admin/cars', icon: Car },
  { title: 'Appointments', url: '/admin/appointments', icon: Calendar },
  { title: 'Notifications', url: '/admin/notifications', icon: Bell },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

const userMenuItems = [
  { title: 'Dashboard', url: '/user/dashboard', icon: Home },
  { title: 'My Cars', url: '/user/cars', icon: Car },
  { title: 'Appointments', url: '/user/appointments', icon: Calendar },
  { title: 'Subscription', url: '/user/subscription', icon: CreditCard },
  { title: 'Profile', url: '/user/profile', icon: User },
  { title: 'Feedback', url: '/user/feedback', icon: MessageSquare },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { isAdmin, logout } = useAuth();
  
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-wash-blue text-white shadow-lg" 
      : "hover:bg-wash-blue/10 hover:text-wash-blue transition-all duration-200";
  };

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} border-r border-wash-blue/20 bg-white/80 backdrop-blur-sm`}>
      <SidebarHeader className="border-b border-wash-blue/20 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-wash-blue to-wash-cyan">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-wash-blue-dark">AquaClean</h2>
              <p className="text-xs text-muted-foreground">Car Wash Pro</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-wash-blue-dark font-semibold">
            {!collapsed && (isAdmin ? 'Admin Panel' : 'User Panel')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${getNavClass(item.url)}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-wash-blue/20 p-4">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && 'Logout'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
