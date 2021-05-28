import BooleanValidation from "./booleanValidation";
let token = localStorage.getItem('@maatdigital/token');
export default async function InsertCoverBooks(idLivro,nameFileCapas,pathFileCapas,sizeFileCapas,typeFileCapas){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "livro_id": idLivro,
            "name_capas": nameFileCapas,
            "path_capas": pathFileCapas,
            "size_capas": sizeFileCapas,
            "type_capas": typeFileCapas,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/capas_livros', requestOptions);
        const result = await (response.ok && response.json());
        console.log('Result InsertCoverBooks:', await result);
        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em InsertCoverBooks: ' + error);
    };
};