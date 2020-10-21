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

      <v-btn
        class="black--text mr-5"
        color="white"
        to="/registration/basic-info"
      >
        <v-icon
          color="orange"
          class="mr-2"
        >mdi-account-plus</v-icon>
        ¡Registrate!
      </v-btn>

      <v-btn
        class="black--text mr-5"
        color="white"
        to="/login"
      >
        <v-icon
          color="orange"
          class="mr-2"
        >mdi-account-key</v-icon>
        ¡Ingresa!
      </v-btn>

    </v-app-bar>
</template>

<script>
export default {
    
}
</script>


<style scoped>
</style>