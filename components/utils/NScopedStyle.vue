<!-- Takes id and styles string
     Parses each style segment and creates scoped styles for the segment in a single scoped element style block
     Returns an object with reference to the style block and other methods, such as; append, clear, destroy -->

<script>
    import { h, ref, unref, watch } from 'vue'

    export default {
        props: ['v-id', 'rules'],
        setup(prop) {

            const css = ref("")

            watch(() => prop.rules, () => { parseRules(prop.vId, prop.rules) })

            const scopeRules = (vid, styles) => {
                if(vid && styles && Array.isArray(styles) && styles.length > 0) {
                    return styles.map(rule => {
                        if(rule.includes("html") || rule.includes("body")) return `${ rule }`
                        return `[v-id="${ vid }"] ${ rule }`
                    })
                }
                return styles
            }

            const delimitRulesBlocks = (styles) => {
                let css = styles.split(/}/gmi)
                css.pop()
                return css.map(rule => {
                    return (rule += '}').trim()
                })
            }

            const parseRules = (vid, rules) => {
                scopeRules(vid, delimitRulesBlocks(rules)).forEach(element => {
                    css.value += `${ element } `
                })
            }

            setTimeout(() => { parseRules(prop.vId, prop.rules) }, 0)

            return () => {
                return h('style', `${ unref(css) }`)
            }
        }
    }

</script>

