<template>
    <div>
         <el-image 
                :src="goodsInfo.goods_image"
                style="width:100%;height:300px;"
                >
        </el-image>
        <h1 class="tit">{{goodsInfo.goods_name}}</h1>
        <p class="price">
            <span>{{goodsInfo.goods_price}}</span>
            <del>{{goodsInfo.goods_marketprice}}</del>
        </p>
        <p>
          <el-input-number v-model="num"  :min="1" :max="10" label="描述文字" ></el-input-number>
        </p>
        <el-button-group>
            <el-button type="warning" icon="el-icon-shopping-cart-full" @click="add2cart">加入购物车</el-button>
            <el-button type="danger" icon="el-icon-goods" @click="buynow">立即购买</el-button>
        </el-button-group>

        <h4 class="tuijian">猜你喜欢</h4>
        <ul class="block" 
            height="auto">
            <li v-for="item in goodsInfo.goods_commend_list"
            :key="item.goods_id"
            @click="goto(item.goods_id)"
            >
                <el-image 
                :src="item.goods_image_url"
                style="width:100%;height:200px;"
                ></el-image>
                <h4 class="tit">{{item.goods_name}}</h4>
                <p class="price"><span>{{(item.goods_promotion_price * 0.8).toFixed(2)}}</span><del>{{item.goods_promotion_price}}</del></p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      num: 1,
      goodsInfo: {}
    };
  },
  created() {
    let { id } = this.$route.params;
    this.getData(id);
  },

  // 路由守卫监听更新
  beforeRouteUpdate(to, from, next) {
    // console.log("beforeRouteUpdate:", to, from);
    if (to.params.id != from.params.id) {
      this.getData(to.params.id);
      this.num = 1;
    }
    next();
  },
  methods: {
    goto(id) {
      this.$router.push("/goods/" + id);
    },
    
    async getData(id) {
      let { data: { datas } } = await this.$axios.get(
        "https://www.nanshig.com/mobile/index.php",
        {
          params: {
            act: "goods",
            op: "goods_detail",
            goods_id: id,
            key: ""
          }
        }
      );

      this.goodsInfo = {
        ...datas.goods_info,
        goods_commend_list: datas.goods_commend_list,
        goods_image: datas.goods_image
      };
    },

    // 添加商品，先判断是否已存在
    add2cart() {
      let id = this.goodsInfo.goods_id;
      let currentgoods = this.$store.state.cart.cartlist.filter(
        item => item.id == id
      )[0];
      if (currentgoods) {
        let num = currentgoods.num + this.num;
        console.log("num",num)
        this.$store.commit("changeNum", { id, num });

      } else {
        let goods = {
          id,
          title: this.goodsInfo.goods_name,
          pic: this.goodsInfo.goods_image,
          price: this.goodsInfo.goods_promotion_price,
          num: this.num
        };
        this.$store.commit("add2cart", goods);
      }
    },
    
    // 立即购买
    buynow() {
      this.add2cart();
      this.$router.push("/cart");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button-group {
  margin: 20px 0;
}

.tuijian {
  font-size: 18px;
  font-weight: bold;
  margin: 18px 0;
}

.block {
  display: flex;
  height: 280px;
  justify-content: space-between;
  margin-bottom: 10px;
  overflow-x: scroll;
  overflow-y: hidden;

  li {
    width: 48%;
    display: flex;
    flex-direction: column;
    height: 250px;
    margin-right: 10px;

    .el-image {
      width: 100%;
      height: 100px;
    }
  }
}

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

.price {
  margin-bottom: 10px;
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
</style>
