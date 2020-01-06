<template>
    <div class="rs-drop-down-pro" :class="classList" v-click-outside="hideMenu">

        {{ /* Start button drop down pro */ }}
        <button type="button" class="m-0 d-flex align-items-center no-select border" :class="{'border-exchange rounded-0' : menuVisibility}" :color="color" @click="menuVisibility = !menuVisibility">

            {{ /* Start Item Adapter (Customize) */ }}
            <span v-if="$scopedSlots.hasOwnProperty('item-adapter')">
                <span class="d-flex justify-content-flex-start align-items-center flex-grow-1">
                    <rs-overlay-loading :loading="loading" :type="loadingType" v-if="loading" />
                    <slot name="item-adapter" :data="data"/>
                </span>
            </span>
            {{ /* End Item Adapter (Customize) */ }}

            {{ /* Start Item Adapter (Default) */ }}
            <span v-if="!$scopedSlots.hasOwnProperty('item-adapter')">
                <span class="d-flex align-items-center flex-grow-1">
                    <rs-overlay-loading :loading="loading" :type="loadingType" v-if="loading" />
                    <span v-if="$slots['icon']"
                          class="rs-drop-down-pro--icon">
                        <slot name="icon"/>
                    </span>
                    <span v-if="!$slots['icon'] && data.hasOwnProperty('icon')"
                          class="rs-drop-down-pro--icon pe-10">
                        <img class="h-100" :src="data.icon" :alt="data.label"/>
                    </span>
                    <span class="application-text-color">{{ getSelectedText }}</span>
                </span>
            </span>
            {{ /* End Item Adapter (Default) */ }}

            <span class="rs-drop-down-pro--button-toggle-icon" :class="{'close' : !menuVisibility}"><svg width="100%" height="100%" viewBox="0 0 25 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.221 1.206l9.585 9.585a2.265 2.265 0 0 1 0 3.195l-.8.801a2.266 2.266 0 0 1-3.194 0l-7.315-7.315-7.315 7.315a2.266 2.266 0 0 1-3.194 0l-.8-.801a2.265 2.265 0 0 1 0-3.195l9.587-9.585a2.24 2.24 0 0 1 1.723-.647 2.247 2.247 0 0 1 1.723.647z"></path></svg></span>
        </button>
        {{ /* End button drop down pro */ }}

        {{ /* Start list drop down pro */ }}
        <div class="rs-drop-down-pro--list-parent position-relative" v-if="menuVisibility">
            <ul :class="{'border-exchange-right border-exchange-bottom border-exchange-left' : menuVisibility}">
                <li v-if="hasSearch"
                    class="border-exchange-top rs-drop-down-pro--search">
                    <rs-input inputClass="p-0" :placeholder="`${$t('glossaries.search')}...`" v-model="search"/>
                </li>
                <li v-for="(item, index) of filteredSource" class="border-exchange-top d-flex align-items-center no-select"
                    :class="{'selected' : selected === item.key}" @click="updateModel(item.key)">
                    <rs-check-box v-if="multiselect"
                                  :class="{'small': small, 'x-small': xSmall, 'xx-small': xxSmall}"
                                  :value="selected.find(key => key === item.key) !== undefined"/>
                    <slot v-if="$scopedSlots.hasOwnProperty('item-adapter')" name="item-adapter" :data="filteredSource[index]"/>
                    <span v-if="!$scopedSlots.hasOwnProperty('item-adapter') && !$slots['icon'] && item.hasOwnProperty('icon')"
                          class="rs-drop-down-pro--icon pe-10">
                        <img :src="item.icon" :alt="item.label"/>
                    </span>
                    <span v-if="!$scopedSlots.hasOwnProperty('item-adapter')" class="application-text-color">{{ item.label }}</span>
                </li>
            </ul>
        </div>
        {{ /* End list drop down pro */ }}

    </div>
</template>

<script>
    import i18n from '../../i18n'

    export default {
        name: "RSDropDownPro",

        model: {
            prop: 'selected',
            event: 'change',
        },

        props: {
            small: {
                default: false,
                type: Boolean
            },
            xSmall: {
                default: false,
                type: Boolean
            },
            xxSmall: {
                default: false,
                type: Boolean
            },

            //------------------------------------------

            canEmpty: {
                default: false,
                type: Boolean,
            },
            color: {
                default: '',
                type: String,
                required: false
            },
            hasSearch: {
                default: false,
                type: Boolean
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
            multiselect: {
              default: false,
              type: Boolean,
              required: false,
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
            search: {
                default: '',
                type: String,
            },
            searchKey: {
                default: 'label',
                type: String,
            },
            selected: {
                default: null,
                required: false
            },
            source: {
                default: () => ([]),
                type: Array,
                required: false
            },
        },

        data: () => ({
            menuVisibility: false,
        }),

        computed: {
            data() {
                let data = this.source.find(item => item.key === this.selected);
                return data !== undefined ? data : {}
            },
            model: {
                get() {
                    return this.selected
                },
                set(selected) {
                    this.$emit('change', selected)
                }
            },

            classList() {
                return {
                    'small': this.small,
                    'x-small': this.xSmall,
                    'xx-small': this.xxSmall,
                }
            },

            filteredSource() {
                return this.source.filter((function (item, index) {
                    return item[this.searchKey].match(new RegExp(this.search, 'i')) !== null;
                }.bind(this)))
            },
            getSelectedText() {
                if (!this.multiselect)
                    return this.source.find(item => item.key === this.selected).label;
                else {
                    if (this.selected.length === this.source.length)
                        return i18n.t('glossaries.all');

                    switch (this.selected.length) {
                        case 0:
                            if (this.canEmpty)
                                return i18n.t('glossaries.all');
                            else
                                return i18n.t('glossaries.not_selected');

                        case 1:
                            return this.source.find(item => item.key === this.selected[0]).label;

                        default:
                            return i18n.t('glossaries.count_items', {count: this.selected.length});
                    }
                }
            }
        },

        methods: {
            hideMenu() {
                this.menuVisibility = false
            },
            updateModel(key) {
                this.menuVisibility = false;
                this.search = '';

                if (!this.multiselect)
                    this.model = key;
                else {
                    let findKey = undefined;

                    findKey = this.model.find(itemKey => itemKey === key);

                    if (findKey === undefined)
                        this.model.push(key);
                    else
                        if (this.canEmpty || this.selected.length > 1)
                            this.model = this.arrayRemove(this.model, key);
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/dropdown_pro.styl"
</style>
