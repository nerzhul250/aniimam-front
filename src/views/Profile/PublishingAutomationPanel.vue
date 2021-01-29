<template>
  <v-card>
      <v-card-title>
        Automatiza tus publicaciones!
      </v-card-title>
      <v-img 
        class = "clickable"
        src = "https://www.freepnglogos.com/uploads/instagram-logo-png-transparent-0.png" 
        max-height="100"
        max-width="100"
        @click="overlayAutomateInstagram = true"
        ></v-img>
      <v-overlay v-model="overlayAutomateInstagram">
        <v-card
          v-click-outside="onClickOutside"
          light
        >
          <v-form v-model="validInstagramForm">
            <v-text-field label="Tu perfil de instagram, por ejemplo: https://www.instagram.com/aniimam_com/">
            </v-text-field>
          </v-form>
        </v-card>
      </v-overlay>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      validInstagramForm: false,
      overlayAutomateInstagram: false,
    }
  },
  methods:{
    onClickOutside(){
      this.overlayAutomateInstagram = false;
    }
  }
}
</script>

<style scoped>
  .clickable:hover{
    cursor:pointer
  }
</style>