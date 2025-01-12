import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'main',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: {
        title: 'Dashboard',
      },
    },
  ],
})

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}
