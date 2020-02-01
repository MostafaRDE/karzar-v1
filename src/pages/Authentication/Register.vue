<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column" :style="{background: `url(${require('../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent register content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px">

            {{ /* Main register content panel */ }}
            <div class="p-20 text-start position-relative" style="background: #0009">

                <div class="position-absolute">
                    <span @click="$router.go(-1)"
                          class="text-white d-flex cursor-pointer"
                          :style="{transform: $store.state.dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)'}">
                        <icon-arrow-left/>
                    </span>
                </div>

                {{ /* Header */ }}
                <h1 class="font-weight-100 text-center w-100 mb-30">{{ $t('pages.authentication.register.header')
                    }}</h1>

                {{ /* Alerts of actions some as (errors, warnings, success messages and ... */ }}
                <rs-alert-server v-if="Object.entries(registrationError).length > 0"
                                 :icon="require('../../../public/images/public/icons/ic-info.svg')"
                                 color="danger"
                                 :message="registrationError"
                                 class="mb-20">
                </rs-alert-server>

                {{ /* Main register form */ }}
                <rs-form class="mb-10" @errors="setFormErrors($event)" :submit="submit">

                    {{ /* Email input */ }}
                    <rs-input type="text"
                              inputClass="font-size-md"
                              :label="$t('glossaries.email')"
                              name="email"
                              v-model="fields.email"
                              :rules="fields.rules.email"/>
                    {{ /* Email form error */ }}
                    <span class="text-danger">{{ getInputError('email') }}</span>

                    {{ /* Password input */ }}
                    <rs-input type="password"
                              class="mt-20"
                              inputClass="font-size-md"
                              :label="$t('glossaries.password')"
                              name="password"
                              v-model="fields.password"
                              :rules="fields.rules.password"/>
                    {{ /* Password form error */ }}
                    <span class="text-danger">{{ getInputError('password') }}</span>

                    {{ /* Retype-password input */ }}
                    <rs-input type="password"
                              class="mt-20"
                              inputClass="font-size-md"
                              :label="$t('glossaries.retype_password')"
                              name="retype-password"
                              v-model="fields.retypePassword"
                              :rules="fields.rules.retypePassword"/>
                    {{ /* Retype-password form error */ }}
                    <span class="text-danger">{{ getInputError('retype-password') }}</span>

                    {{ /* Whatsapp number input */ }}
                    <rs-input type="text"
                              class="mt-20"
                              inputClass="font-size-md"
                              :label="$t('glossaries.whatsapp_number')"
                              name="whatsappNumber"
                              v-model="fields.whatsappNumber"
                              :rules="fields.rules.whatsappNumber"/>
                    {{ /* Email form error */ }}
                    <span class="text-danger">{{ getInputError('whatsappNumber') }}</span>

                    {{ /* Refer-code input */ }}
<!--                    <rs-input type="number"-->
<!--                              class="mt-20"-->
<!--                              inputClass="font-size-md"-->
<!--                              :label="$t('glossaries.refer_code_optional')"-->
<!--                              name="refer_code"-->
<!--                              v-model="fields.referCode"-->
<!--                              :rules="fields.rules.referCode"/>-->
<!--                    {{ /* Refer-code form error */ }}-->
<!--                    <span class="text-danger">{{ getInputError('refer_code') }}</span>-->

                    {{ /* "Term of Use" check-box button accepting */ }}
                    <div class="mb-15 mt-10" v-if="height >= 660">
                        <rs-check-box :label="$t('pages.authentication.register.content.accepting_text_term_of_use')"
                                      labelClass="font-size-xs"
                                      name="is_accepted_term_of_use"
                                      v-model="fields.isAcceptTermOfUse"
                                      :rules="fields.rules.isAcceptTermOfUse"/>
                        {{ /* "Term of Use" form error */ }}
                        <span class="text-danger">{{ getInputError('is_accepted_term_of_use') }}</span><br/>
                        {{ /* "Term of Use" link */ }}
                        <a href="#" class="text-info font-size-xs" target="_blank">{{
                            $t('pages.authentication.register.content.the_site_s_term_of_use', { site_name: siteName })
                            }}</a>
                    </div>

                    {{ /* "Already registered? Login" text */ }}
                    <div class="mb-30 mt-10 d-flex">
                        <span class="font-size-xs">
                            {{ $t('questions.already_registered') }} <router-link :to="{name: 'login'}"
                                                                                  class="text-info font-size-xs">{{ $t('glossaries.login') }}</router-link>
                        </span>
                    </div>

                    {{ /* Register(Submit) button */ }}
                    <div class="text-center">
                        <rs-button type="submit"
                                   class="btn m-0 w-40"
                                   solid
                                   glow
                                   :loading="registering">
                            {{ $t('glossaries.register') }}
                        </rs-button>
                    </div>

                </rs-form>
                {{ /* End main register form */ }}

            </div>
            {{ /* End main register content panel */ }}

        </div>
        {{ /* End main parent register content panel */ }}
    </div>
</template>

<script>
    // Import i18n plugin for translating texts
    import i18n from '../../i18n'

    // Import "register" api method
    import {register} from '../../api'

    export default {
        name: "Register",

        // Title of page
        title: () => i18n.t('pages.authentication.register.title'),

        components: {
            'icon-arrow-left': () => import('../../components/icons/IconArrowLeft.vue')
        },

        data: () => ({
            height: 0,

            // Load site name translate
            siteName: i18n.t('app.name'),

            // Loader register button status
            registering: false,

            // Server error message after submit data
            registrationError: {},

            // Form errors that back from "rs-form"-component
            formErrors: {},

            // Fields of page
            fields: {
                email: '',
                password: '',
                retypePassword: '',
                whatsappNumber: '',
                referCode: '',
                isAcceptTermOfUse: true,

                // Rules of inputs of page
                rules: {
                    email: 'required|email',
                    password: 'required|string|min:6',
                    retypePassword: 'required|confirm_password',
                    whatsappNumber: 'required|string:digits',
                    referCode: '',
                    isAcceptTermOfUse: 'required',
                }
            },
        }),

        methods: {
            handleResize() {
                this.height = window.innerHeight
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors(errors) {
                this.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError(key) {
                return (this.formErrors.hasOwnProperty(key)) ? this.formErrors[key][0] : ''
            },

            // Submit form after form validation (If is successful)
            submit() {
                // Clear form errors
                this.setFormErrors({});
                // Remove message server error
                this.registrationError = {};
                // Set "true" flag's loading in submit button & show it
                this.registering = true;

                // Call "register" api method
                register(this.fields.email, this.fields.password, this.fields.whatsappNumber, this.fields.referCode)
                // If api is successful
                    .then(response => {
                        // Show toast successful
                        this.$toast.success({
                            title: i18n.t('glossaries.register'),
                            message: i18n.t('messages.successes.registration_successful'),
                        });

                        // Store data in authentication module store of vuex
                        this.$store.commit('authentication/setVerifyEmail', true);
                        // Goto verify email page
                        this.$router.push({name: 'verifyEmailAddress'});
                    })
                    // Else if api is failed
                    .catch(error => {
                        // Show message server error
                        this.registrationError = {
                            code: Math.abs(error.response.data.error),
                            message: error.response.data.msg,
                        };

                        // Show toast failed
                        this.$toast.error({
                            title: i18n.t('glossaries.register'),
                            message: i18n.t('messages.errors.registration_failed'),
                        })
                    })
                    // Default actions after api execute
                    .finally(() => {
                        // Set "false" flag's loading in submit button & hide it
                        this.registering = false
                    })
            }
        },

        mounted() {
            this.handleResize();

            window.addEventListener('resize', this.handleResize)
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
        }
    }
</script>
