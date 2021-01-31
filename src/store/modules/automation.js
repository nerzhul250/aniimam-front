import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);
const state = {}

const getters = {
}

const actions = {
    getUserInstagramAutomation(){
        return api.request('/user-scraping-site/instagram','get');
    },
    createInstagramAutomationOrder(context,data){
        return api.request('/user-scraping-site/instagram','post',data);
    }
}

const mutations = {
   
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}