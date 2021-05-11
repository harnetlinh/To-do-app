import Vue from 'vue'
import VueRouter from 'vue-router'

import Start from '../components/Start.vue'

Vue.use(VueRouter)

const Todo = () => import('../components/Todo.vue');
const NotFound = () => import('../components/NotFound.vue')
const routes = [
    {
        path: '/',
        redirect: 'start',
    },
    {
        path: '/start',
        name: 'start',
        component: Start,
        meta: {
            title: 'Start Page'
        }
    },
    {
        path: '/to-do',
        name: 'Todo',
        component: Todo,
        meta: {
            title: 'Todo Page'
        }
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: '404 - Page Not Found'
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {

    if (to.meta.title) {
        document.title = to.meta.title;
    }

    next();

});

export default router