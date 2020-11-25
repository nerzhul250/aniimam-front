import { Api } from '../../helpers/api'

const api = new Api(Api.ROUTES().empty);

const state = {
  token:'',
  user:{
    login:'',
    firstName:'',
    lastName:'',
    email:'',
    imageUrl:'',
    otakuRating:0,
    mercaderRating:0,
    phone:'',
    country:'',
    profileDescription:''
  }
}

const getters = {
  getUserToken: state => state.token,
  getUser: state => state.user
}

const actions = {
  login(context, data){
    return api.request('/authenticate','post',data)
  },
  logout({commit}){
    commit('setToken','');
    return Promise.resolve('Success');
  },
  registerExtUser(context,data){
    return api.request('/ext/register-user','post',data)
  },
  usernameOrEmailExists(context,data){
    return api.request(`/ext/users/exists?username=${data.username}&email=${data.email}`,'get')
  },
  getUserData(){
     return api.request('/ext/account','get')
  },
  updateProfileData(context,data){
    return api.request('/ext/users','put',data)
  },
  getUserPublicData(context,data){
    return api.request(`/ext/users?username=${data.username}`,'get')
  },
  updateUserAvatar(context,data){
    return api.request('/ext/update-user-avatar','post',data.form,encodeURI(data.config));
  }
}

const mutations = {
  setToken(state,token){
    state.token=token
  },
  setUser(state,user){
    state.user.login=user.login
    state.user.firstName=user.firstName
    state.user.lastName=user.lastName
    state.user.email=user.email
    state.user.imageUrl=user.imageUrl

    state.user.otakuRating=user.otakuRating
    state.user.mercaderRating=user.mercaderRating
    state.user.profileDescription=user.profileDescription
    state.user.phone=user.phone
    state.user.country=user.country
  },
  setUserAvatarUrl(state,newAvatarUrl){
    state.user.imageUrl=newAvatarUrl;
  },
  setFirstName(state,firstName){
    state.user.firstName=firstName
  },
  setLastName(state,lastName){
    state.user.lastName=lastName
  },
  setEmail(state,email){
    state.user.email=email
  },
  setImageUrl(state,imageUrl){
    state.user.imageUrl=imageUrl;
  },
  setPhone(state,phone){
    state.user.phone=phone;
  },
  setProfileDescription(state,profileDescription){
    state.user.profileDescription=profileDescription;
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }