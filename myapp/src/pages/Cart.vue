<template>
<div>
    <table :data="tableData">
      <thead>
        <tr>
          <th>序号</th>
          <th>id</th>
          <th>图片</th>
          <th>标题</th>
          <th>数量</th>
          <th>价格</th>
          <th>总计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="item in tableData" :key="item.id">
          <td>{{item.xuhao}}</td>
          <td>{{item.id}}</td>
          <td><img :src="item.pic"></td>
          <td class="tit">{{item.title}}</td>
          <td>
            <el-input-number v-model="item.num" @change="handleChange" :min="1" :max="10" label="描述文字" >
              </el-input-number>
          </td>
          <td class="price">￥{{item.price}}</td>
          <td class="price">￥{{item.total}}</td>
          <td>
            <el-button type="danger" icon="el-icon-delete" plain>删除</el-button>
          </td>
        </tr>
      </tbody>
  </table>
        <p>
          <span >总计：</span>
          <el-button type="danger" icon="el-icon-sold-out">立即结算</el-button>
        </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: this.$route.params.num,
      tableData: [
        {
          xuhao: 1,
          id: "226706",
          pic:
            "https://www.nanshig.com/data/upload/shop/store/goods/45/45_05960739685357586_360.jpg",
          title:
            "裤子男韩版潮流秋冬季运动裤男士加绒宽松休闲束脚长裤潮牌工装裤 黑色 M",
          num: 1,
          price: "119.00",
          total: "119.00"
        }
      ],
    };
  },
  created() {
    let { id, num } = this.$route.params;
    this.getTable(id, num);
  },
  methods: {
    handleChange(value) {
      // console.log(value);
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

      console.log("datas.goods_image", datas.goods_image);

      // 表格数据制作
      this.tableData.push({
        xuhao: this.tableData.length + 1,
        id: this.goodsInfo.goods_id,
        pic: this.goodsInfo.goods_image,
        title: this.goodsInfo.goods_name,
        num: num,
        price: this.goodsInfo.goods_promotion_price,
        total:num * this.goodsInfo.goods_promotion_price
      });
      console.log("tableData", this.tableData);
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border: 1px solid #ccc;

  td,
  th {
    border-right: 1px solid #ccc;
    padding: 10px;
  }
  tr {
    border-bottom: 1px solid #ccc;

    .tit {
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .price{
      font-size: .213333rem;
      font-weight: bold;
      color: red;
    }
  }
  img {
    width: 70px;
    height: 70px;
  }
}

p {
  display: flex;
  margin: 15px 0;
  justify-content: flex-end;

  span {
    display: inline-block;
    width: 100px;
    font-size: 16px;
    color: red;
    font-weight: bold;
    margin: 10px;
  }
}
</style>
