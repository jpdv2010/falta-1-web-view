import ServiceContext, { doGet, doPost, getHeader, getHeaderAutenticated } from "./ServiceContext";

export const getUserByUsername = (username) => {
    return doGet('user/find-by-username/' + username, getHeaderAutenticated());
 };
 
 export const registerUser = (user) => {
    return doPost('user', user, getHeader());
 };

 export const getAllUsers = () => {
    return doGet('user', getHeaderAutenticated());
 };

 export const login = (jsonLogin) => {
    return doPost('login', jsonLogin, getHeader());
 }