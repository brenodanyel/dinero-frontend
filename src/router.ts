import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: { title: 'Home' },
      redirect: { name: 'dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: { title: 'Dashboard' },
          component: () => import('@/features/dashboard/pages/DashboardPage.vue'),
        },
      ],
    },
  ],
})

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}
