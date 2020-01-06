<template>
    <div class="rs-alert" :class="[`rs-alert-${color}`]">
        <span v-if="icon !== ''" class="rs-alert--icon me-10">
            <img :src="icon" alt="" />
        </span>
        <span class="rs-alert--text" :class="textClass"><slot /></span>
    </div>
</template>

<script>
    export default {
        name: "RSAlert",

        props: {
            color: {
                default: 'primary',
                type: String,
                required: false
            },
            icon: {
                default: '',
                type: String,
                required: false
            },
            textClass: {
                default: '',
                type: String,
                required: false
            },
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/alert.styl"
</style>