import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertGraduationAuthor = async (idAutor,idGraduacaoAutor) =>{
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "autores_id": idAutor,
            "graduacoes_id": idGraduacaoAutor,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/graduacao_autores', requestOptions);
        const result = await (response.ok && response.json()); 

        (!BooleanValidation[result.status] && console.error(result));
        
        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationAuthor: ' + error);
        return false;
    }
}

export default InsertGraduationAuthor;