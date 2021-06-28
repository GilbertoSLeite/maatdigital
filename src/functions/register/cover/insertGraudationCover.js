import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertGraduationCover = async (idCover,idGraduacaoCover) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "capas_id": idCover,
            "graduacoes_id": idGraduacaoCover,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/graduacao_resp_capas', requestOptions);
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationCover: ' + error);
        return false
    }
}

export default InsertGraduationCover;