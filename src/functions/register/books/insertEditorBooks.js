import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertEditorBooks = async (idEditor,idLivro) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "editores_id": idEditor,
            "livro_id": idLivro,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/editores_responsaveis_livros', requestOptions);
        const result = await (response.ok && response.json());

        (!BooleanValidation[result.status] && console.error('Result InsertEditorBooks:', result))();

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertEditorBooks: ' + error);
        return false;
    }
}

export default InsertEditorBooks;