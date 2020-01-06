<template>
    <label class="rs-check-box-label" @click.exact="model = !model">
        <span class="rs-check-box" :class="{'active' : model}">
            <span class="rs-check-box-tick-parent">
                <img src="/public/images/public/icons/ic-check-solid.svg" alt="" />
            </span>
        </span>
        <span :class="labelClass" v-html="label"></span>
    </label>
</template>

<script>
    export default {
        name: "RSCheckBox",

        model: {
            prop: 'value'
        },

        props: {
            label: {
                default: '',
                type: String,
                required: false
            },
            labelClass: {
                default: '',
                type: String,
                required: false
            },
            name: {
                default: '',
                type: String,
                required: false
            },
            rules: {
                default: null,
            },
            value: {
                default: false,
                type: Boolean,
                required: false
            },
        },

        computed: {
            model: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/checkbox.styl"
</style>