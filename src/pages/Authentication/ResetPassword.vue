<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column" :style="{background: `url(${require('../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent reset-password content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px">

            {{ /* Main reset-password content panel */ }}
            <div class="p-20 text-center position-relative" style="background: #0009">

                <div class="position-absolute">
                    <span @click="$router.go(-1)"
                          class="text-white d-flex cursor-pointer"
                          :style="{transform: $store.state.dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)'}">
                        <icon-arrow-left/>
                    </span>
                </div>

                {{ /* Header */ }}
                <h1 class="font-weight-100 mb-20">{{ $t('pages.authentication.reset_password.header') }}</h1>

                {{ /* Alerts of actions some as (errors, warnings, success messages and ... */ }}
                <rs-alert-server v-if="Object.entries(resettingPasswordError).length > 0"
                                 :icon="require('../../../public/images/public/icons/ic-info.svg')"
                                 color="danger"
                                 :message="resettingPasswordError"
                                 class="mb-20">
                </rs-alert-server>

                {{ /* Main reset-password form */ }}
                <rs-form class="text-center mb-10" @errors="setFormErrors($event)" :submit="submit">

                    {{ /* Email input */ }}
                    <rs-input type="text" inputClass="font-size-md"
                              :label="$t('glossaries.email')"
                              name="email"
                              v-model="fields.email"
                              :rules="fields.rules.email"/>
                    {{ /* Email form error */ }}
                    <span class="text-danger w-100 text-start d-block">{{ getInputError('email') }}</span>

                    <div class="mb-30 mt-10 d-flex justify-content-center">
                        <vue-grecaptcha v-model="captcha"/>
                    </div>

                    {{ /* Login page link */ }}
                    <router-link :to="{name: 'login'}" class="text-info text-center mt-15 d-inline-block font-size-xs">
                        {{
                        $t('glossaries.login') }}
                    </router-link>

                    {{ /* Submit button */ }}
                    <div class="text-center mt-15">
                        <rs-button type="submit"
                                   class="btn m-0 w-40"
                                   solid
                                   glow
                                   :loading="resettingPassword">
                            {{ $t('glossaries.submit') }}
                        </rs-button>
                    </div>
                </rs-form>

                {{ /* End main reset-password form */ }}
            </div>
            {{ /* End main reset-password content panel */ }}

        </div>
        {{ /* End main parent reset-password content panel */ }}
    </div>
</template>

<script>
    // Import i18n plugin for translating texts
    import i18n from '../../i18n'

    // Import "get_devices_user" api method for resetting-password
    import {get_devices_user} from '../../api'

    export default {
        name: "ResetPassword",

        title: () => i18n.t('pages.authentication.reset_password.title'),

        components: {
            'icon-arrow-left': () => import('../../components/icons/IconArrowLeft.vue')
        },

        data: () => ({
            // Load site name translate
            siteName: i18n.t('app.name'),

            // Loader reset-password button status
            resettingPassword: false,

            // Server error message after submit data
            resettingPasswordError: {},

            // Form errors that back from "rs-form"-component
            formErrors: {},

            captcha: null,

            // Fields of page
            fields: {
                email: '',

                // Rules of inputs of page
                rules: {
                    email: 'required|email',
                }
            },
        }),

        methods: {
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
                if (!this.captcha) {
                    this.$toast.error({
                        title: i18n.t('glossaries.recaptcha_approval'),
                        message: i18n.t('messages.errors.please_confirm_that_you_are_not_a_robot_first'),
                    });
                    return;
                }

                if (!this.resettingPassword) {
                    // Clear form errors
                    this.setFormErrors({});
                    // Remove message server error
                    this.resettingPasswordError = {};
                    // Set "true" flag's loading in submit button & show it
                    this.resettingPassword = true;

                    // Call "get_devices_user" api method
                    get_devices_user(this.fields.email, this.captcha)
                        // If api is successful
                        .then(response => {
                            // Store data in authentication module store of vuex
                            this.$store.commit('authentication/storeDevicesForSendRequestForForgot', response.data.data);

                            // Goto Device-selecting for send-request-for-forgot page
                            this.$router.push({name: 'deviceSelectingForSendRequestForForgot'});
                        })
                        // Else if api is failed
                        .catch(error => {
                            // Show message server error
                            this.resettingPasswordError = {
                                code: Math.abs(error.response.data.error),
                                message: error.response.data.msg,
                            };

                            // Show toast failed
                            this.$toast.error({
                                title: i18n.t('glossaries.reset_password'),
                                message: i18n.t('messages.errors.reset_password_failed'),
                            })
                        })
                        // Default actions after api execute
                        .finally(() => {
                            // Set "false" flag's loading in submit button & hide it
                            this.resettingPassword = false;
                            grecaptcha.reset();
                        })

                }
            },
        },
    }
</script>
