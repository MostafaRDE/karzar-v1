<template>
    <div class="d-flex justify-content-center align-items-center">
        {{ /* Previous Button */ }}
        <span class="d-flex align-items-center linkable"
                   :color="color"
                   @click="back()">
            <mdi-arrow-right
                    v-if="$route.params.lang !== 'fa' && $route.params.lang !== 'ar' && $route.params.lang !== 'af'"
                    class="me-5"
                    size="20px"/>
            <mdi-arrow-left v-else
                            class="me-5"
                            size="20px"/>
        </span>

        <div class="btn-group">

            {{ /* Start Buttons */ }}
            <template v-for="button of buttons">

                <span v-if="button.type === 1"
                      class="px-5 linkable no-select"
                      :style="{color: selected !== button.index ? color : activeColor}"
                      @click="updatePagination(button.index)">{{ button.index }}</span>
                <span v-if="button.type === 0"
                           class="px-5 no-select">...
                </span>
            </template>

        </div>

        {{ /* Next Button */ }}
        <span class="d-flex align-items-center linkable"
                   :bg="bg"
                   :color="color"
                   @click="next()">
            <mdi-arrow-left
                    v-if="$route.params.lang !== 'fa' && $route.params.lang !== 'ar' && $route.params.lang !== 'af'"
                    class="ms-5"
                    size="20px"/>
            <mdi-arrow-right v-else
                             class="ms-5"
                             size="20px"/>
        </span>
    </div>
</template>

<script>
    export default {
        name: "RSPagination",

        model: {
            prop: 'selected',
            event: 'change',
        },

        components: {
            'mdi-arrow-left': () => import ('../icons/MaterialDesignIcons/MdiArrowLeft.vue'),
            'mdi-arrow-right': () => import ('../icons/MaterialDesignIcons/MdiArrowRight.vue'),
        },

        props: {
            activeColor: {
                default: 'red',
                type: String,
            },
            bg: {
                default: '',
                type: String,
            },
            color: {
                default: 'transparent',
                type: String,
            },
            count: {
                default: 1,
            },
            ellipsisCount: {
                default: 3,
                type: Number,
            },
            selected: {
                default: 1,
            },
        },

        computed: {
            model: {
                get () {
                    return this.selected
                },
                set (selected) {
                    this.$emit('change', selected)
                }
            },

            buttons () {
                let buttons = [];

                if (this.count <= this.ellipsisCount * 2 + 1) {
                    // Create buttons
                    for (let index = 1; index <= this.count; index++) {
                        buttons.push({ index, type: 1 })
                    }
                }
                // If the buttons more than this.ellipsisCount * 2 + 1, then
                else {
                    // Create first buttons
                    for (let i = 0; i < this.ellipsisCount; i++) {
                        buttons.push({ index: buttons.length + 1, type: 1 })
                    }

                    // Create variable has first show button on middle
                    let middleFirst = this.model - 1,
                        // Create variable has last show button on middle
                        middleEnd = this.model + 1,
                        // First button number of ellipsis ending buttons
                        end = this.count - (this.ellipsisCount - 1);

                    // If more than one button before set selected middle buttons, then add dots button at first middle buttons
                    if (middleFirst - this.ellipsisCount > 1) {
                        buttons.push({ type: 0 })
                    }

                    // <editor-fold desc="Middle buttons creator algorithm">
                    for (let i = 0; i < 3; i++) {
                        if (middleFirst >= 0 && middleFirst > this.ellipsisCount && middleFirst < end) {
                            buttons.push({ index: middleFirst, type: 1 })
                        }
                        middleFirst++
                    }
                    // </editor-fold>

                    // If more than one button after set selected middle buttons, then add dots button at last middle buttons
                    if (end - middleEnd > 1) {
                        buttons.push({ type: 0 })
                    }

                    // Create last buttons
                    for (let i = 0; i < this.ellipsisCount; i++) {
                        buttons.push({ index: this.count - (2 - i), type: 1 })
                    }
                }

                return buttons
            }
        },

        methods: {
            back() {
                if (this.model !== 1)
                    this.model--
            },

            next() {
                if (this.model < this.count)
                    this.model++
            },

            updatePagination (n) {
                if (this.selected !== this.model)
                    this.model = n
            }
        }
    }
</script>
