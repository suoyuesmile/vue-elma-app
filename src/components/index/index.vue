<template>
  <div>
    <Header :seller="seller"></Header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{ name: 'goods' }">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ name: 'comments' }">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ name: 'goods' }">商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from "../header/index.vue";
export default {
  name: "Index",
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get("./api/seller").then(response => {
      response = response.body
      this.seller = response
      //   console.log(response.name)
    })
  },
  components: {
    Header
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/styles/mixin.styl';

.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(17, 27, 0, 0.1);
  text-decoration: none;

  .tab-item {
    flex: 1;
    text-align: center;

    a {
      text-decoration: none;
      color: rgb(240 20 20);
      font-size: 14px;
    }
  }
}
</style>
