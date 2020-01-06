<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column" :style="{background: `url(${require('../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent register content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px">

            {{ /* Main verify-email-address content panel */ }}
            <div class="p-20 text-center" style="background: #0009">

                {{ /* Tick icon */ }}
                <span class="text-center d-block">
                    <svg style="width:100px;height:100px" viewBox="0 0 24 24">
                        <path fill="#14e787" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                    </svg>
                </span>

                {{ /* Header */ }}
                <h1 class="font-weight-100 text-center w-100 mb-30">{{
                    $t('pages.authentication.verify_email_address.header')
                    }}</h1>

                <hr class="opacity-4 mx-40"/>

                {{ /* Content */ }}
                <p class="mt-40">{{ $t('pages.authentication.verify_email_address.content.created_email_and_sent_verifier_email',
                    {site_name: siteName}) }}</p>
                <p class="mt-20">{{ $t('pages.authentication.verify_email_address.content.active_account_first') }}</p>

                {{ /* Button for goto login page */ }}
                <div class="text-center mb-10 mt-20">
                    <rs-button solid glow @click.native="gotoLogin()">{{ $t('glossaries.log_in') }}</rs-button>
                </div>

            </div>
            {{ /* End main verify-email-address content panel */ }}

        </div>
        {{ /* End main parent verify-email-address content panel */ }}
    </div>
</template>

<script>
    // Import i18n plugin for translating texts
    import i18n from '../../i18n'

    export default {
        name: "VerifyEmail",

        title: () => i18n.t('pages.authentication.verify_email_address.title'),

        data: () => ({
            // Load site name translate
            siteName: i18n.t('app.name'),
        }),

        methods: {
            gotoLogin() {
                // Remove data in authentication module store of vuex
                this.$store.commit('authentication/setVerifyEmail', false);

                this.$router.push({name: 'login'})
            }
        },
    }
</script>
