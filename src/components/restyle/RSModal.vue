<template>
    <transition name="fade">
        <div v-if="model" class="modal-parent" @click.self="model = false">
            <div class="modal" :class="classModel" :style="styleModal">
                <slot name="header"/>
                <slot/>
                <slot name="footer"/>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "RSModal",

        model: {
            prop: 'visibility',
            event: 'toggle'
        },

        props: {
            classModel: {
                default: '',
                required: false
            },
            styleModal: {
                default: '',
                required: false
            },
            visibility: {
                default: false,
                type: Boolean,
                required: false,
            }
        },

        watch: {
            model: function (visibility) {
                if (visibility) {
                    document.body.style.overflow = 'hidden';
                    this.$emit('open', visibility);
                }
                else {
                    document.body.style.overflow = 'auto';
                    this.$emit('close', visibility);
                }
            }
        },

        computed: {
            model: {
                get() {
                    return this.visibility
                },
                set(visibility) {
                    this.$emit('toggle', visibility);
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/modal.styl"
</style>
