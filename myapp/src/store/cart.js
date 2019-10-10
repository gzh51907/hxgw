import axios from 'axios';
import { Message } from 'element-ui';

let cart = {
    state: {
        cartlist: []
    },
    // （理解为组件中的computed）
    getters: {
        cartlength(state) {
            return state.cartlist.length;
        },
        allprice(state) {
            return state.cartlist.reduce((prev, item) => prev + item.price * item.num, 0);
        },
        allnum(state) {
            return state.cartlist.reduce((prev, item) => prev + item.num, 0);
        }
    },
    // mutations（理解为组件中的methods）
    mutations: {
        // 添加商品
        add2cart(state, goods) {
            state.cartlist.unshift(goods);
        },
        remove(state, id) {
            // filter过滤后的结果，拿到除该 id 的其他商品信息 
            state.cartlist = state.cartlist.filter(item => item.id != id);
        },
        clearCart(state) {
            state.cartlist = [];
        },
        changeNum(state, { id, num }) {
            state.cartlist.forEach(item => {
                if (item.id === id) {
                    item.num = num;
                }
            })
        }
    },
    actions: {
        async changeNumAsync(context, { id, num }) {
            // 获取库存数量kucun，然后与传入的qty进行对比
            // 如qty<=kucun， 放行（操作mutation）
            // 如果qty>kucun，提示库存不足

            let {data} = await axios.get('http://localhost:1907/goods/kucun')
            let kucun = data.data;
            if(num <= kucun){
                console.log("num",num);
                context.commit('changeNum',{id,num})
            }else{
                Message.error('当前商品库存不足');
                context.commit('changeNum',{id,num:kucun});
            }
        }
    }
}

export default cart;