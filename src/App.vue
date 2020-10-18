<template>
  <v-app> 
    <Appbar/>
    <Navbar v-if="this.outOfAppExceptionRoutes.indexOf($route.name) === -1"/>
    <v-main>
      <v-row style="height:100%">
        <v-col cols="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar';
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Appbar,
    Navbar
  },
  data: () => ({
    outOfAppExceptionRoutes: [
            'basic-info',
            'personalization-info'
    ],
  }),
};
</script>

<style lang="scss">
  /* width */
    ::-webkit-scrollbar {
        width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #FFA500;
        border-radius: 10px;
    }
</style>
