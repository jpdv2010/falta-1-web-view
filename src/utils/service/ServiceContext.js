import axios from "axios"

class ServiceContext {
    static address = 'http://localhost:8080/';
    static headers = {
          "Content-type":"application/json"
        };

    static login = (jsonLogin) => {
        return this.doPost('login', jsonLogin);
    }

    static doPost(endPoint, content) {
          var promise = new Promise((resolve,regect) => {
            axios.post(this.address + 'api/' + endPoint, content, {
                headers: this.headers
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
    
    static doGet(endPoint) {
        var promise = new Promise((resolve,regect) => {
            axios.get(this.address + 'api/' + endPoint, {
                headers: this.headers
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

    static doPut(endPoint, content) {
        var promise = new Promise((resolve,regect) => {
            axios.put(this.address + 'api/' + endPoint, content, {
                headers: this.headers
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

    static doDelete(endPoint, id) {
      var promise = new Promise((resolve,regect) => {
          axios.delete(this.address + 'api/' + endPoint + '/' + id, {
              headers: this.headers
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

    static getToken() {
        const token = localStorage.getItem('access-token');
        if(null != token) {
            this.headers["Authorization"] = "Bearer " + token;
        }
    }

}
export default ServiceContext