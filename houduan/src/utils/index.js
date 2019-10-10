/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 16:40:10
 * @LastEditTime: 2019-09-20 17:31:09
 * @LastEditors: Please set LastEditors
 */
const token = require('./token')
// { code = 1, msg = 'success', data = [] } = {} 设置一个默认函数
function formatData({ code = 1, msg = 'success', data = [] } = {}) {
    if (code == 0) {
        msg = 'fail'
    }
    return {
        code,
        msg,
        data
    }
}
// 暴露出去，让require引入
module.exports = {
    formatData,
    token
}
