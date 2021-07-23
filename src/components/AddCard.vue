<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="#" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>


<script>
export default {
  name: "AddCard.vue",

  data() {
    return {
      inputTitle: ''
    }
  },

  computed: {
    invalidInput() {
      console.log( this.inputTitle.trim() )
      return !this.inputTitle.trim();
    }
  },

  // 부모 컴포넌트에 마운트 되서 보여질 때 처리
  mounted() {
    this.$refs.inputText.focus(); // dom 함수 focus 호출
  },

  methods: {
    onSubmit() {

    }
  }

}
</script>

<style>
.add-card .btn-success:disabled {
  opacity: 0.5;
}
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}

.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}

.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
