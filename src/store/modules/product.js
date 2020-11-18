import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);
const state = {
    userPublishedProducts: [],
    allProducts:[],
    animeOverlay:false,
    categoriesOverlay:false,
    productDetailsOverlay:false,
    productDetails:''
}

const getters = {
    getUserPublishedProducts: state => state.userPublishedProducts,
    getAllProducts: state => state.allProducts,
    isAnimeOverlay: state => state.animeOverlay,
    isCategoriesOverlay: state => state.categoriesOverlay,
    isProductDetailsOverlay: state => state.productDetailsOverlay,
    getProductDetails: state => state.productDetails
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
        return api.request('/products?page='+data.page+'&size='+data.size,'get',data);
    },
    getProductsWithPageAndSizeAndCategory(context,data){
        return api.request('/ext/products-by-category?categoryId='+data.productCategory.id+'&page='+data.page+'&size='+data.size,'get');
    },
    getProductsWithPageAndSizeAndAnime(context,data){
        return api.request('/ext/products-by-anime?animeId='+data.anime.id+'&page='+data.page+'&size='+data.size,'get');
    },
    getProductsWithPageAndSizeAndCategoryAndAnime(context,data){
        return api.request('ext/products-by-category-and-anime?categoryId='+data.productCategory.id+'&animeId='+data.anime.id+'&page='+data.page+'&size='+data.size,'get');
    },
    deleteProduct(context,data){
        return api.request('ext/delete-product?productId='+data.productId,'put');
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
    },
    setProductDetailsOverlay(state, newProductDetailsOverlay){
        state.productDetailsOverlay=newProductDetailsOverlay
    },
    setProductDetails(state, newProductDetails){
        state.productDetails=newProductDetails
    },
    deleteProductFromUserPublishedProducts(state,index){
        state.userPublishedProducts.splice(index,1);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}