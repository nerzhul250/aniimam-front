import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store/index'
import VCurrencyField from 'v-currency-field'
import Vue2Filters from 'vue2-filters'
import { VTextField } from 'vuetify/lib'  //Globally import VTextField


Vue.config.productionTip = false


Vue.component('v-text-field', VTextField)

Vue.use(VCurrencyField, { 
	locale: 'pt-BR',
	decimalLength: 2,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: 0,
    valueAsInteger: false,
    allowNegative: true
})

Vue.use(Vue2Filters)

router.beforeEach((to, from, next) => {
  if(store.getters["auth/getUserToken"]==''){
    if (to.name=='profile' || to.name=='create-product') {
        return next({path:'/'});
    }
  }
  return next();
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
