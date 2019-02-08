<template>
    <div>
        <section class="sec-nav">
            <navigation-bar :title="videoTitle"
            :navBackgroundColor="'transparent'"
            :titleColor="'skyblue'"
            :back-visible="true"
            :home-path="'/pages/index/main'"></navigation-bar>
        </section>
        <section class="sec-content">
            <!-- <video src="https://resources.laihua.com/2018-12-26/ebacec00-08d7-11e9-936f-39088507bb24.mp4"></video> -->
            <video object-fit="cover" autoplay
                src="https://resources.laihua.com/2018-12-27/f769fe00-09b5-11e9-b86a-d38da1643688.mp4"></video>
        </section>
    </div>
</template>

<script>
import navigationBar from '../../components/navigationBar.vue';
export default {
    components: {
        navigationBar,
    },
    data () {
        return  {
            videoTitle: '自定义标题'
        };
    }
};
</script>
<style lang="scss" scoped>
.sec-nav {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
}
.sec-content {
    width: 100vw;
    height: 100vh;
    video {
        width: 100%;
        height: 100%;
        // object-fit: cover;
    }
}
</style>
