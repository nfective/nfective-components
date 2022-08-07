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

            const delimitRules = (vid, styles) => {
                let rules = styles.split(/([\.#a-z0-9:\-()~ +\*,\[\]\"'=|^$>]+)\s+{/gmi)
                rules.shift()
                let delimitedRules = rules.map((element, i) => {
                    let separateRules;
                    if(i % 2 == 0) element = element.trim().toLowerCase()
                    if(element.includes('html') || element.search(/^body$/gmi) > -1 || element.includes('::root')) return element
                    // If statements only apply to selectors because they are illegal characters in rule sets
                    if(element.includes(',')) {
                        separateRules = element.split(',')
                        return separateRules.map(e => { 
                            return `${ e.trim() }[vid="${ vid }"]`
                        })
                    }
                    if(element.includes(']')) {
                        const bracket = element.indexOf(']')
                        let firstRule = element.substring(0, bracket + 1)
                        let secondRule = element.substring(bracket + 1)
                        return `${ firstRule.replace(' ', '') }[vid="${ vid }"]${ secondRule ? secondRule : '' }`
                    }
                    if(element.includes('>') || element.includes('~') || element.includes('+')) {
                        const regex = new RegExp(/^[\.#a-z0-9:\-()\*,\[\]\"'=|^$]+/gmi)
                        regex.test(element)
                        let firstSegment = element.substring(0, regex.lastIndex)
                        let secondSegment = element.substring(regex.lastIndex)
                        return `${ firstSegment }[vid="${ vid }"]${ secondSegment }`
                    }
                    if(i % 2 == 0) {
                        // If . # or space separate the rules and only apply the attribute to the first segment
                        if(element.includes(' ')) {
                            const space = element.indexOf(' ')
                            let firstSegment = element.substring(0, space + 1)
                            let secondSegment = element.substring(space + 1)
                            return `${ firstSegment.replace(' ', '') }[vid="${ vid }"]${ secondSegment ? ` ${ secondSegment }` : '' }`
                        }
                        if(element.search(/[a-z]+\.[a-z]+/gmi) > -1) {
                            if(element.charAt(0) == '.') {
                                let secondPeriod = element.indexOf('.', 1)
                                let firstSegment = element.substring(0, secondPeriod)
                                let secondSegment = element.substring(secondPeriod)
                                return `${ firstSegment }[vid="${ vid }"]${ secondSegment }`
                            }
                            let period = element.indexOf('.')
                            let firstSegment = element.substring(0, period)
                            let secondSegment = element.substring(period)
                            return `${ firstSegment }[vid="${ vid }"]${ secondSegment }`
                        }
                        //console.log(element)
                        if(element.indexOf('#', 1) > -1) {
                            let hash = element.indexOf('#')
                            let firstSegment = element.substring(0, hash)
                            let secondSegment = element.substring(hash)
                            return `${ firstSegment }[vid="${ vid }"]${ secondSegment }`
                        }
                        // Handles the rest of the conditions
                        return `${ element }[vid="${ vid }"]`
                    }
                    return `{${ element }`
                })
                return delimitedRules
            }

            const mergeRules = (rules) => {
                if(rules.length == 0) return []
                let mergedRules = []
                rules.forEach((rule, i) => {
                    if(i % 2 != 0) return;
                    // Split array into two rules
                    if(Array.isArray(rule)) {
                        rule.forEach(selector => {
                            mergedRules.push(`${ selector } ${ rules[i + 1] }`)
                        })
                    }
                    mergedRules.push(`${ rule } ${ rules[i + 1] }`)
                })
                return mergedRules
            }

            const parseRules = (vid, rules) => {
                vid = vid ? vid : ''
                let delimitedRules = delimitRules(vid, rules)
                css.value = mergeRules(delimitedRules)
            }

            setTimeout(() => { parseRules(prop.vId, prop.rules) }, 0)

            return () => {
                return h('style', `${ unref(css) }`)
            }
        }
    }

</script>

