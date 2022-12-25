import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import EmptyLayout from "@/layout/emptyLayout.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: ()=> import('@/views/main.vue'),
        meta: {
            title: '首页',
            iconClass: 'icon-zhuye'
        }
    },
    {
        path: '/user',
        name: 'UserManage',
        component: EmptyLayout,
        meta: {
            title: '用户管理',
            iconClass: 'icon-daigoutong'
        },
        children: [
            {
                path: '',
                name: 'User',
                meta: {
                    title: '用户管理',
                    iconClass: 'icon-customer'
                },
                component: () => import('@/views/element-components/table.vue')
            },
            {
                path: 'role',
                name: 'Role',
                meta: {
                    title: '角色管理',
                    iconClass: 'icon-fuzeren'
                },
                component: EmptyLayout,
                children: [
                    {
                        path: '',
                        name: 'RoleList',
                        meta: {
                            title: '角色管理-列表',
                            iconClass: 'icon-fuzeren'
                        },
                        component: () => import('@/views/user-manage/role/index.vue')
                    },
                    {
                        path: 'edit',
                        name: 'RoleEdit',
                        meta: {
                            title: '角色管理-编辑',
                            displayOnMenu: false
                        },
                        component: () => import('@/views/user-manage/role/edit.vue')
                    }
                ]
            },
            {
                path: 'organization',
                name: 'Organization',
                meta: {
                    title: '组织管理',
                    iconClass: 'icon-shangquanguanli'
                },
                component: () => import('@/views/element-components/form.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue'),
        meta: {
            displayOnMenu: false
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export { routes }

export default router