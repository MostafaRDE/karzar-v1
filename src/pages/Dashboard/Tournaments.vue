<template>
    <div class="py-20 px-40">
        <my-tournament-item v-for="(tournament, index) of tournaments"
                            :key="`tournaments-${index}`"
                            :data="tournament"
                            :class="{'border-bottom': index < tournaments.length - 1}" />

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
        name: "Main",

        components: {
            'icon-arrow-left-type-1': () => import('../../components/icons/IconArrowLeftType1.vue'),
            'icon-arrow-right-type-1': () => import('../../components/icons/IconArrowRightType1.vue'),
        },

        data: () => ({
            tournaments: [
                {
                    id: 1,
                    title: 'نبرد اساطیر',
                    time: '12 November 2019 : 21:00 (TEH)',
                    team: 4,
                    reward: '200$',
                    yourReward: 0,
                    youtubeLink: '',
                    youtubeWatchStatus: 'LIVE',
                    map: {
                        name: 'pubg shrean',
                        image: '/public/images/samples/img-tournament-sample.png',
                    },
                    tags: [
                        {title: 'pubg mobile'},
                        {title: 'map shreain'},
                    ],
                },
                {
                    id: 1,
                    title: 'نبرد اساطیر',
                    time: '12 November 2019 : 21:00 (TEH)',
                    team: 4,
                    reward: '200$',
                    yourReward: 0,
                    youtubeLink: '',
                    youtubeWatchStatus: 'LIVE',
                    map: {
                        name: 'pubg shrean',
                        image: '/public/images/samples/img-tournament-sample.png',
                    },
                    tags: [
                        {title: 'pubg mobile'},
                        {title: 'map shreain'},
                    ],
                },
                {
                    id: 1,
                    title: 'نبرد اساطیر',
                    time: '12 November 2019 : 21:00 (TEH)',
                    team: 4,
                    reward: '200$',
                    yourReward: 0,
                    youtubeLink: '',
                    youtubeWatchStatus: 'LIVE',
                    map: {
                        name: 'pubg shrean',
                        image: '/public/images/samples/img-tournament-sample.png',
                    },
                    tags: [
                        {title: 'pubg mobile'},
                        {title: 'map shreain'},
                    ],
                },
            ],
        })
    }
</script>
