<template>
  <div>
    <div class="cart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalCount>0}">¥{{totalPrice}}</div>
          <div class="desc">另需配送费¥ {{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="payClass" @click.stop.prevent="pay">
          <div class="pay-desc" :class="payClass">
            {{payDesc}}
          </div>
        </div>
        <div class="ball-container">
          <transition-group @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-for="(ball, index) in balls" :key="index" v-show="ball.show">
            </div>
          </transition-group>
        </div>
      </div>
      <transition name="fold">
        <div class="cart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-container" ref="listcontainer">
            <ul>
              <li class="food" v-for="(food, index) in selectedFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.price * food.count}}</span>
                </div>
                <CartControl :food="food"></CartControl>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
import CartControl from './cartcontrol.vue'
import BScroll from 'better-scroll'

export default {
  props: {
    selectedFoods: {
      type: Array,
      default: () => []
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBall: [],
      fold: true
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectedFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let totalCount = 0
      this.selectedFoods.forEach(food => {
        totalCount += food.count
      })
      return totalCount
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥${this.minPrice - this.totalPrice}起送`
      } else {
        return '结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow() {
      if (!this.totalCount) {
        // this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listcontainer, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBall.push(ball)
          return
        }
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty() {
      this.selectedFoods.forEach(food => {
        food.count = 0
      })
    },
    hideList() {
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      alert(`支付${this.totalPrice}`)
    },
    beforeEnter(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.transform = `translate3d(${x}px,${y}px,0)`
          el.style.transition = '0.8s all cubic-bezier(.17,.67,.59,.93)'
        }
      }
    },
    enter(el, done) {
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
      })
      done()
    },
    afterEnter(el) {
      let ball = this.dropBall.shift()
      if (ball) {
        ball.show = false
      }
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus">
.cart
  position fixed
  bottom 0px
  left 0px
  z-index 50
  height 56px
  width 100%
  opacity 0.9
  .content
    display flex
    background #141d27
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        vertical-align top
        background #141d27
        border-radius 50%
        .logo
          margin 2px 0px
          width 44px
          height 44px
          border-radius 50%
          background rgb(42, 52, 60)
          &.highlight
            background-color rgb(0, 160, 220)
          .icon-shopping_cart
            margin-left 10px
            line-height 44px
            font-size 24px
            color rgba(255, 255, 255, 0.5)
            &.highlight
              color rgb(255, 255, 255)
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          border-radius 12px
          background rgb(240, 20, 20)
          box-shadow 0 4 8 0 rgba(0, 0, 0, 0.4)
          text-align center
          font-size 12px
          font-weight 700
          color rgb(255, 255, 255)
      .price
        display inline-block
        margin-top 16px
        padding 0px 12px 0 0
        line-height 24px
        width 24px
        height 24px
        font-weight 700
        font-size 16px
        color rgba(255, 255, 255, 0.4)
        border-right 1px solid rgba(255, 255, 255, 0.1)
        &.highlight
          color rgb(255, 255, 255)
      .desc
        display inline-block
        margin-left 12px
        color rgba(255, 255, 255, 0.4)
        font-size 10px
        font-weight 200
    .content-right
      display inline-block
      flex 0 0 105px
      padding-top 16px
      background rgb(42, 52, 60)
      &.enough
        background-color #00b43c
      &.not-enough
        background-color #2b333b
      .pay-desc
        line-height 24px
        text-align center
        font-size 12px
        font-weight 700
        color rgba(255, 255, 255, 0.4)
        &.enough
          color rgb(255, 255, 255)
        &.not-enough
          background-color #2b333b
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      width 16px
      height 16px
      border-radius 50%
      background rgb(0, 160, 220)
  .fold-enter-active, .fold-leave-active
    transition 0.5s all linear
  .fold-enter, .fold-leave-to
    opacity 0
    transform translate(0, 0)
    opacity 1
  .fold-enter-to, .fold-leave
    transform translate(0, -100%)
  .cart-list
    position absolute
    opacity 1
    top 0px
    left 0px
    z-index -1
    transform translate(0, -100%)
    width 100%
    .list-header
      padding 0 18px
      line-height 40px
      height 40px
      font-size 28px
      color rgb(7, 17, 27)
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-container
      padding 0 18px
      max-height 217px
      background #fff
      overflow hidden
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 108px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol
          position absolute
          bottom 6px
          right 0px
          font-size 12px
          line-height 24px
.fade-enter-active, .fade-leave-active
  transition 0.5s all
.fade-enter-to, .fade-leave
  opacity 1
  background rgba(17,17,27,0.6)
.fade-enter, .fade-leave-to
  opacity 0
  background rgba(17,17,27,0)
.list-mask
  position fixed
  background rgba(17,17,27,0.6)
  z-index 40
  left 0px
  top 0px
  width 100%
  height 100%
  backdrop
  backdrop-filter blur(10px)
</style>
