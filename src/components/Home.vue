<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">

      <div class="board-item" v-for="b in boards" :key="b.id" :data-bgcolor="b.bgColor" ref="boardItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{ b.title }}</div>
        </router-link>
      </div>

      <div class="board-item board-item-new">
        <a href="" class="new-board-btn" @click.prevent="addBoard">
          Create new board...
        </a>
      </div>
    </div>
    <!-- popup -->
    <AddBoard v-if="isAddBoard" @close="isAddBoard = false" @submit="onAddBoard"/>
  </div>
</template>

<script>
import { board } from '../api';
import AddBoard from "./AddBoard";
import { mapState } from 'vuex';

export default {
  components: {
    AddBoard
  },

  data() {
    return {
      loading: false,
      boards: [],
      // isAddBoard: false
    }
  },

  computed: {
    // computed 속성에 mapState 결과값을 설정해버리면 따로 computed 속성을 추가할 수 없기 때문에 es6 해체 문법을 사용
    ...mapState([
      'isAddBoard'
    ]),

    // isAddBoard() {
    //   return this.$store.state.isAddBoard
    // }
  },

  created() {
    this.fetchData();
  },

  updated() {
    this.$refs.boardItem.forEach( el => {
      el.style.backgroundColor = el.dataset.bgcolor
    })
  },

  methods: {
    fetchData() {
      this.loading = true;

      board.fetch()
        .then( data => {
          this.boards = data.list;
        })
        .finally( () => {
          this.loading = false;
        })
    },

    addBoard() {
      // mutation 으로 변경해야 함
      // this.isAddBoard = true;
    },

    onAddBoard( title ) {
      board.create( title )
      .then( () => {
        // 모든 board 목록 호출
        this.fetchData()
      })
    }
  }
}
</script>

<style scoped>
  .home-title {
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .board-list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .board-item {
    width: 23%;
    height: 100px;
    margin: 0 2% 20px 0;
    border-radius: 3px;
  }
  .board-item a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
  .board-item a:hover,
  .board-item a:focus {
    background-color: rgba(0,0,0, .1);
    color: #666;
  }
  .board-item-title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 10px;
  }
  .board-item a.new-board-btn {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    height: 100px;
    width: inherit;
    color: #888;
    font-weight: 700;
  }
</style>
