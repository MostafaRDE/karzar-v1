<template>
    <div :style="`background: url(/public/images/${$store.state.dir}/public/bg-withdraw-pubg.jpg) center center / cover repeat-y`">
        <rs-form :submit="withdraw" @errors="setFormErrors">
            <div class="py-20 px-40"
                 style="background: #161519CC; width: 450px; max-width: 100%; min-height: 660px; color: #fff">
                <h3>{{ $t('glossaries.withdraw_from_account') }}</h3>
                <span class="mt-20 d-block">{{ $t('glossaries.enter_your_country_for_withdrawal_from_your_currency_account') }}</span>

                <span class="mt-20 d-block">{{ $t('glossaries.your_balance') }}:</span>
                <rs-input type="number"
                          :label="$t('glossaries.amount2')"
                          labelIcon="/public/images/public/currencies/ic-dollar.svg"
                          rules="required"
                          name="amount"
                          :mark="$t('currencies.toman')"
                          v-model="amount"/>
                <span class="text-danger">{{ getInputError('amount') }}</span>

                <span class="mt-30 d-block">{{ $t('glossaries.card_number') }}</span>
                <rs-input :placeholder="$t('glossaries.card_number')"
                          inputClass="text-center"
                          rules="required"
                          name="cardNumber"
                          v-model="key1"/>
                <span class="text-danger">{{ getInputError('cardNumber') }}</span>

                <span class="mt-30 d-block">{{ $t('glossaries.receiver_name') }}</span>
                <rs-input :placeholder="$t('glossaries.receiver_name')"
                          inputClass="text-center"
                          rules="required"
                          name="receiverName"
                          v-model="key2"/>
                <span class="text-danger">{{ getInputError('receiverName') }}</span>

                <span class="mt-30 d-block">{{ $t('glossaries.after_the_request_you_will_be_paid_between_1_and_24_hours') }}</span>

                <rs-button glow solid class="w-100 mt-10" :loading="storing" type="submit">{{ $t('glossaries.withdrawal') }}</rs-button>
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

            withdraw() {
                this.formErrors = {};
                if (!this.storing) {
                    let amount = (Number(this.amount)).toFixed(0);

                    if (amount < 20) {
                        this.$toast.error({
                            title: '',
                            message: i18n.t('messages.errors.transaction_amount_must_be_over_20_dollar')
                        })
                    } else {
                        this.storing = true;
                        addTransaction(amount, 1, 'WITHDRAW_FROM_ACCOUNT', 'OUTPUT', JSON.stringify({key1:{type:"string",value:this.key1},key2: {type: "string",value: this.key2}}))
                            .then(response => {
                                this.$toast.success({
                                    title: i18n.t('glossaries.withdrawal'),
                                    message: i18n.t('messages.successes.withdrawal_request_successful'),
                                });
                                this.$router.push({name: 'dashboardTransactions', params: {lang: this.$route.params.lang}})
                            })
                            .catch(error => {
                                this.$toast.error({
                                    title: i18n.t('glossaries.withdrawal'),
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
