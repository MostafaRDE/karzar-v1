<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column" :style="{background: `url(${require('../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent register content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px; max-height: calc(100vh - 40px); overflow-y: overlay;">

            {{ /* Main register content panel */ }}
            <div class="p-20 text-start position-relative" style="background: #0009">

                <div class="position-absolute">
                    <span @click="$router.push({name: 'home', params: {lang: 'fa'}})"
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

                    <span class="font-size-xs font-weight-700 w-100 d-flex mb-5 mt-15 text-warning">{{ $t('messages.infos.enter_your_desired_password__no_need_for_a_gmail_password') }}</span>
                    {{ /* Password input */ }}
                    <rs-input type="password"
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

                    {{ /* Mobile number input */ }}
                    <rs-input type="text"
                              class="mt-20"
                              inputClass="font-size-md"
                              :label="$t('glossaries.mobile_number')"
                              name="mobileNumber"
                              maxlength="11"
                              v-model="fields.mobileNumber"
                              :rules="fields.rules.mobileNumber"/>
                    {{ /* Email form error */ }}
                    <span class="text-danger">{{ getInputError('mobileNumber') }}</span>

<!--                    <span class="font-size-xs font-weight-700 w-100 d-flex mb-5 mt-15 text-warning">{{ $t('glossaries.your_pubg_account_level_must_be_at_least_20') }}</span>-->
                    {{ /* Player ID input */ }}
<!--                    <rs-input type="text"-->
<!--                              inputClass="font-size-md"-->
<!--                              :label="$t('glossaries.player_id')"-->
<!--                              name="playerId"-->
<!--                              v-model="fields.playerId"-->
<!--                              :rules="fields.rules.playerId"/>-->
<!--                    {{ /* Email form error */ }}-->
<!--                    <span class="text-danger">{{ getInputError('playerId') }}</span>-->

<!--                    <span class="font-size-xs font-weight-700 w-100 d-flex mb-5 mt-15 text-warning">{{ $t('messages.infos.your_character_s_id_and_name_will_be_reviewed_within_the_next_2_hours__please_make_sure_they_are_correct') }}</span>-->
<!--                    {{ /* Player Name input */ }}-->
<!--                    <rs-input type="text"-->
<!--                              inputClass="font-size-md"-->
<!--                              :label="$t('glossaries.player_name')"-->
<!--                              name="playerName"-->
<!--                              v-model="fields.playerName"-->
<!--                              :rules="fields.rules.playerName"/>-->
<!--                    {{ /* Email form error */ }}-->
<!--                    <span class="text-danger">{{ getInputError('playerName') }}</span>-->

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
<!--                    <div class="mb-15 mt-10" v-if="height >= 660">-->
<!--&lt;!&ndash;                        <rs-check-box :label="$t('pages.authentication.register.content.accepting_text_term_of_use')"&ndash;&gt;-->
<!--&lt;!&ndash;                                      labelClass="font-size-xs"&ndash;&gt;-->
<!--&lt;!&ndash;                                      name="is_accepted_term_of_use"&ndash;&gt;-->
<!--&lt;!&ndash;                                      v-model="fields.isAcceptTermOfUse"&ndash;&gt;-->
<!--&lt;!&ndash;                                      :rules="fields.rules.isAcceptTermOfUse"/>&ndash;&gt;-->
<!--&lt;!&ndash;                        {{ /* "Term of Use" form error */ }}&ndash;&gt;-->
<!--&lt;!&ndash;                        <span class="text-danger">{{ getInputError('is_accepted_term_of_use') }}</span><br/>&ndash;&gt;-->
<!--                        {{ /* "Term of Use" link */ }}-->
<!--                        <a href="#" class="text-info font-size-xs" target="_blank">{{-->
<!--                            $t('pages.authentication.register.content.the_site_s_term_of_use', { site_name: siteName })-->
<!--                            }}</a>-->
<!--                    </div>-->

                    {{ /* "Already registered? Login" text */ }}
                    <div class="mb-30 mt-10 d-flex">
                        <span class="font-size-xs">
                            {{ $t('questions.already_registered') }}
                            <router-link :to="{name: 'login'}" class="text-info font-size-xs">{{ $t('glossaries.login') }}</router-link>
                        </span>
                    </div>

                    <div class="mb-30 mt-10 d-flex justify-content-center">
                        <vue-grecaptcha v-model="captcha"/>
                    </div>

                    {{ /* Register(Submit) button */ }}
                    <div class="text-center">
                        <rs-button type="submit"
                                   class="btn m-0 w-40 text-nowrap"
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

            captcha: null,

            // Fields of page
            fields: {
                email: '',
                password: '',
                retypePassword: '',
                mobileNumber: '',
                playerId: '',
                playerName: '',
                referCode: '',
                isAcceptTermOfUse: true,

                // Rules of inputs of page
                rules: {
                    email: 'required|email',
                    password: 'required|string|min:6',
                    retypePassword: 'required|confirm_password',
                    mobileNumber: 'required|string:digits',
                    playerId: 'required|string:digits',
                    playerName: 'required|string',
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

            captcha: null,

            // Submit form after form validation (If is successful)
            submit() {
                if (!this.captcha) {
                    this.$toast.error({
                        title: i18n.t('glossaries.recaptcha_approval'),
                        message: i18n.t('messages.errors.please_confirm_that_you_are_not_a_robot_first'),
                    });
                    return;
                }

                if (!this.registering) {
                    // Clear form errors
                    this.setFormErrors({});
                    // Remove message server error
                    this.registrationError = {};
                    // Set "true" flag's loading in submit button & show it
                    this.registering = true;

                    // Call "register" api method
                    register(this.fields.email.trim(), this.fields.password, this.fields.mobileNumber.trim(), this.fields.playerId.trim(), this.fields.playerName.trim(), this.fields.referCode.trim(), this.captcha)
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
                            this.registering = false;
                            grecaptcha.reset();
                        })
                }
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
