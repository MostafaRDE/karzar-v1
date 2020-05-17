<template>
    <div style="background: url(/public/images/public/pubg-playerunknowns-battlegrounds-background.jpg) center top / cover fixed repeat-y">
        <rs-form :submit="chargeAccount">
            <div class="py-20 px-40"
                 style="background: #161519CC; width: 450px; max-width: 100%; min-height: 660px; color: #fff">
                <h3>{{ $t('glossaries.account_charging') }}</h3>
                <span class="mt-20 d-block">{{ $t('glossaries.enter_your_country_to_recharge_your_currency_account') }}</span>

                <rs-input-with-drop-down class="mt-20"
                                         type="number"
                                         min="0"
                                         :placeholder="$t('glossaries.your_amount')"
                                         :selectedSourceKey="selectedCurrency"
                                         @updateSelectedSourceKey="selectedCurrency = $event"
                                         :source="sourceCurrencies"
                                         v-model="inputAmount"/>
                <div class="mt-10 d-flex align-items-center">
                    <span class="opacity-8 me-10">{{ $t('glossaries.is_equal_to') }}</span>
                    <span lang="en" class="font-weight-900 font-size-lg">{{ (parseFloat(inputAmount) / parseFloat(pricesToDollar[selectedCurrency]) || 0).toFixed(2) }}$</span>
                </div>

                <rs-drop-down-pro class="mt-30" :source="accounts" v-model="selectedAccount">
                    <template slot-scope="{data}" slot="item-adapter">
                        <label-with-icon-drop-down-pro-adapter :data="data"/>
                    </template>
                </rs-drop-down-pro>

                <div v-if="selectedAccount !== ''">
                    <span class="mt-30 d-block">{{ accounts.find(account => account.key === selectedAccount).key1 }}</span>
                    <div class="border p-10 d-flex" style="background-color: #161519">
                        <img src="/public/images/public/icons/ic-copy.svg" alt="" class="cursor-pointer"
                             @click="copyKey2"/>
                        <span class="flex-grow-1 text-center">{{ accounts.find(account => account.key === selectedAccount).key2 }}</span>
                    </div>

                    <span class="mt-30 d-block">{{ $t('glossaries.and_in_the_last_step_send_a_screenshot_of_your_payment') }}</span>
                    <div class="text-center mt-10">
                        <rs-button class="mx-auto p-0 position-relative" type="button">
                            <transition name="fade">
                                <div v-if="this.attachment"
                                     class="position-absolute rounded-circle pxw-10 pxh-10 top-0 left-0"
                                     style="background-color: #f00; transform: translateX(-50%) translateY(-50%)"></div>
                            </transition>
                            <label class="cursor-pointer" style="padding: 13px 44px">
                                <input type="file" class="d-none" @change="updateAttachment"/>
                                <span class="me-20">+</span>
                                {{ $t('glossaries.select_file') }}
                            </label>
                        </rs-button>
                    </div>

                    <rs-button glow solid class="w-100 mt-40" type="submit" :loading="storing">{{ $t('glossaries.submit') }}</rs-button>
                </div>
            </div>
        </rs-form>
    </div>
</template>

