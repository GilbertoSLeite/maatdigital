import BooleanValidation from "../../booleanValidation/booleanValidation";
let token = localStorage.getItem('@maatdigital/token');
export default async function InsertGraduation(graduacao, siglaGraduacao){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "nome_graduacao": graduacao,
            "sigla_graduacao": siglaGraduacao,
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/graduacao', requestOptions);
        const result = await (response.ok && response.json());        
        (!BooleanValidation[result.status] && console.log(result))
        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduation: ' + error);
        return false
    };    
};