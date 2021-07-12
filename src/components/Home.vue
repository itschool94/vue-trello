<template>
  <div>
    Home

    <div>
      Board List :

      <div v-if="loading">Loading...</div>
      <div v-else>
        API result {{apiRes}}
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
export default {
  data() {
    return {
      loading: false,
      apiRes: '',
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.loading = true;

      const req = new XMLHttpRequest();

      req.open('GET', 'http://localhost:3000/health') // GET 방식으로 요청할 URL 설정
      req.send() // 클라이언트 쪽에서 백엔드 서버 쪽으로 요청이 전달됨

      req.addEventListener('load', () => {
        this.loading = false;
        this.apiRes = {
          status: req.status,
          statusText: req.statusText,
          response: JSON.parse(req.response) // 순수 문자열로 오기 때문에 파싱 필요
        }
      })


    }
  }
}
</script>

<style>

</style>
