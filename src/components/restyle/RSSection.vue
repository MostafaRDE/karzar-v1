<template>
    <div class="rs-section">

        <header v-if="title !== ''"
                class="d-flex border-exchange-bottom align-items-center"
                :class="headerClass"
                :style="'background-color: ' + bgTitle">
            <span class="font-weight-100" v-text="title"></span>
            <div class="ms-auto">
                <slot name="header-tools" />
            </div>
        </header>

        <div class="content" :class="contentClass">
            <slot />
        </div>

    </div>
</template>

<script>
    export default {
        name: "RSSection",

        props: {
            bgTitle: {
                default: '',
                type: String,
                required: false
            },
            contentClass: {
                default: '',
                type: [Array, String],
                required: false,
            },
            headerClass: {
                default: '',
                type: String,
                required: false,
            },
            title: {
                default: '',
                type: String,
                required: false
            }
        },
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/section.styl"
</style>
