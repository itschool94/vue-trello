<template>
  <Modal>
    Card

    <div v-if="loading">Loading Card....</div>
    <div v-else>
      <div>cid: {{ cid }}</div>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "Card",
  components: {
    Modal
  },

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
  .card-item {
    background-color: #fff;
    border-radius: 3px;
    margin: 8px;
    padding: 6px 20px 2px 8px;
    box-shadow: 0 1px 0 #ccc;
    position: relative;
  }
  .card-item a {
    text-decoration: none;
    color: #444;
    word-wrap: break-word;
    white-space: normal;
    overflow: hidden;
    display: block;
  }
  .card-item:hover,
  .card-item:focus {
    background-color: rgba(0,0,0, .1);
    cursor: pointer;
  }
  .card-item-meta {
    font-size: 26px;
    padding: 5px 0 0 3px;
    color: #8c8c8c;
  }
  .delete-card-btn {
    position: absolute;
    right: 10px;
    top: 4px;
    text-decoration: none;
    font-size: 18px;
    color: #aaa;
  }
</style>
