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
                <v-icon>{{ item.icon }}</v-icon>
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
          { title: 'Dashboard', icon: 'mdi-view-dashboard', link:'/'},
          { title: 'Photos', icon: 'mdi-image', link:'/'},
          { title: 'About', icon: 'mdi-help-box', link:'/form'},
        ],
        right: null,
      }
    }
}
</script>

<style scoped>

</style>