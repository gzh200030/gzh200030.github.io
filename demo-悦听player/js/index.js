/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
*/

// 2: 歌曲url获取接口
// 请求地址: https://autumnfish.cn/song/url
// 请求方法: get
// 请求参数: id(歌曲id)
// 响应内容: 歌曲url地址

// 3.歌曲详情获取
// 请求地址:https://autumnfish.cn/song/detail
// 请求方法:get
// 请求参数:ids(歌曲id)
// 响应内容:歌曲详情(包括封面信息)

// 4.热门评论获取
// 请求地址: https://autumnfish.cn/comment/hot?type=0
// 请求方法: get
// 请求参数: id(歌曲id, 地址中的type固定为0)
// 响应内容: 歌曲的热门评论

// 5.mv地址获取
// 请求地址: https://autumnfish.cn/mv/url
// 请求方法: get
// 请求参数: id(mvid, 为0表示没有mv)
// 响应内容: mv的地址

let app = new Vue({
    el: "#player",
    data: {
        // 搜索内容
        search: '',
        //歌曲空数组循环
        musicARR: [],
        //播放音乐
        playmisic: '',
        // 歌曲封面
        songcove: "",
        // 用户信息
        userinfo: [],
        // 动画播放
        animationsplay: false,
        // 遮罩层的显示状态
        isShow: false,
        // mv地址
        mvUrl: ""


    },
    methods: {
        // 歌曲搜索
        searchmusic: function () {
            var that = this
            axios.get('https://autumnfish.cn/search?keywords=' + this.search)

                .then(function (res) {

                    // console.log(res);
                    that.musicARR = res.data.result.songs
                    // console.log(that.musicARR);
                    // 输完搜索框清空
                    that.search = ''

                }, function (err) {

                })
        },

        //播放音乐
        playmusic: function (musicid) {
            // 回调函数this会变，先保存
            var that = this

            axios.get("https://autumnfish.cn/song/url?id=" + musicid)

                .then(function (res) {

                    // console.log(res.data.data[0].url);
                    that.playmisic = res.data.data[0].url
                }, function (err) {

                }),

                // 歌曲详情获取

                axios.get("https://autumnfish.cn/song/detail?ids=" + musicid)

                    .then(function (response) {
                        // console.log(response);
                        // console.log(response.data.songs[0].al.picUrl);
                        that.songcove = response.data.songs[0].al.picUrl

                    }, function (error) {

                    }),
                // 歌曲评论获取
                axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicid)

                    .then(function (res) {
                        console.log(res);
                        that.userinfo = res.data.hotComments
                        console.log(res.data.hotComments);




                    }, function () {

                    })



        },
        // 动画播放
        play: function (res) {
            console.log('动画播放');
            this.animationsplay = true

        },

        // 动画停止
        pause: function (res) {
            console.log('动画暂停');
            this.animationsplay = false


        },

        // 播放mv
        playMv: function (mvid) {

            var that = this;

            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function (response) {
                    console.log(response.data.data.url);
                    that.isShow = true;
                    that.mvUrl = response.data.data.url

                }, function (err) {

                })

        },
        // 隐藏
        hide: function () {

            this.isShow = false;
            // this.animationsplay = false
            // 隐藏清空mv
            this.mvUrl = ''
        }




    }
})