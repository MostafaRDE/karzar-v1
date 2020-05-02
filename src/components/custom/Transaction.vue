<template>
    <div class="row py-30">
        <div class="col-sm-1 text-center mb-0">
            <img :src="data.gateway_logo" alt="">
        </div>
        <div class="col-sm d-flex flex-direction-column text-center text-sm-start mb-0">
            <div class="mb-20">
                <span class="font-weight-900 font-size-xl me-10 ltr d-inline-block" :class="[data.typeShift === 'INPUT' ? 'text-success' : (data.typeShift === 'OUTPUT' ? 'text-danger' : '')]">{{ `${data.typeShift === 'INPUT' ? '+' : (data.typeShift === 'OUTPUT' ? '-' : '')}${data.amount}` }}$</span>
                <span class="font-size-xl text-white">{{ $t(`reasons.transactions.${data.reason.toLowerCase()}`) }}</span>
            </div>
            <span class="ltr is-inline-block">{{ data.time | moment(`${$route.params.lang !== 'af' && $route.params.lang !== 'fa' ? 'YYYY/MM/DD' : 'jYYYY/jMM/jDD'} HH:mm:ss`) }}</span>
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

        mounted() {
            console.log(this.data)
        }
    }
</script>
