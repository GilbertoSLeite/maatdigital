import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertRespCoverBooks = async (idLivro,idCapas) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "capas_id": idCapas,
            "livro_id": idLivro,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/resp_capas_livros', requestOptions);
        const result = await (response.ok && response.json());

        (!BooleanValidation[result.status] && console.error('Result InsertRespCoverBooks:', result))();

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertRespCoverBooks: ' + error);
    }
}

export default InsertRespCoverBooks;