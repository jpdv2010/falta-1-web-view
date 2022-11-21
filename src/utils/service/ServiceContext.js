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
        this.getToken();
        return this.doPost('match', match);
    }

    static getMatch = () => {
        this.getToken();
        return this.doGet('match');
    }

    static getMatch = (matchId) => {
        this.getToken();
        return this.doGet('match/' + matchId);
    }

    static doPost(endPoint, content) {
        // var promise = new Promise((resolve,regect) => {
        //     axios.post(this.address + 'api/' + endPoint, content, { headers: this.headers }).then(result => {
        //         resolve(result);
        //     });
        // });
        // return promise;

        var promise = new Promise((resolve,regect) => {
            fetch(this.address + 'api/' + endPoint, {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;'
                }
            }).then(response => {
                resolve(response);
            })

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

    static getToken() {
        const token = localStorage.getItem('access-token');
        if(null != token) {
            this.headers["Authorization"] = "Bearer " + token;
        }
    }

}
export default ServiceContext