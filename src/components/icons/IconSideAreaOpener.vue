<template>
    <svg :style="`width:${size};height:${size}`" viewBox="0 0 23.922 23.916">
        <path :fill="fill" d="">
            <title v-text="title"></title>
        </path>
        <rect x="2.604" y="14.698" transform="matrix(0.7071 0.7071 -0.7071 0.7071 14.9741 2.3277)" :fill="fill" width="4.146" height="9.083"></rect>
        <rect x="17.166" y="0.135" transform="matrix(0.7072 0.707 -0.707 0.7072 8.9391 -12.2324)" :fill="fill" width="4.145" height="9.083"></rect>
        <rect x="2.61" y="0.141" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 11.3045 4.6818)" :fill="fill" width="4.145" height="9.083"></rect>
        <rect x="17.172" y="14.703" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 46.4606 19.2446)" :fill="fill" width="4.146" height="9.083"></rect>
    </svg>
</template>

<script>
    export default {
        name: "IconLocked",

        props: {
            fill: {
                default: '#00FF00',
                type: String,
                required: false,
            },
            size: {
                default: '24px',
                type: String,
                required: false,
            },
            title: {
                default: '',
                type: String,
                required: false,
            }
        },
    }
</script>