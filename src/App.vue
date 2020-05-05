<template>
    <!-- Main divider -->
    <div class="overflow-hidden" :class="[$store.state.dir]" id="system">

        <div>
            <audio src="/public/musics/pubg-theme-song-2scratch-trap-remix.mp3" loop hidden preload="metadata" ref="bgAudio"></audio>

            <rs-button class="position-fixed end-0 z-index-100 p-0" id="bg-main-audio-button">
                <i @click="toggleAudio" class="fas p-15" :class="[`fa-${audioStatus === 'PAUSE' ? 'play' : 'pause'}`]"></i>
            </rs-button>
            <rs-button class="position-fixed end-0 z-index-100 p-0" id="bg-main-telegram-button">
                <a target="_blank" href="https://t.me/gametour_official" rel="nofollow" class="text-white d-flex">
                    <icon-telegram style="margin: 10px"/>
                </a>
            </rs-button>
        </div>

        <transition name="fade">
            <div v-if="!isFirstLoaded"
                 class="position-fixed bottom-0 left-0 right-0 top-0 d-flex flex-direction-column justify-content-center align-items-center application-background-color" style="z-index: 10000">
                <img src="/public/images/public/logos/logo.svg" alt="" style="width: 140px;"/>
                <div class="mt-30">
                    <rs-button v-if="canNotLoadFirstData" color="indigo" class="small" @click.native="startLoadingFirstData">{{ $t('glossaries.try_again')
                        }}
                    </rs-button>
                    <rs-overlay-loading v-else/>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <router-view/>
        </transition>

    </div>
</template>

<script>
    import {getProfile} from "./api"

    export default {
        name: "App",

        components: {
            'icon-telegram': () => import('./components/icons/IconTelegram.vue'),
        },

        data: () => ({
            audioStatus: process.browser ? localStorage.getItem('bg_audio_status_playing') : 'PLAY',
            canNotLoadFirstData: false,
            isFirstLoaded: false,
        }),

        computed: {
            isNeedToFirstLoad() {
                return this.$route.matched.some(record => record.meta.auth === true)
            },
            theme() {
                return this.$store.state.theme
            }
        },

        watch: {
            theme(newTheme) {
                this.updateDetailsOfThemeParts(newTheme)
            },
            isFirstLoaded(val) {
                if (val && !this.canNotLoadFirstData) {
                    document.body.style.overflow = 'auto';
                } else {
                    document.body.style.overflow = 'hidden';
                }
            }
        },

        methods: {
            loadBgAudioConfig() {
                let audio = this.$refs['bgAudio'];

                if (localStorage.getItem('bg_audio_status_playing') !== null) {
                    switch (this.audioStatus) {
                        case 'PAUSE':
                            audio.pause();
                            this.audioStatus = 'PAUSE';
                            break;

                        case 'PLAY':
                            audio.play();
                            this.audioStatus = 'PLAY';
                            break;
                    }
                }
                else {
                    localStorage.setItem('bg_audio_status_playing', 'PAUSE');
                    this.audioStatus = 'PAUSE';
                }
            },
            toggleAudio() {
                let audio = this.$refs['bgAudio'];

                if (audio.paused) {
                    audio.play();
                    this.audioStatus = 'PLAY';
                    localStorage.setItem('bg_audio_status_playing', 'PLAY')
                }
                else {
                    audio.pause();
                    this.audioStatus = 'PAUSE';
                    localStorage.setItem('bg_audio_status_playing', 'PAUSE')
                }
            },
            updateDetailsOfThemeParts(theme) {

                // Set class html tag with theme to change style of scrollbars in webkit engines browsers by restyle themes
                document.getElementsByTagName('html')[0].setAttribute('class', `theme--${theme}`);

                switch (theme) {
                    case 'dark':
                        document.body.style.backgroundColor = '#17161a';
                        document.body.style.backgroundImage = 'linear-gradient(to right,#17161a,#242124 50%,#17161a)';
                        document.body.style.color = '#c0c0c0';
                        break;

                    case 'light':
                        document.body.style.backgroundColor = '#fff';
                        document.body.style.color = '#222742';
                        break;
                }
            },

            firstLoadData() {
                return new Promise((resolve, reject) => {
                    if (this.$store.state.user_auth) {
                        let result = 0, total = 2;
                        this.$store.dispatch('getBalance').then(res => {
                            result++;
                            if (result >= total)
                                resolve(true)
                        }).catch(error => {
                            reject(error)
                        });
                        this.$store.dispatch('getProfile').then(res => {
                            result++;
                            if (result >= total)
                                resolve(true)
                        }).catch(error => {
                            reject(error)
                        });
                    } else {
                        resolve(true)
                    }
                })
            },

            startLoadingFirstData() {
                this.canNotLoadFirstData = false;
                this.firstLoadData().then(res => {
                    this.isFirstLoaded = true;
                    this.loadBgAudioConfig();
                }).catch(error => {
                    this.canNotLoadFirstData = true;
                })
            },
        },

        mounted() {
            this.updateDetailsOfThemeParts(this.theme);
            this.startLoadingFirstData();
        },
    }
</script>

<style lang="stylus">

    /* Public styles */
    a, .linkable
        color #fff
        svg
            [fill]
                fill #fff
        &:hover
            color #ff0e1f
            svg
                [fill]
                    fill #ff0e1f
    -trapeze-sides
        / .bottom&, / .top&
            position absolute
            width 0
            height 0
            -webkit-transition border-color .2s ease-in-out
            -moz-transition border-color .2s ease-in-out
            transition border-color .2s ease-in-out
        / .bottom&
            border-bottom 50px solid #ff0e1f
        / .top&
            border-top 50px solid #ff0e1f

    .trapeze-end-side
        / .ltr &
            right -15px
            border-right 15px solid transparent
        / .rtl &
            left -15px
            border-left 15px solid transparent

    .trapeze-start-side
        / .ltr &
            left -15px
            border-left 15px solid transparent
        / .rtl &
            right -15px
            border-right 15px solid transparent
    .tag
        padding 4px 8px
        background #0003
        font-size 10px
        / .ltr &
            margin-right 10px
        / .rtl &
            margin-left 10px

    #bg-main-audio-button
        top 50%
        transform translateY(calc(-50% + 30px))
    #bg-main-telegram-button
        top 50%
        transform translateY(calc(-50% - 30px))
        background: #ff003b;
        color: #fff;
        border: none;


    .title-holder
        position: relative;
        display: inline-block;
        width: 100%;
        vertical-align: middle;
        height: 240px;
        background-position: center 0;
        background-repeat: no-repeat;
        color white

    .title-wrapper
        position: relative;
        display: table;
        table-layout: fixed;
        height: 100%;
        width: 100%;
    .title-inner
        position: relative;
        display: table-cell;
        height: 100%;
        width: 100%;
        vertical-align: middle;

</style>
