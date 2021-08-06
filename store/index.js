import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            todos: [
                {content: 'hogehoge', created: '2021-03-31 15:30'},
                {content: 'fugafuga', created: '2021-03-31 16:00'}
            ]
        }),
        mutations: {
            insert: function(state, obj) {
                var date = new Date();
                var fmt = date.getFullYear()
                            + '-' + ('00' + (date.getMonth() + 1)).slice(-2)
                            + '-' + ('00' + date.getDate()).slice(-2)
                            + '-' + ('00' + date.getHours()).slice(-2)
                            + '-' + ('00' + date.getMunites()).slice(-2);
                state.todos.unshift({
                    content: obj.content,
                    creates: fmt
                })
            },
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
