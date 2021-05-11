
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    userName: null,
    userEmail: null,
    items: [],
    filter: { name: '', levels: [], date: '', status: 'all' }
};

const mutations = {
    CHANGE_USER_NAME: (state, value) => {
        state.userName = value
    },
    CHANGE_USER_EMAIL: (state, value) => {
        state.userEmail = value
    },
    SET_ITEMS: (state, items) => {
        state.items = items
    },
    SET_FILTER: (state, filter) => {
        state.filter = filter
    }
}

const actions = {
    changeInfo ({ commit }, { name = 'amonymous', email = 'unknow' }) {
        commit('CHANGE_USER_NAME', name);
        commit('CHANGE_USER_EMAIL', email);
    },
    setItems ({ commit }, { items }) {
        commit('SET_ITEMS', items);
    },
    setFilter ({ commit }, { filter }) {
        commit('SET_FILTER', filter)
    }
}

const getters = {
    userName:  state => state.userName,
    userEmail: state => state.userEmail,
    items: state => state.items,
    filter: state => state.filter,
    filteredItems: state => {
        // TODO: update this
        return state.items
    }
}

const store = new Vuex.Store({
    namespaced: true,
    state,
    mutations,
    actions,
    getters
});

export default store;