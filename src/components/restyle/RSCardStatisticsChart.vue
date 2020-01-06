<template>
    <div class="card p-15 overflow-hidden card-statistics">
        <div class="card-body position-relative">
            <div v-if="chartData.length > 0" class="vue-trend position-absolute bottom-0 left-0 right-0 mb--15 mx--20">
                <trend :data="chartData" :gradient="['#6fa8dc']" auto-draw smooth />
            </div>
            <div>
                <div class="d-flex flex-row">
                    <span class="text-white font-size-xs" v-text="title"></span>
                    <span
                            class="ms-auto ltr font-size-xxs"
                            :class="[
                                {'text-success': changeRate > 0},
                                 {'text-white' : changeRate === 0},
                                  {'text-red darken-2' : changeRate < 0}
                             ]"
                            v-text="`${changeRate > 0 ? '+' : ''}${changeRate}%`"></span>
                </div>
                <h5 class="mb-0 mt-xxs-40 mt-xs-80 mt-sm-25 mt-md-40 mt-lg-15 line-height-1-0 text-white font-size-lg" v-text="ratio"></h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSCardStatistics",

        props: {
            chartData: {
                default: () => ([]),
                type: Array,
                required: false
            },
            changeRate: {
                default: 0,
                type: Number,
                required: true
            },
            ratio: {
                default: '',
                type: String,
                required: true
            },
            title: {
                default: '',
                type: String,
                required: true
            },
            //==================================
            bgColor: {
                default: '#333959',
                type: String,
                required: false
            },
            hasFooter: {
                default: true,
                type: Boolean,
                required: false
            },
            hasHeader: {
                default: true,
                type: Boolean,
                required: false
            }
        },

        mounted() {
            this.$el.style.backgroundColor = this.bgColor
        }
    }
</script>