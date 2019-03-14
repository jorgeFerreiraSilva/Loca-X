import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://192.168.0.41:8080/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password, name, state) => {
    return this.service.post('/auth/signup', { username, password, name, state })
      .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin')
      .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/auth/login', { username, password })
      .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/auth/logout', {})
      .then(response => response.data)
  }
}

export default AuthService;