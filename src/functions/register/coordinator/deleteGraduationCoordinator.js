import BooleanValidation from "../../booleanValidation/booleanValidation";
let token = localStorage.getItem('@maatdigital/token');
export default async function DeleteGraduationCoordinator(idEditor){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const url = '/maatdigital/graduacao_coordenadores/' + idEditor
        const response = await fetch(url, requestOptions);
        const result = await (response.ok && response.json());        
        (!BooleanValidation[result.status] && console.error(result))
        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em DeleteGraduationCoordinator: ' + error);
        return false
    };
};