import asyncComponentLoader from '../utils/loader/index';
import { MessageCircle, Users, Star } from 'lucide-react';

const routes = [
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
  // ["NotFound"]: {
  //   component: asyncComponentLoader(() => import('../pages/NotFound')),
  //   path: '*',
  // },
];

export default routes;