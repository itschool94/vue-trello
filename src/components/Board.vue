<template>
  <div>
    Board
    <div v-if="loading">loading board...</div>

    <div v-else>
      <div>bid: {{bid}}</div>
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
    </div>

    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Board.vue",

  data() {
    return {
      bid: 0,
      loading: false
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    // fetchData : 백엔드 api 호출 및 데이터 요청하는 역할을 하는 함수
    fetchData() {
      this.loading = true;

      // api 호출을 시뮬레이션 ( 0.5초 후, bid 값 받아오고 로딩 완료 처리 )
      setTimeout( () => {
        this.bid = this.$route.params.bid;
        this.loading = false; // 로딩 완료 처리
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
