<script setup>
    import { useSlots } from 'vue';
    import useVirtualId from './../utils/virtual-id.js'

    const vid = useVirtualId()

    const prop = defineProps(["items", 
        "fields", 
        "ignore-fields", 
        "isBusy", 
        "comparer", 
        "showSelectableRows", 
        "showFooter",
        "selectMode"])

    const slots = useSlots()

    setTimeout(() => { console.log(slots) })

</script>

<template>
    <div :v-id="vid">
        <table>
        </table>
    </div>
</template>