import store from '../store/index'
export default function authHeader() {
    let accessToken = store.getters["auth/getUserToken"]
    if (accessToken) {
      return { 'Authorization': accessToken };
    } else {
      return {};
    }
}