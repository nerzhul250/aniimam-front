<template>
    <v-app-bar
        app
        color="white"
        dark
        clipped-left
        >

      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Aniimam Name"
            class="shrink mt-1"
            contain
            min-width="100"
            src="../assets/logo.jpg"
            width="150"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <div v-if="isLogged">
        <v-btn
          class="black--text mr-5"
          color="white"
          to="/profile"
          :x-small="this.$vuetify.breakpoint.name=='xs'"
        >
          <v-icon
            color="orange"
            class="mr-2"
            :x-small="this.$vuetify.breakpoint.name=='xs'"
          >mdi-account-check</v-icon>
          Hola {{username}}
        </v-btn>
        <v-btn
          class="black--text mr-5"
          color="white"
          @click="logout"
          :x-small="this.$vuetify.breakpoint.name=='xs'"
        >
          Salir
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          class="black--text mr-5"
          color="white"
          to="/registration/basic-info"
          :x-small="this.$vuetify.breakpoint.name=='xs'"
        >
          <v-icon
            color="orange"
            class="mr-2"
            :x-small="this.$vuetify.breakpoint.name=='xs'"
          >mdi-account-plus</v-icon>
          ¡Registrate!
        </v-btn>

        <v-btn
          class="black--text mr-5"
          color="white"
          to="/login"
          :x-small="this.$vuetify.breakpoint.name=='xs'"
        >
          <v-icon
            color="orange"
            class="mr-2"
            :x-small="this.$vuetify.breakpoint.name=='xs'"
          >mdi-account-key</v-icon>
          ¡Ingresa!
        </v-btn>
      </div>

    </v-app-bar>
</template>

<script>
import AuthRepository from '../repositories/auth'

export default {
  data(){
    return{

    }
  },
  methods:{
    logout(){
      this.$store.dispatch("auth/logout");
      this.$router.push('/');
    }
  },
  computed:{
    isLogged(){
      return AuthRepository.isLogged();
    },
    username(){
      return this.$store.getters["auth/getUser"].login
    }
  }
}
</script>


<style scoped>
</style>