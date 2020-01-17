<template>
    <!-- Main divider -->
    <div class="overflow-hidden" :class="[dir]" id="system">

        <div>
            <audio src="/public/musics/pubg-theme-song-2scratch-trap-remix.mp3" loop hidden preload="metadata" ref="bgAudio"></audio>

            <rs-button class="position-fixed end-0 z-index-100 p-0" id="bg-main-audio-button">
                <i @click="toggleAudio" class="fas p-15" :class="[`fa-${audioStatus === 'PAUSE' ? 'play' : 'pause'}`]"></i>
            </rs-button>
        </div>

        <transition name="fade">
            <router-view/>
        </transition>

    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "App",

        data: () => ({
            audioStatus: process.browser ? localStorage.getItem('bg_audio_status_playing') : 'PLAY',
        }),

        computed: mapState(['dir', 'theme']),

        watch: {
            theme(newTheme) {
                this.updateDetailsOfThemeParts(newTheme)
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
                    localStorage.setItem('bg_audio_status_playing', 'PLAY');
                    audio.play();
                    this.audioStatus = 'PLAY';
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
            }
        },

        mounted() {
            this.updateDetailsOfThemeParts(this.theme);

            this.loadBgAudioConfig()
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
        transform translateY(-50%)

</style>
