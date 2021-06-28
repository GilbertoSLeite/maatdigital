import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const UpdateBaseGraduation = async (id, graduacao, siglaGraduacao) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "nome_graduacao": graduacao,
            "sigla_graduacao": siglaGraduacao,
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = '/maatdigital/graduacao/' + id;
        const response = await fetch(url, requestOptions);
        const result = await (response.ok && response.json());  

        (!BooleanValidation[result.status] && console.log(result));

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduation: ' + error);
        return false
    }
}

export default UpdateBaseGraduation;