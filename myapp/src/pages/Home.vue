<template>
    <div>
      <div id="lunbo">
        <!-- 轮播图 -->
        <el-carousel height="180px">
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
      smallpic: []
    };
  },
  methods: {
    goto(id) {
      // 跳转goods，带id
      this.$router.push({ name: "goods", params: { id } });
    }
  },
  async created() {
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
    //  轮播图
    this.adlist = config.slice(1).map(item => {
      return item.pic;
    });

    // 发送请求拿到小圆图
    let { data: { data: { config: { data} } } } = await this.$axios.get(
      "https://cmsjapi.dataoke.com/api/category/product/model-detail-by-model-id-new",
      {
        params: {
          entityId: "4",
          modelId: "11408",
          proModelId: "2",
          source: "3",
          version: "v1"
        }
      }
    );
    // 提取小图数据
    this.smallpic = data.map(item => {
      return {
        txt: item.name,
        img: item.address
      };
    });

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

  }
};
</script>

<style lang="scss" scoped>
.smallbox {
  display: flex;
  margin: 0.266667rem 0;

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
  margin-bottom: 0.133333rem;

  li {
    width: 48%;
    display: flex;
    flex-direction: column;
    height: 200px;
    margin-bottom: 0.24rem;
    margin-top: 0.133333rem;

    .tit {
      font-size: .213333rem;
      margin: 0.106667rem;
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
      height: 2.666667rem;
    }
    .price {
      del {
        font-size: 0.186667rem;
        color: rgba(22, 21, 21, 0.226);
        &::before {
          content: "￥";
        }
      }

      span {
        margin-right: 0.133333rem;
        font-size: .24rem;
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


