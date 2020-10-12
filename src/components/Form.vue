<template>
    <div class="text-xs-center" v-if="submitted">
        <p>everything was perfect</p>
    </div>
    <div class="form-wrapper" v-else>
        <v-form v-model="valid">
                <v-text-field label="Username" v-model="login"></v-text-field>
                <v-text-field label="First Name" v-model="firstName"></v-text-field>
                <v-text-field label="Last Name" v-model="lastName"></v-text-field>
                <v-text-field label="Email" v-model="email"></v-text-field>
                <v-text-field label="Password" type='password' v-model="password"></v-text-field>
                <v-btn @click="submit" :disabled="!valid">Submit</v-btn>
        </v-form>
    </div>
</template>
<script>
import auth from '../repositories/auth'
export default {
    data(){
        return {
            login:"",
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            submitted: false,
            valid: false,
        }
    },
    methods:{
        submit(){
            this.submitted = auth.registerUser(this.login,this.firstName,this.lastName,this.email,this.password);
            console.log(this.submitted);
        }
    }
    
}
</script>

<style scoped>

</style>