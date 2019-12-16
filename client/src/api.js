import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://crm-management.herokuapp.com/',
});

export const loginization = (username, password) => {
    return instance.post("users/login", { username, password });
}

export const registration = (payload) => {
    debugger
    return instance.post("users", payload);
}