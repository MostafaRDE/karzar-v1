<template>
    <button class="btn" :class="classList">
        <rs-overlay-loading :loading="loading" :type="loadingType" v-if="loading" />

        <span v-if="trapezeBoth || reverseTrapezeBoth || trapezeStart || reverseTrapezeStart"
              class="btn-trapeze-start-side"
              :class="{'btn-trapeze-top': trapezeBoth || trapezeStart, 'btn-trapeze-bottom': reverseTrapezeBoth || reverseTrapezeStart}"></span>
        <span class="btn-text d-flex justify-content-center align-items-center">
            <slot v-if="loading === false" />
        </span>
        <span v-if="trapezeBoth || reverseTrapezeBoth || trapezeEnd || reverseTrapezeEnd"
              class="btn-trapeze-end-side"
              :class="{'btn-trapeze-top': trapezeBoth || trapezeEnd, 'btn-trapeze-bottom': reverseTrapezeBoth || reverseTrapezeEnd}"></span>
        <span v-if="trapezeBoth || reverseTrapezeBoth || trapezeEnd || reverseTrapezeEnd"
              class="btn-trapeze-end-side"
              :class="{'btn-trapeze-top': trapezeBoth || trapezeEnd, 'btn-trapeze-bottom': reverseTrapezeBoth || reverseTrapezeEnd}"></span>
    </button>
</template>

<script>
    export default {
        name: "RSButton",

        props: {
            color: {
                default: '',
                type: String,
                required: false
            },
            loading: {
                default: false,
                type: Boolean,
                required: false
            },
            loadingType: {
                default: 'default',
                type: String,
                required: false
            },
            reverseTrapezeBoth: {
                default: false,
                type: Boolean,
            },
            reverseTrapezeEnd: {
                default: false,
                type: Boolean,
            },
            reverseTrapezeStart: {
                default: false,
                type: Boolean,
            },
            trapezeBoth: {
                default: false,
                type: Boolean,
            },
            trapezeEnd: {
                default: false,
                type: Boolean,
            },
            trapezeStart: {
                default: false,
                type: Boolean,
            },

            // ---------------------------------------------

            glow: {
                default: false,
                type: Boolean,
            },
            small: {
                default: false,
                type: Boolean,
            },
            xsmall: {
                default: false,
                type: Boolean,
            },
            solid: {
                default: false,
                type: Boolean,
            },
            solidShadow: {
                default: false,
                type: Boolean,
            },
            transparent: {
                default: false,
                type: Boolean,
            },
        },

        computed: {
            classList() {
                return {
                    'glow': this.glow,
                    'small': this.small,
                    'x-small': this.xsmall,
                    'solid': this.solid,
                    'solid-btn-shadow': this.solidShadow,
                    'transparent': this.transparent,
                }
            }
        },
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/button.styl"
</style>
