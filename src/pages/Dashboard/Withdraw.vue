<template>
    <div style="background: url(/public/images/public/bg-withdraw-pubg.jpg) center center / cover repeat-y">
        <rs-form>
            <div class="py-20 px-40"
                 style="background: #161519CC; width: 450px; max-width: 100%; min-height: 660px; color: #fff">
                <h3>{{ $t('glossaries.withdraw_from_account') }}</h3>
                <span class="mt-20 d-block">{{ $t('glossaries.enter_your_country_for_withdrawal_from_your_currency_account') }}</span>

                <span class="mt-20 d-block">{{ $t('glossaries.your_balance') }}:</span>
                <rs-input-with-drop-down type="number"
                                         :placeholder="$t('glossaries.your_amount')"
                                         :selectedSourceKey="selectedCurrency"
                                         :source="sourceCurrencies"
                                         v-model="amount"/>

                <rs-drop-down-pro class="mt-30" :source="accounts" v-model="selectedAccount">
                    <template slot-scope="{data}" slot="item-adapter">
                        <label-with-icon-drop-down-pro-adapter :data="data"/>
                    </template>
                </rs-drop-down-pro>

                <span class="mt-30 d-block">{{}}</span>
                <rs-input placeholder="Enter your swish id" inputClass="text-center" />

                <span class="mt-30 d-block">{{ $t('glossaries.receiver_name') }}</span>
                <rs-input :placeholder="$t('glossaries.receiver_name')" inputClass="text-center" />

                <span class="mt-30 d-block">{{ $t('glossaries.after_the_request_you_will_be_paid_between_1_and_24_hours') }}</span>

                <rs-button glow solid class="w-100 mt-10">{{ $t('glossaries.withdrawal') }}</rs-button>
            </div>
        </rs-form>
    </div>
</template>

<script>
    export default {
        name: "Withdraw",

        data: () => ({
            amount: '',

            selectedCurrency: 'krone',
            sourceCurrencies: [
                {key: 'krone', icon: '/public/images/public/currencies/ic-krone.svg', label: 'Krone'},
                {key: 'euro', icon: '/public/images/public/currencies/ic-euro.svg', label: 'Euro'},
            ],

            selectedAccount: 'SWISH',
            accounts: [
                {key: 'SWISH', label: 'برداشت از طریق Swish', image: '/public/images/public/icons/ic-swish.svg'}
            ]
        }),
    }
</script>
