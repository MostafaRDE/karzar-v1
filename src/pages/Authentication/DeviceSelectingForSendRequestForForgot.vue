<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column"
         id="devices-selecting-for-send-request-for-forgot"
         :style="{background: `url(${require('../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent reset-password content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px">

            {{ /* Main reset-password content panel */ }}
            <div class="pt-20 text-center overflow-hidden position-relative" style="background: #0009">

                <div class="position-absolute">
                    <span @click="$router.go(-1)"
                          class="text-white d-flex cursor-pointer"
                          :style="{transform: $store.state.dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)'}">
                        <icon-arrow-left/>
                    </span>
                </div>

                {{ /* Header */ }}
                <h1 class="font-weight-100 mb-30" style="font-size: 2.2em">{{
                    $t('pages.authentication.send_reset_password_link_to.header') }}</h1>

                {{ /* Alerts of actions some as (errors, warnings, success messages and ... */ }}
                <rs-alert-server v-if="Object.entries(serverError).length > 0"
                                 :icon="require('../../../public/images/public/icons/ic-info.svg')"
                                 color="danger"
                                 :message="serverError"
                                 class="mb-40 mx-40">
                </rs-alert-server>

                {{ /* Devices list */ }}
                <ul class="text-start" id="devices-selecting-for-send-request-for-forgot--devices">
                    {{ /* Device item */ }}
                    <li v-for="(device, index) of $store.state.authentication.devicesForSendRequestForForgot"
                        :key="index"
                        :class="{'disabled' : sendingRequestForForgot === index}"
                        @click="sendRequestForForgot(device.id, index)"
                        class="cursor-pointer px-30 py-20 border-top d-flex">

                        {{ /* Info icon */ }}
                        <svg class="me-5" style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#fff" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>

                        {{ /* Device title */ }}
                        <span class="flex-grow-1">{{ device.value }}</span>

                        {{ /* Loading after click device for processing request */ }}
                        <rs-overlay-loading :loading="true" :width="24" type="default" v-if="sendingRequestForForgot === index" />

                        {{
                        /**
                        * Left arrow for "ltr" and right arrow for "rtl" mode to help user for can suggested after
                        * click on the link, the site move user to another page
                        */
                        /* Left Arrow */ }}
                        <mdi-arrow-left v-if="$store.state.dir === 'ltr'" />
                        {{ /* Right Arrow */ }}
                        <mdi-arrow-right v-if="$store.state.dir === 'rtl'" />
                    </li>
                </ul>
                {{ /* End devices list */ }}

            </div>
            {{ /* End main reset-password content panel */ }}

        </div>
        {{ /* End main parent reset-password content panel */ }}
    </div>
</template>

<script>
    // Import i18n plugin for translating texts
    import i18n from '../../i18n'

    // Import "send_request_for_forgot" api method for send token to device for reset-password
    import {send_request_for_forgot} from '../../api'

    export default {
        name: "DeviceSelectingForSendRequestForForgot",

        components: {
            'icon-arrow-left': () => import('../../components/icons/IconArrowLeft.vue'),
            'mdi-arrow-left': () => import("../../components/icons/MaterialDesignIcons/MdiArrowLeft.vue"),
            'mdi-arrow-right': () => import("../../components/icons/MaterialDesignIcons/MdiArrowRight.vue"),
        },

        title: () => i18n.t('pages.authentication.send_reset_password_link_to.title'),

        data: () => ({
            // Load site name translate
            siteName: i18n.t('app.name'),

            // Loader reset-password button status
            sendingRequestForForgot: -1,

            // Flag for check is the on requesting or not
            processing: false,

            // Server error message after submit data
            serverError: {},
        }),

        methods: {
            // Submit form after form validation (If is successful)
            sendRequestForForgot(id, index) {
                // Set "int" flag's loading in device button & show loading it
                this.sendingRequestForForgot = index;
                // Set "true" processing flag; because process requesting to server start
                this.processing = true;
                // Remove message server error
                this.serverError = {};

                send_request_for_forgot(id)
                    .then(response => {
                        // Show toast successful
                        this.$toast.success({
                            title: i18n.t('pages.authentication.send_reset_password_link_to.content.send_reset_password_link'),
                            message: i18n.t('messages.successes.send_reset_password_link_to_sent'),
                        });

                        // Remove data in authentication module store of vuex
                        this.$store.commit('authentication/storeDevicesForSendRequestForForgot', null);
                        // Store data in authentication module store of vuex
                        this.$store.commit('authentication/setMessagePasswordResetLinkSent', true);
                        // Goto password-reset-link-sent page
                        this.$router.push({name: 'passwordResetLinkSent'});
                    })
                    .catch(error => {
                        // Show message server error
                        this.serverError = {
                            code: Math.abs(error.response.data.error),
                            message: error.response.data.msg,
                        };

                        // Show toast failed
                        this.$toast.error({
                            title: i18n.t('pages.authentication.send_reset_password_link_to.content.send_reset_password_link'),
                            message: i18n.t('messages.errors.send_reset_password_link_to_failed'),
                        })
                    })
                    .finally(() => {
                        // Set "false" processing flag; because process requesting to server end
                        this.processing = false;
                        // Set "int" flag's loading in device button & hide loading it
                        this.sendingRequestForForgot = -1
                    });
            }
        },
    }
</script>

<style lang="stylus">
    #devices-selecting-for-send-request-for-forgot
        &--devices
            li
                transition all .5s

                &:hover
                    background rgba(255, 255, 255, .1)
                    transition all .3s
</style>
