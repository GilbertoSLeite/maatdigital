import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertCoverBooks = async (idLivro,nameFileCapas,pathFileCapas,sizeFileCapas,typeFileCapas) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "livro_id": idLivro,
            "name_capas": nameFileCapas,
            "path_capas": pathFileCapas,
            "size_capas": sizeFileCapas,
            "type_capas": typeFileCapas,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/capas_livros', requestOptions);
        const result = await (response.ok && response.json());

        (!BooleanValidation[result.status] && console.error('Result InsertCoverBooks:', result))();

        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em InsertCoverBooks: ' + error);
    }
}

export default InsertCoverBooks;