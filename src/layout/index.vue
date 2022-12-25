<template>
    <div class="page-wrapper">
        <nav :class="{ 'menu-wrapper': true, collapse: isCollapse }">
            <ul class="menu-list">
                <!-- <li v-for="menu in menus" :key="menu.path"
                    :class="['menu-list-item', currentRoute.path === menu.path ? 'active' : '']"
                    @click="handleRoute(menu)">
                    <span class="icon-left">
                        <i :class="['iconfont', menu.meta.iconClass]" />
                    </span>
                    {{ menu.meta.title }}
                    <span class="icon-right" v-if="menu.children?.length">
                        <i class="iconfont icon-a-jiantouxia" />
                    </span>
                </li> -->
                <menu-item :menus="menus" />
            </ul>
            <span class="menu-float-collapse" @click="handleCollpse"><i class="iconfont icon-shousuo"></i></span>
        </nav>

        <section class="content-wrapper">
            <router-view v-slot="{Component, route}">
                <component v-if="Component" :is="Component" :key="route.name" />
            </router-view>
            
        </section>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, markRaw } from "vue";
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";
import { routes } from "@/router";
import menuItem from './item.vue';
import { useMenuStore } from "../store";
import { storeToRefs } from "pinia";

const menuStore:any = useMenuStore()
const { activeRoute, isCollapse } = storeToRefs(menuStore)
const route = useRoute()
const router = useRouter()
if (!activeRoute.value) {
    // const currentPath = route.path;
    const hash = location.hash.slice(1);
    activeRoute.value = getRouter(hash)
    // menuStore.$patch({
    //     activeRoute: router.currentRoute.value
    // })
}

const menus = routes.filter((route: RouteRecordRaw) => route.meta!.displayOnMenu !== false)
menus.forEach((menu: RouteRecordRaw) => {
    // if (hasChild(menu)) {
    //     menu.meta!.expand = false
    // }
    setMenuExpand(menu, activeRoute.value.path)
})
function setMenuExpand(menu: RouteRecordRaw, path: string) {
    if (path.startsWith(menu.path) && menu.children?.length) {
        menu.meta.expand = true
    } else {
        menu.meta.expand = false
    }
    if (menu.children && menu.children.length) {
        menu.children.forEach(subMenu => {
            setMenuExpand(subMenu, path.slice(menu.path.length + 1))
        })
    }
}

function getRouter(fullPath) {
    return router.getRoutes().find(r=> r.path === fullPath) || router.getRoutes()[0]
}


// function findRoute(path: string, routeList: Array<RouteRecordRaw>): RouteRecordRaw {
//     debugger
//     const parentPath = path.split('/')[0], childPath = path.split('/')[1];

//     const currentRoute: RouteRecordRaw | undefined = routeList.find(route => route.path === parentPath)

//     if (!currentRoute) {
//         return routeList[0]
//     }
//     if (childPath && currentRoute.children) {
//         return findRoute(childPath, currentRoute.children)
//     } else {
//         return currentRoute
//     }
// }

function handleCollpse() {
    isCollapse.value = !isCollapse.value;
}
</script>
<style scoped lang="less">
@import '@/styles/css/layout.less';

// .menu-wrapper {
//     width: 200px;
//     transition: width .5s linear;

//     &.collapse {
//         width: 50px;
//     }
// }
</style>

