<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 32.783 32.783">
        <path d="M1.024,10.928A1.025,1.025,0,0,1,0,9.9V3.756A3.76,3.76,0,0,1,3.756,0H9.9a1.024,1.024,0,1,1,0,2.049H3.756A1.71,1.71,0,0,0,2.049,3.756V9.9A1.025,1.025,0,0,1,1.024,10.928Zm0,0"
              :fill="fill"/>
        <path d="M348.5,352.26h-6.147a1.024,1.024,0,0,1,0-2.049H348.5a1.71,1.71,0,0,0,1.708-1.708v-6.147a1.024,1.024,0,0,1,2.049,0V348.5A3.76,3.76,0,0,1,348.5,352.26Zm0,0"
              transform="translate(-319.477 -319.477)" :fill="fill"/>
        <path d="M9.9,352.26H3.756A3.76,3.76,0,0,1,0,348.5v-6.147a1.024,1.024,0,0,1,2.049,0V348.5a1.71,1.71,0,0,0,1.708,1.708H9.9a1.024,1.024,0,1,1,0,2.049Zm0,0"
              transform="translate(0 -319.477)" :fill="fill"/>
        <path d="M351.235,10.928A1.025,1.025,0,0,1,350.211,9.9V3.756A1.71,1.71,0,0,0,348.5,2.049h-6.147a1.024,1.024,0,0,1,0-2.049H348.5a3.76,3.76,0,0,1,3.756,3.756V9.9A1.025,1.025,0,0,1,351.235,10.928Zm0,0"
              transform="translate(-319.477)" :fill="fill"/>
        <path d="M103.431,107.187H89.088a3.76,3.76,0,0,1-3.756-3.756V89.088a3.76,3.76,0,0,1,3.756-3.756h14.342a3.76,3.76,0,0,1,3.756,3.756v14.342A3.76,3.76,0,0,1,103.431,107.187ZM89.088,87.381a1.71,1.71,0,0,0-1.708,1.708v14.342a1.71,1.71,0,0,0,1.708,1.708h14.342a1.71,1.71,0,0,0,1.708-1.708V89.088a1.71,1.71,0,0,0-1.708-1.708Zm0,0"
              transform="translate(-79.868 -79.868)" :fill="fill"/>
    </svg>
</template>

<script>
    export default {
        name: "IconExpand",

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