<template>
    <div style="background: url(/public/images/public/pubg-playerunknowns-battlegrounds-background.jpg) center center / cover repeat-y">
        <rs-form>
            <div class="py-20 px-40"
                 style="background: #161519CC; width: 450px; max-width: 100%; min-height: 660px; color: #fff">
                <h3>{{ $t('glossaries.account_charging') }}</h3>
                <span class="mt-20 d-block">{{ $t('glossaries.enter_your_country_to_recharge_your_currency_account') }}</span>

                <rs-input-with-drop-down class="mt-20"
                                         type="number"
                                         :placeholder="$t('glossaries.your_amount')"
                                         :selectedSourceKey="selectedCurrency"
                                         :source="sourceCurrencies"
                                         v-model="inputAmount"/>
                <rs-input class="mt-20"
                          type="number"
                          :placeholder="$t('glossaries.is_equal_to')"
                          :label="$t('currencies.dollar')"
                          labelIcon="/public/images/public/currencies/ic-dollar.svg"
                          :value="`${(parseFloat(inputAmount) / parseFloat(pricesToDollar[selectedCurrency])).toFixed(2)}`"/>

                <rs-drop-down-pro class="mt-30" :source="accounts" v-model="selectedAccount">
                    <template slot-scope="{data}" slot="item-adapter">
                        <label-with-icon-drop-down-pro-adapter :data="data"/>
                    </template>
                </rs-drop-down-pro>

                <span class="mt-30 d-block">{{}}</span>
                <div class="border p-10 d-flex" style="background-color: #161519">
                    <img src="/public/images/public/icons/ic-copy.svg" alt=""/>
                    <span class="flex-grow-1 text-center">Paymamad@gmail.com</span>
                </div>

                <span class="mt-30 d-block">{{ $t('glossaries.and_in_the_last_step_send_a_screenshot_of_your_payment') }}</span>
                <div class="text-center mt-10">
                    <rs-button class="mx-auto">
                        <span class="me-20">+</span>
                        {{ $t('glossaries.select_file') }}
                    </rs-button>
                </div>

                <rs-button glow solid class="w-100 mt-40">{{ $t('glossaries.submit') }}</rs-button>
            </div>
        </rs-form>
    </div>
</template>

<script>
    export default {
        name: "AccountCharging",

        data: () => ({
            timer: null,
            inputAmount: '0',
            pricesToDollar: {
                euro: 0,
                krone: 0,
            },

            selectedCurrency: 'krone',
            sourceCurrencies: [
                {key: 'krone', icon: '/public/images/public/currencies/ic-krone.svg', label: 'Krone'},
                {key: 'euro', icon: '/public/images/public/currencies/ic-euro.svg', label: 'Euro'},
            ],

            selectedAccount: 'PAYPAL',
            accounts: [
                {key: 'PAYPAL', label: 'شارژ از طریق Paypal', image: '/public/images/public/icons/ic-paypal-circle.svg'}
            ]
        }),

        methods: {
            getPrice() {
                fetch('https://api.exchangeratesapi.io/latest?base=USD')
                    .then(response => response.json())
                    .then(data => {
                        this.pricesToDollar.euro = data.rates.EUR;
                        this.pricesToDollar.krone = data.rates.SEK;
                    })
                    .catch(error => {

                    })
                    .finally(() => {

                    })
            }
        },

        mounted() {
            this.getPrice();

            let vm = this;

            this.timer = setInterval(function () {
                vm.getPrice();
            }, 180000)
        }
    }
</script>
