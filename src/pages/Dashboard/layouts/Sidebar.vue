<template>
    <nav class="px-20 py-10 dashboard-sidebar overflow-y-overlay" style="background: #252429">
        <div class="d-flex mb-50 mt-10">

            <div class="me-10">
                <img src="/public/images/public/pubg-default-profile.svg" alt=""/>
            </div>

            <div class="flex-grow-1 d-flex flex-direction-column justify-content-space-around">
                <span>{{ $store.state.profile.name }}</span>
                <span>{{ $store.state.profile.email }}</span>
            </div>

            <div class="d-flex align-items-center">
                <a href="javascript:void(0)" class="cursor-pointer"
                   @click="$router.push({name: 'dashboardProfile', params: {lang: $route.params.lang}})">
                    <img src="/public/images/public/icons/ic-gear.svg" alt=""/>
                </a>
            </div>

        </div>

        <ul>
            <li>
                <span class="py-20 d-flex align-items-center cursor-default" @click="">
                    <component is="icon-money-bag"/>&nbsp;&nbsp;{{ $t('glossaries.balance') }}:
                    <span class="font-size-lg font-weight-900 mx-20">{{ moneyFormatFast($store.state.balance || '0', 2) }}$</span>
                    <rs-button glow solid xsmall class="ms-auto" @click.native="$router.push({name: 'dashboardAccountCharging', params: {lang: $route.params.lang}})">+</rs-button>
                </span>
            </li>
        </ul>

        <hr class="opacity-1"/>

        <ul class="main-menu mx--20 mt-20">
            <li v-for="item of items" @click="$emit('clickOnMenuButton', 1)">
                <router-link :to="item.to"
                             class="py-20 d-flex">
                    <component :is="item.icon"/> &nbsp;
                    {{ item.label }}
                </router-link>
            </li>

            <li @click="$emit('clickOnMenuButton', 1)">
                <a :href="`/api/v1/users/logout?lang=${$route.params.lang}`"
                   class="py-20 d-flex">
                    <component is="icon-off"/> &nbsp;
                    {{ $t('glossaries.logout') }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    import i18n from '../../../i18n'

    export default {
        name: "Sidebar",

        components: {
            'icon-chat': () => import('../../../components/icons/IconChat.vue'),
            'icon-down-money': () => import('../../../components/icons/IconDownMoney.vue'),
            'icon-invoice': () => import('../../../components/icons/IconInvoice.vue'),
            'icon-money-bag': () => import('../../../components/icons/IconMoneyBag.vue'),
            'icon-off': () => import('../../../components/icons/IconOff.vue'),
            'icon-reward': () => import('../../../components/icons/IconReward.vue'),
            'icon-up-money': () => import('../../../components/icons/IconUpMoney.vue'),
        },

        data() {
            return {
                items: [
                    {
                        icon: 'icon-reward',
                        label: i18n.t('glossaries.tournaments'),
                        to: {name: 'dashboardTournaments', params: {lang: this.$route.params.lang}},
                    },
                    {
                        icon: 'icon-invoice',
                        label: i18n.t('glossaries.transactions'),
                        to: {name: 'dashboardTransactions', params: {lang: this.$route.params.lang}},
                    },
                    {
                        icon: 'icon-up-money',
                        label: i18n.t('glossaries.account_charging'),
                        to: {name: 'dashboardAccountCharging', params: {lang: this.$route.params.lang}},
                    },
                    {
                        icon: 'icon-down-money',
                        label: i18n.t('glossaries.withdraw'),
                        to: {name: 'dashboardWithdraw', params: {lang: this.$route.params.lang}},
                    },
                    {
                        icon: 'icon-chat',
                        label: i18n.t('glossaries.tickets'),
                        to: {name: 'dashboardTickets', params: {lang: this.$route.params.lang}},
                    },
                ]
            }
        },
    }
</script>

<style lang="stylus">
    .dashboard-sidebar
        > div > div
            &:nth-child(1)
                > img
                    width 50px
                    border-radius 50%
                    border 2px #707070 solid

            &:nth-child(2)
                span:nth-child(2)
                    white-space nowrap
                    text-overflow ellipsis
                    display block
                    overflow hidden
                    width 100px
        .main-menu
            li a
                padding-left 20px
                padding-right 20px
                &.active
                    background #FF0E1F
                    &:hover
                        color #fff
                        svg [fill]
                            fill #fff
                    / .ltr &
                        padding-left 17px
                        border-left solid 3px #fff
                    / .rtl &
                        padding-right 17px
                        border-right solid 3px #fff
</style>
