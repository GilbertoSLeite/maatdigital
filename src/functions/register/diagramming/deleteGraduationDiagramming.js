import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const DeleteGraduationDiagramming = async (idEditor) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        const url = '/maatdigital/diagramadores/' + idEditor
        const response = await fetch(url, requestOptions);
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        return [BooleanValidation[result.status]];    
    } catch (error) {
        console.error('Ocorreu um erro em DeleteGraduationDiagramming: ' + error);
        return false;
    }
}

export default DeleteGraduationDiagramming;