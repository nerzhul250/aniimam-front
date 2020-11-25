<template>
    <v-container>
        <div
            class="d-flex flex-wrap"
            v-infinite-scroll="loadMore" 
            infinite-scroll-disabled="busy"
        >
            <v-card 
                v-for="(product,i) in allProducts"
                :key="i"
                class="d-flex align-center flex-column ma-2 expandable-card"
                width="190"
                @mouseover="showByIndex = i"
                @mouseleave="showByIndex = null"
                @click="showProductDetails(product)"
                height='100%'
            >

                <v-img
                    :src="'https://aniimam-product-images.s3.amazonaws.com'+product.productImages[0].imageUrl"
                    max-height="130"
                    style="width: 100%; height: 100%;"
                    v-if="!!product.productImages"
                    class="mb-n2"
                ></v-img>


                <div v-show="showByIndex!=i" style="height:100%">
                    <v-card-title class="mt-2">
                        {{product.price | currency}}
                    </v-card-title>
                </div>
                <div v-show="showByIndex===i" style="height:100%">
                    <v-card-title
                        class="mb-n6"
                    >

                        {{product.price | currency}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{product.title}}
                    </v-card-subtitle>
                </div>
            </v-card>
        </div>
        <v-overlay
          :absolute="absolute"
          :value="animeOverlay"
        >
            <v-card 
                class="pa-5"
                width="500"
                light
            >
                <v-card-title>
                    Animes
                </v-card-title>
                <v-virtual-scroll
                    :items="animes"
                    height="300"
                    item-height="64"
                >
                    <template v-slot:default="{ item }">
                        <v-list-item :key="item">
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn 
                                    icon
                                    @click="selectAnime(item)"
                                >
                                    <v-icon
                                        color="green"
                                        v-if="selectedAnime.id==item.id"
                                    >mdi-circle</v-icon>
                                    <v-icon 
                                        color="orange"
                                        v-else
                                    >mdi-circle</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </template>
                </v-virtual-scroll>
                <v-card-actions class="d-flex justify-end align-center">
                    <v-btn
                        icon
                        color="red"
                        @click="animeOverlay=false"
                    >
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>
        <v-overlay
          :absolute="absolute"
          :value="categoriesOverlay"
        >
            <v-card 
                class="pa-5"
                width="500"
                light
            >
                <v-card-title>
                    Categorias
                </v-card-title>
                <v-virtual-scroll
                    :items="productCategories"
                    height="300"
                    item-height="64"
                >
                    <template v-slot:default="{ item }">
                        <v-list-item :key="item">
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>

                                <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn 
                                    icon
                                    @click="selectCategory(item)"
                                >
                                    <v-icon
                                       color="green"
                                       v-if="selectedCategory.id==item.id"
                                    >mdi-circle</v-icon>
                                    <v-icon 
                                        color="orange"
                                        v-else
                                    >mdi-circle</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </template>
                </v-virtual-scroll>
                <v-card-actions class="d-flex justify-end align-center">
                    <v-btn
                        icon
                        color="red"
                        @click="categoriesOverlay=false"
                    >
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>
    </v-container>
</template>

<script>
import ProductRepository from '../../repositories/product'

export default {
    data(){
        return {
            showByIndex:null,
            absolute:true,
            busy:false,
            pageSize:20,
            productCategories:[],
            selectedCategory:{
                id:-1,
                name:'Todas las categorias',
                description:'De todito'
            },
            animes:[],
            selectedAnime:{
                id:-1,
                name:'Todos los animes',
                imageUrl:'jum',
                jikanId:'jum'
            }
        }
    },
    methods:{
        selectCategory(item){
            this.selectedCategory=item
            this.pageNumber=0;
            this.EndOfPagesReached=false;
            ProductRepository.getProductsWithPageAndSizeAndCategoryAndAnime(this.pageNumber,this.pageSize,this.selectedCategory,this.selectedAnime).then((res)=>{
                this.$store.commit("product/setNewProductsToAllProducts",res.data);
                this.pageNumber=this.pageNumber+1;
            })   
        },
        selectAnime(item){
            this.selectedAnime=item
            this.pageNumber=0;
            this.EndOfPagesReached=false;
            ProductRepository.getProductsWithPageAndSizeAndCategoryAndAnime(this.pageNumber,this.pageSize,this.selectedCategory,this.selectedAnime).then((res)=>{
                this.$store.commit("product/setNewProductsToAllProducts",res.data);
                this.pageNumber=this.pageNumber+1;
            })
        },
        showProductDetails(product){
            this.$store.commit("product/setProductDetails",product)
            this.$store.commit("product/setProductDetailsOverlay",true)
        },
        loadMore(){
            if(!this.EndOfPagesReached){
                this.busy = true;
                ProductRepository.getProductsWithPageAndSizeAndCategoryAndAnime(this.pageNumber,this.pageSize,this.selectedCategory,this.selectedAnime).then((res)=>{
                    this.$store.commit("product/appendNewProductsToAllProducts",res.data);
                    if(res.data.length==0){
                        this.EndOfPagesReached=true;
                    }
                    this.pageNumber=this.pageNumber+1;
                    this.busy = false;
                })
            }
        }
    },
    computed:{
        allProducts(){
            return this.$store.getters["product/getAllProducts"];
        },
        animeOverlay:{
            get(){
                return this.$store.getters["product/isAnimeOverlay"];
            },
            set(value){
                this.$store.commit("product/setAnimeOverlay",value);
            }
        },
        categoriesOverlay:{
            get(){
                return this.$store.getters["product/isCategoriesOverlay"];
            },
            set(value){
                this.$store.commit("product/setCategoriesOverlay",value);
            }
        },
        pageNumber:{
            get(){
                return this.$store.getters["product/getCurrentPageNumber"];
            },
            set(value){
                this.$store.commit("product/setCurrentPageNumber",value);
            }
        },
        EndOfPagesReached:{
            get(){
                return this.$store.getters["product/isEndOfPagesReached"];
            },
            set(value){
                this.$store.commit("product/setEndOfPagesReached",value);
            }
        }
    },
    mounted(){
        ProductRepository.getProductCategories().then((res)=>{
            this.productCategories.push({
                id:-1,
                name:'Todas las categorias',
                description:'De todito'
            })
            this.productCategories=this.productCategories.concat(res.data);
        })

        ProductRepository.getProductAnimes().then((res)=>{
            this.animes.push({
                id:-1,
                name:'Todos los animes',
                imageUrl:'jum',
                jikanId:'jum'
            })
            this.animes=this.animes.concat(res.data);
        })

    }
}
</script>

<style scoped>
.expandable-card:hover{
    transform: translate3D(0,-1px,0) scale(1.04);
    cursor: pointer;
}

.shortspacing{
    letter-spacing: 0.000075em !important
}
</style>