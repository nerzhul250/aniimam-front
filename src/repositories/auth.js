import store from '../store/index'
var md5 = require("md5")

class AuthRepository{
    getUserToken(){
        return store.getters["auth/getUserToken"];
    }

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
}

export default new AuthRepository();