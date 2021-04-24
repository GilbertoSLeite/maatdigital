import Authenticated from "../localstorage/authenticated";
import TokenAuthenticated from "../localstorage/tokenAuthenticated";
import UserAuthenticated from "../localstorage/userAuthenticated";

let acess;
export default async function Acessing(user, password) {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "login": user,
            "senha": password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/login', requestOptions);
        const result = await response.json();
        if(result.status){
            Authenticated(Boolean(true))
            TokenAuthenticated(result.token)
            UserAuthenticated(user)
            acess = Boolean(true)
        }else {
            acess = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em Acessing: ' + error);
    };
    return acess
};