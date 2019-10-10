/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 17:15:32
 * @LastEditTime: 2019-09-19 13:19:49
 * @LastEditors: Please set LastEditors
 */
// 商品的增删改查

const express = require('express');
const Router = express.Router();

//  mysql: query 是将 mysql 的值改到query上，mysql消失
const { mysql: query } = require('../db');
const {formatData} = require('../utils')

// 库存
Router.get('/kucun',(req,res)=>{
    let {id} = req.query;
    console.log(id)

    // 查询id对应商品的库存量，并返回前端
    let result = formatData({data:5})

    setTimeout(()=>{
        res.send(result);
    },600)

})

// 将增删改查中路径相同的写在一起,
Router.route('/')
    .post((req, res) => {
        // let { id } = req.params;
        // let result = await query(`select * from taobaolist02 where id = ${id}`);
        // res.send(result);
    })

// .get(async (req, res) => {
//     let { size = 10, page = 1, price } = req.query;
//     let sql = `select * from goods limit ${(page - 1) * size},${size}`;

//     if (sort) {
//         sort = sort.split(',')
//         sql += ` order by ${sort[0]} ${sort[1] == 1 ? 'asc' : 'desc'}`
//     }
//     let result = await query(sql);
//     res.send(result);
// })


Router.route('/:id')
    // async & await写法
    // 用同步的代码实现异步操作

    .delete(async (req, res) => {
        let { id } = req.params;
        let result = await query(`delete * from taobaolist02 where id = ${id}`);
        res.send(result);
    })
    .patch(async (req, res) => {

        let { id } = req.params;
        let { price } = req.body;

        let sql = `update taobaolist02 set `
        for (key in req.body) {
            sql += key + '=' + req.body[key] + ','
        }
        sql = sql.slice(0, -1);

        sql += ` where id=${id}`;
        console.log(sql);
        let result = await query(sql);
        res.send(result);
    })

    .get(async (req, res) => {
        let { id } = req.params;
        let result = await query(`select * from taobaolist02 where id = ${id}`);
        res.send(result);
    })

module.exports = Router;