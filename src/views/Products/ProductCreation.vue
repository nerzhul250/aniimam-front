<template>
    <v-card class="mx-10 pa-10">
        <v-container>
            <v-row style="height:80%">
                <v-col cols="6">
                    <v-card-title>
                        ¡Publica!
                    </v-card-title>
                    <v-card class="d-flex flex-column mb-5 px-5 pt-5"> 
                        <v-text-field
                            label="Titulo del producto"
                            class="mr-3"
                            v-model="title"
                        ></v-text-field>
                        <v-currency-field 
                            label="Precio" 
                            :error-messages="errors.price"
                            filled
                            v-model="price"/>
                        <v-currency-field 
                            label="Por cada venta recibes" 
                            :error-messages="errors.price"
                            filled
                            disabled
                            v-model="money_received"/>
                    </v-card>
                    <v-card-title>
                        ¡Sube imagenes!
                    </v-card-title>
                    <v-card class="d-flex px-5 pt-5">
                        <v-image-input
                            v-model="imageData"
                            :image-quality="0.85"
                            clearable
                            image-format="jpeg"
                            ref="vImageInput"
                        />
                        <div class="d-flex align-center justify-center">
                            <v-btn 
                                fab
                                dark
                                color="orange"
                                @click="save" 
                                :disabled="!valid"
                            >
                                <v-icon>
                                    mdi-checkbox-marked-circle
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card-title>
                        Mas daticos
                    </v-card-title>
                    <v-card class="px-5 pt-5">
                        <div class="d-flex">    
                            <v-text-field
                                label="Unidades disponibles"
                                class="mr-3"
                                type="number"
                                min="1"
                                step="1"
                                :rules="stockRules"
                            ></v-text-field>

                            <v-autocomplete
                                label="Categoria de producto"
                                :items="product_categories"
                                item-text="name"
                                v-model="productCategory"
                                return-object
                            ></v-autocomplete>

                            <v-tooltip top>    
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >mdi-information</v-icon>
                                </template>
                                <span>
                                    {{productCategory.description}}
                                </span>
                            </v-tooltip>
                        </div>
                        <v-text-field
                            label="Anime relacionado al producto"
                            v-model="anime_request_query"
                            append-outer-icon="mdi-magnify"
                            @click:append-outer="query_anime"
                        ></v-text-field>
                        <v-card class="px-5 pt-5" v-if="!!anime_request_results">
                            <v-window
                                v-model="onboarding"
                                reverse
                            >
                                <v-window-item
                                    v-for="(anime_request_result,i) in anime_request_results"
                                    :key="i"
                                >
                                    <v-card class="d-flex align-center justify-center pa-5">
                                        <v-img
                                            :src="anime_request_result.image_url"
                                            max-height="250"
                                            max-width="125"
                                        ></v-img>
                                        <div class="d-flex flex-column justify-center align-center">    
                                            <v-card-title>
                                                {{anime_request_result.title}}
                                            </v-card-title>
                                            <v-card-actions>

                                                <v-btn
                                                    icon
                                                    @click="select_anime(anime_request_result)"
                                                >
                                                    <v-icon
                                                        color="green"
                                                        v-if="animeId==anime_request_result.mal_id"
                                                    >mdi-check-circle</v-icon>
                                                    <v-icon
                                                        color="orange"
                                                        v-else
                                                    >mdi-check-circle</v-icon>
                                                </v-btn>
                                            </v-card-actions>
                                        </div>
                                    </v-card>
                                </v-window-item>
                            </v-window>
                            <v-card-actions class="justify-space-between">
                                <v-btn
                                    text
                                    @click="prev"
                                >
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-btn
                                    text
                                    @click="next"
                                >
                                    <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
            <v-row style="height:20%">
                <v-col cols="6">
                    <v-card class="d-flex flex-wrap pa-5" v-if="productImages.length!=0">
                        <v-card v-for="(image,i) in productImages" :key="i" class="mx-2">
                            <img 
                                v-bind:src="image" 
                                class="image-wrapper"
                                @click="editImage(image)"
                            >
                            <v-card-actions class="justify-center">
                                <v-btn
                                    icon
                                    v-on:click="deleteImage(i)"
                                >
                                    <v-icon>
                                         mdi-delete
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card> 
                    </v-card>
                </v-col>
                <v-col cols="6">
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>


<script>
import VImageInput from 'vuetify-image-input/a-la-carte';
import jikanApi from '../../helpers/jikanApi';
import ProductRepository from '../../repositories/product'

export default {
    components: {
        VImageInput,
    },
    data(){
        return {
            valid:false,
            imageData:undefined,
            errors: {},
            anime_request_results:'',
            anime_request_query:'',
            onboarding: 0,
            product_categories:'',

            productImages:[],
            price: 0,
            animeId:'',
            stock: 0,
            title:'',
            productCategory:'',

            stockRules: [
                s => !!s || 'Se debe de especificar un numero de unidades disponibles',
            ],
        }
    },
    methods:{
        save(){
            this.productImages.push(this.imageData);
            this.$refs.vImageInput.clear();
            this.valid=false;
        },
        editImage(image){
            this.imageData=image
        },
        deleteImage(i){
            this.productImages.splice(i,1);
        },
        query_anime(){
            jikanApi.get("/search/anime?q="+this.anime_request_query).then((res)=>{
                this.onboarding=0
                this.anime_request_results = res.data.results
                this.animeId=''
            })
        },
        select_anime(anime){
            this.animeId=anime.mal_id;
            this.anime_request_query=anime.title
        },
        next () {
            this.onboarding = this.onboarding + 1 === this.anime_request_results.length
            ? 0
            : this.onboarding + 1
        },
        prev () {
            this.onboarding = this.onboarding - 1 < 0
            ? 0
            : this.onboarding - 1
        },
    },
    computed:{
        money_received(){
            return (((this.price*0.9671)-800)*0.9).toFixed(2);
        },
    },
    mounted(){
        ProductRepository.getProductCategories().then((res)=>{
            this.product_categories=res.data;
            console.log(this.product_categories)
        })
    },
    watch:{
        imageData: function(val){
            if(val!=undefined){
                this.valid=true;
            }
        }
    }
}
</script>


<style scoped>
.image-wrapper{
    width: 100px;
    height: 100px;
}

</style>