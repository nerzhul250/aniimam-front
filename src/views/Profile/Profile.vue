<template>
    <div>
        <v-container>
            <v-row style="height:50%">
                <v-col cols="6">
                    <BasicInfoPanel
                        v-on:changed="change"
                    />
                </v-col>
                <v-col cols="6">
                    <AniimamDetailsPanel
                        v-on:changed="change"
                    />
                </v-col>
            </v-row>
            <v-row style="height:50%">
                <v-col cols="6">
                    <PublishedProductsPanel/>
                </v-col>
                <v-col cols="6">
                    
                </v-col>
            </v-row>
        </v-container>
        <div class="d-flex justify-center">
            <v-btn 
                fab
                dark
                color="orange"
                @click="save"
                :disabled="!changes"
                :loading="isLoading"
            >
                <v-icon>
                    mdi-checkbox-marked-circle
                </v-icon>
            </v-btn>
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
            >
                Tus datos se actualizaron exitosamente
            </v-snackbar>
            <v-alert
                v-model="errorAlert"
                border="right"
                colored-border
                type="error"
                elevation="2"
                dismissible
                max-width="500"
            >
                Hubo un error actualizando sus datos
            </v-alert>
        </div>
    </div>
</template>

<script>
import BasicInfoPanel from './BasicInfoPanel'
import AniimamDetailsPanel from './AniimamDetailsPanel'
import PublishedProductsPanel from './PublishedProductsPanel'

import AuthRepository from '../../repositories/auth'


export default {
    components:{BasicInfoPanel, AniimamDetailsPanel, PublishedProductsPanel},
    data(){
        return {
            changes:false,
            errorAlert:false,
            isLoading:false,
            snackbar:false,
            timeout:2000
        }
    },
    methods:{
        change(){
            this.changes=true;
        },
        save(){
            this.isLoading=true;
            AuthRepository.updateProfileData().then((res)=>{
                console.log(res)
                this.isLoading=false;
                this.changes=false;
                this.snackbar=true;
            }).catch((e)=>{
                console.log(e)
                this.errorAlert=true;
                this.isLoading=false;
            })
        }
    }
}
</script>

<style scoped>


</style>