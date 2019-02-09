<template>
    <div class="comp-navbar">
        <!-- 占位栏 -->
        <cover-view class="placeholder-bar" :style="{height: navBarHeight + 'px'}"> </cover-view>
        <!-- 导航栏主体 -->
        <cover-view class="navbar" :style="{height: navBarHeight + 'px',backgroundColor:navBackgroundColor}">
            <!-- 状态栏 -->
            <cover-view class="nav-statusbar" :style="{height: statusBarHeight + 'px'}"></cover-view>
            <!-- 标题栏 -->
            <cover-view class="nav-titlebar" :style="{height: titleBarHeight + 'px' }">
                <!-- home及后退键 -->
                <cover-view class="bar-options">
                    <cover-view v-if="backVisible" class="opt opt-back" @click="backClick()">
                    <cover-image class="back-image" src="/static/images/back.png"></cover-image>
                    </cover-view>
                    <cover-view class="line" v-if="backVisible && homePath"></cover-view>
                    <cover-view v-if="homePath" class="opt opt-home" @click="homeClick()">
                    <cover-image class="home-image" src="/static/images/home.png"></cover-image>
                    </cover-view>
                </cover-view>
                <!-- 标题 -->
                <cover-view class="bar-title" :style="[{color:titleColor}]">{{title}}</cover-view>
            </cover-view>
        </cover-view>
    </div>
</template>

<script>
export default {
    props: {
        // 导航栏背景色
        navBackgroundColor: {
            default: "#ffffff"
        },
        // 标题颜色
        titleColor: {
            default: "#000000"
        },
        //标题文字
        title: {
            required: false,
            default: "来画大世界"
        },
        // 是否显示后退按钮
        backVisible: {
            required: false,
            default: false
        },
        // home按钮的路径
        homePath: {
            required: false,
            default: ""
        }
    },
    data() {
        return {
            statusBarHeight: "", // 状态栏高度
            titleBarHeight: "", // 标题栏高度
            navBarHeight: "", // 导航栏总高度
            platform: "",
            model: "",
            brand: "",
            system: ""
        };
    },
    beforeMount() {
        const self = this;
        wx.getSystemInfo({
            success(system) {
                console.log(`system:`, system);
                self.statusBarHeight = system.statusBarHeight;
                self.platform = system.platform;
                self.model = system.model;
                self.brand = system.brand;
                self.system = system.system;

                let platformReg = /ios/i;
                if (platformReg.test(system.platform)) {
                    self.titleBarHeight = 44;
                } else {
                    self.titleBarHeight = 48;
                }

                self.navBarHeight = self.statusBarHeight + self.titleBarHeight;
            }
        });
    },
    mounted() {
        console.log(`this.backVisible:`, this.backVisible);
    },
    methods: {
        backClick() {
            if (getCurrentPages().length == 1) {
                // 打开分享卡片无法回退
                wx.redirectTo({
                    url: this.homePath
                });
            } else {
                wx.navigateBack({
                    delta: 1
                });
            }
        },
        homeClick() {
            wx.redirectTo({
                url: this.homePath
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.comp-navbar {
    width: 100vw;
    .navbar {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        .nav-titlebar {
            // border: 1px solid green;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            .bar-options {
            // width: 87px;
            // height: 30px;
            width: 170rpx;
            height: 60rpx;
            display: flex;
            // border: 1px solid hsla(0, 0%, 100%, .25);
            // border: 1px solid #ededed;
            box-sizing: border-box;
            align-items: center;
            justify-content: space-around;
            position: absolute;
            left: 7px;
            display: flex;
            align-items: center;
            background: hsla(0, 0%, 100%, 0.6);
            border-radius: 27px;
            padding-right: 5rpx;
            .opt {
                width: 50rpx;
                height: 50rpx;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .opt-back {
                .back-image {
                width: 16rpx;
                height: 28rpx;
                }
            }
            .line {
                display: block;
                height: 30rpx;
                width: 1px;
                background-color: gray;
            }
            .opt-home {
                .home-image {
                width: 36rpx;
                height: 34rpx;
                }
            }
            }
            .bar-title {
                width: 45%;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
            }
        }
    }
    .placeholder-bar{
        background-color: transparent;
        width: 100%;
    }
}
</style>
