import Authenticated from "../localstorage/authenticated";
import BooleanValidation from '../booleanValidation/booleanValidation';

const Acessing = async (user, password) => {
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
        
        (result.status ? Authenticated(Boolean(true), result.token, user) : console.error(result.message));
                 
        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em Acessing: ' + error);
        return false
    }
}

export default Acessing;