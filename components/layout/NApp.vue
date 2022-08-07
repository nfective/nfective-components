<script setup>
    import { ref } from 'vue';
    import { useResizeObserver } from '@vueuse/core'
    import useVirtualId from './../utils/virtual-id.js'
    import NScopedStyle from '../utils/NScopedStyle.vue';

    const vid = useVirtualId()
    const root = ref(null)
    const prop = defineProps(["rules"])
    const height = ref(null)
    const width = ref(null)
    
    const appHeader = ref(null)
    const appLeftSidebar = ref(null)
    const appRightSidebar = ref(null)
    const appBody = ref(null)
    const appFooter = ref(null)

    useResizeObserver(root, (entries) => {
        const entry = entries[0]
        height.value = entry.contentRect.height
        width.value = entry.contentRect.width
    })

    //const emit = defineExpose("register")

</script>

<template>
    <div ref="root" :v-id="vid">
        <slot />
    </div>
    <NScopedStyle v-if="prop.rules" :v-id="vid" :rules="prop.rules" />
</template>