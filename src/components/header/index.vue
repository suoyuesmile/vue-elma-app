<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" src="../../assets/images/avatar.jpg" alt="头像">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon decrease"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">5个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keybroad_arrow_right"></i>
    </div>
    <div class="background">
      <img src="./bg.jpg" width="100%" height="134" alt="背景">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[1]"></span>
                <span class="text">{{seller.supports[1].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <div class="icon-close"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from './star.vue'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    closeDetail() {
      this.detailShow = false
    }
  },
  components: {
    Star
  }
}
</script>

<style lang="stylus">
.header
  color #fff
  overflow hidden
  background rgba(7, 17, 27, 0.5)
  .content-wrapper
    position relative
    padding 24px 12px 18px 24px
    font-size 0
    .avatar
      display inline-block
      img
        border-radius 4px
    .content
      display inline-block
      margin-left 16px
      font-size 16px
      .title
        margin 2px 0px 8px 0px
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('../../assets/images/brand')
          border-radius 2px
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          line-height 16px
          font-weight bold
      .description
        font-size 12px
        line-height 12px
        margin-bottom 10px
      .support
        .icon
          vertical-align top
          display inline-block
          width 12px
          height 12px
          margin-right 4px
          background-size 12px
          background-repeat no-repeat
          &.decrease
            bg-image('../../assets/images/decrease_1')
        .text
          vertical-align top
          font-size 10px
          line-height 12px
          font-weight 100
          color #ffffff
    .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      line-height 24px
      font-weight 200
      border-radius 14px
      background-color rgba(0, 0, 0, 0.2)
      text-align center
      .count
        vertical-align top
        font-size 10px
      .icon-keyboard_arrow_right
        margin-left 2px
        line-height 24px
        font-size 10px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28x
    padding 0 12px 0 22px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    background-color rgba(7, 17, 27, 0.1)
    .bulletin-title
      margin-top 8px
      vertical-align top
      display inline-block
      width 22px
      height 12px
      background-size 22px 12px
      bg-image('../../assets/images/bulletin')
    .bulletin-text
      vertical-align top
      font-size 10px
      color #fff
      font-weight 200
      line-height 28px
    .icon-keyboard_arrow_right
      position absolute
      top 8px
      right 12px
      font-size 10px
  .background
    position absolute
    top 0px
    left 0px
    z-index -1
    width 100%
    height 100%
    filter blur(10px)
  .fade-enter-active, .fade-leave-active
    transition all 0.5s
  .fade-enter, .fade-leave-to
    opacity 0
  .fade-enter-to, .fade-leave
    opacity 1
  .detail
    position fixed
    z-index 100
    overflow auto
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.8)
    // filter blur(4px)
    backdrop-filter blus(10px)
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        h1.name
          text-align center
          line-height 16px
          font-size 16px
          color #ffffff
        .star-wrapper
          margin-top 18px
          padding 16px 0
          text-align center
        .title
          display flex
          width 80%
          margin 28px auto 24px auto
          .line
            flex 1
            position relative
            top -6px
            border-bottom 1px solid rgba(255, 255, 255, 0.2)
          .text
            padding 0 12px
            font-size 14px
            font-weight 700
        .supports
          width 80%
          margin 0 auto
          .support-item
            padding 0 12px
            margin-bottom 12px
            font-size 0
            &.last-child
              margin-bottom 0
            .icon
              display inline-block
              vertical-align top
              margin-right 12px
              width 16px
              height 16px
              background-size 16px 16px
              &.decrease
                bg-image('../../assets/images/decrease_2')
              &.discount
                bg-image('../../assets/images/discount_2')
              &.guarantee
                bg-image('../../assets/images/guarantee_2')
              &.special
                bg-image('../../assets/images/special_2')
              &.invoice
                bg-image('../../assets/images/invoice_2')
            .text
              vertical-align top
              line-height 16px
              font-size 12px
              font-weight 200
              color rgb(255, 255, 255)
        .bulletin
          width 80%
          margin 0 auto
          .content
            padding 0 12px
            line-height 24px
            font-size 12px
            font-weight 200
            color rgb(255, 255, 255)
    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px
      .icon-close
        width 32px
        height 32px
</style>


