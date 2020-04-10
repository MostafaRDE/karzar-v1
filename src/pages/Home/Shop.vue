<template>
    <div>
        <div class="container-fluid title-holder text-center text-uppercase" :style="titleStyles">
            <div class="title-wrapper" style="height: 360px">
                <h1 class="title-inner text-center">{{ $t('glossaries.shop') }}</h1>
            </div>
        </div>

        <div class="container mb-60 mt-100">
            <div class="row">
                <div class="col px-sm-30 text-center">
                    <h2>{{ $t('glossaries.coming_soon') }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../../i18n'

    export default {
        name: "CounterStrike",

        title: () => i18n.t('glossaries.shop') + ' | ' + i18n.t('app.name'),

        data: () => ({
            scrollY: 0,
            titleStyles: {
                height: '360px',
                backgroundAttachment: 'fixed',
                backgroundImage: "url('/public/images/public/backgrounds/bg-title-shop.jpg')",
                backgroundPosition: 'center 0',
                boxShadow: '#0005 15px 15px 21px 0',
            },
        }),

        methods: {
            handleScroll() {
                this.scrollY = window.scrollY;
                this.titleStyles.backgroundPosition = `center ${(this.scrollY * -1 / 3) - 300}px`
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
