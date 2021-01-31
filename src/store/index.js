import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import product from './modules/product'
import location from './modules/location'
import automation from './modules/automation'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        auth,
        product,
        location,
        automation
    }
})