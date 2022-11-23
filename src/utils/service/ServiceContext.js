import axios from "axios"
import { serverConfig } from "../../_serverConfig";

    export const doPost = (endPoint, content, headers) => {
          var promise = new Promise((resolve,regect) => {
            axios.post(serverConfig().address + 'api/' + endPoint, content, {
                headers: headers
              })
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                regect(error);
              });
        });
        return promise;
    }
    
    export const doGet = (endPoint, headers) => {
        var promise = new Promise((resolve,regect) => {
            axios.get(serverConfig().address + 'api/' + endPoint, {
                headers: headers
              })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                regect(error);
            })
        });
        return promise;
    }

    export const doPut = (endPoint, content, headers) => {
        var promise = new Promise((resolve,regect) => {
            axios.put(serverConfig().address + 'api/' + endPoint, content, {
                headers: headers
              })
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                regect(error);
              });
        });
        return promise;
    }

    export const doDelete = (endPoint, id, headers) => {
      var promise = new Promise((resolve,regect) => {
          axios.delete(serverConfig().address + 'api/' + endPoint + '/' + id, {
              headers: headers
            })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              regect(error);
            });
      });
      return promise;
  }

    export const getHeaderAutenticated = () => {
        let headers = {
          "Content-type":"application/json"
        };
        const token = localStorage.getItem('access-token');
        if(null != token) {
            headers["Authorization"] = "Bearer " + token;
        }
        return headers;
    }

    export const getHeader = () => {
      let headers = {
        "Content-type":"application/json"
      };
      return headers;
  }