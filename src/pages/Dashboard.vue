<template>
    <div id="parent-dashboard">

        <global-header class="container-fluid z-index-50">
            <global-navigation v-model="isActiveMainSideMenu" :menuVisibility="true" @clickOnMenuButton="toggleSideBar"/>
        </global-header>


        <main-side-menu v-model="isActiveMainSideMenu"/>

        <div class="container-fluid px-0" :style="{background: `#17161a url(${require('../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover repeat-y`}">
            <div class="row">

                <div class="mb-0 z-index-10" :class="[width >= 1350 ? 'col-sm-2' : 'position-absolute bottom-0', width >= 1024 && width < 1350 ? 'top-90' : (width < 1024 ? 'top-70' : '')]" style="padding-left: 0 !important; padding-right: 0 !important;">
                    <transition name="fade">
                        <dashboard-sidebar v-if="width >= 1350 || isSideBarActiveInResponsive" class="h-100"/>
                    </transition>

                </div>

                <div class="mb-0 h-100 flex-grow-1 pe-20 py-20 ps-20" :class="[width >= 1350 ? 'col-sm-10' : 'col-12']" style="min-height: calc(100vh - 90px)">
                    <dashboard-content class="w-100 position-relative">
                        <transition name="fade">
                            <router-view class="position-absolute top-0 left-0 right-0" style="background-color: #000C"/>
                        </transition>
                    </dashboard-content>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Dashboard",

        data: () => ({
            isActiveMainSideMenu: false,
            isSideBarActiveInResponsive: false,
            width: 0,
        }),

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },
            toggleSideBar() {
                this.isSideBarActiveInResponsive = !this.isSideBarActiveInResponsive
            }
        },

        mounted() {
            this.handleResize();

            let vm = this;
            window.addEventListener('resize', function () {
                vm.handleResize()
            });
        }
    }
</script>
