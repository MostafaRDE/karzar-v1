<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column" :style="{background: `url(${require('../../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent password-change content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px">

            {{ /* Main password-change content panel */ }}
            <div class="p-20 text-start" style="background: #0009">

                {{ /* Header */ }}
                <h1 class="font-weight-100 text-center w-100 mb-30">{{ $t('pages.authentication.password_change.header')
                    }}</h1>

                {{ /* Alerts of actions some as (errors, warnings, success messages and ... */ }}
                <rs-alert-server v-if="Object.entries(serverError).length > 0"
                                 :icon="require('../../../../public/images/public/icons/ic-info.svg')"
                                 color="danger"
                                 :message="serverError"
                                 class="mb-20"/>

                {{ /* Main password-change form */ }}
                <rs-form class="mb-10" @errors="setFormErrors($event)" :submit="submit">

                    {{ /* Password input */ }}
                    <rs-input type="password" class="mt-20"
                              inputClass="font-size-md"
                              :label="$t('glossaries.password')"
                              name="password"
                              v-model="fields.password"
                              :rules="fields.rules.password"/>
                    {{ /* Password form error */ }}
                    <span class="text-danger">{{ getInputError('password') }}</span>

                    {{ /* Retype-password input */ }}
                    <rs-input type="password" class="mt-20"
                              inputClass="font-size-md"
                              :label="$t('glossaries.retype_password')"
                              name="retype-password"
                              v-model="fields.retypePassword"
                              :rules="fields.rules.retypePassword"/>
                    {{ /* Retype-password form error */ }}
                    <span class="text-danger">{{ getInputError('retype-password') }}</span>

                    {{ /* password-change(Submit) button */ }}
                    <div class="text-center mt-30">
                        <rs-button type="submit" class="btn m-0 w-45 text-nowrap" solid glow :loading="resetting">
                            {{ $t('glossaries.reset_password') }}
                        </rs-button>
                    </div>

                </rs-form>
                {{ /* End main password-change form */ }}

            </div>
            {{ /* End main password-change content panel */ }}

        </div>
        {{ /* End main parent password-change content panel */ }}
    </div>
</template>

<script>
    // Import i18n plugin for translating texts
    import i18n from '../../../i18n'

    // Import "change_password_by_token" api method
    import {change_password_by_token} from '../../../api'

    export default {
        name: "PasswordChange",

        // Title of page
        title: () => i18n.t('glossaries.reset_password'),

        data: () => ({
            // Load site name translate
            siteName: i18n.t('app.name'),

            // Loader password-change button status
            resetting: false,

            // Server error message after submit data
            serverError: {},

            // Form errors that back from "rs-form"-component
            formErrors: {},

            // Fields of page
            fields: {
                password: '',
                retypePassword: '',

                // Rules of inputs of page
                rules: {
                    password: 'required|min:6',
                    retypePassword: 'required|confirm_password',
                }
            },
        }),

        computed: {
            // Token of password-reset
            token() {
                return this.$route.query.token
            }
        },

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
                // Clear form errors
                this.setFormErrors({});
                // Remove message server error
                this.serverError = {};
                // Set "true" flag's loading in submit button & show it
                this.resetting = true;

                // Call "change_password_by_token" api method
                change_password_by_token(this.token, this.fields.password)
                // If api is successful
                    .then(response => {
                        // Show toast successful
                        this.$toast.success({
                            title: i18n.t('glossaries.reset_password'),
                            message: i18n.t('messages.successes.reset_password_successful'),
                        });

                        // Goto password-changed page
                        this.$router.push({name: 'passwordChanged'});
                    })
                    // Else if api is failed
                    .catch(error => {
                        // Show message server error
                        this.serverError = {
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
                        this.resetting = false
                    })
            }
        },
    }
</script>
