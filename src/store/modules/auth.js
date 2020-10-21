import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);

const state = {
  token:'',
  login:'',
  firstName:'',
  lastName:'',
  email:'',
  imageUrl:'',
  otakuRating:0,
  mercaderRating:0,
  phone:'',
  country:''
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
  },
  registerExtUser(context,data){
    return api.request('/ext/register-user','post',data)
  },
  usernameOrEmailExists(context,data){
    return api.request(`/ext/users/exists?username=${data.username}&email=${data.email}`,'get')
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