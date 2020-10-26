<template>
    <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-title>
                    Datos principales
                </v-card-title>
                <v-card-text>
                    <v-flex class="mb-4 d-flex align-center">
                        <v-badge
                            overlap
                            bottom
                            color="tranparent"
                            offset-x="50"
                            offset-y="15"
                        >
                            <v-avatar size="96" class="mr-4"  v-if="avatar=='' || avatar==null">
                                <img src="../../assets/aniimamLogo.png" alt="Avatar">
                            </v-avatar>
                            <v-avatar size="96" class="mr-4" v-else>
                                <img :src="avatar" alt="Avatar">
                            </v-avatar>
                            <v-btn 
                                slot="badge"
                                fab
                                dark
                                color="orange"
                                small
                                @click="openAvatarPicker" 
                            >
                                <v-icon>
                                    mdi-image-edit
                                </v-icon>
                            </v-btn>
                        </v-badge>
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
        <AvatarPicker
            v-model="showAvatarPicker"
            :current-avatar="avatar"
            @selected="selectAvatar"/>
    </v-container>
</template>

<script>
import AvatarPicker from './AvatarPicker'
    export default {
        components: { AvatarPicker },
        data () {
            return {
                loading: false,
                showAvatarPicker: false
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
                return 50;
            },
            mercaderRating(){
                return 25;
            }
        },
        methods: {
            openAvatarPicker () {
                this.showAvatarPicker = true
            },
            selectAvatar (avatar) {
                this.avatar = avatar.path
            },
            save(){

            }
        }
    }
</script>

<style scoped>

</style>