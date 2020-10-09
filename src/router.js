import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import HelloWorld from './components/HelloWorld'
import Form from './components/Form'

export default new Router({
    routes:[
        {
            path: '/',
            name: 'helloWorld',
            component: HelloWorld
        },
        {
            path: '/form',
            name: 'form',
            component: Form
        }
    ]
})