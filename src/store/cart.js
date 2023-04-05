import { defineStore } from 'pinia'

export const useCartStore = defineStore({
    id: 'cart',
    state: () => {
        return {
            cartList: [],//购物车数据
            select: [],//选中的商品的id
            orderList: []
        }
    },
    getters: {
        isChecked() {
            return this.select.length === this.cartList.length
        },
        total() {
            let total = {
                price: 0,
                number: 0
            }
            this.orderList = []
            this.cartList.forEach(v => {
                if (this.select.indexOf(v.id) != -1) {
                    total.price += v.counter * v.discountPrice
                    total.number = this.select.length
                    this.orderList.push({
                        number: 1,
                        id: v.courseId
                    })
                }
            })
            return total
        }
    },
    actions: {
        addCart(list) {
            this.select = []
            list.forEach(v => {
                v.check = true
                this.select.push(v.id)
            });
            this.cartList = list
        },
        all() {
            this.select = this.cartList.map(v => {
                v.check = true
                return v.id
            })
        },
        unAll() {
            this.cartList.forEach(v => {
                v.check = false
            })
            this.select = []
        },
        itemChecked(index) {
            let id = this.cartList[index].id
            let idx = this.select.indexOf(id)
            if (idx > -1) {
                this.cartList[index].check = false
                this.select.splice(idx, 1)
            } else {
                this.cartList[index].check = true
                this.select.push(id)
            }
        }
    }
}) 