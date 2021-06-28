import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertGraduationDiagramming = async (idDiagramming,idGraduacaoDiagramming) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "diagramador_id": idDiagramming,
            "graduacoes_id": idGraduacaoDiagramming,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/graduacao_diagramadores', requestOptions);
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        return BooleanValidation[result.status]       
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationDiagramming: ' + error);
        return false;
    }
}

export default InsertGraduationDiagramming;