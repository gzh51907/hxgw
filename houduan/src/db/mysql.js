/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 17:17:31
 * @LastEditTime: 2019-09-19 13:26:00
 * @LastEditors: Please set LastEditors
 */
const mysql = require('mysql');

// 使用连接池的方法,创建连接数据库
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '1111',
    multipleStatements: true
});

// 封装函数，接收sql语句，然后返回对象
function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, results, fields) => {
            if (error) {
                reject(error)
            };
            resolve(results);
        })
    })
}

module.exports = query;