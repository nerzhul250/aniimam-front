<template>
    <div>
        <div class="d-flex justify-center align-center mt-16">
            <v-card>
                <v-card-title>
                    Login
                </v-card-title>
                <v-form v-model="valid" class="mt-n15 px-10 pb-10">
                    <div class="mt-15">
                        <v-text-field
                            v-model="login"
                            :rules="loginRule"
                            label="Nombre de usuario"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Contraseña"
                            type="password"
                        ></v-text-field>
                        <div class="d-flex justify-center">
                            <v-btn 
                                fab
                                dark
                                color="orange"
                                @click="submit" 
                                :disabled="!valid"
                            >
                                <v-icon>
                                    mdi-checkbox-marked-circle
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </v-card>
        </div>
        <div
            class="d-flex justify-center align-end"
        >
            <v-alert
                v-model="errorAlert"
                border="right"
                colored-border
                type="error"
                elevation="2"
                dismissible
                max-width="500"
            >
                Sus credenciales no se encuentran en el sistema,
                intente con unas distintas
            </v-alert>
            <v-alert
                v-model="errorAlert2"
                border="right"
                colored-border
                type="error"
                elevation="2"
                dismissible
                max-width="500"
            >
                Ha habido un error con el formulario, ingrese de nuevo los datos
            </v-alert>
        </div>
    </div>
</template>

<script>
import AuthRepository from '../../repositories/auth'

export default {
    name:'login',
    data: () => ({
        valid:false,
        errorAlert2:false,
        errorAlert:false,
        login:"",
        loginRule: [
            u => !!u || 'Nombre de usuario es obligatorio',
            u => (u || '' ).length < 35 || 'Tu nombre de usuario debe de tener menos de 20 caracteres',
            u => !u.includes('@') || 'No se permite usar \'@\'',
            u => (u.split(' ').length <= 1) || 'No se permiten espacios',
        ],
        passwordRules: [
            p => !!p || 'Password es obligatorio'
        ],
        password:""
    }),
    methods: {
        submit(){
            if(this.valid){
                AuthRepository.login(this.login,this.password).then((res)=>{
                    console.log(res)
                })
            }else{
                this.errorAlert2=true;
            }
        }
    }
}

</script>

<style scoped>

</style>