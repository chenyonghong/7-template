import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        meta: {

        },
        children: [
            {
                path: '',
                name: 'Index',
                component: ()=> import('@/views/main.vue')
            },
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/element-components/table.vue')
            },
            {
                path: 'form',
                name: 'Form',
                component: () => import('@/views/element-components/form.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: ()=> import('@/views/login.vue'),
        meta: {

        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router