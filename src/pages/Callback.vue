<template>
    <div id="parent-home">
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>
