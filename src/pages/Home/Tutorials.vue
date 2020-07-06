<template>
    <div>
        <div class="container-fluid title-holder text-uppercase" :style="titleStyles">
            <div class="container h-100">
                <div class="title-wrapper">
                    <h1 class="title-inner">{{ $t('glossaries.tutorials') }}</h1>
                </div>
            </div>
        </div>

        <div class="container my-80">
            <div class="row">

                <post-mode v-for="(tutorial, index) of tutorials"
                           :key="`tutorial-${index}`"
                           :background="tutorial.backgroundImage"
                           class="pt-100 col-sm-4 mb-0 d-flex flex-direction-column"
                           :style="{minHeight: `${width / 4.8}px`}"
                           :href="tutorial.youtubeLink"
                           target="_blank"
                           @mouseover.native="tutorial.hover = true"
                           @mouseleave.native="tutorial.hover = false">

                    <span class="tag text-white">{{ tutorial.tag }}</span>

                    <title-box-animated class="text-white mt-10" :active="tutorial.hover" @click.native="">
                        <a :href="tutorial.link" target="_blank" class="font-size-xl font-weight-900">{{ tutorial.title }}</a>
                    </title-box-animated>

                    <span class="font-size-xs mt-10 text-white">{{ tutorial.date | moment(`${$route.params.lang !== 'fa' ? 'YYYY/MM/DD' : 'jYYYY/jMM/jDD'} HH:mm:ss`) }}</span>

                    <p class="mt-20 text-white">{{ tutorial.text }}</p>

                </post-mode>

            </div>

            <div v-if="!tutorials.length && !loadingTutorials"
                 class="py-50 text-center">
                <span>{{ $t('glossaries.not_found') }}</span>
            </div>

            <div v-if="!tutorials.length && loadingTutorials"
                 class="py-50 text-center">
                <rs-overlay-loading/>
            </div>

            <rs-pagination v-if="tutorials.length" class="mt-20"
                           v-model="currentPage" :count="totalPages"
                           @change="updateListByPagination"/>
        </div>
    </div>
</template>

<script>
    import i18n from '../../i18n'
    import {tutorials} from "../../api";

    export default {
        name: "Tutorials",

        title: () => i18n.t('glossaries.tutorials'),

        data: () => ({
            totalPages: 0,
            currentPage: 1,
            itemsPerPage: 12,
            tutorials: [],
            loadingTutorials: false,

            titleStyles: {
                height: '150px',
                backgroundColor: '#333133',
                boxShadow: '#0005 15px 15px 21px 0'
            },
        }),

        methods: {
            updateListByPagination() {
                this.getTutorials()
            },
            getTutorials() {
                if (!this.loadingTutorials) {
                    this.loadingTutorials = true;
                    tutorials(1, this.itemsPerPage)
                        .then(response => {
                            let totalPages = response.data.total / this.itemsPerPage;
                            this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages;
                            this.tutorials = response.data.result.map(tutorial => ({
                                title: tutorial.title,
                                hover: false,
                                date: tutorial.created_at,
                                tag: 'sports',
                                text: tutorial.text,
                                youtubeLink: tutorial.youtube_link,
                                backgroundImage: `/api/v1/uploads?id=${tutorial.image_media_id}`
                            }))
                        })
                        .catch(error => {
                            // console.log(error)
                        })
                        .finally(() => {
                            this.loadingTutorials = false;
                        })
                }
            },
        },

        mounted() {
            this.getTutorials()
        }
    }
</script>
