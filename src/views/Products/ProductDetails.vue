<template>
  <v-card 
    v-click-outside="onClickOutside" 
    light
    class="d-flex flex-column justify-center align-center overflow-y-auto"
    max-width="500"
    width="500"
    max-height="500"
  >
    
    <v-divider class="mt-16 mb-16"></v-divider>
    <v-divider class="mt-16 mb-16"></v-divider>
    <v-divider class="mt-16 mb-16"></v-divider>
    <v-card
        class="d-flex flex-column justify-center align-center pa-5 mt-16"
    >
        <v-card-title>
            {{product.title}}
        </v-card-title>

        <div class="d-flex mb-5 ">
            <v-card-subtitle>
                Publicado por {{product.user.login}}
            </v-card-subtitle>
            <v-avatar 
                size="50" 
                class="mr-4 expandable"
                @click="goToProfile(product.user.login)" 
                v-if="product.user.imageUrl=='' || product.user.imageUrl==null"
            >
            <img src="../../assets/aniimamLogo.png" alt="Avatar">
            </v-avatar>
            <v-avatar 
                size="50" 
                class="mr-4 expandable"
                @click="goToProfile(product.user.login)" 
                v-else
            >
                <img :src="product.user.imageUrl" alt="Avatar">
            </v-avatar>
        </div>

        <v-divider></v-divider>
        <v-card
            class="pa-2"
        >
            <v-img
                :src="'https://aniimam-product-images.s3.amazonaws.com'+product.productImages[chosenImage].imageUrl"
                max-height="400"
                height="400"
                max-width="400"
                width="400"
            ></v-img>
        </v-card>

        <div class="d-flex justify-center mt-6">
            <v-card
                v-for="(productImage,i) in product.productImages"
                :key="i"
                class="pa-1"
            >
                <v-img
                    :src="'https://aniimam-product-images.s3.amazonaws.com'+productImage.imageUrl"
                    max-height="50"
                    max-width="50"
                    class="expandable"
                    @click="chosenImage=i"
                ></v-img>
            </v-card>
        </div>
    </v-card>
    <v-divider></v-divider>
    <v-card-text>
        {{product.description}}
    </v-card-text>
    <v-card-title>
        {{product.price | currency}}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
    data(){
        return {
            chosenImage:0
        }
    },
    methods:{
        onClickOutside(){
            this.$store.commit("product/setProductDetailsOverlay",false)
        },
        goToProfile(username){
            this.$store.commit("product/setProductDetailsOverlay",false)
            this.$router.push("/p/"+username)
        }
    },
    computed:{
        product(){
            return this.$store.getters["product/getProductDetails"];
        }
    }
}
</script>

<style scoped>
.expandable:hover{
    transform: translate3D(0,-1px,0) scale(1.04);
    cursor: pointer;
}

.scroll {
   overflow-y: scroll
}
</style>