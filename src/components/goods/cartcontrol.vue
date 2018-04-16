<template>
  <div class="cartcontrol">
    <div class="cart-decrease"
    v-show="food.count>0"
    @click="decreaseCart"
    transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {}
  },
  props: {
    food: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    addCart() {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart() {
      this.food.count--
    }
  }
}
</script>

<style lang="stylus">
.cartcontrol
  font-size 0px
  .cart-decrease
    display inline-block
    padding 6px
    transition all 0.4s linear
    &.move-transition
      opacity 1
      transform translate3d(0, 0, 0)
    .inner
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
      transition all 0.4s linear
      transform rotate(0)
    &.move-enter, &.move-leave
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180)
  .cart-count
    display inline-block
    vertical-align top
    line-height 24px
    padding 6px 3px
    font-size 10px
    width 10px
    color rgb(147, 153, 159)
  .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
</style>
