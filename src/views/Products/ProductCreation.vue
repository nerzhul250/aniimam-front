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
                        <v-text-field
                            label="Unidades disponibles"
                            class="mr-3"
                            type="number"
                            min="1"
                            step="1"
                            :rules="stockRules"
                        ></v-text-field>
                        <v-select
                            :items="animes"
                            label="Selecciona el anime relacionado al producto"
                            v-model="anime"
                            solo
                        ></v-select>
                    </v-card>
                </v-col>
            </v-row>
            <v-row style="height:20%">
                <v-col cols="6">
                    <v-card class="d-flex flex-wrap pa-5">
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
import animes from './animes'

export default {
    components: {
        VImageInput,
    },
    data(){
        return {
            valid:false,
            imageData:undefined,
            errors: {},
            animes: animes,
            productImages:[],
            price: 0,
            anime:"",
            stock: 0,



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
        }
    },
    computed:{
        money_received(){
            return (((this.price*0.9671)-800)*0.9).toFixed(2);
        }
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