<template>
    <v-container>
        <v-row style="height:100%">
            <v-col cols="6">
                <v-card
                    class="mx-5"
                >
                    <v-card-title>
                        {{username}}
                    </v-card-title>
                    <v-card-text
                        class="black--text"
                        style="white-space: pre-line;"
                    >
                        <v-flex class="mb-4 d-flex align-center">
                            <v-avatar size="96" class="mr-4"  v-if="imageUrl=='' || imageUrl==null">
                                <img src="../../assets/aniimamLogo.png" alt="Avatar">
                            </v-avatar>
                            <v-avatar size="96" class="mr-4" v-else>
                                <img :src="'https://aniimam-user-avatars.s3.amazonaws.com'+imageUrl" alt="Avatar">
                            </v-avatar>
                            <v-flex class="d-flex flex-column">
                                <v-progress-linear
                                    :value="otakuRating"
                                    color="orange"
                                    height="25"
                                    rounded
                                ><strong>Otaku Rating</strong></v-progress-linear>
                                <v-progress-linear
                                    :value="mercaderRating"
                                    color="green"
                                    height="25"
                                    rounded
                                    class="mt-2"
                                ><strong>Mercader Rating</strong>
                                </v-progress-linear>
                            </v-flex>
                        </v-flex>
                        {{profileDescription}}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card class="pb-2">
                    <v-app-bar>
                        <v-toolbar-title>
                            Publicaciones
                        </v-toolbar-title>
                        <v-spacer>
                        </v-spacer>
                        <v-btn
                            to="/create-product"
                        >
                            <v-icon
                                color="orange"
                            >mdi-plus</v-icon>
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
                        </v-card-actions>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthRepository from '../../repositories/auth'
export default {
    props:['username'],
    data(){
        return {
            imageUrl:'',
            profileDescription:'',
            mercaderRating:'',
            otakuRating:'',
            userPublishedProducts:''
        }
    },
    methods:{
        showProductDetails(product){
            this.$store.commit("product/setProductDetails",product)
            this.$store.commit("product/setProductDetailsOverlay",true)
        }
    },
    mounted(){
        AuthRepository.getUserPublicData(this.username).then((res)=>{
            let data=res.data;
            this.imageUrl=data.imageUrl;
            this.profileDescription=data.profileDescription;
            this.mercaderRating=data.mercaderRating;
            this.otakuRating=data.otakuRating;
            this.userPublishedProducts=data.userPublishedProducts;
        }).catch((e)=>{
            console.log(e)
        })
    }
}
</script>

<style scoped>
</style>