<template>
    <li v-for="(menu, index) in menus" :key="menu.name" :class="[
        'menu-list-item',
        isMenuActive(menu)
            ? 'active'
            : '',
    ]" @mouseleave="handleMouseout(index)">
        <div class="menu-item-wrapper" @click.stop="handleMenuClick(menu, index)" @mouseenter="handleMouseover(index)"
            >
            <span class="icon-left">
                <i :class="['iconfont', menu.meta.iconClass]" />
            </span>
            <span class="menu-name">{{ menu.meta.title }}</span>
            <span class="icon-right" v-if="hasChild(menu)" @click.stop="handleSubCollapse(index)">
                <i class="iconfont icon-a-jiantoushang" v-if="menu.meta!.expand" />
                <i class="iconfont icon-a-jiantouxia" v-else />
            </span>
        </div>
        <ul :class="['sub-menu-list', menu.meta!.expand === true ? 'expand' : '']" v-if="hasChild(menu)">
            <item :menus="menu.children" :path="getFullPath(menu)" :key="getFullPath(menu)" />
        </ul>
    </li>
</template>
<script setup lang="ts">
import { PropType, toRef, ref, reactive, computed } from "vue";
import { RouteRecordRaw, useRouter, useRoute, RouteRecord, RouteRecordNormalized } from "vue-router";
import { useMenuStore } from "@/store";
import { storeToRefs } from "pinia";

const props = defineProps({
    menus: {
        type: Array,
        default: () => [] as Array<PropType<RouteRecordRaw>>,
    },
    path: {
        type: String,
        default: "",
    },
});

const menus: Array<RouteRecordRaw> = ref(
    props.menus.filter((menu) => menu.meta!.displayOnMenu !== false)
);

const menuStore: any = useMenuStore();
const { activeRoute, isCollapse } = storeToRefs(menuStore);

function isMenuActive(menu) {
    if (hasOnlyOneChild(menu) && activeRoute.value.meta.displayOnMenu === false) {
        const pathArr = activeRoute.value.path.split('/')
        console.log(pathArr, getFullPath(menu))
        return pathArr.slice(0, pathArr.length - 1).join('/') === getFullPath(menu)
    }
    if (!isParentRouter(menu)) return activeRoute.value.path === getFullPath(menu)

    return false
}

// 菜单点击
const route = useRoute();
const router = useRouter();
const allRoutes = computed(() => router.getRoutes());
const handleMenuClick = (menu: RouteRecordRaw, index: number) => {
    if (hasChild(menu)) {
        console.log(menu, index);
        handleSubCollapse(index);
    } else {
        // console.log(route, router);
        const matchedRouter = getRouter(getFullPath(menu));
        // console.log('matchedRouter: ', matchedRouter)
        menuStore.activeRoute = matchedRouter
        // router.push({ name: menu.name })
        router.push(getFullPath(menu));
    }
};
function handleMouseover(index) {
    if (!isCollapse.value) return
    handleSubCollapse(index, true);
}
function handleMouseout(index) {
    if (!isCollapse.value) return
    handleSubCollapse(index, false);
}
// 获取路由全路径
function getFullPath(menu: RouteRecordRaw) {
    // 子菜单path为空
    if (!menu.path) return props.path;
    // 只有一个子菜单，路径为子菜单路径
    if (hasOnlyOneChild(menu)) {
        const childPath = getChildren(menu)[0].path;
        let path = (props.path ? props.path + "/" : "") + menu.path
        if (childPath) path += '/' + childPath
        return path
    }
    // 默认路径
    return (props.path ? props.path + "/" : "") + menu.path;
}

function getRouter(fullPath: string) {
    return allRoutes.value.find((r) => r.path === fullPath);
}

function isParentRouter(router) {
    return hasChild(router);
}

function handleSubCollapse(index: number, flag) {
    const isExpand = menus.value[index].meta.expand;
    menus.value[index].meta!.expand = flag !== undefined ? flag : !isExpand;
}

// 子菜单
function hasChild(menu: RouteRecordRaw) {
    return (
        menu.children &&
        menu.children.filter((child) => child.meta!.displayOnMenu !== false)
            .length > 1
    );
}
function hasOnlyOneChild(menu: RouteRecordRaw) {
    return (
        menu.children &&
        menu.children.filter((child) => child.meta!.displayOnMenu !== false)
            .length === 1
    );
}
function getChildren(menu: RouteRecordRaw) {
    if (!menu.children) return [];
    return menu.children.filter((child) => child.meta!.displayOnMenu !== false);
}
</script>
<style scoped lang="less">
@import "@/styles/css/layout.less";
</style>
