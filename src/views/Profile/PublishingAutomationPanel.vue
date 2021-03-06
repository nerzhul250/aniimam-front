<template>
  <v-card class="pb-5">
      <v-card-title>
        Automatiza tus publicaciones!
      </v-card-title>
      <v-card
        max-width="250"
        width="250"
        class="d-flex pa-5 ma-5"
      >
        <div class="d-flex flex-column">
          <v-img 
            class = "clickable"
            src = "https://www.freepnglogos.com/uploads/instagram-logo-png-transparent-0.png" 
            max-height="100"
            max-width="100"
            @click="overlayAutomateInstagram = true"
          ></v-img>
          <v-icon color="red" v-if="!isInstagramAutomated">
            mdi-circle
          </v-icon>
          <v-icon color="green" v-else>
            mdi-circle
          </v-icon>
        </div>
        <v-card-subtitle v-if="!isInstagramAutomated">
          Aun no tienes instagram automatizado
        </v-card-subtitle>
        <v-card-subtitle v-else>
          Tienes instagram automatizado!
        </v-card-subtitle>
      </v-card>
      <v-overlay v-model="overlayAutomateInstagram">
        <v-card
          v-click-outside="onClickOutside"
          max-width="500"
          width="500"
          light
        >
          <v-card-title>
            Automatiza tus publicaciones de instagram
          </v-card-title>
          <v-card-text>
            Toda publicación que hagas en instagram de tus productos aparecerán en
            Aniimam diariamente, solo basta con que nos des tu nombre de usuario
            como ves en el siguiente campo de texto, y posteriormente le das en Automatizar!
            <v-form v-model="validInstagramForm">
              <v-text-field 
                label="aniimam_com"
                v-model="siteLink"
                :rules="siteLinkRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn 
              color="orange"
              class="white--text"
              @click="automateInstagram"
            >Automatizar!</v-btn>
            <v-card-subtitle v-if="!isInstagramAutomated">
              <v-icon color ="red" >
                mdi-circle
              </v-icon>
              Aun no tienes instagram automatizado
            </v-card-subtitle>
            <v-card-subtitle v-if="isInstagramAutomated">
              <v-icon color ="green">
                mdi-circle
              </v-icon>
              Tienes instagram automatizado!
            </v-card-subtitle>
          </v-card-actions>
        </v-card>
      </v-overlay>
  </v-card>
</template>

<script>
import AutomationRepository from '../../repositories/automation'
export default {
  data(){
    return {
      validInstagramForm: false,
      overlayAutomateInstagram: false,
      siteLink:'',
      isInstagramAutomated:false,

      siteLinkRules: [
        s => !!s || 'Se debe de especificar un sitio',
      ]
    }
  },
  methods:{
    onClickOutside(){
      this.overlayAutomateInstagram = false;
    },
    automateInstagram(){
      if(this.validInstagramForm){
        AutomationRepository.createInstagramAutomationOrder(this.siteLink).then((res)=>{
          this.isInstagramAutomated = true;
          console.log(res)
        }).catch((err)=>{
          console.log(err)
          alert("Ha habido un error en el servidor")
        })
      }else{
        alert("La dirección de tu sitio en instagram no es valida")
      }
    }
  },
  mounted(){
    AutomationRepository.getUserInstagramAutomation().then((res)=>{
      if(res.data!='0'){
        this.isInstagramAutomated = true
        this.siteLink = res.data.siteLink;
      }
    })
  }
}
</script>

<style scoped>
  .clickable:hover{
    cursor:pointer
  }
</style>