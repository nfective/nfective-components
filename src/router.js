import { createRouter, createWebHistory } from 'vue-router'

import Landing from '#/Landing.vue'
import Documentation from '#/Documentation.vue'

let routes = [
    {
        path: '/',
        component: Landing
    },
    {
        path: '/docs',
        component: Documentation
    }
]

let router = createRouter({
    history: createWebHistory(),
    routes
})

export default router