<template>
<div>
    <div class="page-cart" v-if="(tableData.length!= 0)?show:show!=show">
    <el-steps :active="1" finish-status="success">
      <el-step title="购物车"></el-step>
      <el-step title="结算"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-row :gutter="30" v-for="item in tableData" :key="item.id" class="hang">
      <el-col :span="4">
        <img :src="item.pic" />
      </el-col>
      <el-col :span="16">
        <h2>{{item.title}}</h2>
        <p class="price">
          <span>{{item.price}}</span> &times;
          <el-input-number size="mini" v-model="item.num" :min="1"></el-input-number>
        </p>
      </el-col>
      <el-col :span="4" style="text-align:right">
        <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="30" style="margin-top:20px;">
      <el-col :span="10">
        <el-button type="danger" icon="el-icon-delete" size="mini">清空</el-button>
      </el-col>
      <el-col :span="14" class="price" style="text-align:right">
        <span class="jiesuan">共：{{allnum}} 件 &nbsp;&nbsp;&nbsp;总计：{{allprice.toFixed(2)}}</span>
      </el-col>
    </el-row>
    <div style="text-align:right">
      <el-button type="danger" icon="el-icon-s-finance">去结算</el-button>
    </div>
  </div>
  <h4 v-show="(tableData.length!= 0)?show!=show:show">购物车空空如也~~~快去首页看看吧！</h4>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      num: this.$route.params.num,
      tableData: [],
    };
  },
  created() {
    let { id, num } = this.$route.params;
    if ((id, num)) {
      this.getTable(id, num);
    }
  },
  methods: {
    changeQty(currentValue, oldValue) {
      console.log(currentValue, oldValue);
    },
    async getTable(id, num) {
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

      // 表格数据制作
      this.tableData.push({
        xuhao: this.tableData.length + 1,
        id: this.goodsInfo.goods_id,
        pic: this.goodsInfo.goods_image,
        title: this.goodsInfo.goods_name,
        num: num,
        price: this.goodsInfo.goods_promotion_price * 1,
      });
    }
  },
  computed:{
    allprice(){
       // 总共：数量和价格
       let allprice=0;
        this.tableData.map(item => {
        allprice += item.price*item.num;
      });
      return allprice
    },
    allnum(){
        let allnum = 0;
        this.tableData.map(item => {
        allnum += item.num;
        })
        return allnum
    }
  }
};
</script>

<style lang="scss" scoped>
.page-cart img {
  width: 100%;
}

.hang{
  margin-top:30px;
  padding-bottom: 15px;
  border-bottom:1px solid #ccc;
}

h4{
  text-align: center;
  margin: 1.333333rem auto;
  color: #999;
  font-size: .266667rem;
}

.jiesuan{
    font-size: 16px;
    color: red;
    font-weight: bold;
}

</style>
