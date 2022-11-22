import ServiceContext from "./ServiceContext";

const context = ServiceContext;

export const getUserByUsername = (username) => {
    context.getToken();
    return context.doGet('user/find-by-username/' + username);
 };
 
 export const registerUser = () => {
    return context.doPost('user', user);
 };

 export const getAllUsers = () => {
    context.getToken();
    return context.doGet('user');
 };

 export const login = (jsonLogin) => {
    return context.doPost('login', jsonLogin);
 }