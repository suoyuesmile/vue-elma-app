<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
const LEN = 5
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data() {
    return {}
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLASS_ON)
      }
      if (hasDecimal) {
        result.push(CLASS_HALF)
      }
      while (result.length < LEN) {
        result.push(CLASS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/styles/mixin.styl'
.star
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.stat-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../assets/images/star48_on')
      &.half
        bg-image('../../assets/images/star48_half')
      &.off
        bg-image('../../assets/images/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 16px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../assets/images/star36_on')
      &.half
        bg-image('../../assets/images/star36_half')
      &.off
        bg-image('../../assets/images/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 10px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../assets/images/star24_on')
      &.half
        bg-image('../../assets/images/star24_half')
      &.off
        bg-image('../../assets/images/star24_off')
</style>


