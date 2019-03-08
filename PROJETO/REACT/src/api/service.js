import axios from 'axios';

const service = axios.create({
  baseURL: 'http://192.168.0.41:8080/api',
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return service.post('/ads/users/5c7b0456e9591c5d147a7246', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewThing (newThing) {
    // console.log('new thing is: ', newThing)
    return service.post('/ads/users/5c7b0456e9591c5d147a7246', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
}