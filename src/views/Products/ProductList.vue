<template>
    <v-container class="d-flex flex-wrap">
        <v-card 
            v-for="(product,i) in allProducts"
            :key="i"
            class="d-flex align-center flex-column  ma-2"
            height="190"
            width="180"
            @mouseover="showByIndex = i"
            @mouseleave="showByIndex = null"
        >

            <v-img
                :src="'https://aniimam-product-images.s3.amazonaws.com'+product.productImages[0].imageUrl"
                max-height="130"
                style="width: 100%; height: 100%;"
                v-if="!!product.productImages"
                class="mb-n2"
            ></v-img>

            <v-expand-transition>
                <div v-show="showByIndex===i">

                    <v-card-title
                        class="mb-n6"
                    >
                        {{product.title}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{product.price}}
                    </v-card-subtitle>
                </div>
            </v-expand-transition>
        </v-card>
    </v-container>
</template>

<script>
import ProductRepository from '../../repositories/product'

export default {
    data(){
        return {
            showByIndex:null,
            page:0
        }
    },
    methods:{
        updateHover(i,newState){
            this.hover[i]=newState;
            console.log(this.hover)
        }
    },
    computed:{
        allProducts(){
            return this.$store.getters["product/getAllProducts"];
        }
    },
    mounted(){
        if(this.$store.getters["product/getAllProducts"].length==0){
            ProductRepository.getProductsWithPageAndSize(0,20).then((res)=>{
                this.$store.commit("product/appendNewProductsToAllProducts",res.data);
                console.log(this.$store.getters["product/getAllProducts"])
            })
        }
    }
}
</script>

<style scoped>
.v-card:hover{
    transform: translate3D(0,-1px,0) scale(1.04);
    cursor: pointer;
}
</style>