<template>
  <section class="container">
    <h1>Todo App</h1>
    <p><input type="text" name="content" v-model="content" @focus="set_flg" /></p>
    <div>
      <button @click="insert">save</button>
      <button @click="find">find</button>
    </div>
    <ul>
      <li v-for="(todo, index) in display_todos" :key="index">
        <span>{{ todo.content }}</span><span>({{ todo.created }})</span><span @click="remove(todo)">×</span>
      </li>
    </ul>
  </section>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data: function() {
    return {
      content: '',
      find_flg: false
    }
  },
  // computed = 算出プロパティ
  // v-modelと合わせて使うことで入力した数値が変化するごとに変数の中身をリアルタイムに変更することができる
  // methodsとdataの中間的な役割。設定はmethodsと同じ書き方（function）呼び出しはdataと同じ書き方（カッコをつけない）
  computed: {
    ...mapState(['todos']),
    // find_flgがtrueなら検索が一致したデータをarrに追加してarrを返す、find_flgがfalseならtodosすべてを返す
    display_todos: function() {
      if(this.find_flg) {
        var arr = [];
        var data = this.todos;
        data.forEach(element => {
          if(element.content.toLowerCase() == this.content.toLowerCase()) {
            arr.push(element);
          }
        });
        return arr;
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    // saveボタンをクリックしたとき、storeのmutationsのinsertに入力されたtodoを引数で渡して、追加処理を実行する
    insert: function() {
      this.$store.commit('insert', {content: this.content});
      this.content = '';
    },
    // findボタンをクリックしたとき、find_flgをtrueに変更する
    find: function() {
      this.find_flg = true;
    },
    // 入力欄をクリックしたとき、find_flgをfalseに変更する
    set_flg: function() {
      if(this.find_flg) {
        this.find_flg = false;
        this.content = '';
      }
    },
    // xをクリックしたとき、storeのmutationsのremoveにクリックされたtodoを引数で渡して、削除処理を実行する
    remove: function(todo) {
      this.$store.commit('remove', todo)
    }
  }
}
</script>
