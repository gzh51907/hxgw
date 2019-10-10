/*
 * @Description: In User Settings Edittoketn
 * @Author: your name
 * @Date: 2019-09-20 11:54:51
 * @LastEditTime: 2019-09-20 19:19:18
 * @LastEditors: Please set LastEditors
 */
const jwt = require('jsonwebtoken');

// * 
//  * @param { String } data         加密数据
//     * @param { Number } expiresIn    有效期（单位: s）

// 封装设置免登录时间
let { secret } = require('../config.json');

function create(data, expiresIn = 20) {
    // 创造一个token，是加密后的字符串
    let token = jwt.sign({ data }, secret, {
        expiresIn
    });
    return token;
}

// 验证方法
function verify(token) {
    let res;
    try {
        let result = jwt.verify(token, secret);
        res = true;
    } catch (err) {
        res = false;
    }
    return res;
}

module.exports = {
    create,
    verify
}