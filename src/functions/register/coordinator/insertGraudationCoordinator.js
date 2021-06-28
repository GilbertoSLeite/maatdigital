import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertGraduationCoordinator = async (idCoordinator,idGraduacaoCoordinator) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "coordenadores_id": idCoordinator,
            "graduacoes_id": idGraduacaoCoordinator,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/graduacao_coordenadores', requestOptions);
        const result = await (response.ok && response.json());     

        (!BooleanValidation[result.status] && console.error(result));

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationCoordinator: ' + error);
        return false
    }
}

export default InsertGraduationCoordinator;