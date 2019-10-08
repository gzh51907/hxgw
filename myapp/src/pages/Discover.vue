<template>
<div>
    <div v-for="category in recommend" 
            :key="category.title">
    <div>
        <h4 style="font-size:16px;font-weight:bold; margin-bottom: 30px;">
            {{category.title}}
        </h4>
    </div>
    <ul class="block" height="auto" >
       
        <li  v-for="item in category.item" 
            :key="item.goods_id" 
            style="height:360px"
            @click="goto(item.goods_id)"
        >
            <el-image 
                :src="item.goods_image"
                style="width:100%;"
                ></el-image>
            <h4 class="tit">{{item.goods_name}}</h4>
            <p class="price"><span>{{(item.goods_promotion_price * 0.8).toFixed(2)}}</span><del>{{item.goods_promotion_price}}</del></p>
        </li>
    </ul>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      recommend: []
    };
  },

  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate:", to, from);
    if (to.params.id != from.params.id) {
      this.getData(to.params.id);
    }
    next();
  },

  async created() {
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
  },
  methods: {
    goto(id) {
      console.log(id);
      this.$router.push({ name: "goods", params: { id } });
    },
    time(){
        let settime = setInterval(()=>{
            
        },500)
    }
  }
};
</script>

<style lang="scss" scoped>
.block {
  display: flex;
  height: 200px;
  justify-content: space-between;
  margin-bottom: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 10px;

  li {
    width: 25%;
    display: flex;
    flex-direction: column;
    height: 100px;
    margin-right: 10px;

    .el-image {
      width: 100px;
      height: 100px;
    }
  }
}

.tit {
  font-size: 0.186667rem;
  margin: 8px;
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price {
  margin-bottom: 10px;
  del {
    font-size: 0.186667rem;
    color: rgba(22, 21, 21, 0.226);
    &::before {
      content: "￥";
    }
  }

  span {
    margin-right: 10px;
    font-size: 0.24rem;
    color: red;
    font-weight: bold;

    &::before {
      content: "￥";
    }
  }
}
</style>
