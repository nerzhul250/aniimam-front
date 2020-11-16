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
    <v-overlay
      :value="productDetailsOverlay"
    >
      <ProductDetails/>
    </v-overlay>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar';
import Navbar from './components/Navbar';
import ProductDetails from './views/Products/ProductDetails'

export default {
  name: 'App',
  components: {
    Appbar,
    Navbar,
    ProductDetails
  },
  data: () => ({
    outOfAppExceptionRoutes: [
            'basic-info',
            'personalization-info',
            'login',
            'email-confirmation',
            'registration-confirmation',
            'profile',
            'public-profile',
            'create-product',
            'about'
    ],
  }),
  computed:{
    productDetailsOverlay:{
          get(){
              return this.$store.getters["product/isProductDetailsOverlay"];
          },
          set(value){
              this.$store.commit("product/setProductDetailsOverlay",value);
          }
      }
  }
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
