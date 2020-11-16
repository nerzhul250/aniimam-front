import store from '../store/index'

class ProductRepository {

    deleteProduct(product){
        let data={
            productId:product.id
        }
        return store.dispatch("product/deleteProduct",data)
    }

    getUserPublishedProducts(){
        return store.dispatch("product/getUserPublishedProducts")
    }

    getProductCategories(){
        return store.dispatch("product/getProductCategories")
    }

    getProductAnimes(){
        return store.dispatch("product/getProductAnimes");
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

    getProductsWithPageAndSizeAndCategoryAndAnime(page,size,category,anime){
        let data='';

        if(category.id==-1 && anime.id==-1){
            data={
                page:page,
                size:size
            }
            return store.dispatch("product/getProductsWithPageAndSize",data)
        }else if(category.id!=-1 && anime.id==-1){
            data={
                page:page,
                size:size,
                productCategory:category
            }
            return store.dispatch("product/getProductsWithPageAndSizeAndCategory",data)
        }else if(category.id==-1 && anime.id!=-1){
            data={
                page:page,
                size:size,
                anime:anime
            }
            return store.dispatch("product/getProductsWithPageAndSizeAndAnime",data)
        }else{
            data={
                page:page,
                size:size,
                anime:anime,
                productCategory:category
            }
            return store.dispatch("product/getProductsWithPageAndSizeAndCategoryAndAnime",data)   
        }
    }
}

export default new ProductRepository();