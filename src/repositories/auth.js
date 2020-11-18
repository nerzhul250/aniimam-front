import store from '../store/index'
var md5 = require("md5")

class AuthRepository{
    registerUser(login,firstName,lastName,email,password){
        let data = {
            login:login,
            firstName:firstName,
            lastName:lastName,
            email:email,
            password: md5(password)
        }
        return store.dispatch("auth/registerUser", data);
    }

    registerExtUser(login,firstName,lastName,email,password,
                    country,channel,phone){
        let data = {
            login:login,
            firstName:firstName,
            lastName:lastName,
            email:email,
            password: md5(password),
            country:country,
            channel:channel,
            phone:phone
        }
        return store.dispatch("auth/registerExtUser",data);
    }

    usernameOrEmailExists(username,email){
        let data={
            username:username,
            email:email
        }
        return store.dispatch("auth/usernameOrEmailExists",data)
    }

    login(username,password){
        let data = {
            username:username,
            password:md5(password)
        }
        return store.dispatch("auth/login",data)
    }
    isLogged(){
        return store.getters["auth/getUserToken"]!='';
    }
    getUserData(){
        return store.dispatch("auth/getUserData");
    }
    updateProfileData(){
        let data=store.getters['auth/getUser']
        return store.dispatch("auth/updateProfileData",data);
    }
    getUserPublicData(username){
        let data={
            username:username
        }
        return store.dispatch("auth/getUserPublicData",data);
    }

    updateUserAvatar(form,config){
        let data={
            form:form,
            config:config
        }
        return store.dispatch("auth/updateUserAvatar",data);
    }
}

export default new AuthRepository();