import axios from 'axios';
import { API_URL } from '../config/config';


let ApiService = {


    get: (url, payload, header, callback) => {
        axios.get(API_URL + url, payload, header)
            .then((responseData) => {
                if (responseData) {
                    callback && callback(responseData.data, null)
                }
            })
    },

    post: (url, data, headers, callback) => {
        axios.post(API_URL + url, data, {
            headers: (headers === null || Object.keys(headers).length === 0)
                ? {} : { Authorization: `${headers.Token}` }
        })
            .then((responseData) => {
                callback && callback(responseData.data, null, data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    },

    delete: (url, payload, headers, callback) => {
        axios.delete(API_URL + url, {
            params: payload,

        })
            .then((responseData) => {
                callback && callback(responseData.data, null);
            })
            .catch((error) => {
                console.log(error.message);
            })

    },

      put: (url, data, headers, callback) => {

        axios.put(API_URL + url, data, {
            headers: headers === null || Object.keys(headers).length === 0 ? {} : { Authorization: `${headers.Token}` },
        })
            .then((responseData) => {
                callback && callback(responseData.data, null, data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    },

    patch: (url, data, headers, callback) => {
        axios
            .patch(API_URL + url, data, {
                headers: headers === null || Object.keys(headers).length === 0 ? {} : { Authorization: `${headers.Token}` },
            })
            .then((responseData) => {
                callback && callback(responseData.data, null, data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    },


}

export default ApiService;