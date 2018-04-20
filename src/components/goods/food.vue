<template>
  <div>
    <transition name="move">
      <div class="food" v-show="showFlag">
        <div class="food-content">
          <div class="image-header">
            <img src="../../assets/images/bg.jpg" alt="">
            <div class="back">
              <div class="icon-arrow_lift" @click="hide"></div>
            </div>
          </div>
          <div class="content">
            <div class="title">{{food.name}}</div>
            <div class="detail">
              <span class="sell-count">{{food.sellCount}}</span>
              <span class="rating">{{food.rating}}</span>
            </div>
            <div class="price">
              <span class="nowPrice">{{food.price}}</span>
              <span class="oldPrice">{{food.oldPrice}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      // console.log('ok');
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus">
.move-enter-active, .move-leave-active
  transition .4s all linear
.move-enter, .move-leave-to
  opacity 0
  transform translate3d(100%,0,0)
.move-enter-to, .move-leave
  opacity 1
  transform translate3d(0,0,0)
.food
  position fixed
  transform translate(100%,0,0)
  left 0
  top 0
  bottom 56px
  z-index 30
  width 100%
  background #fff
  .food-content
    .image-header
      position relative
      width 100%
      height 0px
      padding 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 375px
      .back
        position absolute
        top 10px
        left 0px
        .icon-arrow_lift
          display block
          padding 10px

</style>
