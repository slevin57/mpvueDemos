<template>
    <div>
        <section class="sec-nav-fixed">
            <navigation-bar :title="videoTitle"
            :navBackgroundColor="'pink'"
            :titleColor="'green'"
            :back-visible="true"
            :home-path="'/pages/logs/main'"></navigation-bar>
        </section>
        <section class="content">
            这里是内容
        </section>
    </div>
</template>

<script>
import navigationBar from '../../components/navigationBar/index.vue';
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
// .sec-nav-fixed{
    // position: fixed;
    // top: 0;
    // left: 0;
// }
.content {
    width: 100vw;
    height: 150vh;
    border: 1px solid red;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 150rpx;
}
</style>
