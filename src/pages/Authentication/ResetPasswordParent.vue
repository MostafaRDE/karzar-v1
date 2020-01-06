<template>
    <div class="position-relative">
        <transition name="fade">
            <router-view class="position-absolute left-0 right-0 top-0 vh-100"/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "ResetPasswordParent"
    }
</script>
