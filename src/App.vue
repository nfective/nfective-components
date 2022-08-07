<script setup>
    import { ref } from 'vue';
    import useVirtualId from '@/utils/virtual-id.js'
    import NApp from "@/layout/NApp.vue";
    import NScopedStyle from '../components/utils/NScopedStyle.vue';

    const vid = useVirtualId()
    const root = ref(null)

    const rules = `div { background-color: black }` 
</script>

<template>
  <NApp ref="root" :v-id="vid" :rules="rules">
      <RouterView />
  </NApp>
</template>