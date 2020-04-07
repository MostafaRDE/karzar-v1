<template>
    <!-- Slider main container -->
    <div class="rs-carousel-slider container">
        <swiper ref="mySwiper"
                :options="swiperOptions"
                :auto-update="true"
                :auto-destroy="true"
                :delete-instance-on-destroy="true"
                :cleanup-styles-on-destroy="true"
                class="rs-carousel-slider--viewport">
            <!-- Slides -->
            <swiper-slide v-for="(item, index) of finalItems" :key="`carousel-item-${index}`" class="swiper-slide">
                <slot name="item-adapter" :style="{width: minWidthCurrentItem}" :item="item"/>
            </swiper-slide>
        </swiper>
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
            autoUpdate: {
                default: false,
                type: Boolean,
            },
            breakpoints: {
                default: () => ({}),
                type: Object,
            },
            centeredSlides: {
                default: false,
                type: Boolean,
            },
            currentItem: {
                default: 0,
                type: Number
            },
            delay: {
                default: 2500,
                type: Number,
            },
            disableOnInteraction: {
                default: false,
                type: Boolean,
            },
            freeMode: {
                default: false,
                type: Boolean,
            },
            items: {
                default: () => ([]),
                type: Array,
            },
            loop: {
                default: true,
                type: Boolean,
            },
            loopedSlides: {
                default: 1,
                type: Number,
            },
            minWidthCurrentItem: {
                default: '200px',
                type: String,
            },
            slidesPerView: {
                default: 1,
                type: Number,
            },
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
            },
            swiper() {
                return this.$refs.mySwiper.$swiper
            },
            swiperOptions() {
                let vm = this;
                return {
                    // slidesPerView: vm.slidesPerView,
                    // centeredSlides: vm.centeredSlides,
                    //
                    loop: vm.loop,
                    // loopedSlides: vm.loopedSlides, // looped slides should be the same

                    freeMode: vm.freeMode,

                    slidesPerView: 1,
                    autoplay: {
                        delay: vm.delay,
                        disableOnInteraction: vm.disableOnInteraction,
                    },

                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        450: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        681: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 0,
                        },
                        1300: {
                            slidesPerView: 5,
                            spaceBetween: 0,
                        },
                        1400: {
                            slidesPerView: 6,
                            spaceBetween: 0,
                        },
                    }
                }
            }
        },
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/carousel_slider.styl"

    @media screen and (max-width: 679px) {
        .rs-carousel-slider.container {
            width: 100% !important;
        }
    }
</style>
