import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertGraduationEditor = async (idEditor,idGraduacaoEditor) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "editor_id": idEditor,
            "graduacoes_id": idGraduacaoEditor,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/graduacao_editores', requestOptions);
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationEditor: ' + error);
    }
}

export default InsertGraduationEditor;