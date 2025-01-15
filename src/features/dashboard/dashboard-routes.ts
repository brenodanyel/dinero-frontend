import { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: () => import('@/layouts/main-layout.vue'),
    meta: { title: 'Home' },
    redirect: { name: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard' },
        component: () => import('@/features/dashboard/pages/dashboard-page.vue'),
      },
    ],
  },
]
