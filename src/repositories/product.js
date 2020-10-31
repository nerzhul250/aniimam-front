import store from '../store/index'

class ProductRepository{
    getUserPublishedProducts(){
        return store.dispatch("product/getUserPublishedProducts")
    }
}

export default new ProductRepository();