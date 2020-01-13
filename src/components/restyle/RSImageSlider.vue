<template>
    <div class="rs-image-slider" :class="classList">
        <div class="rs-image-slider--viewport">
            <transition-group class="rs-image-slider--viewport--viewer" name="fade" mode="in-out">

                {{ /* Image slider */ }}
                <img v-for="(item, index) of source" :key="`${index}`" v-if="selected === index" :src="item.imageStatic ? item.image : `/api/v1/uploads?id=${item.image}`"
                     alt=""/>

                {{ /* Title slider */ }}
                <span v-for="(item, index) of source"
                      :key="`${index}-child`"
                      v-if="selected === index"
                      class="w-100">
                    <slot name="content"></slot>
                </span>

            </transition-group>

            <div class="rs-image-slider--pagination">
                <span v-for="(item, index) of source"
                      :class="{'selected' : selected === index}"
                      :style="`${$route.params.lang === 'en' ? 'left' : 'right'}: ${index * 19}px`"
                      @click="model = index"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSImageSlider",

        model: {
            prop: 'selected',
            event: 'change',
        },

        props: {
            backgroundMode: {
                default: false,
                type: Boolean,
            },
            duration: {
                default: 3000,
            },
            fullscreen: {
                default: false,
                type: Boolean,
            },

            selected: {
                type: Number
            },
            source: {
                type: Array,
            },
        },

        computed: {
            classList() {
                return {
                    'background-mode': this.backgroundMode,
                    'fullscreen': this.fullscreen,
                }
            },
            model: {
                get() {
                    return this.selected
                },
                set(selected) {
                    this.$emit('change', selected)
                }
            }
        },

        mounted() {
            setInterval((function () {

                // Get ViewPort-Viewer
                let viewer = this.$el.getElementsByClassName('rs-image-slider--viewport--viewer')[0];

                // Set image as source
                viewer.setAttribute('src', `${this.source[this.model].image}`);

                // Update model selected
                this.model = this.model + 1 < this.source.length ? this.model + 1 : 0;

            }.bind(this)), this.duration)
        },
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/image_slider.styl"
</style>
