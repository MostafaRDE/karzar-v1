<template>
    <div class="card position-relative py-20 ps-20">
        <div class="card-body text-white">
            <span class="card-statistics-icon">
                <slot name="icon" />
            </span>
            <hgroup class="mt-50">
                <h4 v-text="title"></h4>
                <h4 class="line-height-1-0" v-text="subTitle"></h4>
            </hgroup>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSCardStatistics",

        props: {
            title: {
                default: '',
                type: String,
                required: false
            },
            subTitle: {
                default: '',
                type: String,
                required: false
            },
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/card_statistics.styl"
</style>