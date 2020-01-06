<template>
    <div class="rs-checkable-button-drop-down border-exchange" v-click-outside="hideMenu">
        <button class="m-0 d-flex align-items-center" :class="{'active' : checkHasItemWithKey()}" :color="color" @click="menuVisibility = !menuVisibility">
            <span class="d-flex align-items-center flex-grow-1">
                <rs-overlay-loading :loading="loading" :type="loadingType" v-if="loading" />
                <span v-if="!loading" class="text-white" v-text="text"></span>
            </span>
            <span class="rs-drop-down--button-toggle-icon" :class="{'close' : !menuVisibility}"><svg width="100%" height="100%" viewBox="0 0 25 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.221 1.206l9.585 9.585a2.265 2.265 0 0 1 0 3.195l-.8.801a2.266 2.266 0 0 1-3.194 0l-7.315-7.315-7.315 7.315a2.266 2.266 0 0 1-3.194 0l-.8-.801a2.265 2.265 0 0 1 0-3.195l9.587-9.585a2.24 2.24 0 0 1 1.723-.647 2.247 2.247 0 0 1 1.723.647z"></path></svg></span>
        </button>
        <div class="rs-drop-down--list-parent position-relative" v-if="menuVisibility">
            <ul class="position-absolute border-exchange-bottom border-exchange-left border-exchange-right">
                <li v-for="(item, index) of source" :class="{'selected' : model === item.key}" v-text="item.value" @click="updateModel(item.key, index)"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSCheckableButtonDropDown",

        model: {
            prop: 'selected',
            event: 'change',
        },

        props: {
            color: {
                default: '',
                type: String,
                required: false
            },
            loading: {
                default: false,
                type: Boolean,
                required: false
            },
            loadingType: {
                default: 'default',
                type: String,
                required: false
            },
            name: {
                default: '',
                type: String,
                required: false
            },
            placeholder: {
                default: '',
                type: String,
                required: false
            },
            rules: {
                default: null,
            },
            selected: {
                default: 0,
                required: false
            },
            source: {
                default: () => ([]),
                type: Array,
                required: false
            },
        },

        data: () => ({
            itemSelected: 0,
            menuVisibility: false,
        }),

        computed: {
            model: {
                get() {
                    return this.selected
                },
                set(selected) {
                    this.$emit('change', selected)
                }
            },
            text() {
                return this.source[this.itemSelected].value
            }
        },

        methods: {
            checkHasItemWithKey() {
                let keys = [];
                this.source.forEach((value) => {
                    keys.push(value.key)
                });
                return keys.includes(this.model)
            },
            hideMenu() {
                this.menuVisibility = false
            },
            updateModel(key, index) {
                this.itemSelected = index;
                this.menuVisibility = false;
                this.model = key
            }
        }
    }
</script>

<style lang="stylus">
    @import '../../assets/styles/modules/restyle/checkable_button_drop_down.styl'
</style>