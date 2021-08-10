import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    // todosという配列を設定し、この中にtodoを追加したり削除したりする
    // todoには内容(content)と追加された日時（created）の2つのプロパティを持たせる
    state: () => ({
      todos: [
        {content: 'hogehoge', created: '2019-03-31 15:30'}, 
        {content: 'fugafuga', created: '2019-03-31 16:00'}
      ]
    }),
    mutations: {
      // state（todos）と入力されたtodoを引数として、入力されたtodoと入力された時間を配列todosに追加する
      insert: function(state, obj) {
        var d = new Date();
        var fmt = d.getFullYear() 
                  + '-' + ('00' + (d.getMonth() + 1)).slice(-2) 
                  + '-' + ('00' + d.getDate()).slice(-2) 
                  + ' ' + ('00' + d.getHours()).slice(-2) 
                  + ':' + ('00' + d.getMinutes()).slice(-2);
        state.todos.unshift({
          content: obj.content,
          created: fmt
        })
      },
      // state（todos）と入力されたtodoを引数として、入力と配列todosとが一致した場合に、alert表示＆配列todosから削除する
      remove: function(state, obj) {
        for(let i = 0; i < state.todos.length; i++) {
          const ob = state.todos[i];
          if(ob.content == obj.content && ob.created == obj.created) {
            alert('remove ' + '"' + ob.content + '"');
            state.todos.splice(i, 1);
            return;
          }
        }
      }
    }
  })
}

export default createStore;