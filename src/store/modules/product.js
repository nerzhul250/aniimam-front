import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);
const state = {
    userPublishedProducts: [],
    allProducts:[]
}

const getters = {
    getUserPublishedProducts: state => state.userPublishedProducts,
    getAllProducts: state => state.allProducts
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
    },
    getProductsWithPageAndSize(context,data){
        return api.request('/products','get',data);
    }
}

const mutations = {
    setUserPublishedProducts(state,userPublishedProducts){
        state.userPublishedProducts=userPublishedProducts
    },
    appendNewProductsToAllProducts(state,newProducts){
        state.allProducts= state.allProducts.concat(newProducts);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}