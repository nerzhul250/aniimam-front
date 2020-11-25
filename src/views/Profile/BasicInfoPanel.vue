<template>
    <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-title>
                    Datos principales
                </v-card-title>
                <v-card-text>
                    <v-flex class="mb-4 d-flex align-center">
                        <div class="mr-3">
                            <v-avatar-uploader 
                                url="https://aniimam-user-avatars.s3.amazonaws.com/aniimamLogo.png"
                                :request="request"
                                :avatar="avatarConfigObject"
                                v-if="avatar=='' || avatar==null"
                            />
                            <v-avatar-uploader
                                :url="'https://aniimam-user-avatars.s3.amazonaws.com'+avatar"
                                :request="request"
                                :avatar="avatarConfigObject"
                                v-else
                            />
                        </div>
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
                    <div class="mt-10">
                        <v-text-field
                            v-model="firstName"
                            label="Nombre"></v-text-field>
                        <v-text-field
                            v-model="lastName"
                            label="Apellido"></v-text-field>
                        <v-text-field
                            v-model="email"
                            disabled
                            label="Email"></v-text-field>
                    </div>           
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import UserRepository from '../../repositories/auth'
import VAvatarUploader from 'vuetify-avatar-uploader'
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

    export default {
        components: {VAvatarUploader},
        data () {
            return {
                loading: false,
                showAvatarPicker: false,
                avatarConfigObject:{
                    size:96
                }
            }
        },
        computed:{
            firstName:{
                get(){
                    return this.$store.getters["auth/getUser"].firstName;
                },
                set(value){
                    this.$emit('changed')
                    this.$store.commit("auth/setFirstName",value)
                }
            },
            lastName:{
                get(){
                    return this.$store.getters["auth/getUser"].lastName;
                },
                set(value){
                    this.$emit('changed')
                    this.$store.commit("auth/setLastName",value);
                }
            },
            email:{
                get(){
                    return this.$store.getters["auth/getUser"].email;
                },
                set(value){
                    this.$emit('changed')
                    this.$store.commit("auth/setEmail",value);
                }
            },
            avatar:{
                get(){
                    console.log(this.$store.getters["auth/getUser"].imageUrl)
                    return this.$store.getters["auth/getUser"].imageUrl;
                },
                set(value){
                    this.$emit('changed')
                    this.$store.commit("auth/setImageUrl",value)
                }
            },
            otakuRating(){
                return this.$store.getters["auth/getUser"].otakuRating;
            },
            mercaderRating(){
                return this.$store.getters["auth/getUser"].mercaderRating;
            }
        },
        methods: {
            openAvatarPicker () {
                this.showAvatarPicker = true
            },
            selectAvatar (avatar) {
                this.avatar = avatar.path
            },
            // Responsible for performing the upload request to your API
            request (form, config) {
                UserRepository.updateUserAvatar(form,config).then((res)=>{
                    this.$store.commit("auth/setUserAvatarUrl",res.data);
                })
            }
        }
    }
</script>

<style scoped>

</style>