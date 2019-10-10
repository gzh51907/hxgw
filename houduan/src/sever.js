/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:47:18
 * @LastEditTime: 2019-09-17 19:27:19
 * @LastEditors: Please set LastEditors
 */
const express = require('express');
const { PORT } = require('./config.json');
const allRouter = require('./routers');
const app = express();

// 静态资源服务器
app.use(express.static('./'));
app.use(allRouter);

// 监听
app.listen(PORT, () => {
    console.log('成功启动')
})


