<template>
    <div class="comp-canvas" :style="[{top:-2*th+'px',left:-2*tw+'px'}]">
        <canvas :style="[{width:tw+'px',height:th+'px',background:'#000'}]" canvas-id="canvas"></canvas>
    </div>
</template>

<script>
export default {
    props:  {
        // 需要裁切的图片地址
        url: {
            type: String,
            required: true,
        },
        tw: {
            type: Number,
            default: 350,
        },
        th: {
            type: Number,
            default: 280,
        }
    },
    data () {
        return {

        };
    },
    watch: {
        url (nv) {
            this.getImageInfo(nv);
        }
    },
    onLoad () {
        console.log('clipImage onLoad');
    },
    onShow () {
        console.log('clipImage onShow');
    },
    onReady () {
        console.log('clipImage onReady');
    },
    mounted() {
        console.log('clipImage mounted');
        console.log(`this.url:`,this.url);
        this.getImageInfo(this.url);
    },
    onHide () {
        console.log('clipImage onHide');
    },
    onUnload () {
        console.log('clipImage onUnload');
        this.$emit('clipImageHide');
    },
    methods : {
        getImageInfo (imgSrc) {
            // 测试专用图
            // const imgSrc01 = 'https://resources.laihua.com/2019-1-26/528a00f0-2135-11e9-97a0-49d3e303954e.png';
            // const imgSrc02 = 'https://resources.laihua.com/2019-1-26/6c9b4850-2135-11e9-bb54-bfed9661fbd9.png';
            // const imgSrc1 = 'https://resources.laihua.com/2019-1-5/6e5631c0-10ad-11e9-853b-0beb71690b72.png';
            // const imgSrc2 = 'https://resources.laihua.com/2018-11-10/7c56ac50-e4a2-11e8-b930-7369770cf9b6.png';
            // const imgSrc3 = "https://resources.laihua.com/2019-1-25/e0282840-2088-11e9-97a0-49d3e303954e.png";
            // const imgSrc4 = 'https://resources.laihua.com/2019-1-25/8d490140-2082-11e9-bb54-bfed9661fbd9.png';
            // const imgSrc5 = 'https://resources.laihua.com/2019-1-26/6f5e4ad0-2133-11e9-97a0-49d3e303954e.png';
            // const imgSrc6 = 'https://resources.laihua.com/2019-1-26/1f438c40-2133-11e9-97a0-49d3e303954e.png';
            console.log(`44:`,44);
            const self = this;
            wx.getImageInfo({
                src: imgSrc,
                success: (res) => {
                    console.log(`res:`,res);
                    // 执行封面裁切
                    clipImage(res.path,res.width,res.height,self.tw,self.th, (url) => {
                        console.log(`clipOver url:`,url);
                        self.$emit('clipOver',url);
                    });

                }
            });

            /* 裁剪封面，
            * url为图片路径
            * sw sh分别为图片原始宽高
            * tw th分别为目标图片宽高，
            * cb为裁剪成功后的回调函数，返回裁切后的图片链接
            */
            const clipImage = (url, sw, sh, tw, th, cb) => {
                const ctx = wx.createCanvasContext('canvas');
                // 原始图片宽高比
                const sr = sw / sh;
                // 目标图片比例
                const tr = tw / th;
                // 指定画布与原始图片宽度比例
                const wr = tw / sw;
                // 指定画布与原始图片高度比例
                const hr = th / sh;

                // 原始图片宽高比例为指定比例，直接缩放即可
                if (sr == tr){
                    console.log(`0:`,0);
                    ctx.drawImage(url,0,0,sw,sh, 0,0,tw,th);
                } else {

                    // 原图宽高均大于指定大小，这种情况下哪个比例大(wr hr)哪个是短边
                    if (sw > tw && sh > th){
                        // 宽度为短边
                        if  (wr > hr ){
                            console.log(`1:`,1);
                            ctx.drawImage(url, 0,(sh-sw/tr)/2,sw,sw/tr, 0,0,tw,th);
                        }
                        // 高度为短边
                        else {
                            console.log(`2:`,2);
                            ctx.drawImage(url, (sw-tr*sh)/2,0,tr*sh,sh, 0,0,tw,th);
                        }
                    }
                    // 原图宽高均小于指定大小，这种情况下哪个比例大(wr hr)哪个是短边
                    else if (sw < tw && sh < th) {
                        // 宽度为短边
                        if (wr > hr) {console.log(`3:`,3);
                            ctx.drawImage(url, 0,(sh-sw/tr)/2,sw,sw/tr, 0,0,tw,th);
                        }
                        // 高度为短边
                        else {console.log(`4:`,4);
                            ctx.drawImage(url, (sw-sh*tr)/2,0,sh*tr,sh, 0,0,tw,th);
                        }
                    }
                    // 原图只有一边（宽或者高）大于指定大小
                    else {
                        // 宽短高大
                        if (wr > hr) {
                            console.log(`5:`,5);
                            ctx.drawImage(url, 0,(sh-sw/tr)/2,sw,sw/tr, 0,0,tw,th);
                        }
                        // 宽大高小
                        else {
                            console.log(`6:`,6);
                            ctx.drawImage(url,(sw-sh*tr)/2,0,sh*tr,sh, 0,0,tw,th);
                        }
                    }
                }

                ctx.draw(false,() => {
                    wx.canvasToTempFilePath({
                        canvasId: 'canvas',
                        quality: 1,
                        success ( res ) {
                            console.log(`裁切后的res:`,res);
                            typeof cb == 'function' && cb(res.tempFilePath);
                        }
                    });
                });
            };
        }
    }
};
</script>

<style lang="scss" scoped>
.comp-canvas {
    position: fixed;
}
</style>
