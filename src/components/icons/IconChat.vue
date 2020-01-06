<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 17.518 17.518">
        <path d="M209.4,203.738a5.68,5.68,0,0,0-3.115-5.058,7.724,7.724,0,0,1-7.605,7.605,5.664,5.664,0,0,0,7.939,2.328l2.757.762-.762-2.757A5.642,5.642,0,0,0,209.4,203.738Zm0,0" transform="translate(-191.882 -191.882)" :fill="fill"/>
        <path d="M13.378,6.689a6.689,6.689,0,1,0-12.45,3.4l-.9,3.264,3.264-.9A6.69,6.69,0,0,0,13.378,6.689ZM5.662,5.132H4.636A2.053,2.053,0,1,1,8.074,6.647l-.872.8v.8H6.176V6.993l1.206-1.1a1.016,1.016,0,0,0,.334-.758,1.026,1.026,0,1,0-2.053,0Zm.513,4.14H7.2V10.3H6.176Zm0,0" :fill="fill"/>
    </svg>
</template>

<script>
    export default {
        name: "IconChat",

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
