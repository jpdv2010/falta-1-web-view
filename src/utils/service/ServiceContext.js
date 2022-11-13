import axios from "axios"

class ServiceContext {
    static address = 'http://localhost:8080/';
    static headers = {
          "Content-type":"application/json"
        };

    static login = (jsonLogin) => {
        this.doPost('login', jsonLogin)
    }

    static registerUser = (user) => {
        return this.doPost('user', user);
    }

    static registerMatch = (match) => {
        return this.doPost('match', match);
    }

    static getMatch = () => {
        return this.doGet('match');
    }

    static getMatch = (matchId) => {
        return this.doGet('match/' + matchId);
    }

    static doPost(endPoint, content) {
        var promise = new Promise((resolve,regect) => {
            axios.post(this.address + 'api/' + endPoint, content, { headers: this.headers }).then(result => {
                resolve(result);
            });
        });
        return promise;
        
    }
    
    static doGet(endPoint, headers) {
        var promise = new Promise((resolve,regect) => {
            axios.get(this.address + endPoint, this.config).then(result => {
                resolve(result);
            });
        });
        return promise;
    }

}
export default ServiceContext