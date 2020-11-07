import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);
const state = {
    userPublishedProducts: []
}

const getters = {
}

const actions = {
    getUserPublishedProducts(){
        return api.request('/ext/products/user-published-products','get')
    },
    getProductCategories(){
        return api.request('/product-categories','get')
    },
    publishProduct(context,data){
        return api.request('/ext/products/publish-product','post',data);
    }
}

const mutations = {
    setUserPublishedProducts(state,userPublishedProducts){
        state.userPublishedProducts=userPublishedProducts
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}