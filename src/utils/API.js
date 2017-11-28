import * as axios from 'axios'

import {
  apiConstants,
} from './Constants'

axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.baseURL = apiConstants.weather.baseURL

class API {
  static getData(url, params = {}) {
    params.appid = apiConstants.weather.apiKey
    return axios({
      method: 'GET',
      url,
      params,
    })
  };

  static postData(url, data) {
    return axios({
      method: 'POST',
      url,
      data,
    })
  };

  static patchData(url, data) {
    return axios({
      method: 'PATCH',
      url,
      data,
    })
  };

  static putData(url, data) {
    return axios({
      method: 'PUT',
      url,
      data,
    })
  };

  static deleteData(url, data) {
    return axios({
      method: 'DELETE',
      url,
      data,
    })
  };
}


export default API
