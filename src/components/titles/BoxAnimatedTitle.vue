<template>
    <h3 class="box-animated-title d-flex" :class="{'active ps-30': active}">
        <slot/>
    </h3>
</template>

<script>
    export default {
        name: "BoxAnimatedTitle",

        props: {
            active: {
                default: false,
                type: Boolean,
            },
            tag: {
                default: 'h3',
                type: String,
            }
        }
    }
</script>

<style lang="stylus">
    .box-animated-title
        position relative
        &:before
            content ''
            position absolute
            bottom calc(50% - 1px)
            height 3px
            width 18px
            background-color #ff0e1f
            opacity 0
            -webkit-transition .3s ease
            -moz-transition .3s ease
            transition .3s ease
            / .ltr &
                left -15px
                -webkit-transform skewX(15deg)
                -moz-transform skewX(15deg)
                transform skewX(15deg)
            / .rtl &
                right -15px
                -webkit-transform skewX(-15deg)
                -moz-transform skewX(-15deg)
                transform skewX(-15deg)
        &.active
            &:before
                opacity 1
                -webkit-transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s
                -moz-transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s
                transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s
                / .ltr &
                    left 0
                / .rtl &
                    right 0
</style>
