import BooleanValidation from "./booleanValidation";
let token = localStorage.getItem('@maatdigital/token');
export default async function InsertCoordinatorBooks(idCoordinator,idLivro){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "coordenador_id": idCoordinator,
            "livro_id": idLivro,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/coordenadores_livros', requestOptions);
        const result = await (response.ok && response.json());
        console.log('Result InsertCoordinatorBooks:', await result);
        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em InsertCoordinatorBooks: ' + error);
    };
};