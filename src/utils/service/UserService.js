import ServiceContext from "./ServiceContext";

class UserService {
    static context = ServiceContext;
    
    static getByUsername = (username) => {
        this.context.getToken();
        return this.context.doGet('user/find-by-username/' + username);
    }

    static registerUser = (user) => {
        return this.context.doPost('user', user);
    }

    static getAll = () => {
        return this.context.doGet('user');
    }
}

export default UserService