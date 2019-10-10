/*
 * @Description: In User Settings Ediy
 * @Author: your name
 * @Date: 2019-09-17 17:15:37
 * @LastEditTime: 2019-09-20 19:09:42
 * @LastEditors: Please set LastEditors
 */
const express = require('express');
const Router = express.Router();

const { mongo } = require('../db');
// 引入封装的模块
const { formatData, token } = require('../utils')
const colName = 'user';

// 注册
// / user/check 是get, 
Router.get('/check', async (req, res) => {

    // 拿到传来的用户名
    let { username } = req.query;
    // console.log({ username });
    // 去find数据库对比
    let result = await mongo.find(colName, { username });
    if (result.length) {
        // formatData是引入的模块函数
        res.send(formatData({ code: 0 }))// {code:0,msg:'fail',data}
    } else {
        res.send(formatData())// {code:1,msg:'success',data}
    }
});
// /user/ reg 是post
Router.post('/reg',async (req,res)=>{
    let {username,password} = req.body;
    let result
    try{
        await mongo.create(colName,[{username,password,regtime:new Date()}]);
        result = formatData()
    }catch(err){
        result = formatData({code:0})
    }

    res.send(result);
})

// 登录
Router.get('/login', async (req, res) => {
    let { username, password, mdl } = req.query;
    // console.log(req.query);
    let result = await mongo.find(colName, { username, password });

    if (result.length > 0) {
        let Authorization;
        if (mdl) {
            Authorization = token.create(username);
            console.log(Authorization);
            res.send(formatData({ data: Authorization }));
        } else {
            res.send(formatData({ code: 0 }));
        }
    }
})

// 插入数据
Router.post('/reg', async (req, res) => {
    // 拿到传来的数据
    let { username, password } = req.body;
    console.log({ username, password });
    // 存起来
    let result = await mongo.create(colName, [{ username, password, regtime: Date.now() }])
    res.send(result);
})

// 增删改查
Router.route('/')
    // 删除
    .delete(async (req, res) => {
        let result = await mongo.remove('user', req.query);
        res.send(result);
    })
    // 用户信息修改
    .patch(async (req, res) => {
        // console.log(req.query, '1111111', req.body);
        let result = await mongo.update('user', req.query, req.body);
        res.send(result);
    })

    // 查询用户
    .get(async (req, res) => {
        // 有条件就查指定，没有就查全部
        if (req.query) {
            // 执行mongodb后是个promise对象，加了await后变成 [{},{}]
            let result = await mongo.find('user', req.query);
            res.send(result);
        } else {
            let result = await mongo.find('user');
            res.send(result);
        }

    })

    // 增加用户
    .post(async (req, res) => {
        // 执行mongodb后是个promise对象，加了await后变成 [{},{}]
        let result = await mongo.create('user', [req.body]);
        res.send(result);
    })

module.exports = Router;