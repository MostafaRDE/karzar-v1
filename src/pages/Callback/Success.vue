<template>
    <div class="text-center position-absolute bottom-0 left-0 right-0 top-0 d-flex justify-content-center flex-direction-column" :style="{background: `url(${require('../../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover no-repeat`}">
        <div class="bottom-0 left-0 right-0 top-0 position-absolute" style="background: #252326e0"></div>

        {{ /* Main parent register content panel */ }}
        <div class="w-90 mx-auto z-index-1" style="max-width: 500px">

            {{ /* Main register content panel */ }}
            <div class="p-20 text-center" style="background: #0009">

                {{ /* Tick icon */ }}
                <span class="text-center d-block">
                    <svg style="width:100px;height:100px" viewBox="0 0 24 24">
                        <path fill="#14e787" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                    </svg>
                </span>

                {{ /* Header */ }}
                <h1 class="font-weight-100 text-center w-100 mb-30">{{ $route.query.msg }}</h1>

                {{ /* Button for goto login page */ }}
                <div class="text-center mb-10 mt-20">
                    <rs-button solid glow @click.native="gotoTransactions()">{{ $t('glossaries.transactions') }}</rs-button>
                </div>

            </div>
            {{ /* End main register content panel */ }}

        </div>
        {{ /* End main parent register content panel */ }}
    </div>
</template>

<script>
    import i18n from "../../i18n"

    export default {
        name: "Success",

        title: () => i18n.t('app.name') + ' - ' + i18n.t('messages.successes.payment_was_successful'),

        methods: {
            gotoTransactions() {
                // Goto login page
                this.$router.push({name: 'dashboardTransactions'})
            }
        },
    }
</script>
