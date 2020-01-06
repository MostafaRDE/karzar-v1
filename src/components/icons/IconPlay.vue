<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 23.493 27.522">
        <g transform="translate(0 -160.239)">
            <path d="M13.615,5.376a4,4,0,0,1,6.77,0L30.14,20.869A4,4,0,0,1,26.755,27H7.245A4,4,0,0,1,3.86,20.869Z"
                  transform="translate(27 157) rotate(90)"
                  :fill="fill"/>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "IconPlay",

        props: {
            fill: {
                default: '#00FF00',
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