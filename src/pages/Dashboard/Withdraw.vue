<template>
    <div :style="`background: url(/public/images/${$store.state.dir}/public/bg-withdraw-pubg.jpg) center top / cover fixed repeat-y`">
        <rs-form :submit="withdraw" @errors="setFormErrors">
            <div class="py-20 px-40"
                 style="background: #161519CC; width: 450px; max-width: 100%; min-height: 660px; color: #fff">
                <h3>{{ $t('glossaries.withdraw_from_account') }}</h3>
                <span class="mt-20 d-block">{{ $t('glossaries.enter_your_country_for_withdrawal_from_your_currency_account') }}</span>

                <span class="mt-20 d-block">{{ $t('glossaries.your_balance') }}:</span>
                <rs-input type="number"
                          :placeholder="$t('glossaries.your_amount')"
                          :label="$t('currencies.dollar')"
                          labelIcon="/public/images/public/currencies/ic-dollar.svg"
                          rules="required"
                          name="amount"
                          v-model="amount"/>
                <span class="text-danger">{{ getInputError('amount') }}</span>

                <rs-drop-down-pro class="mt-30" :source="accounts" v-model="selectedAccount">
                    <template slot-scope="{data}" slot="item-adapter">
                        <label-with-icon-drop-down-pro-adapter :data="data"/>
                    </template>
                </rs-drop-down-pro>

                <div v-if="selectedAccount !== ''">
                    <span class="mt-30 d-block">{{ $t('glossaries.enter_your_id') }}</span>
                    <rs-input :placeholder="$t('glossaries.enter_your_id')"
                              inputClass="text-center"
                              rules="required"
                              name="id"
                              :error="getInputError('id')"
                              v-model="key1"/>
                    <span class="text-danger">{{ getInputError('id') }}</span>

                    <span class="mt-30 d-block">{{ $t('glossaries.receiver_name') }}</span>
                    <rs-input :placeholder="$t('glossaries.receiver_name')"
                              inputClass="text-center"
                              rules="required"
                              name="receiver_name"
                              :error="getInputError('receiver_name')"
                              v-model="key2"/>
                    <span class="text-danger">{{ getInputError('receiver_name') }}</span>

                    <span class="mt-30 d-block">{{ $t('glossaries.after_the_request_you_will_be_paid_between_1_and_24_hours') }}</span>

                    <rs-button glow solid class="w-100 mt-10" :loading="storing" type="submit">{{ $t('glossaries.withdrawal') }}</rs-button>
                </div>
            </div>
        </rs-form>
    </div>
</template>

<script>
    import {addTransaction, gateways} from "../../api"
    import i18n from "../../i18n"

    export default {
        name: "Withdraw",

        title: () => i18n.t('glossaries.dashboard') + ' | ' + i18n.t('glossaries.withdraw'),

        data: () => ({
            formErrors: {},
            amount: '',
            key1: '',
            key2: '',
            storing: false,

            loadingGateways: false,
            selectedAccount: '',
            accounts: [
                {key: '', label: i18n.t('glossaries.charging_via'), image: ''}
            ]
        }),

        methods: {
            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors(errors) {
                this.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError(key) {
                return (this.formErrors.hasOwnProperty(key)) ? this.formErrors[key][0] : ''
            },

            getGateways() {
                this.loadingGateways = true;
                gateways('withdrawal')
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

            withdraw() {
                if (!this.storing) {
                    let amount = (Number(this.amount)).toFixed(0);

                    if (amount < 20) {
                        this.$toast.error({
                            title: '',
                            message: i18n.t('messages.errors.transaction_amount_must_be_over_20_dollar')
                        })
                    } else {
                        this.storing = true;
                        addTransaction(amount, this.selectedAccount, 'WITHDRAW_FROM_ACCOUNT', 'OUTPUT', null, JSON.stringify({key1:{type:"string",value:this.key1},key2: {type: "string",value: this.key2}}))
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
            this.getGateways();
        }
    }
</script>
