import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import ProductList from './views/Products/ProductList'
import BasicInfo from './views/Register/BasicInfo'
import PersonalizationInfo from './views/Register/PersonalizationInfo'
import RegistrationConfirmation from './views/Register/RegistrationConfirmation'
import EmailConfirmation from './views/Register/EmailConfirmation'
import Login from './views/Login/Login'
import Profile from './views/Profile/Profile'
import PublicProfile from './views/Profile/PublicProfile'
import ProductCreation from './views/Products/ProductCreation'
import About from './components/About'


export default new Router({
    mode: 'history',
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
            component: PersonalizationInfo,
            props: true 
        },
        {
            path:'/registration/registration-confirmation',
            name: 'registration-confirmation',
            component: RegistrationConfirmation
        },
        {
            path:'/registration/email-confirmation',
            name: 'email-confirmation',
            component: EmailConfirmation
        },
        {
            path:'/login',
            name:'login',
            component: Login
        },
        {
            path:'/profile',
            name:'profile',
            component:Profile
        },
        {
            path:'/p/:username',
            name: 'public-profile',
            component: PublicProfile,
            props:true
        },
        {
            path: '/create-product',
            name: 'create-product',
            component: ProductCreation
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
})