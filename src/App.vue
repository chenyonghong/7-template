<template>
  <!-- <router-view /> -->
  <layout>
  </layout>
  <!-- <div class="left" style="display: flex;flex-direction: column">
    <router-link to="/user">用户</router-link>
    <router-link to="/user/role">角色</router-link>
    <router-link to="/user/role/edit">角色编辑</router-link>
    <router-link to="/user/organization">组织</router-link>
  </div>-->
  <!-- <div class="right">
    <router-view />
  </div> -->
</template>

<script setup lang="ts">
import layout from "@/layout/index.vue";
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
