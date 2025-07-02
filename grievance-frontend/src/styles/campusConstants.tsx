import { LayoutDashboard, FilePlus, Clock, CheckCircle, Eye, XCircle, LogOut, Users } from 'lucide-react';

export const CampusAdminNavItems = [
    {
        title: 'Dashboard',
        href: '/campus/admin/dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'New Grievance',
        href: '/campus/admin/new',
        icon: <FilePlus className="w-5 h-5" />,
        position: 'top',
    },
    // {
    //     title: 'Pending Grievance',
    //     href: '/campus/admin/pending',
    //     icon: <Clock className="w-5 h-5" />,
    //     position: 'top',
    // },
    {
        title: 'Resolve Grievance',
        href: '/campus/admin/resolve',
        icon: <CheckCircle className="w-5 h-5" />,
        position: 'top',
    },
    {
        //redirect hoke aaya hai, ab usko review ke liye use karenge
        title: 'Review Grievance',
        href: '/campus/admin/review',
        icon: <Eye className="w-5 h-5" />,
        position: 'top',
    },
    // {
    //     title: 'Redirect Grievance',
    //     href: '/campus/admin/redirect',
    //     icon: <Eye className="w-5 h-5" />,
    //     position: 'top',
    // },
    {
        title: 'Reject Grievance',
        href: '/campus/admin/reject',
        icon: <XCircle className="w-5 h-5" />,
        position: 'top',
    },
    {
        title: 'Logout',
        href: '/logout',
        icon: <LogOut className="w-5 h-5" />,
        position: 'top',
    },
];


