import axios from "axios"

class ServiceContext {
    static address = 'http://localhost:8080/';

    static login = (jsonLogin) => {
        //TODO: implements login
    }

    static registerUser = (user) => {
        return this.doPost('user', user);
    }

    static registerMatch = (match) => {
        return this.doGet('match', match);
    }

    static getMatch = () => {
        return this.doGet('match');
    }

    static getMatch = (matchId) => {
        return this.doGet('match/' + matchId);
    }

    static doPost(endPoint, content) {
        var promise = new Promise((resolve,regect) {
            axios.post(this.address + endPoint, content).then(result => {
                resolve(result);
            });
        });
        return promise;
        
    }
    
    static doGet(endPoint) {
        var promise = new Promise((resolve,regect) {
            axios.get(this.address + endPoint).then(result => {
                resolve(result);
            });
        });
        return promise;
    }

}
export default ServiceContext