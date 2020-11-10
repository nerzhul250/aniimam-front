import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);
const state = {
    userPublishedProducts: [],
    allProducts:[],
    animeOverlay:false,
    categoriesOverlay:false,
}

const getters = {
    getUserPublishedProducts: state => state.userPublishedProducts,
    getAllProducts: state => state.allProducts,
    isAnimeOverlay: state => state.animeOverlay,
    isCategoriesOverlay: state => state.categoriesOverlay
}

const actions = {
    getUserPublishedProducts(){
        return api.request('/ext/products/user-published-products','get')
    },
    getProductCategories(){
        return api.request('/product-categories','get')
    },
    getProductAnimes(){
        return api.request('/anime','get')
    },
    publishProduct(context,data){
        return api.request('/ext/products/publish-product','post',data);
    },
    getProductsWithPageAndSize(context,data){
        return api.request('/products','get',data);
    },
    getProductsWithPageAndSizeAndCategory(context,data){
        let newData={
            page:data.page,
            size:data.size
        }
        return api.request('/ext/products-by-category?categoryId='+data.productCategory.id,'get',newData);
    },
    getProductsWithPageAndSizeAndAnime(context,data){
        let newData = {
            page:data.page,
            size:data.size
        }
        return api.request('/ext/products-by-anime?animeId='+data.anime.id,'get',newData);
    },
    getProductsWithPageAndSizeAndCategoryAndAnime(context,data){
        let newData = {
            page:data.page,
            size:data.size
        }
        return api.request('ext/products-by-category-and-anime?categoryId='+data.productCategory.id+'&animeId='+data.anime.id,'get',newData);
    }
}

const mutations = {
    setUserPublishedProducts(state,userPublishedProducts){
        state.userPublishedProducts=userPublishedProducts
    },
    appendNewProductsToAllProducts(state,newProducts){
        state.allProducts = state.allProducts.concat(newProducts);
    },
    setNewProductsToAllProducts(state,newProducts){
        state.allProducts= newProducts
    },
    setAnimeOverlay(state, newAnimeOverlay){
        state.animeOverlay = newAnimeOverlay
    },
    setCategoriesOverlay(state, newCategoriesOverlay){
        state.categoriesOverlay = newCategoriesOverlay;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}