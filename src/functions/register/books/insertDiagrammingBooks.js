import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertDiagrammingBooks = async (idLivro,idDiagramador) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "diagramador_id": idDiagramador,
            "livro_id": idLivro,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/diagramadores_livros', requestOptions);
        const result = await (response.ok && response.json());

        (!BooleanValidation[result.status] && console.error('Result InsertDiagrammingBooks:', result))();

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertDiagrammingBooks: ' + error);
        return false
    }
}

export default InsertDiagrammingBooks;