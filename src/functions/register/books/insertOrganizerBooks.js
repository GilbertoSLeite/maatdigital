import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertOrganizerBooks = async  (idOrganizador,idLivro) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        const raw = JSON.stringify({
            "organizador_id": idOrganizador,
            "livro_id": idLivro,
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/organizadores_livros', requestOptions);
        const result = await (response.ok && response.json());
        (!BooleanValidation[result.status] && console.error('Result InsertOrganizerBooks:', result))();
        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em InsertOrganizerBooks: ' + error);
        return false
    }
}

export default InsertOrganizerBooks;