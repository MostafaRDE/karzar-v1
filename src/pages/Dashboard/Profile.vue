<template>
    <div class="py-20 px-20">
        <div class="row">
            <div class="col-sm-6" :class="responsiveObject.sizes.sm > width ? 'border-bottom pb-20' : 'border-end'">
                <rs-form class="px-10" :submit="updateProfile" @errors="setFormErrors($event, 'PROFILE')">
                    <h5>{{ $t('glossaries.base_information') }}</h5>

                    <div class="mt-30">
                        <div v-if="imgSrc">
                            <vue-cropper ref="cropper"
                                         :src="imgSrc"
                                         :aspect-ratio="1/1"
                                         alt="Source Image"/>
                        </div>
                        <div v-else class="d-flex">
                            <rs-button class="p-0 position-relative" type="button">
                                <transition name="fade">
                                    <div v-if="imgSrc"
                                         class="position-absolute rounded-circle pxw-10 pxh-10 top-0 left-0"
                                         style="background-color: #f00; transform: translateX(-50%) translateY(-50%)"></div>
                                </transition>
                                <label class="cursor-pointer" style="padding: 13px 44px">
                                    <input type="file" class="d-none"/>
                                    <span class="me-20">+</span>
                                    {{ $t('glossaries.select_profile_image') }}
                                </label>
                            </rs-button>
                        </div>
                    </div>

                    <div>
                        <rs-input class="mt-30"
                                  :label="$t('glossaries.name')"
                                  name="name"
                                  v-model="fields.profile.name"
                                  :rules="fields.profile.rules.name"/>
                        <span class="text-danger">{{ getInputError('name', 'PROFILE') }}</span>
                    </div>

                    <div>
                        <rs-input class="mt-20"
                                  :label="$t('glossaries.whatsapp_number')"
                                  name="whatsapp_number"
                                  v-model="fields.profile.whatsappNumber"
                                  :rules="fields.profile.rules.whatsappNumber"/>
                        <span class="text-danger">{{ getInputError('whatsapp_number', 'PROFILE') }}</span>
                    </div>

                    <rs-button type="submit" class="mt-30" :loading="updatingProfile" solid glow>{{ $t('glossaries.update') }}</rs-button>
                </rs-form>
            </div>
            <div class="col-sm-6">
                <rs-form class="px-10" :submit="updatePassword" @errors="setFormErrors($event, 'PASSWORD')">
                    <h5>{{ $t('glossaries.change_password') }}</h5>

                    <div class="mb-15 mt-30">
                        <rs-input type="password"
                                  :label="$t('glossaries.current_password')"
                                  name="currentPassword"
                                  v-model="fields.password.currentPassword"
                                  :rules="fields.password.rules.currentPassword"/>
                        <span class="text-danger">{{ getInputError('currentPassword', 'PASSWORD') }}</span>
                    </div>

                    <hr class="opacity-1" style="border: none; border-top: solid 1px #fff"/>

                    <div class="mt-15">
                        <rs-input type="password"
                                  :label="$t('glossaries.new_password')"
                                  name="newPassword"
                                  v-model="fields.password.newPassword"
                                  :rules="fields.password.rules.newPassword"/>
                        <span class="text-danger">{{ getInputError('newPassword', 'PASSWORD') }}</span>
                    </div>

                    <div class="mt-20">
                        <rs-input type="password"
                                  :label="$t('glossaries.retype_new_password')"
                                  name="retypePassword"
                                  v-model="fields.password.retypePassword"
                                  :rules="fields.password.rules.retypePassword"/>
                        <span class="text-danger">{{ getInputError('retypePassword', 'PASSWORD') }}</span>
                    </div>

                    <rs-button class="mt-30" type="submit" :loading="updatingPassword" solid glow>{{ $t('glossaries.change') }}</rs-button>
                </rs-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {updateProfile, updatePassword} from '../../api'
    import i18n from '../../i18n'
    import ResponsiveObject from "../../modules/objects/Responsive"

    export default {
        name: "Profile",

        title: () => i18n.t('glossaries.dashboard') + ' | ' + i18n.t('glossaries.profile'),

        data: () => ({
            responsiveObject: ResponsiveObject,
            width: 0,

            // Form errors that back from "rs-form"-component
            formErrorsProfile: {},
            formErrorsPassword: {},

            updatingProfile: false,
            updatingPassword: false,
            imgSrc: null,

            fields: {
                profile: {
                    name: '',
                    whatsappNumber: '',

                    rules: {
                        name: 'required|string',
                        whatsappNumber: 'required|string:digits',
                    }
                },
                password: {
                    currentPassword: '',
                    newPassword: '',
                    retypePassword: '',

                    rules: {
                        currentPassword: 'required|string',
                        newPassword: 'required|password|min:8',
                        retypePassword: 'required|confirm_password',
                    }
                }
            }
        }),

        computed: {
            getProfile() {
                return this.$store.state.profile
            }
        },

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors(errors, type) {
                switch (type) {
                    case 'PROFILE':
                        this.formErrorsProfile = errors;
                        break;

                    case 'PASSWORD':
                        this.formErrorsPassword = errors;
                        break;
                }
            },

            // Customizing error-message for show in view (below inputs)
            getInputError(key, type) {
                switch (type) {
                    case 'PROFILE':
                        return (this.formErrorsProfile.hasOwnProperty(key)) ? this.formErrorsProfile[key][0] : '';

                    case 'PASSWORD':
                        return (this.formErrorsPassword.hasOwnProperty(key)) ? this.formErrorsPassword[key][0] : '';
                }
            },

            updateProfile() {
                if (!this.updatingProfile) {
                    this.formErrorsProfile = {};

                    this.updatingProfile = true;
                    updateProfile(this.fields.profile.name, this.fields.profile.whatsappNumber)
                        .then(response => {
                            this.$toast.success({
                                title: i18n.t('glossaries.profile_update'),
                                message: i18n.t('messages.successes.the_profile_was_successfully_updated'),
                            });
                            this.$store.dispatch('getProfile');
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: i18n.t('glossaries.profile_update'),
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.updatingProfile = false;
                        })
                }
            },

            updatePassword() {
                if (!this.updatingPassword) {
                    this.formErrorsPassword = {};

                    this.updatingPassword = true;
                    updatePassword(this.fields.password.currentPassword, this.fields.password.newPassword)
                        .then(response => {
                            this.$toast.success({
                                title: i18n.t('glossaries.password_update'),
                                message: i18n.t('messages.successes.the_password_was_successfully_updated'),
                            });
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: i18n.t('glossaries.password_update'),
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.updatingPassword = false;
                        })
                }
            }
        },

        watch: {
            getProfile: {
                deep: true,
                handler(profile) {
                    this.fields.profile.name = profile.name;
                    this.fields.profile.whatsappNumber = profile.whatsapp_number
                }
            }
        },

        mounted() {
            if (this.$store.state.profile) {
                this.fields.profile.name = this.$store.state.profile.name;
                this.fields.profile.whatsappNumber = this.$store.state.profile.whatsapp_number;
            }

            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        }
    }
</script>
