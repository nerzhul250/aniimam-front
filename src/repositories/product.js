import store from '../store/index'

class ProductRepository {
    getUserPublishedProducts(){
        return store.dispatch("product/getUserPublishedProducts")
    }

    getProductCategories(){
        return store.dispatch("product/getProductCategories")
    }

    publishProduct(title,price,description,stock,productCategory,anime,location,productImages){
        let data={
            title:title,
            price:price,
            description:description,
            stock:stock,
            productCategoryId:productCategory.id,
            animeMalId:anime.mal_id,
            animeImageUrl:anime.image_url,
            animeName:anime.title,
            locationId:location.id,
            productImages:productImages
        }
        return store.dispatch("product/publishProduct",data) 
    }
}

export default new ProductRepository();