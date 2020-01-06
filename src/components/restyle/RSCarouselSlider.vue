<template>
    <div class="rs-carousel-slider">
        <ul class="rs-carousel-slider--viewport">
            <li class="mb-0 p-0" v-for="item of finalItems">
                <slot name="item-adapter" :style="{width: minWidthCurrentItem}" :item="item"/>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "RSCarouselSlider",

        model: {
            prop: 'currentItem',
            event: 'change',
        },

        props: {
            currentItem: {
                default: 0,
                type: Number
            },
            duration: {
                default: 5000,
                type: Number,
            },
            items: {
                default: () => ([]),
                type: Array,
            },
            minWidthCurrentItem: {
                default: '200px',
                type: String,
            }
        },

        computed: {
            model: {
                get() {
                    return this.currentItem
                },
                set(currentItem) {
                    this.$emit('change', currentItem)
                }
            },
            finalItems() {
                return this.items
            }
        },
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/carousel_slider.styl"
</style>