<template>
  <div class="header">
      <div class="content-wrapper">
          <div class="avater">
              <img width="64" height="64" src="seller.avater" alt="">
          </div>
          <div class="content">
              <div class="title"></div>
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
              <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>
              <div v-if="seller.support" class="support">
                  <span class="icon"></span>
                  <span class="text">{{seller.supports[0].description}}</span>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="stylus">
@import '../../assets/styles/mixin.styl';
.header
    color #fff
    background #000
    .content-wrapper
        padding 24px 12px 18px 24px
        .avater
            display inline-block
        .content
            display inline-block
            font-size 14px
        .title
            margin 2px 0px 8px 0px
            .brand
                display inline-block
                vertical-align top
                width 30px
                height 18px
                bg-image('brand')
                backgound-size: 30px 18px
                background-repeat no-repeat
            .name
                margin-left 6px
                font-size 16px
                line-height 18px
                font-weight bold

</style>

