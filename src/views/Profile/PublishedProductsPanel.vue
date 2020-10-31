<template>
    <v-card>
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

    </v-card>
</template>

<script>
import ProductRepository from '../../repositories/product'
export default {
    data(){
        return { 
            
        }
    },
    created(){
        ProductRepository.getUserPublishedProducts().then((res)=>{
            console.log(res.data)
            this.$store.commit('product/setUserPublishedProducts',res.data)
        })
    }
}
</script>

<style scoped>

</style>