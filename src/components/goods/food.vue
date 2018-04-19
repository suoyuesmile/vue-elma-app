<template>
  <div class="food" v-show="foodShow"></div>
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
      foodShow: true
    }
  }
}
</script>

<style lang="stylus">
.food
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 30
  width 100%

</style>
