<template>
<div>
    <div class="page-cart" v-if="(cartlist.length!= 0)?show:show!=show">
    <el-steps :active="step" finish-status="success">
      <el-step title="购物车"></el-step>
      <el-step title="结算"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-row :gutter="30" v-for="item in cartlist" :key="item.id" class="hang">
      <el-col :span="5">
        <img :src="item.pic" />
      </el-col>
      <el-col :span="16">
        <h2>{{item.title}}</h2>
        <p class="price" style="margin-top:10px;">
          <span style="color:red;font-size:16px;">￥{{item.price}}</span> &times;
           <el-input-number size="mini" v-model="item.num" @change="changeNum(item.id,$event)"></el-input-number>
        </p>
      </el-col>
      <el-col :span="3" style="text-align:right">
        <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="remove(item.id)"></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="30" style="margin-top:20px;">
      <el-col :span="6">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="clearCart()">清空</el-button>
      </el-col>
      <el-col :span="18" class="price" style="text-align:right">
        <span class="jiesuan">共：{{allnum}} 件 &nbsp;&nbsp;&nbsp;总计：￥{{allprice.toFixed(2)}}</span>
      </el-col>
    </el-row>
    <div style="text-align:right">
      <el-button type="danger" icon="el-icon-s-finance" @click="pay">去结算</el-button>
    </div>
  </div>
  <h4 v-show="(cartlist.length!= 0)?show!=show:show">购物车空空如也~~~快去首页看看吧！</h4>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step:1,
      show: true
    };
  },
  computed: {
    cartlist(){
      return this.$store.state.cart.cartlist
    },
    allprice() {
      // 总共：数量和价格
      return this.$store.getters.allprice;
    },
    allnum() {
      let allnum = 0;
      this.$store.state.cart.cartlist.map(item => {
        allnum += item.num;
      });
      return allnum;
    }
  },
  methods: {
    changeNum(id, num) {
      this.$store.dispatch("changeNumAsync", { id, num });
    },
    remove(id) {
      this.$store.commit("remove", id);
    },
    clearCart() {
      this.$store.commit("clearCart");
    },
    pay(){
      // 结算后有弹窗，改变步骤灯
      this.step = 2;
       this.$confirm('确定要结算这些商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '结算成功!'
          });
          this.step = 3;
          this.$store.commit("clearCart");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消结算'
          });
        });
      }
  }
};
</script>

<style lang="scss" scoped>
.page-cart img {
  width: 100%;
}

.hang {
  margin-top: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}

h4 {
  text-align: center;
  margin: 1.333333rem auto;
  color: #999;
  font-size: 0.266667rem;
}

.jiesuan {
  font-size: .266667rem;
  color: red;
  font-weight: bold;
}
</style>
