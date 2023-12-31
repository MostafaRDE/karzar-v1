<template>
    <div class="rs-input--parent border" :class="{'opacity-6': disabled}">
        <label :lang="labelLang" v-if="width >= responsiveObject.sizes.xl && label !== ''" class="ps-10 pe-5 position-relative" :id="`rs-input--label--${_uid}`">
            <span class="label-icon me-10" v-show="labelIcon">
                <img :src="labelIcon" alt="" style="height: 24px"/>
            </span>
            <span>{{ label }}</span>
            <span class="z-index-1"/>
        </label>
        <div class="rs-input align-items-center py-10 ps-20 pe-5 position-relative" :class="inputClass">

            <span class="rs-input--icon"><slot name="icon"/></span>

            <input :lang="inputLang"
                   :class="[inputClass, {'text-disabled' : disabled}]"
                   :disabled="disabled"
                   :type="!showPassword ? type : 'text'"
                   class="rs-input--input"
                   ref="input"
                   :placeholder="getPlaceholder"
                   v-model="model"
                   :maxlength="maxlength"
                   @keypress="keypress"
                   @focusin="focusin = true"
                   @focusout="focusin = false"/>

            <transition name="fade">
                <div v-if="source" v-show="focusin" class="position-absolute end-0 border bg-shades black z-index-100"
                     :class="width >= responsiveObject.sizes.xl && label !== '' ? 'start-15' : 'start-0'"
                     style="top: 43px;">
                    <div v-if="sourceLoading" class="d-flex align-items-center justify-content-center pxh-80">
                        <rs-overlay-loading/>
                    </div>
                    <div v-else-if="!sourceLoading && !source.length" class="d-flex align-items-center justify-content-center pxh-80">
                        <span class="font-size-xs">{{ $t('glossaries.not_found') }}</span>
                    </div>
                    <div v-else class="d-flex flex-direction-column">
                        <slot name="source-item"/>
                    </div>
                </div>
            </transition>

            <span class="line-height-1-0 border-exchange-start ps-5" v-if="type !== 'password'">{{ mark }}</span>

            <span class="rs-input--password" style="min-width: 22px; line-height: 0; cursor: pointer"
                  v-if="type === 'password'">
                <svg v-if="showPassword" style="width:100%;height: 100%" viewBox="0 0 24 24"
                     @click="showPassword = false">
                    <path fill="#ffffff"
                          d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                </svg>
                <svg v-if="!showPassword" style="width:100%;height: 100%" viewBox="0 0 24 24"
                     @click="showPassword = true">
                    <path fill="#ffffff"
                          d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"/>
                </svg>
            </span>

        </div>
    </div>
</template>

<script>
    import ResponsiveObject from "../../modules/objects/Responsive"

    export default {
        name: "RSInput",

        model: {
            prop: 'value'
        },

        props: {
            disabled: {
                default: false,
                type: Boolean,
                required: false
            },
            inputClass: {
                default: '',
                type: String,
                required: false
            },
            inputLang: {
                default: '',
                type: String,
                required: false
            },
            keypress: {
                default: () => (() => {})
            },
            label: {
                default: '',
                type: String,
                required: false
            },
            labelIcon: {
                default: '',
                type: String,
                required: false
            },
            labelLang: {
                default: '',
                type: String,
                required: false
            },
            mark: {
                default: '',
                type: String,
                required: false
            },
            maxlength: {
                default: null,
                type: Number,
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
            source: {
                default: null,
            },
            sourceLoading: {
                default: false,
                type: Boolean,
                required: false
            },
            type: {
                default: '',
                type: String,
                required: false
            },
            value: {
                default: '',
                type: String,
                required: false
            }
        },

        data: () => ({
            responsiveObject: ResponsiveObject,
            showPassword: false,
            inputWidth: 200,
            width: 0,
            focusin: false,
        }),

        computed: {
            model: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            },

            getPlaceholder() {
                if (this.width >= this.responsiveObject.sizes.xl) {
                    return this.placeholder
                } else {
                    let temp = this.label;
                    if (this.placeholder && this.placeholder !== '')
                        temp += ` (${this.placeholder})`;
                    return temp
                }
            }
        },

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },
            setInputWidth() {
                this.inputWidth = this.$refs.input.clientWidth;
            },
        },

        mounted() {
            this.setInputWidth();
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
            window.addEventListener('resize', this.setInputWidth)
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
            window.removeEventListener('resize', this.setInputWidth);
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/input.styl"
</style>
