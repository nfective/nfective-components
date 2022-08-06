<script setup>
    import { ref } from 'vue';
    import useVirtualId from './../utils/virtual-id.js'

    const vid = useVirtualId()
    const root = ref(null)

</script>

<template>
    <div ref="root" :v-id="vid">
    </div>
</template>