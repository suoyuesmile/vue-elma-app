<template>
  <div class="cart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo">
                    <i class="icon-shopping_cart"></i>
                  </div>
              </div>
              <div class="price"></div>
              <div class="desc"></div>
          </div>
          <div class="content-right"></div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {

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
                    margin 6px 0px
                    width 44px
                    height 44px
                    border-radius 50%
                    background rgb(42,52,60)
                    .logo-shopping_cart
                        line-height 44px
                        font-size 24px
            .price
                display inline-block
                
            .desc
                display inline-block
        .content-right
            flex 0 0 105px



</style>
