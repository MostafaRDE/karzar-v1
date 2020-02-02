<template>
    <div id="parent-dashboard">

        <global-header class="container-fluid z-index-50">
            <dashboard-navigation v-model="isActiveMainSideMenu" :menuVisibility="true" @clickOnMenuButton="toggleSideBar"/>
        </global-header>


        <main-side-menu v-model="isActiveMainSideMenu"/>

        <div class="container-fluid px-0" :style="{background: `#17161a url(${require('../../public/images/public/bg-pubg-sunset.jpg')}) center center / cover repeat-y`}">
            <div class="row">

                <div class="mb-0" :class="[{'z-index-10' : width >= 1024 || (width < 1024 && isSideBarActiveInResponsive)}, width >= 1024 ? 'col-sm-2' : 'position-fixed bottom-0', width < 1024 ? 'top-70' : '']" style="padding-left: 0 !important; padding-right: 0 !important; min-width: 275px">
                    <transition name="fade">
                        <dashboard-sidebar v-if="width >= 1024 || isSideBarActiveInResponsive" class="h-100" @clickOnMenuButton="toggleSideBar"/>
                    </transition>

                </div>

                <div class="mb-0 h-100 flex-grow-1 pe-20 py-20 ps-20" :class="[width >= 1024 ? 'col-sm-10' : 'col-12']" :style="{maxWidth: width >= 1024 ? 'calc(100% - 275px) !important' : '', minHeight: 'calc(100vh - 90px)'}">
                    <dashboard-content class="w-100 position-relative overflow-y-overlay" :style="{height: `calc(100vh - ${responsiveObject.sizes.lg > width ? '112' : '130'}px)`}">
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
    import ResponsiveObject from "../modules/objects/Responsive"

    export default {
        name: "Dashboard",

        data: () => ({
            responsiveObject: ResponsiveObject,
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
