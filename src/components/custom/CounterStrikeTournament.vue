<template>
    <div class="row running-tournament">
        <div class="col d-flex flex-direction-column align-items-center">

            {{ /* Start tournament timer */ }}
            <div class="row">
                <div class="col mb-0 justify-content-center d-flex">
                    <div class="timer w-fit-content position-relative d-flex align-items-center">
                        <span class="bottom-trapeze-sides trapeze-start-side"/>
                        <span class="ltr text-white" style="padding: 7px 20px; background-color: #ff0e1f; font-size: 1.6em;">
                            {{ $t('glossaries.online') }}
                        </span>
                        <span class="bottom-trapeze-sides trapeze-end-side"/>
                    </div>
                </div>
            </div>
            {{ /* End tournament timer */ }}

            {{ /* Start tournament reservation panel */ }}
            <div class="row running-tournament--panel">
                <div class="col mb-0">
                    <div class="row w-100 h-100 d-flex justify-content-flex-end">

                        {{ /* Start map image */ }}
                        <rs-section :class="[width < 1024 ? 'col-xl' : '']"
                                    :contentClass="[width < 1024 ? 'w-100' : '']"
                                    class="mb-0 px-10 pe-lg-0 z-index-1 d-flex justify-content-flex-end align-items-center running-tournament--panel--banner">

                            <div class="flex-grow-0 my-10 ms-lg--30 d-flex align-items-center">
                                <img src="/public/images/public/backgrounds/maps/counter-strike-classic-a.png" alt="" class="w-100"/>
                            </div>

                        </rs-section>
                        {{ /* End map image */ }}

                        <rs-section
                                class="col-xl mb-0 flex-grow-1 d-flex flex-direction-column running-tournament--panel--data">

                            {{ /* Start tournament single data */ }}
                            <div class="flex-grow-1 d-flex">

                                <div class="d-flex align-items-center flex-grow-1">

                                    <div class="d-flex align-items-center justify-content-space-around pe-lg-10 py-15" :class="width < 1400 ? 'flex-grow-1' : ''" style="min-width: 200px; height: 120px">

                                        {{ /* Start tournament round data */ }}
                                        <div class="flex-grow-1 h-100 d-flex flex-direction-column justify-content-space-around px-lg-10 px-xl-20 running-tournament--panel--data--description mx-10"
                                             :style="{maxWidth: '200px'}">

                                            {{ /* Map */ }}
                                            <div class="d-flex justify-content-space-between">
                                                <span>{{ $t('glossaries.map') }}:</span>&nbsp;
                                                <span class="text-left" lang="en">Dust 2</span>
                                            </div>

                                            {{ /* Input */ }}
                                            <div class="d-flex justify-content-space-between">
                                                <span>{{ $t('glossaries.fee') }}:</span>&nbsp;
                                                <span class="text-left text-nowrap">{{ $t('glossaries.free') }}</span>
                                            </div>

                                            {{ /* Reward */ }}
                                            <div class="d-flex justify-content-space-between">
                                                <span>{{ $t('glossaries.players2') }}:</span>&nbsp;
                                                <span class="text-left text-nowrap">32</span>
                                            </div>

                                        </div>
                                    </div>

                                    <div v-if="width >= 1400" class="flex-grow-1 d-flex justify-content-flex-end">
                                        <img src="/public/images/public/backgrounds/bg-title-counter-strike.jpg"
                                             alt=""
                                             style="height: 150px" :style="{transform: $store.state.dir === 'ltr' ? 'scaleX(-1)' : 'scaleX(1)'}">
                                    </div>

                                </div>

                            </div>
                            {{ /* End tournament single data */ }}

                            <div class="overflow-x-overlay overflow-y-hidden border-top">
                                <div class="flex-grow-1 d-flex ms-auto" :class="[width >= 1024 ? 'w-fit-content' : 'w-100', {'flex-direction-column': width <= 600 || width > 680 && width < 768}]">
                                    <rs-button transparent glow
                                               class="text-nowrap"
                                               :class="{'flex-grow-1': width < 1024}">
<!--                                        {{ $t('glossaries.coming_soon') }}-->
                                    </rs-button>
                                    <rs-button solid
                                               glow
                                               disabled
                                               :trapezeStart="width >= 1024"
                                               class="text-white text-nowrap"
                                               :class="[{'px-80': width >= 1024}, {'flex-grow-1': width < 1024}]"
                                               @click.native="copyIP">
<!--                                        {{ $t('glossaries.copy_server_ip')}}-->
                                        {{ $t('glossaries.coming_soon') }}
                                    </rs-button>
                                </div>
                            </div>
                        </rs-section>
                    </div>
                </div>
            </div>
            {{ /* End tournament reservation panel */ }}

        </div>
    </div>
</template>

<script>
    import i18n from '../../i18n'

    export default {
        name: "CounterStrikeTournament",

        model: {
            prop: 'tournament',
            event: 'change',
        },

        props: {
            tournament: {},
        },

        data: () => ({
            width: 0,
        }),

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },

            copyIP() {
                if (this.copyText('192.168.23.253'))
                    this.$toast.success({
                        title: i18n.t('glossaries.copy'),
                        message: i18n.t('glossaries.copied'),
                    });
                else
                    this.$toast.error({
                        title: i18n.t('glossaries.error'),
                        message: i18n.t('glossaries.copy_failed'),
                    })
            }
        },

        mounted() {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        },
    }
</script>

<style lang="stylus">
    .running-tournament
        &--panel
            &--data
                padding-left 0 !important
                padding-right 0 !important
                &--description
                    span
                        &:nth-child(1)
                            opacity 0.8
                        &:nth-child(2)
                            color white


    @media screen and (min-width: 1024px)
        .running-tournament
            &--panel
                &--banner
                    width 250px
                    flex-grow 0 !important

                    img
                        max-width 280px
                        border 3px solid #707070

                &--data
                    width calc(100% - 280px)

                    &--description
                        span
                            font-size 18px

                            /*&:nth-child(1)*/
                            /*    opacity 0.8*/

                            /*&:nth-child(2)*/
                            /*    color white*/
                            /*    font-weight 900*/

                    .content > div:nth-child(1)
                        box-shadow -4px 2px 9px 0 #000
</style>
