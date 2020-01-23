<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column" :style="{background: `url(${require('../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent register content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px">

            {{ /* Main login content panel */ }}
            <div class="p-20 text-center position-relative" style="background: #0009">

                <div class="position-absolute">
                    <span @click="$router.go(-1)"
                          class="text-white d-flex cursor-pointer"
                          :style="{transform: $store.state.dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)'}">
                        <icon-arrow-left/>
                    </span>
                </div>

                {{ /* Header */ }}
                <h1 class="font-weight-100 mb-30">{{ $t('glossaries.log_in') }}</h1>

                {{ /* Alerts of actions some as (errors, warnings, success messages and ... */ }}
                <rs-alert-server v-if="Object.entries(signInError).length > 0"
                                 :icon="require('../../../public/images/public/icons/ic-info.svg')"
                                 color="danger"
                                 :message="signInError"
                                 class="mb-20">
                </rs-alert-server>

                {{ /* Main register form */ }}
                <rs-form class="text-start mb-10" @errors="setFormErrors($event)" :submit="submit">

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
                    <rs-input type="password" class="mt-20"
                              inputClass="font-size-md"
                              :label="$t('glossaries.password')"
                              name="password"
                              v-model="fields.password"
                              :rules="fields.rules.password"/>
                    {{ /* Password form error */ }}
                    <span class="text-danger">{{ getInputError('password') }}</span>


                    <div class="mb-30 mt-10 d-flex">

                        {{ /* Link for goto "ResetPassword"-page for user lost it password */ }}
                        <router-link :to="{name: 'resetPassword'}" class="text-info font-size-xs">{{
                            $t('questions.forgot_password') }}
                        </router-link>

                        {{ /* Link for goto "Register"-page for user not on the site */ }}
                        <span class="font-size-xs ms-auto">
                            {{ $t('questions.not_on_the_site_yet', { site_name: siteName }) }} <router-link
                                    :to="{name: 'register'}"
                                    class="text-info font-size-xs">{{ $t('glossaries.register') }}</router-link>
                        </span>

                    </div>

                    {{ /* Submit button */ }}
                    <div class="text-center">
                        <rs-button type="submit"
                                   class="btn m-0 w-40"
                                   solid
                                   glow
                                   :loading="logging">
                            {{ $t('glossaries.log_in') }}
                        </rs-button>
                    </div>

                </rs-form>
                {{ /* End main login form */ }}

            </div>
            {{ /* End main login content panel */ }}

        </div>
        {{ /* End main parent login content panel */ }}
    </div>
</template>

<script>
    // Import i18n plugin for translating texts
    import i18n from '../../i18n'

    // Import "login" api method
    import {login} from '../../api'

    export default {
        name: "Login",

        title: () => i18n.t('pages.authentication.login.title'),

        components: {
            'icon-arrow-left': () => import('../../components/icons/IconArrowLeft.vue')
        },

        data: () => ({
            // Load site name translate
            siteName: i18n.t('app.name'),

            // Loader login button status
            logging: false,

            // Server error message after submit data
            signInError: {},

            // Form errors that back from "rs-form"-component
            formErrors: {},

            // Fields of page
            fields: {
                email: '',
                password: '',

                // Rules of inputs of page
                rules: {
                    email: 'required|email',
                    password: 'required',
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
                // Clear form errors
                this.setFormErrors({});
                // Remove message server error
                this.signInError = {};
                // Set "true" flag's loading in submit button & show it
                this.logging = true;

                // Call "login" api method
                login(this.fields.email, this.fields.password)
                // If api is successful
                    .then(response => {
                        // Show toast successful
                        this.$toast.success({
                            title: i18n.t('glossaries.log_in'),
                            message: i18n.t('messages.successes.log_in_successful'),
                        });

                        // Goto verify email page
                        window.location.replace(`/${this.$route.params.lang}/dashboard/tournaments`);
                    })
                    // Else if api is failed
                    .catch(error => {
                        // Show message server error
                        this.signInError = {
                            code: Math.abs(error.response.data.error),
                            message: error.response.data.msg,
                        };

                        // Show toast failed
                        this.$toast.error({
                            title: i18n.t('glossaries.log_in'),
                            message: i18n.t('messages.errors.log_in_failed'),
                        })
                    })
                    // Default actions after api execute
                    .finally(() => {
                        // Set "false" flag's loading in submit button & hide it
                        this.logging = false
                    })
            },
        },
    }
</script>
