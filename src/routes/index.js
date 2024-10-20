import asyncComponentLoader from '../utils/loader/index';
import { MessageCircle, Users, Star } from 'lucide-react';

export const tablistRoutes = [
  {
    component: asyncComponentLoader(() => import('../pages/tabs/Channels')),
    path: '/',
    title: 'Channels',
    icon: Users
  },
  {
    component: asyncComponentLoader(() => import('../pages/tabs/Chats')),
    path: '/chats',
    title: 'Chats',
    icon: MessageCircle
  },
  {
    component: asyncComponentLoader(() => import('../pages/tabs/Rewards')),
    path: '/rewards',
    title: 'Rewards',
    icon: Star
  }
];

export const pagesRoutes = [
  {
    component: asyncComponentLoader(() => import('../pages/Connect')),
    path: '/connect',
    title: 'Connect'
  },
  {
    component: asyncComponentLoader(() => import('../pages/Profile')),
    path: '/profile',
    title: 'Profile'
  },
  {
    component: asyncComponentLoader(() => import('../pages/Invite')),
    path: '/invite',
    title: 'Connect'
  },
  // ["NotFound"]: {
  //   component: asyncComponentLoader(() => import('../pages/NotFound')),
  //   path: '*',
  // },
]