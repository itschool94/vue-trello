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
import { mapActions } from 'vuex';

export default {
  name: "AddCard.vue",

  props: ['listId'],

  data() {
    return {
      inputTitle: ''
    }
  },

  computed: {
    invalidInput() {
      return !this.inputTitle.trim();
    }
  },

  // 부모 컴포넌트에 마운트 되서 보여질 때 처리
  mounted() {
    this.$refs.inputText.focus(); // dom 함수 focus 호출
    this.setupClickOutside( this.$el ); // this.$el : AddCard Component 자체 element
  },

  methods: {
    ...mapActions([
      'ADD_CARD'
    ]),

    onSubmit() {
      if( this.invalidInput ) return
      const { inputTitle, listId } = this;
      const pos = this.newCardPos();
      this.ADD_CARD({ title : inputTitle, listId, pos })
      .finally( _ => this.inputTitle = '')
    },

    newCardPos() {
      const curList = this.$store.state.board.lists.filter( l => l.id === this.listId )[0]; // 맨 마지막 카드 정보
      if( !curList ) return 65535

      const { cards } = curList
      if( !cards.length ) return 65535
      return cards[cards.length -1].pos * 2
    },

    setupClickOutside( el ) {
        document.querySelector('body').addEventListener('click', e => {
          if( el.contains( e.target ) ) return
          this.$emit('close');
        })
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
