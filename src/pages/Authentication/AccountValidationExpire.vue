<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column" :style="{background: `url(${require('../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent account-validation-ok content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px">

            {{ /* Main account-validation-ok content panel */ }}
            <div class="p-20 text-center" style="background: #0009">

                {{ /* Tick icon */ }}
                <span class="text-center d-block">
                    <svg style="width:100px;height:100px" viewBox="0 0 24 24">
                        <path fill="#f72e58" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                </span>

                {{ /* Header */ }}
                <h1 class="font-weight-100 text-center w-100 mb-30">{{
                    $t('pages.authentication.account_validation_expire.header')
                    }}</h1>

                <hr class="opacity-4 mx-40"/>

                {{ /* Content */ }}
                <p class="mt-40 font-size-lg">{{ $t('pages.authentication.account_validation_expire.content.message') }}</p>

                {{ /* Button for goto exchange page */ }}
                <div class="text-center mb-10 mt-20">
                    <rs-button solid glow @click.native="resendVerificationEmail()">{{ $t('glossaries.resend_verification_email') }}</rs-button>
                </div>

            </div>
            {{ /* End main account-validation-ok content panel */ }}

        </div>
        {{ /* End main parent account-validation-ok content panel */ }}
    </div>
</template>

<script>
    // Import i18n plugin for translating texts
    import i18n from '../../i18n'

    export default {
        name: "AccountValidationOk",

        title: () => i18n.t('pages.authentication.account_validation_expire.title'),

        data: () => ({
            // Load site name translate
            siteName: i18n.t('app.name'),
        }),

        methods: {
            resendVerificationEmail() {
                this.$router.push({name: 'login'})
            }
        },
    }
</script>
