<script setup>
    import { ref } from 'vue';
    import useVirtualId from './../utils/virtual-id.js'

    const vid = useVirtualId()

</script>

<template>
    <div :v-id="vid">
    </div>
</template>