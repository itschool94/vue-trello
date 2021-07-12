<template>
  <div>
    Home

    <div>
      Board List :

      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="item in boards" :key="item.id">
          {{ item }}}
        </div>
      </div>
      <ul>
        <li>
          <router-link to="/b/1">Board 1</router-link>
        </li>
        <li>
          <router-link to="/b/2">Board 2</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      boards: [],
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.loading = true;

      // 응답(성공)
      axios.get('http://localhost:3000/boards')
      .then( res => {
        this.boards = res.data
      })

      // 응답(실패)
      .catch( res => {
        // 로그인 페이지로 이동 시키기
        this.$router.replace('/login');
      })
      // 응답(항상 실행)
      .finally( () => {
        this.loading = false;
      })

    }
  }
}
</script>

<style>

</style>
