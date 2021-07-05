<template>
  <div>
    Board
    <div>bid: {{bid}}</div>
  </div>
</template>

<script>
export default {
  name: "Board.vue",

  data() {
    return {
      bid: 0
    }
  },

  // Board가 생성될 때, 실행되는 훅
  created() {
    // Board 생성할 때, bid 할당
    this.bid = this.$route.params.bid
  }
}
</script>

<style scoped>

</style>
