import authRepository from '../repositories/auth'

export default function authHeader() {
    let accessToken = authRepository.getUserToken();
    if (accessToken) {
      return { Authorization: accessToken };
    } else {
      return {};
    }
}