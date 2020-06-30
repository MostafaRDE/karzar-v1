<template>
    <div style="background: url(/public/images/public/pubg-playerunknowns-battlegrounds-background.jpg) center center / cover repeat-y">
        <rs-form :submit="chargeAccount">
            <div class="py-20 px-40"
                 style="background: #161519CC; width: 450px; max-width: 100%; min-height: 660px; color: #fff">
                <div class="d-flex justify-content-space-between align-items-center">
                    <h3>{{ $t('glossaries.account_charging') }}</h3>
                    <span>{{ moneyFormatFast($store.state.balance || '0', 0) }} {{ $t('currencies.toman') }}</span>
                </div>

                <rs-input class="mt-20 opacity-10"
                          type="number"
                          step="1"
                          label="مقدار"
                          labelIcon="/public/images/public/currencies/ic-dollar.svg"
                          mark="تومان"
                          v-model="amount"/>

                <rs-button glow solid class="w-100 mt-40" type="submit" :loading="storing">{{ $t('glossaries.deposit') }}</rs-button>
            </div>
        </rs-form>
    </div>
</template>

<script>
    import {addTransaction} from "../../api"
    import i18n from "../../i18n"

    export default {
        name: "AccountCharging",

        title: () => i18n.t('glossaries.dashboard') + ' | ' + i18n.t('glossaries.account_charging'),

        data: () => ({
            timer: null,
            amount: '0',
            storing: false,
        }),

        methods: {
            chargeAccount() {
                if (!this.storing) {
                    if (this.amount < 5000) {
                        this.$toast.error({
                            title: i18n.t('glossaries.error'),
                            message: i18n.t('messages.errors.the_minimum_allowed_charge_is_the_price_tomans', {amount: this.moneyFormatFast(process.env.MINIMUM_PAY || '0')}),
                        })
                    } else {
                        this.storing = true;
                        addTransaction(this.amount, this.selectedAccount, 'ACCOUNT_CHARGING', 'INPUT', null)
                            .then(response => {
                                this.$toast.success({
                                    title: i18n.t('glossaries.account_charging'),
                                    message: i18n.t('messages.successes.account_charging_request_successful'),
                                });
                                window.location.replace(response.data.url)
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
    }
</script>
