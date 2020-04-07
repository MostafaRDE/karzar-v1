<template>
    <div class="py-20 px-40">
        <ticket-item v-if="isDev"
                     v-for="(ticket, index) of tickets"
                      :key="`transaction-${index}`"
                      :data="ticket"
                      :class="{'border-bottom': index < tickets.length - 1}"/>

        <div v-if="isDev"
             class="row pagination mt-20">
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

        <div v-if="!isDev" class="text-center">
            <h1 class="py-50">Coming Soon</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tickets",

        components: {
            'icon-arrow-left-type-1': () => import('../../components/icons/IconArrowLeftType1.vue'),
            'icon-arrow-right-type-1': () => import('../../components/icons/IconArrowRightType1.vue'),
        },

        data: () => ({
            isDev: process.env.NODE_ENV === 'development',
            tickets: [
                {id: 23451, subject: 'Problem in deposit', status: 'ANSWERED', date: '2019/05/18 - 09-23'},
                {id: 23452, subject: 'Problem in withdraw', status: 'NEW', date: '2019/05/19 - 21-08'},
            ]
        })
    }
</script>
