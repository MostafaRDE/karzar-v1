<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 17.518 18.445">
        <path d="M20.493,39.941V36.948c0-.075,0-.149.011-.222a8.759,8.759,0,1,0,4.479,0c.007.073.011.147.011.222v2.992a5.717,5.717,0,1,1-4.5,0Z" transform="translate(-13.985 -35.509)" :fill="fill"/>
        <path d="M237.73,8.851V1.439a1.439,1.439,0,0,0-2.879,0V8.851a1.439,1.439,0,1,0,2.879,0Z" transform="translate(-227.532)" :fill="fill"/>
    </svg>
</template>

<script>
    export default {
        name: "IconOff",

        props: {
            fill: {
                default: '#fff',
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
