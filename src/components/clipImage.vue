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
        ratio: {
            type: Array,
            default: function () {
                return [5,4];
            }
        }
    },
    data () {
        return {
            tw: 0, // 目标宽度（画布宽度）
            th: 0, // 目标高度（画布高度）
        };
    },
    computed: { },
    watch: {
        url (nv) {
            this.getImageInfo(nv);
        }
    },
    onLoad () {
        console.log('clipImage onLoad');
        this.getImageInfo(this.url);
    },
    onShow () {
        console.log('clipImage onShow');
    },
    onReady () {
        console.log('clipImage onReady');
    },
    mounted() {
        console.log('clipImage mounted');
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
            const self = this;
            wx.getImageInfo({
                src: imgSrc,
                success: (res) => {
                    console.log(`图片信息:`,res);
                    const sw = res.width; //图片宽度
                    const sh = res.height; //图片高度
                    const sr = sw / sh; // 原始图片比例
                    const tr = self.ratio[0] / self.ratio[1];  // 目标比例
                    /**
                     * 通过图片比例与指定比例的比较计算画布大小
                     * 图片比例大，说明图片高度为短边，那么图片高度便是画布高度，再根据指定宽高比算出画布宽度；
                     * 图片比例小，说明图片宽度为短边，剩下同理；
                     */
                    if (sr > tr){
                        self.th = sh;
                        self.tw = tr * sh;
                    }  else if (sr < tr) {
                        self.tw = sw;
                        self.th = sw / tr;
                    }  else {
                        self.tw = sw;
                        self.th = sh;
                    }
                    // 执行封面裁切
                    clipImage(res.path,sw,sh,self.tw,self.th, (url) => {
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
                // 目标图片宽高比
                const tr = tw / th;

                if (sr == tr){
                    console.log(`0:`,0);
                    ctx.drawImage(url,0,0,sw,sh, 0,0,tw,th);
                } else if (sr > tr) {
                    ctx.drawImage(url, (sw-sh*tr)/2,0,sh*tr,sh, 0,0,tw,th);
                } else if (sr < tr) {
                    ctx.drawImage(url, 0,(sh-sw/tr)/2,sw,sw/tr, 0,0,tw,th);
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
