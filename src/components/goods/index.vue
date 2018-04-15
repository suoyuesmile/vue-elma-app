<template>
  <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item"
          v-for="(item, index) in goods"
          :key="index"
          >

            <span class="text">
              <span class="icon special"
              v-show="item.type>0"
              ></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul>
          <li class="food-list"
          v-for="(item, index) in goods"
          :key="index"
          >
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item"
              v-for="(food, index) in item.foods"
              :key="index">
                <div class="icon">
                  <img src="../../assets/images/food.jpg" width="56" height="56" alt="商品图片">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">${{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
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
  created(){
    this.$http.get('./api/goods').then((response) => {
      response = response.body
      this.goods = response
      // console.log(this.goods)
    })
  },
  data() {
    return {
      goods: []
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/styles/mixin.styl'

.goods
  display flex
  position absolute
  width 100%
  top 176px
  bottom 46px
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      padding 0 12px 0 12px
      line-height 14px
      height 54px
      width 56px
      background #f3f5f7
      border-bottom 1px solid rgba(7,17,27,0.1)
      &:last-child
        border-bottom 0px
      .text
        display table-cell
        vertical-align middle
        line-height 14px
        font-size 12px
        font-weight 200
        color rgb(24,20,20)
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          &.special
            bg-image('../../assets/images/special_3')
  .foods-wrapper
    flex 1
    .title
      vertical-align middle
      padding-left 14px
      border-left 2px solid #d9dde1
      line-height 26px
      font-size 14px
      color rgb(147,153,159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      &:last-child 
        border-bottom 0px
      .icon
        flex 0 0 57px
        border-radius 2px
      .content
        flex 1
        margin-left 10px
        .name
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
        .desc,.extra
          margin-top 8px
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
          .count
            margin-right 6px
        .price
          font-size 10px
          line-height 24px
          font-weight 700
          .now
            font-size 14px
            margin 2px 8px 0px 2px
            color rgb(240,20,20)
          .old
            text-decoration line-through
            font-size 10px
            color color rgb(147,153,159)
</style>

