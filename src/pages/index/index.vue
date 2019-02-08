<template>
    <div>
        <ul class="list">
            <li><a href="/pages/navigation/main" >自定义导航</a></li>
            <li><a href="/pages/fullPlayer/main" >沉浸式视频播放页</a></li>
        </ul>
    </div>
</template>

<script>
import card from "@/components/card";

export default {
    data() {
        return {
            motto: "Hello World",
            userInfo: {}
        };
    },

    components: {
        card
    },

    methods: {
        bindViewTap() {
            const url = "../logs/main";
            wx.navigateTo({ url });
        },
        getUserInfo() {
            // 调用登录接口
            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: res => {
                            this.userInfo = res.userInfo;
                        }
                    });
                }
            });
        },
        clickHandle(msg, ev) {
            console.log("clickHandle:", msg, ev);
        }
    },

    created() {
    // 调用应用实例的方法获取全局数据
        this.getUserInfo();
    }
};
</script>

<style lang="scss" scoped>
.list {
    width: 100vw;
    padding: 30rpx;
    li {
        padding: 10rpx 0;
    }
}
</style>
