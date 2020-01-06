<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 23.922 23.916">
        <polygon points="23.923,20.992 14.889,11.958 23.915,2.932 20.984,0.001 11.958,9.027 2.938,0.006 0.006,2.938 9.026,11.958 0,20.984 2.932,23.916 11.958,14.89 20.992,23.923 "
                 :fill="fill"/>
    </svg>
</template>

<script>
    export default {
        name: "IconArrowRightType1",

        props: {
            fill: {
                default: '#FFFFFF',
                type: String,
                required: false,
            },
            height: {
                type: String,
                required: false,
            },
            width: {
                type: String,
                required: false,
            },
            size: {
                default: '24px',
                type: String,
                required: false,
            }
        },
    }
</script>
