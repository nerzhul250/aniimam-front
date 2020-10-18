<template>
    <v-container>
        <v-row style="height:100%">
            <v-col cols="3">
            </v-col>
            <v-col cols="6">
                <div class="d-flex justify-center">    
                    <v-img 
                        src="../../assets/aniimamLogo.png"
                        contain
                        height="100px"
                        width="150px"
                    ></v-img>
                </div>
                <v-form v-model="valid">
                    <v-text-field label="Nombre de usuario" required :rules="loginRule" v-model="login"></v-text-field>
                    <v-text-field label="Nombre" required :rules="firstNameRule" v-model="firstName"></v-text-field>
                    <v-text-field label="Apellido" required :rules="lastNameRule" v-model="lastName"></v-text-field>
                    <v-text-field label="Email" required :rules="emailRule" v-model="email"></v-text-field>
                    <v-text-field label="Contraseña" required :rules="passwordRule" type='password' v-model="password"></v-text-field>
                    <div class="d-flex justify-center">
                        <v-btn 
                            fab
                            dark
                            color="orange"
                            @click="next" 
                            :disabled="!valid"
                        >
                            <v-icon>
                                mdi-arrow-right-thick
                            </v-icon>
                        </v-btn>
                    </div>
                </v-form>
            </v-col>
            <v-col cols="3">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            valid:false,
            login:"",
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            firstNameRule: [
                p => !!p || 'Nombre es obligatorio',
            ],
            lastNameRule: [
                p => !!p || 'Apellido es obligatorio',
            ],
            emailRule: [
                e => !!e || 'Email es obligatorio',
                e => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e) || 'Email invalido',
            ],
            loginRule: [
                u => !!u || 'Nombre de usuario es obligatorio',
                u => (u || '' ).length < 35 || 'Tu nombre de usuario debe de tener menos de 20 caracteres',
                u => !u.includes('@') || 'No se permite usar \'@\'',
                u => (u.split(' ').length <= 1) || 'No se permiten espacios',
            ],
            passwordRule: [
                p => !!p || 'Contraseña es obligatoria',
                p => (p || '' ).length < 60 || 'Contraseña debe de tener menos de 60 caracteres',
                p => (p || '' ).length > 6 || 'La contraseña debe de tener almenos 7 caracteres',
            ],
        }
    },
    methods: {
        next(){
            if(this.valid){
                this.$router.push({
                    name: 'personalization-info',
                    params: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        login: this.username,
                        password: this.password,
                    }
                });
            }
        }
    }
}
</script>

<style scoped>
</style>