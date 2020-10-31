<template>
    <v-card class="mx-10 pa-10">
        <v-container>
            <v-row style="height:80%">
                <v-col cols="6">
                    <v-card-title>
                        ¡Publica!
                    </v-card-title>
                    <v-card class="d-flex mb-5 px-5 pt-5">    
                        <v-text-field
                            label="Titulo del producto"
                            class="mr-3"
                        ></v-text-field>
                        <v-currency-field 
                            label="Precio" 
                            :error-messages="errors.price"
                            filled
                            v-model="price"/>
                    </v-card>
                    <div class="d-flex">
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
                    </div>
                </v-col>
                <v-col cols="6">
                </v-col>
            </v-row>
            <v-row style="height:20%">
                <v-col cols="6">
                    <div class="d-flex flex-wrap">
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
                    </div>
                </v-col>
                <v-col cols="6">
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>


<script>
import VImageInput from 'vuetify-image-input/a-la-carte';

export default {
    components: {
        VImageInput,
    },
    data(){
        return {
            valid:false,
            imageData:undefined,
            productImages:[],
            price: 0,
            errors: {}
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