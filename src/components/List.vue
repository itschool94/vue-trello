<template>
  <div class="list">

    <div class="list-header">
      <input type="text" v-if="isEditTitle" class="form-control input-title" v-model="inputTitle" ref="inputTitle" @blur="onSubmitTitle" @keyup.enter="onSubmitTitle">
      <div v-else class="list-header-title" @click="onClickTitle">{{ data.title }}</div>
    </div>

    <div class="card-list">
      <cardItem v-for="card in data.cards" :key="card.id" :data="card"></cardItem>
    </div>

    <div v-if="isAddCard">
      <AddCard :list-id="data.id" @close="isAddCard = false "/>
    </div>
    <div v-else>
      <a href="#" class="add-card-btn" @click.stop.prevent="isAddCard = true"><!-- event 버블링 방지 -->
        &plus; Add a Card...
      </a>
    </div>

  </div>
</template>

<script>
import AddCard from "./AddCard";
import CardItem from "./CardItem";
import { mapActions } from 'vuex';

export default {
  name: "List",

  created() {
    this.inputTitle = this.data.title;
  },

  components: { AddCard, CardItem },

  // 부모 컴포넌트로부터 data라는 key를 통해 인스턴트 데이터를 받겠다~
  props: ['data'],

  data() {
    return {
      isAddCard: false,
      inputTitle: '',
      isEditTitle: false
    }
  },

  methods: {
    ...mapActions([
      'UPDATE_LIST'
    ]),

    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick( () => this.$refs.inputTitle.focus() );
    },

    onBlurTitle() {
      this.isEditTitle = false;
    },

    onSubmitTitle() {
      this.onBlurTitle();

      this.inputTitle = this.inputTitle.trim();
      if( !this.inputTitle ) return;

      const id = this.data.id;
      const title = this.inputTitle;

      if( this.inputTitle == this.data.title ) return;

      this.UPDATE_LIST({ id, title })
    }
  }
}
</script>

<style scoped>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.input-title {
  width: 90%;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.card-list {
  flex: 1 1 auto;
  overflow-y: scroll;
}
.empty-card-item   {
  height: 10px;
  width: 100%;
  background-color: rgba(0,0,0, 0);
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0,0,0, .1);
}
</style>
