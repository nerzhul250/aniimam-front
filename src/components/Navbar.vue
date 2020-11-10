<template>
    <v-navigation-drawer 
        permanent
        app
        clipped
    >
      <v-list-item class="mt-1">
        <v-list-item-content>
          <v-list-item-title class="title">
            Haz realidad <br> tu amor y tu hype 
            <v-icon
              color="red"
            >mdi-heart</v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          to="/"
        >
            <v-list-item-icon>
                <v-icon color="yellow">mdi-star-four-points</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>¡Debes ver esto!</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click="showCategoriesOverlay"
        >
            <v-list-item-icon>
                <v-icon color="primary">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Categorias</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click="showAnimesOverlay"
        >
            <v-list-item-icon>
                <v-icon color="orange">mdi-checkbox-blank-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Animes</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item
          to="/form"
        >
            <v-list-item-icon>
                <v-icon color="green">mdi-help-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Acerca de Aniimam</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data () {
      return {
        right: null,
      }
    },
    methods:{
      showCategoriesOverlay(){
          this.categoriesOverlay=true;
      },
      showAnimesOverlay(){
          this.animeOverlay=true;
      }
    },
    computed:{
      animeOverlay:{
          get(){
              return this.$store.getters["product/isAnimeOverlay"];
          },
          set(value){
              this.$store.commit("product/setAnimeOverlay",value);
          }
      },
      categoriesOverlay:{
          get(){
              return this.$store.getters["product/isCategoriesOverlay"];
          },
          set(value){
              this.$store.commit("product/setCategoriesOverlay",value);
          }
      }
    }
}
</script>

<style scoped>

</style>