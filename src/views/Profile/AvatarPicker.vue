<template>
    <v-dialog :fullscreen="$vuetify.breakpoint.xs" width="500" transition="dialog-bottom-transition" v-model="show">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="show = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Selecciona un avatar</v-toolbar-title>
            </v-toolbar>
            <v-layout row wrap v-if="avatars">
                <v-flex
                    v-for="avatar in avatars"
                    :key="avatar.id"
                    xs4 sm3
                    d-flex>
                    <v-card tile flat class="d-flex">
                        <v-card-text class="d-flex">
                            <v-avatar
                                size="96"
                                @click="selectAvatar(avatar)"
                                class="avatar-picker-avatar"
                                :class="{ 'current': avatar.id === currentAvatar }">
                                <img :src="avatar.path">
                            </v-avatar>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-toolbar dark color="primary">
                <v-toolbar-title>O puedes cargar tu propio avatar</v-toolbar-title>
            </v-toolbar>
        </v-card>
    </v-dialog>
</template>

<script>
import avatarSamples from './avatarSamples'
export default {
    props: {
        currentAvatar: {
            type: String,
            required: true
        },
        value: Boolean
    },
    async mounted () {
        await this.$store.dispatch('fetchAvatars')
    },
    computed: {
        avatars () {
            return avatarSamples
        },
        show: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        selectAvatar (avatar) {
            this.$emit('selected', avatar)
            this.show = false
        }
    }
}
</script>

<style scope>

</style>