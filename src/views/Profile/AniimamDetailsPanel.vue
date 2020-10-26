<template>
    <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-title>
                    Datos adicionales
                </v-card-title>
                <v-card-text>
                    <div class="mt-10">
                        <v-text-field
                            v-model="country"
                            disabled
                            label="Pais"></v-text-field>
                        <v-text-field
                            v-model="phone"
                            label="Numero celular"></v-text-field>
                        <v-textarea
                            v-model="profileDescription"
                            label="Descripción"
                        ></v-textarea>
                    </div>  
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>    
</template>
<script>
export default {
    data(){
        return {
        }
    },
    computed:{
        country(){
            return this.$store.getters['auth/getUser'].country;
        },
        phone:{
            get(){
                return this.$store.getters['auth/getUser'].phone;
            },
            set(value){
                this.$emit('changed')
                this.$store.commit("auth/setPhone",value)
            }
        },
        profileDescription:{
            get(){
                return this.$store.getters['auth/getUser'].profileDescription;
            },
            set(value){
                this.$emit('changed')
                this.$store.commit("auth/setProfileDescription",value);
            }
        }
    }
}
</script>

<style scoped>

</style>