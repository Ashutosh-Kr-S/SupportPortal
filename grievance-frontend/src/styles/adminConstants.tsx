import { LayoutDashboard, FilePlus, Clock, CheckCircle, Eye, XCircle, LogOut, Users } from 'lucide-react';

export const AdminNavItems = [
    {
        title: 'Dashboard',
        href: '/grievance/dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'New Grievance',
        href: '/grievance/new',
        icon: <FilePlus className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Pending Grievance',
        href: '/grievance/pending',
        icon: <Clock className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Resolve Grievance',
        href: '/grievance/resolve',
        icon: <CheckCircle className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Review Grievance',
        href: '/grievance/review',
        icon: <Eye className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Reject Grievance',
        href: '/grievance/reject',
        icon: <XCircle className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Admins List',
        href: '/adminlist',
        icon: <Users className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Logout',
        href: '/logout',
        icon: <LogOut className="w-5 h-5" />,
        position: 'top',
    },
];
