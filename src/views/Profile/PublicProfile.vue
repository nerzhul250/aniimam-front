<template>
    <v-card
        class="mx-5"
    >
        <v-card-title>
            {{username}}
        </v-card-title>
        <v-card-text
            class="black--text"
        >
            <v-flex class="mb-4 d-flex align-center">
                <v-avatar size="96" class="mr-4"  v-if="imageUrl=='' || imageUrl==null">
                    <img src="../../assets/aniimamLogo.png" alt="Avatar">
                </v-avatar>
                <v-avatar size="96" class="mr-4" v-else>
                    <img :src="imageUrl" alt="Avatar">
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
        }
    },
    mounted(){
        AuthRepository.getUserPublicData(this.username).then((res)=>{
            let data=res.data;
            this.imageUrl=data.imageUrl;
            this.profileDescription=data.profileDescription;
            this.mercaderRating=data.mercaderRating;
            this.otakuRating=data.otakuRating;
        }).catch((e)=>{
            console.log(e)
        })
    }
}
</script>

<style scoped>
</style>