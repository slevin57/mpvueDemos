<template>
    <div>
        <div>原图：</div>
        <section class="sec sec-origin">
            <image class="image" src="https://resources.laihua.com/2019-1-5/6e5631c0-10ad-11e9-853b-0beb71690b72.png" mode="aspectFit"></image>
        </section>
        <div>裁切后：</div>
        <section class="sec sec-cliped">
            <image class="image" :src="clipedUrl" mode="aspectFit"></image>
        </section>
        <!-- 封面裁切组件 -->
        <clip-image :url="'https://resources.laihua.com/2019-1-5/6e5631c0-10ad-11e9-853b-0beb71690b72.png'"
            :ratio="[5,4]"
            @clipOver="clipOverHdl" @clipImageHide="clipHideHdl"></clip-image>
    </div>
</template>
<script>
import clipImage from '../../components/clipImage.vue';
export default {
    components:{
        clipImage,
    },
    data () {
        return {
            originShareCover: '',
            clipedUrl: '',//裁切后的图片
        };
    },
    methods :{
        clipOverHdl (url) {
            this.clipedUrl = url;
        },
        clipHideHdl () {
            console.log(`clipHideHdl:`,);
        }
    }
};
</script>

<style lang="scss" scoped>
    .sec {
        width: 80vw;
        height: 30vh;
        border: 1px solid gray;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        margin-top: 20rpx;
        box-sizing: border-box;
        image {
            width: 100%;
            height: 100%;
        }
    }
</style>
