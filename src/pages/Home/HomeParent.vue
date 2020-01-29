<template>
    <div id="parent-home--root">

        <global-header class="container-fluid z-index-50">
            <global-navigation v-model="isActiveMainSideMenu" @clickOnMenuButton="toggleSideBar"/>
        </global-header>


        <main-side-menu v-model="isActiveMainSideMenu"/>


        <div id="parent-home--body">
            <transition name="fade">
                <router-view />
            </transition>
        </div>

        <global-footer/>
    </div>
</template>

<script>
    export default {
        name: "HomeParent",

        data: () => ({
            isActiveMainSideMenu: false,
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
