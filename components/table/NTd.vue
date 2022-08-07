<script setup>
    import { ref } from 'vue';
    import useVirtualId from './../utils/virtual-id.js'

    const vid = useVirtualId()
    const root = ref(null)
    const prop = defineProps(["rules"])

</script>

<template>
    <div ref="root" :v-id="vid">
    </div>
    <NScopedStyle v-if="prop.rules" :v-id="vid" :rules="prop.rules" />
</template>