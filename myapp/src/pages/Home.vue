<template>
    <div>
      <div id="lunbo">
        <!-- 轮播图 -->
        <el-carousel height="200px">
            <el-carousel-item 
            v-for="item in adlist" 
            :key="item" 
            >
           <img :src="item" style="width:100%;height:100%"/>
            </el-carousel-item>
        </el-carousel>
        </div>
        <!-- 小图 -->
        <div class="smallbox">
          <dl v-for="(itempic,idx) in smallpic" :key="idx">
            <dt>
              <img :src="itempic.img" />
          </dt>
            <dd>{{itempic.txt}}</dd>
          </dl>
        </div>

        <!-- 内容 -->
        <ul class="block" 
        v-for="category in recommend" 
        :key="category.title" 
        height="auto">
            <li v-for="item in category.item"
            :key="item.goods_id"
            @click="goto(item.goods_id)"
            >
                <el-image 
                :src="item.goods_image"
                style="width:100%;height:200px;"
                ></el-image>
                <h4 class="tit">{{item.goods_name}}</h4>
                <p class="price"><span>{{(item.goods_price * 0.8).toFixed(2)}}</span><del>{{item.goods_promotion_price}}</del></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      adlist: [],
      recommend: [],
      ddqGoodsList: [],
      // 小圆图数据
      smallpic: [
        {
          img:
            "https://image.hao24.com/images_site/mob/appIndex/2019/09/1569576151928_100x100.png",
          txt: "时尚鞋靴"
        },
        {
          img:
            "https://image.hao24.com/images_site/mob/appIndex/2019/09/1569576131137_100x100.png",
          txt: "男人衣柜"
        },
        {
          img:
            "https://image.hao24.com/images_site/mob/appIndex/2019/09/1569576188205_100x100.png",
          txt: "精品裤装"
        },
        {
          img:
            "https://image.hao24.com/images_site/mob/appIndex/2019/09/1569576157778_100x100.png",
          txt: "精品套装"
        },
        {
          img:
            "https://image.hao24.com/images_site/mob/appIndex/2019/09/1569576217992_100x100.png",
          txt: "每日签到"
        }
      ]
    };
  },
  methods: {
    goto(id) {
      // 跳转goods，带id
      this.$router.push({ name: "goods", params: { id } });
    }
  },
  async created() {
    // 请求数据拿商品
    let { data: { datas } } = await this.$axios.get(
      "https://www.nanshig.com/mobile/index.php",
      {
        params: {
          act: "index"
        }
      }
    );

    // 春夏新品推荐
    this.recommend = datas.slice(1).map(item => {
      return item.goods;
    });
    console.log(this.recommend);

    // 发送请求拿到轮播图
    let { data: { data: { config } } } = await this.$axios.get(
      "http://cmsjapi.dataoke.com/api/category/product/model-detail-by-model-id-new",
      {
        params: {
          entityId: "4",
          modelId: "-1",
          proModelId: "1",
          source: "3",
          version: "v1",
          tuserId: "14464",
          userId: "14464"
        }
      }
    );

    // console.log("config", config);

    //  轮播图
    this.adlist = config.map(item => {
      return item.pic;
    });
    // console.log("dalist", this.adlist);

    // this.$axios.post(
    //     "https://m.hao24.com/index/user_survey.do?_=1570420765227"
    //   )
    //   .then(res => {
    //     this.postcontent = res.data;
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
};
</script>

<style lang="scss" scoped>
.smallbox {
  display: flex;
  margin: 20px 0;

  dl {
    flex: 18%;
    display: flex;
    flex-direction: column;

    dt {
      width: 50px;
      height: 65px;
      align-self: center;

      img {
        width: 100%;
        height: 50px;
        border-radius: 50%;
      }
    }

    dd {
      text-align: center;
      color: #ab2524;
    }
  }
}
.block {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;

  li {
    width: 48%;
    display: flex;
    flex-direction: column;
    height: 250px;
    margin-bottom: 18px;
    margin-top: 10px;

    .tit {
      font-size: 14px;
      margin: 8px;
      width: 95%;
      height: 45px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .el-image {
      width: 100%;
      height: 200px;
    }
    .price {
      del {
        font-size: 14px;
        color: rgba(22, 21, 21, 0.226);
        &::before {
          content: "￥";
        }
      }

      span {
        margin-right: 10px;
        font-size: 18px;
        color: red;
        font-weight: bold;

        &::before {
          content: "￥";
        }
      }
    }
  }
}
</style>


