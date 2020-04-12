<template>
    <div>
        <div class="container-fluid title-holder text-center text-uppercase" :style="titleStyles">
            <div class="title-wrapper" style="height: 460px">
                <h1 class="title-inner text-center">{{ $t('glossaries.about_us') }}</h1>
            </div>
        </div>

        <div class="container mb-60 mt-100">
            <div class="row">
                <div class="col-sm-6 px-sm-30">
                    <img src="/public/images/public/avatars/about.jpg" alt="" class="w-100"/>
                </div>
                <div class="col-sm-6 text-center text-sm-start px-sm-30">
                    <h3 class="text-white">{{ $t('app.name') }}</h3>

                    <title-span/>

                    <div class="mt-10">
                        <ul>
                            <li v-for="(item, index) of socialNetworks" class="d-inline-flex" :class="[index + 1 < socialNetworks.length ? 'me-25' : '']">
                                <a :href="item.to" target="_blank" rel="nofollow" :title="item.label"><i
                                        :class="item.icon"/></a>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-40 px-40 py-30" style="background: #0005">
                        <span>{{ $t('public.about_home') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../../i18n'

    export default {
        name: "About",

        title: () => i18n.t('glossaries.about'),

        components: {
            'title-span': () => import('../../components/svg/TitleSpan.vue'),
        },

        data: () => ({
            scrollY: 0,
            titleStyles: {
                height: '460px',
                backgroundAttachment: 'fixed',
                backgroundImage: "url('/public/images/public/backgrounds/bg-title-us.jpg')",
                backgroundPosition: 'center 0',
                backgroundSize: 'cover',
                boxShadow: '#0005 15px 15px 21px 0',
            },
            socialNetworks: [
                {
                    icon: 'fab fa-facebook',
                    label: 'Facebook',
                    to: 'https://www.facebook.com/gametour_official',
                },
                {
                    icon: 'fab fa-instagram',
                    label: 'Instagram',
                    to: 'https://www.instagram.com/gametour.co',
                },
                {
                    icon: 'fab fa-telegram',
                    label: 'Telegram',
                    to: 'https://t.me/gametour_official',
                },
            ]
        }),

        methods: {
            handleScroll() {
                this.scrollY = window.scrollY;
                this.titleStyles.backgroundPosition = `center ${this.scrollY * -1 / 3}px`
            },
        },

        mounted() {
            this.handleScroll();

            window.addEventListener('scroll', this.handleScroll);
        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>
