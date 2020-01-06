<template>
    <label class="rs-radio-button-label" @click="model = currentValue">
        <span class="rs-radio-button" :class="{'active' : model === currentValue}">
            <span class="rs-radio-button-tick-parent">
                <img src="/public/images/public/icons/ic-circle-solid.svg" alt="" />
            </span>
        </span>
        <span :class="labelClass" v-html="label"></span>
    </label>
</template>

<script>
    export default {
        name: "RSRadioButton",

        model: {
            prop: 'value'
        },

        props: {
            currentValue: {
                default: null
            },
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
                default: true
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
    @import "../../assets/styles/modules/restyle/radio_button.styl"
</style>