<template>
    <div class="py-20 px-40">
        <transaction v-for="(transaction, index) of transactions"
                     :key="`transaction-${index}`"
                     :data="transaction"
                     :class="{'border-bottom': index < transactions.length - 1}"/>

        <div class="row pagination mt-20">
            <div class="col text-white d-flex justify-content-center">
                <span class="px-5 linkable">1</span>
                <span class="px-5 linkable">2</span>
                <span class="px-5 linkable">3</span>
                <span class="px-5 linkable">4</span>
                <span class="px-5 d-inline-flex align-items-center">
                    <icon-arrow-right-type-1 v-if="$store.state.dir === 'ltr'" fill="#fff" size="12px"/>
                    <icon-arrow-left-type-1 v-if="$store.state.dir === 'rtl'" fill="#fff" size="12px"/>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Transactions",

        components: {
            'icon-arrow-left-type-1': () => import('../../components/icons/IconArrowLeftType1.vue'),
            'icon-arrow-right-type-1': () => import('../../components/icons/IconArrowRightType1.vue'),
        },

        data: () => ({
            transactions: [
                {
                    amount: 20,
                    typeShift: 'INCREASE', // INCREASE | DECREASE | ABSOLUTE
                    time: '12 November 2019 : 21:00 (TEH)', // TIME WITH TIMEZONE
                    gateway: 'PAYPAL', // PAYPAL | BITCOIN | TOURNAMENT | ACCOUNT
                    status: 'AWAITING_REVIEW', // AWAITING_REVIEW | SUCCESS | FAILED
                    reason: 'account_charging', // account_charging | join_to_tournament | withdraw
                    reasonReject: '', // Reason for rejected action
                },
                {
                    amount: 5,
                    typeShift: 'DECREASE', // INCREASE | DECREASE | ABSOLUTE
                    time: '12 November 2019 : 21:00 (TEH)', // TIME WITH TIMEZONE
                    gateway: 'BITCOIN', // PAYPAL | BITCOIN | TOURNAMENT | ACCOUNT
                    status: 'SUCCESS', // AWAITING_REVIEW | SUCCESS | FAILED
                    reason: 'join_to_tournament', // account_charging | join_to_tournament | withdraw
                    reasonReject: '', // Reason for rejected action
                },
            ]
        })
    }
</script>
