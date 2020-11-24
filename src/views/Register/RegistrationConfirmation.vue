<template>
    <v-container fill-height fluid>
        <v-row align="center"
            justify="center">
            <v-card
                flat
                tile
                class="orange lighten-1 white--text text-center"
                style="width:100%"
            >

                <v-card-text class="white--text pt-5">
                    ¡Felicidades! solo te queda confirmar tu correo electronico
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — <strong>Aniimam</strong>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
 export default {
  }
</script>

<style>
</style>