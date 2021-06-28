import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertGraduationOrganizer = async (idOrganizador,idGraduacaoOrganizador) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "organizador_id": idOrganizador,
            "graduacoes_id": idGraduacaoOrganizador,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/graduacao_organizadores', requestOptions);
        const result = await (response.ok && response.json());  

        (!BooleanValidation[result.status] && console.log(result));

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationOrganizer: ' + error);
        return false
    }
}

export default InsertGraduationOrganizer;