<script>
    import {addTransaction, gateways} from "../../api"
    import i18n from "../../i18n"

    export default {
        name: "AccountCharging",

        title: () => i18n.t('glossaries.dashboard') + ' | ' + i18n.t('glossaries.account_charging'),

        data: () => ({
            timer: null,
            inputAmount: '0',
            pricesToDollar: {
                dollar: 0,
                euro: 0,
                pound: 0,
                krona: 0,
                krone: 0,
                franc: 0,
                lira: 0,
            },

            selectedCurrency: 'dollar',
            sourceCurrencies: [
                {key: 'dollar', icon: '/public/images/public/currencies/ic-krone.svg', label: i18n.t('currencies.dollar')},
                {key: 'euro', icon: '/public/images/public/currencies/ic-euro.svg', label: i18n.t('currencies.euro')},
                {key: 'pound', icon: '/public/images/public/currencies/ic-gbp.svg', label: i18n.t('currencies.pound_sterling')},
                {key: 'krona', icon: '/public/images/public/currencies/ic-krone.svg', label: i18n.t('currencies.swedish_krona')},
                {key: 'krone', icon: '/public/images/public/currencies/ic-krone.svg', label: i18n.t('currencies.norwegian_krone')},
                {key: 'franc', icon: '/public/images/public/currencies/ic-krone.svg', label: i18n.t('currencies.swiss_franc')},
                {key: 'lira', icon: '/public/images/public/currencies/ic-krone.svg', label: i18n.t('currencies.turkish_lira')},
            ],

            loadingGateways: false,
            selectedAccount: '',
            accounts: [
                {key: '', label: i18n.t('glossaries.charging_via'), image: ''}
            ],

            attachment: null,

            storing: false,
        }),

        methods: {
            copyKey2() {
                if (this.copyText(this.accounts.find(account => account.key === this.selectedAccount).key2)) {
                    this.$toast.success({
                        title: i18n.t('glossaries.copy'),
                        message: i18n.t('glossaries.copied'),
                    })
                } else {
                    this.$toast.error({
                        title: i18n.t('glossaries.copy'),
                        message: i18n.t('glossaries.copy_failed'),
                    })
                }
            },

            updateAttachment(e) {
                this.attachment = e.target.files[0]
            },

            getPrice() {
                fetch('https://api.exchangeratesapi.io/latest?base=USD')
                    .then(response => response.json())
                    .then(data => {
                        this.pricesToDollar.dollar = data.rates.USD;
                        this.pricesToDollar.euro = data.rates.EUR;
                        this.pricesToDollar.krona = data.rates.SEK;
                        this.pricesToDollar.krone = data.rates.NOK;
                        this.pricesToDollar.pound = data.rates.GBP;
                        this.pricesToDollar.franc = data.rates.CHF;
                        this.pricesToDollar.lira = data.rates.TRY;
                    })
                    .catch(error => {

                    })
                    .finally(() => {

                    })
            },

            getGateways() {
                this.loadingGateways = true;
                gateways()
                    .then(response => {
                        response.data.result.forEach(gateway => {
                            this.accounts.push({
                                key: gateway.id,
                                label: gateway.name,
                                image: `/api/v1/uploads?id=${gateway.image_media_id}`,
                                key1: gateway.key1,
                                key2: gateway.key2,
                            })
                        });
                    })
                    .catch(error => {

                    })
                    .finally(() => {
                        this.loadingGateways = false
                    })
            },

            chargeAccount() {
                if (!this.storing) {
                    let amount = (Math.floor(parseFloat(this.inputAmount) / parseFloat(this.pricesToDollar[this.selectedCurrency]))).toFixed(0);
                    if (amount < 5) {
                        this.$toast.error({
                            title: i18n.t('glossaries.error'),
                            message: i18n.t('messages.errors.transaction_amount_must_be_over_2_dollar'),
                        })
                    } else if (!this.attachment) {
                        this.$toast.error({
                            title: i18n.t('glossaries.error'),
                            message: i18n.t('messages.please_select_your_transaction_image_from_the_Select_File_section'),
                        })
                    } else {
                        this.storing = true;
                        addTransaction(amount, this.selectedAccount, 'ACCOUNT_CHARGING', 'INPUT', this.attachment)
                            .then(response => {
                                this.$toast.success({
                                    title: i18n.t('glossaries.account_charging'),
                                    message: i18n.t('messages.successes.account_charging_request_successful'),
                                });
                                this.$router.push({name: 'dashboardTransactions', params: {lang: this.$route.params.lang}})
                            })
                            .catch(error => {
                                this.$toast.error({
                                    title: i18n.t('glossaries.account_charging'),
                                    message: error.response.data.msg,
                                })
                            })
                            .finally(() => {
                                this.storing = false;
                            })
                    }
                }
            }
        },

        mounted() {
            this.getPrice();
            this.getGateways();

            let vm = this;

            this.timer = setInterval(function () {
                vm.getPrice();
            }, 180000)
        }
    }
</script>
