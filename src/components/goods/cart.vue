<template>
  <div class="cart">
      <div class="content">
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
          <div class="content-right" :class="payClass">
            <div class="pay-desc" :class="payClass">
              {{payDesc}}
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedFoods: {
      type: Array,
      default: () => [
        {
          price: 22,
          count: 4
        }
      ]
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
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectedFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let totalCount = 0
      this.selectedFoods.forEach((food) => {
        totalCount += food.count
      })
      return totalCount
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥${this.minPrice-this.totalPrice}起送`
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
    }
  }
}
</script>

<style lang="stylus">
.cart
  position fixed
  bottom 0px
  left 0px
  z-index 50
  height 58px
  width 100%
  // background #141d27
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
            background-color rgb(0,160,220)
          .icon-shopping_cart
            margin-left 10px
            line-height 44px
            font-size 24px
            color rgba(255,255,255,0.5)
            &.highlight
              color rgb(255,255,255)
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          border-radius 12px
          background rgb(240,20,20)
          box-shadow 0 4 8 0 rgba(0,0,0,.4)
          text-align center
          font-size 12px
          font-weight 700
          color rgb(255,255,255)
      .price
        display inline-block
        margin-top 16px
        padding 0px 12px 0 0
        line-height 24px
        width 24px
        height 24px
        font-weight 700
        font-size 16px
        color rgba(255,255,255,0.4)
        border-right 1px solid rgba(255,255,255,0.1)
        &.highlight
          color rgb(255,255,255)
      .desc
        display inline-block
        margin-left 12px
        color rgba(255,255,255,0.4)
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
        color rgba(255,255,255,0.4)
        &.enough
          color rgb(255,255,255)
        &.not-enough
          background-color #2b333b
</style>
