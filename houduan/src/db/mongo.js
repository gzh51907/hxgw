/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 19:24:16
 * @LastEditTime: 2019-09-19 16:01:55
 * @LastEditors: Please set LastEditors
 */
const { MongoClient } = require('mongodb');

const { DBurl, DBName } = require('../config.json');
// 接MongoDB
async function connect() {
    let result;
    try {
        let client = await MongoClient.connect(DBurl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        let db = client.db(DBName);
        result = { client, db }
    } catch (err) {
        result = err
    }
    return result
}

/**
 * 增
 *  {String} colName  集合名称
 * {Array} data     要添加的数据
 */
async function create(colName, data) {
    let { db, client } = await connect();
    // 获取集合
    let col = db.collection(colName);
    // 插入
    let result = await col.insertMany(data);
    client.close();

    return result

}
// create('user', [{ username: 'xiaoxie', age: 17, password: '12' }])

/**
 * 删
 * @param {String} colName 
 * @param {Object} query 
 */

async function remove(colName, query) {
    let { db, client } = await connect();
    // 获取集合
    let col = db.collection(colName);
    let result = await col.deleteMany(query);
    client.close();
    console.log(result);
    return result;
}

/**
 * 改
 * @param {String} colName 
 * @param {Object} query    查询条件
 * @param {Object} data     需要修改的数据
 */
async function update(colName, query, data) {
    let { db, client } = await connect();
    // 获取集合
    let col = db.collection(colName);
    let result = await col.updateMany(query, { $set: data });
    client.close();
    return result;
}

/**
 * 查
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */

async function find(colName, query = {}) {
    let { db, client } = await connect();
    let col = db.collection(colName);

    // 查询数据库
    let result = await col.find(query).toArray();

    // 关闭数据库连接
    client.close();
    //返回结果
    return result;
}

module.exports = {
    find,
    create,
    remove,
    update
}