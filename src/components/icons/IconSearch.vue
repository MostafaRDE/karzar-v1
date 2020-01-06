<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 24.34 25.341">
        <path :fill="fill" d="M25.34,22.409l-6.343-6.343c1.084-1.637,1.719-3.598,1.719-5.708C20.716,4.637,16.079,0,10.358,0S0,4.637,0,10.358s4.637,10.358,10.358,10.358c2.11,0,4.071-0.635,5.708-1.718l6.343,6.343L25.34,22.409z M4,10.358C4,6.852,6.852,4,10.358,4s6.358,2.852,6.358,6.358c0,1.638-0.628,3.128-1.649,4.256l-0.451,0.451c-1.128,1.022-2.62,1.65-4.258,1.65C6.852,16.716,4,13.864,4,10.358z"></path>
    </svg>
</template>

<script>
    export default {
        name: "IconSearch",

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