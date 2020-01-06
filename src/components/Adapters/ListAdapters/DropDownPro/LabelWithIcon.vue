<template>
    <div class="d-flex w-100 align-items-center">
        <img class="pxh-25 me-10" :src="data.image" alt=""/>
        <span class="text-white text-center flex-grow-1">{{ data.label }}</span>
    </div>
</template>

<script>
    export default {
        name: "LabelWithIcon",

        props: ['data']
    }
</script>
