import { LayoutDashboard, Upload, History, LogOut, Search, Files } from 'lucide-react';

export const NavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Lodge Grievance',
        href: '/lodge',
        icon: <Files className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Grievance History',
        href: '/history',
        icon: <History className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Logout',
        href: '/logout',
        icon: <LogOut className="w-5 h-5" />,
        position: 'top',
    },
];