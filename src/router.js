import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Form from './components/Form'
import ProductList from './views/Products/ProductList'
import BasicInfo from './views/Register/BasicInfo'
import PersonalizationInfo from './views/Register/PersonalizationInfo'

export default new Router({
    routes:[
        {
            path: '/',
            name: 'product-list',
            component: ProductList
        },
        {
            path: '/registration/basic-info',
            name: 'basic-info',
            component: BasicInfo  
        },
        {
            path: '/registration/personalization-info',
            name: 'personalization-info',
            component: PersonalizationInfo 
        },
        
        {
            path: '/form',
            name: 'form',
            component: Form
        }
    ]
})