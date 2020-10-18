<template>
    <v-navigation-drawer 
        permanent
        app
        clipped
    >
      <v-list-item class="mt-1">
        <v-list-item-content>
          <v-list-item-title class="title">
            Mas que un gusto, <br> es un estilo de vida
          </v-list-item-title>
          <v-list-item-subtitle>
            wink wink
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
            <v-list-item-icon>
                <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
     data () {
      return {
        items: [
          { title: '¡Debes ver esto!', icon: 'mdi-star-four-points', link:'/',color:'yellow'},
          { title: 'Categorias', icon: 'mdi-view-dashboard', link:'/', color:'blue'},
          { title: 'Acerca de Aniimam', icon: 'mdi-help-box', link:'/form', color:'green'},
        ],
        right: null,
      }
    }
}
</script>

<style scoped>

</style>