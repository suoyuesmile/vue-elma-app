<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline"
      v-show="food.count>0"
      @click="decreaseCart">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div ref="cartadd" class="cart-add icon-add_circle" @click="addCart" @childListened="childListened"></div>
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
      this.$parent.$emit('childListened', event.target)
    },
    decreaseCart() {
      this.food.count--
    },
    childListened(){}
  }
}
</script>

<style lang="stylus">
.cartcontrol
  font-size 0px
  .cart-decrease
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
  .move-enter-active, .move-leave-active
    transition 0.3s all linear
  .move-enter, .move-leave-to
    opacity 0
    transform translate3d(24px,0,0) rotate(180deg)
  .move-enter-to, .move-leave
    opacity 1
    transform translate3d(0,0,0) rotate3d(0)
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
