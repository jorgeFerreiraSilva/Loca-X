import axios from 'axios';

const service = axios.create({
  baseURL: 'http://192.168.0.41:8080/api',
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = (err) => {
  throw err;
};

export default {
  service,

  saveNewThing(newThing, userId) {
    return service.post(`/ads/users/${userId}`, newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
}