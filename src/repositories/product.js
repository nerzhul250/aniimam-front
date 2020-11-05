import store from '../store/index'

class ProductRepository {
    getUserPublishedProducts(){
        return store.dispatch("product/getUserPublishedProducts")
    }

    getProductCategories(){
        return store.dispatch("product/getProductCategories")
    }
}

export default new ProductRepository();