<template>
    <div class="position-relative d-flex justify-content-flex-end">
        <div class="position-absolute bottom-0 left-0 right-0 top-0" :style="{background: `url(${background}) center center no-repeat`, backgroundSize: 'cover'}"></div>

        <div class="z-index-1 ms--10 w-100 w-fit-content" :style="{background: '#000a', maxWidth: '375px', padding: '35px 30px 29px'}">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostMode",

        props: ['background']
    }
</script>
