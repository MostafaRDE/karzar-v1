<template>
    <button class="rs-checkable-button text-center m-0 d-flex align-items-center" :class="{'active' : isChecked}" :color="color" @click="updateModel(!isChecked)">
        <span class="d-flex align-items-center flex-grow-1 px-5">
            <span class="text-white px-5" v-text="text"></span>
        </span>
    </button>
</template>

<script>
    export default {
        name: "RSCheckableButton",

        model: {
            prop: 'isChecked',
            event: 'change',
        },

        props: {
            color: {
                default: '',
                type: String,
                required: false
            },
            isChecked: {
                default: false,
                type: Boolean,
                required: false
            },
            text: {
                default: '',
                type: String,
                required: false
            }
        },

        computed: {
            model: {
                get() {
                    return this.isChecked
                },
                set(isChecked) {
                    this.$emit('change', isChecked)
                }
            },
        },

        methods: {
            updateModel(check) {
                this.model = check
            }
        }
    }
</script>

<style lang="stylus">
    @import '../../assets/styles/modules/restyle/checkable_button.styl'
</style>