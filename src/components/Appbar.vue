<template>
    <v-app-bar
        app
        color="white"
        dark
        clipped-left
        >
      <div class="d-flex align-center">
        <v-img
          alt="Aniimam Name"
          class="shrink mt-1"
          contain
          min-width="100"
          src="../assets/logo.jpg"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    
}
</script>


<style scoped>
</style>