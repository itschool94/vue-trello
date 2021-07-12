<template>
  <div>
    Card

    <div v-if="loading">Loading Card....</div>
    <div v-else>
      <div>cid: {{ cid }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",

  data() {
    return {
      cid: 0,
      loading: false
    }
  },

  watch: {
    // 함수가 아닌 객체 설정 가능
    $route: {
      handler: 'fetchData', // watch된 속성이 변경될 때 호출될 함수 (cid가 변경될 때마다 백엔드 api 호출)
      immediate: true // 페이지 로드 시 즉시 watch가 실행
    }
  },

  methods: {
    fetchData() {
      this.loading = true;

      setTimeout(() => {
        this.cid = this.$route.params.cid;
        this.loading = false;
      }, 500);
    }
  }
}
</script>

<style scoped>

</style>
