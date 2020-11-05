import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);
const state = {
    userLocations: []
}

const getters = {
}

const actions = {
    getUserLocations(){
        return api.request('/ext/locations/user-locations','get')
    },
    saveNewLocation(context,data){
        return api.request('ext/locations/add-user-location','post',data);
    }
}

const mutations = {
    setUserLocations(state,userLocations){
        state.userLocations=userLocations
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}