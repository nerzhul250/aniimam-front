<template>
    <v-container>
        <v-row style="height:100%">
            <v-col cols="3">
            </v-col>
            <v-col cols="6">
                <h1>Ya casi puedes comprar {{firstName}}!</h1>
                <h2>Solo es llenar estos daticos para personalizar tu experiencia</h2>
                <v-form v-model="valid">
                    <v-select :items="channels" :rules="channelRule" label="¿Como llegaste a nosotros?" outlined v-model="channel"/>
                    <v-text-field label="Numero telefonico" required :rules="phoneRules" v-model="phone"></v-text-field>
                    <v-autocomplete :items="countries" label="Pais" outlined :rules="countryRule" v-model="country"/>
                    <v-btn @click="submit" :disabled="!valid">Finalizar registro</v-btn>
                </v-form>
            </v-col>
            <v-col cols="3">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CountriesData from './countries';
import AuthRepository from '../../repositories/auth'
export default {
    name:'PersonalizationInfo',
    props:{
        firstName: String,
        lastName: String,
        email: String,
        login: String,
        password: String,
    },
    data(){
        return {
            valid: false,
            countries: CountriesData,
            phone:'',
            country:'',
            channel:'',
            arrivedFromChannel:'',

            channels: [
                'Un amigo te contó',
                'Google',
                'Facebook',
                'Youtube',
                'Instagram',
                'Blog',
                'Otra manera'
            ],

            phoneRules: [
                p => !!p || 'El numero telefonico es obligatorio',
            ],
            countryRule: [
                c => !!c || 'El pais es obligatorio',
            ],
            channelRule: [
                c => !!c || '¿Como escuchaste de nosotros?',
            ],
        }
    },
    methods: {
        submit(){
            if(this.valid){
                AuthRepository.registerExtUser(this.login,this.firstName,
                                                this.lastName,this.email,this.password,
                                                this.country,this.channel,this.phone);
            }
        }
    }  
}
</script>

<style scoped>

</style>