<template>
  <v-app> 
    <Appbar/>
    <Navbar/>
    <v-content>
      <v-row style="height:100%">
        <v-col cols="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-content>
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
    //
  }),
};
</script>
