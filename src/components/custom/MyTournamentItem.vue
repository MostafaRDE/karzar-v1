<template>
    <div class="row py-20">

        <div class="col-md-2 m-0 d-flex justify-content-center">
            <img :src="data.map.media_id" alt="" style="max-width: 100%" />
        </div>

        <div class="col-xs-6 col-md-5 mt-20 mt-md-0 m-0 d-flex flex-direction-column justify-content-space-between align-items-flex-start">
            <div class="w-100 text-center text-xs-start">
                <span>{{ $t('glossaries.your_bonus_of_this_game') }}: {{ data.yourReward }}</span>
            </div>
            <div class="w-100 text-center text-xs-start">
                <h3 class="text-white">{{ data.title }}</h3>
            </div>
            <div class="w-100 text-center text-xs-start">
                <span lang="en" class="opacity-8 text-nowrap">{{ data.time }}</span>
            </div>
        </div>

        <div class="col-xs-6 col-md-5 mt-20 mt-md-0 m-0 d-flex flex-direction-column justify-content-space-between">
            <div class="text-center text-xs-end">
                <router-link class="w-fit-content" to="#">
                    {{ $t ('glossaries.team') }} {{ data.team }}
                    &nbsp;<span class="d-inline-flex"><icon-multiple-users fill="#BBBBBB" width="18px" /></span>
                </router-link>
            </div>
            <div class="text-center text-xs-end">
                <router-link class="w-fit-content" to="#">
                    {{ $t('glossaries.players_list') }}
                    &nbsp;<span class="d-inline-flex"><icon-multiple-users fill="#BBBBBB" width="18px" /></span>
                </router-link>
            </div>
            <div class="text-center text-xs-end">
                <router-link class="w-fit-content" to="#">
                    {{ data.youtubeWatchStatus === 'WATCH' ? $t('glossaries.watch') : $t('glossaries.live_preview') }}
                    &nbsp;<span class="d-inline-flex"><icon-play fill="#BBBBBB" width="16px" /></span>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "MyTournamentItem",

        components: {
            'icon-arrow-left-type-1': () => import('../icons/IconArrowLeftType1.vue'),
            'icon-arrow-right-type-1': () => import('../icons/IconArrowRightType1.vue'),
            'icon-multiple-users': () => import('../icons/IconMultipleUsers.vue'),
            'icon-play': () => import('../icons/IconPlay.vue'),
            'title-span': () => import('../svg/TitleSpan.vue'),
        },

        props: ['data'],
    }
</script>
