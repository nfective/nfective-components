<script setup>
    import { ref } from 'vue';
    import useVirtualId from './../utils/virtual-id.js'

    const vid = useVirtualId()
    const root = ref(null)
    const prop = defineProps([
        "rules",
        "items", 
        "fields", 
        "ignore-fields", 
        "isBusy", 
        "showSelectableRows", 
        "showFooter",
        "selectMode"])

    const slots = useSlots()

</script>

<template>
    <div ref="root" :v-id="vid">
        <table>
        </table>
    </div>
    <NScopedStyle v-if="prop.rules" :v-id="vid" :rules="prop.rules" />
</template>