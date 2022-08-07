<script setup>
    import { ref } from 'vue';
    import useVirtualId from '@/utils/virtual-id.js'
    import NApp from "@/layout/NApp.vue";
    import NScopedStyle from '../components/utils/NScopedStyle.vue';

    const root = ref(null)

    const rules = '' 
</script>

<template>
  <NApp ref="root" :rules="rules">
      <RouterView />
  </NApp>
</template>