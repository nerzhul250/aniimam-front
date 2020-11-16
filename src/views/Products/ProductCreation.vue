<template>
    <v-card class="mx-10 pa-10">
        <v-container>
            <v-row style="height:50%">
                <v-col cols="12">
                    <v-card-title>
                        ¡Sube imagenes!
                    </v-card-title>
                    <v-card class="d-flex px-5 pt-5 justify-center">
                        <v-image-input
                            v-model="imageData"
                            clearable
                            image-format="png"
                            ref="vImageInput"
                            imageHeight="500"
                            imageWidth="500"
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
                    <v-card class="d-flex flex-wrap pa-5 mt-5" v-if="productImages.length!=0">
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
            </v-row>
            <v-row style="height:50%">
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
                        Datos generales
                    </v-card-title>
                    <v-card class="pa-5">
                        <div class="d-flex">    
                            <v-text-field
                                label="Unidades disponibles"
                                class="mr-3"
                                type="number"
                                min="1"
                                step="1"
                                v-model="stock"
                                :rules="stockRules"
                            ></v-text-field>

                            <v-autocomplete
                                label="Categoria de producto"
                                :items="product_categories"
                                item-text="name"
                                v-model="productCategory"
                                return-object
                            ></v-autocomplete>

                            <v-tooltip top color="orange">    
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                        v-bind="attrs"
                                        v-on="on"
                                        color="orange"
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
                            :loading="isLoadingJikan"
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
                                                        v-if="anime.mal_id==anime_request_result.mal_id"
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
                <v-col cols="6">
                    <v-card-title>
                        Datos de ubicación del producto
                    </v-card-title>
                    <v-card class="px-5 pt-5">
                        <v-window
                            v-model="onboarding_location"
                        >
                            <v-window-item>
                                <v-card-title v-if="!!location">
                                    Direccion: {{location.address}} <br>
                                    Ciudad: {{location.city}}
                                </v-card-title>
                                <v-card-title v-else>
                                    Selecciona una dirección
                                </v-card-title>
                                <v-virtual-scroll
                                    :items="user_locations"
                                    item-height="70"
                                    height="100"
                                    v-if="!!user_locations"
                                >
                                    <template v-slot:default="{ item }">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Ciudad: <strong>{{item.city}}</strong>
                                                </v-list-item-title>
                                                <v-list-item-title>
                                                    Direccion: <strong>{{item.address}}</strong>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-btn
                                                    fab
                                                    small
                                                    depressed
                                                    icon
                                                    @click="select_location(item)"
                                                >
                                                    <v-icon
                                                        color="green"
                                                        v-if="item.id==location.id"
                                                    >mdi-plus-circle</v-icon>
                                                    <v-icon
                                                        color="primary"
                                                        v-else
                                                    >mdi-plus-circle</v-icon>
                                                    
                                                </v-btn>
                                            </v-list-item-action>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                    </template>
                                </v-virtual-scroll>
                                <v-card-title v-else>
                                    No tienes direcciones actualmente registradas.
                                    Dale click abajito para agregar una nueva direccion 
                                </v-card-title>
                            </v-window-item>
                            <v-window-item>
                                <v-card-title>
                                    Agrega una nueva dirección
                                </v-card-title>
                                <v-text-field
                                    label="Dirección"
                                    v-model="address"
                                >
                                </v-text-field>
                                <v-select
                                    :items="colombianCities"
                                    v-model="city"
                                    return-object
                                >
                                </v-select>
                            </v-window-item>
                        </v-window>
                        <v-card-actions class="d-flex justify-center">
                            <div v-if="onboarding_location==0">
                                <v-btn
                                    icon
                                    @click="switch_onboarding_location"
                                >
                                    <v-icon color="orange">mdi-plus</v-icon>
                                </v-btn>
                            </div>
                            <div v-else>
                                <v-btn
                                    icon
                                    @click="switch_onboarding_location"
                                >
                                    <v-icon color="orange">mdi-arrow-left-circle</v-icon>
                                </v-btn>
                                <v-btn
                                    icon
                                    @click="save_new_location"
                                >
                                    <v-icon color="orange">mdi-plus-box</v-icon>
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                    <v-card-title>
                        Descripción del producto
                    </v-card-title>
                    <v-textarea
                        solo
                        v-model="description"
                    >
                    </v-textarea>
                </v-col>
            </v-row>
        </v-container>
        <v-card-actions>
            <div class="d-flex justify-start">
                <v-btn
                    color="red"
                    class="white--text"
                    to="/profile"
                >
                    ir al perfil
                </v-btn>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex justify-end">
                 <v-btn
                    color="orange"
                    class="white--text"
                    @click="add_product"
                    :loading="isLoading"
                >
                    ¡Publicar producto!
                </v-btn>
            </div>
        </v-card-actions>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
        >
            ¡Producto publicado exitosamente!
        </v-snackbar>
    </v-card>
</template>


<script>
import VImageInput from 'vuetify-image-input/a-la-carte';
import jikanApi from '../../helpers/jikanApi';
import colombianCities from './colombianCities'

import ProductRepository from '../../repositories/product';
import LocationRepository from '../../repositories/location';

export default {
    components: {
        VImageInput,
    },
    data(){
        return {
            valid:false,
            snackbar:false,
            timeout:2000,
            isLoading:false,
            isLoadingJikan:false,
            imageData:undefined,
            colombianCities:colombianCities,
            errors: {},
            anime_request_results:'',
            anime_request_query:'',
            onboarding: 0,
            product_categories:'',
            onboarding_location:0,
            user_locations:'',
            address:'',
            city:'Cali',

            productImages:[],
            price: 0,
            anime:'',
            stock: 0,
            title:'',
            productCategory:'',
            location:'',
            description:'',


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
            this.isLoadingJikan=true;
            jikanApi.get("/search/anime?q="+this.anime_request_query).then((res)=>{
                this.onboarding=0
                this.anime_request_results = res.data.results
                this.animeId=''
                this.isLoadingJikan=false
            })
        },
        select_anime(anime){
            this.anime=anime;
            this.anime_request_query=anime.title
        },
        select_location(location){
            this.location=location;
        },
        save_new_location(){
            LocationRepository.saveNewLocation(this.city,this.address).then((res1)=>{
                console.log(res1)
                 LocationRepository.getUserLocations().then((res)=>{
                    this.user_locations=res.data;
                    this.onboarding_location=0;
                })
            })
        },
        add_product(){
            this.isLoading=true;
            ProductRepository.publishProduct(this.title,this.price,this.description,this.stock,
            this.productCategory,this.anime,this.location,this.productImages).then((res)=>{
                console.log(res)
                this.snackbar=true;
                setTimeout(()=>{
                    this.isLoading=false;
                    this.$router.push('/profile');
                    },2000);
            })
        },

        switch_onboarding_location(){
            this.onboarding_location=1-this.onboarding_location
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
        })
        LocationRepository.getUserLocations().then((res)=>{
            this.user_locations=res.data
            console.log(this.user_locations)
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