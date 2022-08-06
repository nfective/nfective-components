<script setup>
    import { ref } from 'vue';
    import useVirtualId from './../utils/virtual-id.js'
    import NScopedStyle from '../utils/NScopedStyle.vue';

    const vid = useVirtualId()

    const styles = ref(`body { background-color: black } html { height: 100% } .css { color: red } #id { font-size: blue } [data=^arch] { font-family: Arial } [range] { something } input[type="number"] { font-weight: bold; font-size: 12em }`)

    const show = ref(false)

    function showStyle() {
        show.value = !show.value
    }

    function changeStyle() {
        styles.value = "body { background-color: red }"
    }

</script>

<template>
    <div ref="root" :v-id="vid">
        <button @click="showStyle">Show Style</button>
        <button @click="changeStyle">Change Style</button>
    </div>
    <NScopedStyle v-if="show" :v-id="vid" :rules="styles"></NScopedStyle>
</template>