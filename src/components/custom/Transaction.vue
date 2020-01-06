<template>
    <div class="row py-30">
        <div class="col-sm-1 text-center mb-0">
            <img :src="gatewayLogo" alt="">
        </div>
        <div class="col-sm d-flex flex-direction-column text-center text-sm-start mb-0">
            <div class="mb-20">
                <span class="font-weight-900 font-size-xl me-10" :class="[data.typeShift === 'INCREASE' ? 'text-success' : 'text-danger']">{{ `${data.typeShift === 'INCREASE' ? '+' : '-'}${data.amount}` }}$</span>
                <span class="font-size-xl text-white">{{ $t(`reasons.transactions.${data.reason}`) }}</span>
            </div>
            <span>{{ data.time }}</span>
        </div>
        <div class="col-sm text-center text-sm-end mb-0">
            <span class="align-items-center d-inline-flex h-100">{{ $t(`statuses.${data.status.toLowerCase()}`) }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Transaction",

        props: ['data'],

        computed: {
            gatewayLogo() {
                switch (this.data.gateway) {
                    case 'PAYPAL':
                        return '/public/images/public/icons/ic-paypal.svg';

                    case 'BITCOIN':
                        return '/public/images/public/icons/ic-bitcoin.svg';

                    case 'TOURNAMENT':
                        return '/public/images/public/icons/ic-tournament.svg';

                    case 'ACCOUNT':
                        return '';
                }
            },

            link() {

            }
        }
    }
</script>
