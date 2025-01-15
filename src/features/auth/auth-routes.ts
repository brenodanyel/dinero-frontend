import { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: 'auth',
    name: 'auth',
    meta: { title: 'Autenticação' },
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { title: 'Login' },
        component: () => import('./pages/login.vue'),
      },
    ],
  },
]
