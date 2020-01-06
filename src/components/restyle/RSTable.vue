<template>
    <table class="table">
        <thead v-if="Object.entries(fields)">
        <tr>
            <th v-for="field of fields" :colspan="field.hasOwnProperty('colspan') ? field.colspan : 1" :rowspan="field.hasOwnProperty('rowspan') ? field.rowspan : 1" v-text="field.name"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, index) of rows" :key="index">
            <template v-for="field of row">
<!--                <td v-if="typeof field.data === 'object'" :colspan="row.hasOwnProperty('colspan') ? field.colspan : 1" :rowspan="row.hasOwnProperty('rowspan') ? field.rowspan : 1" v-html="HtmlRendererAdapter.render(field.data.value, field.data.type)"></td>-->
                <td v-if="typeof field.data !== 'object'" :colspan="row.hasOwnProperty('colspan') ? field.colspan : 1" :rowspan="row.hasOwnProperty('rowspan') ? field.rowspan : 1" v-html="field.data"></td>
            </template>
        </tr>
        </tbody>
    </table>
</template>

<script>
    // import HtmlRendererAdapter from './../../modules/HtmlRendererAdapter.js'

    export default {
        name: "RSTable",

        props: {
            fields: {
                /*
                 * Array template:
                 * [
                 *    {
                 *       name: '...', => String
                 *       colspan: ..., => Integer, Default: 1
                 *       rowspan: ..., => Integer, Default: 1
                 *       width: ..., => Unit, Default: 1
                 *       height: ..., => Unit, Default: 1
                 *    },
                 *    ...
                 * ]
                 */
                default: () => ([]),
                type: Array,
                required: false
            },
            rows: {
                /*
                 * Array template:
                 * [
                 *    [
                 *       {
                 *          data: {
                 *             value: ..., => Any type
                 *             type: ... => String
                 *          },
                 *          colspan: ..., => Integer, Default: 1
                 *          rowspan: ..., => Integer, Default: 1
                 *       },
                 *    ],
                 *    ...
                 * ]
                 */
                default: () => ([]),
                type: Array,
                required: true
            },

            // Configuration properties
            sortBy: {
                default: '', // Field name for sort with it
                type: String,
                required: false
            },
            sortType: {
                default: 'asc', // For sorting table, types: 'asc' or 'desc'
                type: String,
                required: false
            }
        },

        data: () => ({
            HtmlRendererAdapter
        }),
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/table.styl"
</style>