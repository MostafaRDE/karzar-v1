<template>
    <div class="rs-list text-white">

        <div class="rs-list--filters" style="background: #282D4E" v-if="filters">
            <slot name="filters" />
        </div>

        <div class="rs-list--columns border-exchange-bottom" v-if="columns.length > 0">
            <slot name="title" />
        </div>

        <div class="rs-list--rows">
            <slot name="adapter" :rows="rows" class="font-weight-900" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSList",
        props: {
            canSort: {
                default: false,
                type: Boolean,
                required: false,
            },
            columns: {
                /*
                 * [ '...', ... ]
                 */
                default: () => ([]),
                type: Array,
                required: false,
            },
            filters: {
                default: false,
                type: Boolean,
                required: false
            },
            hasHeaderColumns: {
                default: false,
                type: Boolean,
                required: false,
            },
            isLoading: {
                default: false,
                type: Boolean,
                required: false,
            },
            loadingType: {
                default: 'default',
                type: String,
                required: false,
            },
            rows: {
                /*
                 * [
                 *     Any for work with adapter
                 * ]
                 */
                default: () => ([]),
                type: Array,
                required: false,
            },
            showFilter: {
                default: true,
                type: Boolean,
                required: false,
            },
            showFilterColumns: {
                default: true,
                type: Boolean,
                required: false,
            },
            sortBy: {
                default: '',
                type: String,
                required: false,
            },
            sortType: {
                default: 'asc', // asc|desc
                type: String,
                required: false,
            },
            title: {
                default: '',
                type: String,
                required: false
            }
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/list.styl"
</style>