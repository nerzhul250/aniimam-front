<template>
    <v-card class="pb-2">
        <v-app-bar>
            <v-toolbar-title>
                Tus publicaciones
            </v-toolbar-title>
            <v-spacer>
            </v-spacer>
            <v-btn
                to="/create-product"
            >
                <v-icon
                    color="orange"
                >mdi-plus
                </v-icon>
                ¡Vende!
            </v-btn>
        </v-app-bar>
        <v-card 
            v-for="(product,i) in userPublishedProducts"
            :key="i"
            class="d-flex pa-5 ma-5"
        >
            <v-img
                :src="'https://aniimam-product-images.s3.amazonaws.com'+product.productImages[0].imageUrl"
                max-height="100"
                max-width="100"
            ></v-img>
            <div class="d-flex flex-column">
                <v-card-title>
                    {{product.title}}
                </v-card-title>
                <v-card-subtitle>
                    Unidades vendidas: {{product.quantitySold}}
                </v-card-subtitle>
            </div>
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-btn
                    icon
                    @click="showProductDetails(product)"
                >
                    <v-icon
                        color="primary"
                    >mdi-eye-outline</v-icon>
                </v-btn>
                <!-- <v-btn
                    icon
                >
                    <v-icon
                        color="yellow"
                    >mdi-pencil</v-icon>
                </v-btn> -->
                <v-btn
                    icon
                    @click="deleteProduct(product,i)"
                >
                    <v-icon
                        color="red"
                    >mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
        
        </v-card>
    </v-card>
</template>

<script>
import ProductRepository from '../../repositories/product'
export default {
    data(){
        return { 
        }
    },
    methods:{
        showProductDetails(product){
            this.$store.commit("product/setProductDetails",product)
            this.$store.commit("product/setProductDetailsOverlay",true)
        },
        deleteProduct(product,i){
            ProductRepository.deleteProduct(product).then((res)=>{
                console.log(res)
                alert("product deleted succesfully")
                this.$store.commit('product/deleteProductFromUserPublishedProducts',i)
            }).catch((err)=>{
                console.log(err)
                alert("There has been an error deleting your product")
            })
        }
    },
    mounted(){
        ProductRepository.getUserPublishedProducts().then((res)=>{
            console.log(res.data)
            this.$store.commit('product/setUserPublishedProducts',res.data)
        })
    },
    computed:{
        userPublishedProducts(){
            return this.$store.getters["product/getUserPublishedProducts"];
        }
    }
}
</script>

<style scoped>

</style>