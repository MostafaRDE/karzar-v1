<template>
    <div class="py-20 px-20">
        <rs-modal classModal="p-20"
                  styleModal="width: 280px"
                  v-model="modals.imageProfile.visibility">
            <h5 class="text-white text-center mb-20">{{ $t('glossaries.change_profile_image') }}</h5>

            <vue-cropper ref="cropper"
                         :src="modals.imageProfile.imgSrc"
                         :aspect-ratio="1/1"
                         style="width: 240px; height: 240px"
                         alt="Profile Image"/>

            <div class="d-flex">
                <rs-button class="mt-20 w-100" solid glow @click.native="cropNewProfileImage">{{ $t('glossaries.submit') }}</rs-button>
                <rs-button class="mt-20 w-100" @click.native="cropNewProfileImage">{{ $t('glossaries.cancel') }}</rs-button>
            </div>
        </rs-modal>

        <div class="row">
            <div class="col-sm-6" :class="responsiveObject.sizes.sm > width ? 'border-bottom pb-20' : 'border-end'">
                <rs-form class="px-10" :submit="updateProfile" @errors="setFormErrors($event, 'PROFILE')">
                    <h5>{{ $t('glossaries.base_information') }}</h5>

                    <div class="mt-30">
                        <div class="d-flex flex-direction-column">
                            <div class="overflow-hidden position-relative"
                                 :style="getProfileImageCoverStyle">
                                <img :src="getProfileImage"
                                     alt=""
                                     class="w-100"/>
                            </div>
                        </div>
                        <div class="mt-20">
                            <rs-button class="p-0 position-relative" type="button">
                                <label class="cursor-pointer" style="padding: 12.5px 20px">
                                    <input type="file" ref="profileImageSelector" class="d-none" @change="selectNewProfileImage"/>
                                    <span class="me-20">+</span>
                                    {{ $t('glossaries.select_profile_image') }}
                                </label>
                            </rs-button>
                            <rs-button class="position-relative ms-10"
                                       solid glow
                                       type="button"
                                       @click.native="clearSelectedImage">
                                {{ $t('glossaries.remove') }}
                            </rs-button>
                        </div>
                    </div>

                    <div>
                        <rs-input class="mt-30"
                                  :label="$t('glossaries.email')"
                                  name="email"
                                  disabled
                                  v-model="fields.profile.email"
                                  :rules="fields.profile.rules.email"/>
                        <span class="text-danger">{{ getInputError('email', 'PROFILE') }}</span>
                    </div>

                    <div>
                        <rs-input class="mt-20"
                                  :label="$t('glossaries.name')"
                                  name="name"
                                  v-model="fields.profile.name"
                                  :rules="fields.profile.rules.name"/>
                        <span class="text-danger">{{ getInputError('name', 'PROFILE') }}</span>
                    </div>

                    <div>
                        <rs-input class="mt-20"
                                  :label="$t('glossaries.mobile_number')"
                                  name="mobile_number"
                                  v-model="fields.profile.mobileNumber"
                                  :rules="fields.profile.rules.mobileNumber"/>
                        <span class="text-danger">{{ getInputError('mobile_number', 'PROFILE') }}</span>
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
                                  name="password"
                                  v-model="fields.password.password"
                                  :rules="fields.password.rules.password"/>
                        <span class="text-danger">{{ getInputError('password', 'PASSWORD') }}</span>
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

            modals: {
                imageProfile: {
                    visibility: false,
                    imgSrc: null,
                },
            },

            fields: {
                profile: {
                    imgCrop: null,
                    imgBlob: null,

                    name: '',
                    mobileNumber: '',
                    email: '',

                    rules: {
                        name: 'required|string',
                        mobileNumber: 'required|string:digits',
                        email: 'required|string',
                    }
                },
                password: {
                    currentPassword: '',
                    password: '',
                    retypePassword: '',

                    rules: {
                        currentPassword: 'required|string',
                        password: 'required|password|min:8',
                        retypePassword: 'required|confirm_password',
                    }
                }
            }
        }),

        computed: {
            getProfile() {
                return this.$store.state.profile
            },
            getProfileImage() {
                if (this.fields.profile.imgCrop)
                    return this.fields.profile.imgCrop;
                else
                    return this.$store.getters['getProfileImage'];
            },
            getProfileImageCoverStyle() {
                if (this.fields.profile.imgCrop || this.getProfile && this.getProfile.profile_image) {
                    return 'padding: 4px; width: 100%; max-width: 200px; background: url(/public/images/public/pubg-default-profile-border.svg) no-repeat; background-size: contain';
                }
                else
                    return 'width: 100%; max-width: 200px;';
            },
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

            selectNewProfileImage(e) {
                this.modals.imageProfile.imgSrc = URL.createObjectURL(e.target.files[0]);
                this.modals.imageProfile.visibility = true
            },
            cropNewProfileImage() {
                this.fields.profile.imgCrop = this.$refs.cropper.getCroppedCanvas().toDataURL();
                this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
                    this.fields.profile.imgBlob = new File([blob], `profile_image${this.extNameFromMimeType(blob.type)}`, { type: blob.type, lastModified:new Date() })
                });
                this.modals.imageProfile.visibility = false;
            },
            clearSelectedImage() {
                this.fields.profile.imgCrop = null;
                this.fields.profile.imgBlob = null;
            },

            updateProfile() {
                if (!this.updatingProfile) {
                    this.formErrorsProfile = {};

                    this.updatingProfile = true;
                    updateProfile(this.fields.profile.name, this.fields.profile.mobileNumber, this.fields.profile.imgBlob)
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
                    updatePassword(this.fields.password.currentPassword, this.fields.password.password)
                        .then(response => {
                            this.$toast.success({
                                title: i18n.t('glossaries.password_update'),
                                message: i18n.t('messages.successes.the_password_was_successfully_updated'),
                            });
                            this.fields.password.currentPassword = '';
                            this.fields.password.password = '';
                            this.fields.password.retypePassword = '';
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
                    this.fields.profile.email = profile.email;
                    this.fields.profile.mobileNumber = profile.mobile_number
                }
            },
            'modals.imageProfile.visibility'(val) {
                if (!val) {
                    this.modals.imageProfile.imgSrc = null;
                    this.$refs.profileImageSelector.value = null;
                }
            }
        },

        mounted() {
            if (this.$store.state.profile) {
                this.fields.profile.name = this.$store.state.profile.name;
                this.fields.profile.email = this.$store.state.profile.email;
                this.fields.profile.mobileNumber = this.$store.state.profile.mobile_number;
            }

            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        }
    }
</script>
