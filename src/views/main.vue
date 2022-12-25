<template>
    <div>

            <input v-model="value" @mouseenter="mouseEnter" @mouseleave="mouseLeave" />
        
        <span v-show="show" @click="click" class="span-icon">x</span>
    </div>
    
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    const value = ref('')
    const show = ref(true)
const mouseEnter = e=> {
    console.log(e)
    if (e.relatedTarget.className === 'span-icon') {
        console.log('stop');
        return;
    }
    show.value = true;
}
const mouseLeave = e=> {
    console.log(e)
    if (e.relatedTarget.className === 'span-icon') {
        console.log('stop');
        return;
    }
    show.value = false;
}
const click=(e)=> {
    console.log('click');
    value.value = '';
}
</script>
<style scoped lang="less">
div {
    position: relative;
    span {
        position: absolute;
        right: 10px;
        top: 0;
        display: inline-block;
        width: 20px;
        height: 20px;
        // pointer-events: none;
        cursor: pointer;
    }
}
</style>

