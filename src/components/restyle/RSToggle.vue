<template>
    <div class="rs-toggle">
        <a href="javascript:void(0)" class="rs-button-icon" :class="{'active' : model === 0}" @click="model = 0">
            <span>
                <slot name="icon-start"/>
            </span>
        </a>
        <a href="javascript:void(0)" class="rs-button-icon" :class="{'active' : model === 1}" @click="model = 1">
            <span>
                <slot name="icon-end"/>
            </span>
        </a>
    </div>
</template>

<script>
    export default {
        name: "RSToggle",

        model: {
            prop: 'active',
            event: 'change'
        },

        props: {
            active: {
                default: 0,
                type: Number,
                required: false
            }
        },

        computed: {
            model: {
                get() {
                    return this.active
                },
                set(active) {
                    this.$emit('change', active)
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import '../../assets/styles/modules/restyle/toggle.styl'
</style>