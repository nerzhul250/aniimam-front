import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);

const state = {
  token:''
}

const getters = {
  getUserToken: state => state.token
}

const actions = {
  login({commit}, data){
    api.request('/authenticate','post',data)
    .then(res =>{
      commit('setToken','Bearer '+res.data.id_token);
      return Promise.resolve('Success');
    }).catch(function (error) {
      return Promise.reject(error);
    })
  },
  logout({commit}){
    commit('setToken','');
    return Promise.resolve('Success');
  },
  registerUser(context,data){
    api.request('/register','post',data)
    .then(res => {
      console.log(res)
      return Promise.resolve('Success');
    }).catch(function (error){
       return Promise.reject(error);
    })
  }
}

const mutations = {
  setToken(state,token){
    state.token=token
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }