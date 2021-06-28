import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const DeleteGraduationOrganizer = async (idOrganizador) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        const url = '/maatdigital/graduacao_organizadores/' + idOrganizador
        const response = await fetch(url, requestOptions);
        const result = await (response.ok && response.json()); 

        (!BooleanValidation[result.status] && console.log(result));

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em DeleteGraduationOrganizer: ' + error);
        return false
    }
}

export default DeleteGraduationOrganizer;