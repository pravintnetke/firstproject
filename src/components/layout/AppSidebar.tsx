import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileQuestion,
  GraduationCap,
  Users,
  Settings,
  BarChart3,
  Shield,
  Calendar,
  BookOpen
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
  useSidebar
} from '@/components/ui/sidebar';

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Question Bank', url: '/admin/questions', icon: FileQuestion },
  { title: 'Exam Management', url: '/admin/exams', icon: BookOpen },
  { title: 'Candidates', url: '/admin/candidates', icon: Users },
  { title: 'Batches', url: '/admin/batches', icon: GraduationCap },
  { title: 'Proctoring', url: '/admin/proctoring', icon: Shield },
  { title: 'Reports', url: '/admin/reports', icon: BarChart3 },
  { title: 'Calendar', url: '/admin/calendar', icon: Calendar },
  { title: 'Settings', url: '/admin/settings', icon: Settings }
];

const candidateMenuItems = [
  { title: 'Dashboard', url: '/candidate', icon: LayoutDashboard },
  { title: 'My Exams', url: '/candidate/exams', icon: BookOpen },
  { title: 'Results', url: '/candidate/results', icon: BarChart3 },
  { title: 'Profile', url: '/candidate/profile', icon: Users }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine if we're in admin or candidate section
  const isAdmin = currentPath.startsWith('/admin');
  const menuItems = isAdmin ? adminMenuItems : candidateMenuItems;
  const sectionTitle = isAdmin ? 'Administration' : 'Student Portal';
  
  const isActive = (path: string) => {
    if (path === '/admin' || path === '/candidate') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };
  
  const getNavClassName = (path: string) => {
    const baseClasses = 'w-full justify-start transition-colors';
    return isActive(path) 
      ? `${baseClasses} bg-primary text-primary-foreground` 
      : `${baseClasses} hover:bg-accent hover:text-accent-foreground`;
  };

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-gradient-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 text-xs uppercase tracking-wider">
            {isCollapsed ? '' : sectionTitle}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className={`${isCollapsed ? 'h-5 w-5' : 'mr-3 h-4 w-4'}`} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}