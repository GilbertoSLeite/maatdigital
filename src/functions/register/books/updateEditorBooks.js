import BooleanValidation from "../../booleanValidation/booleanValidation";

let token = localStorage.getItem('@maatdigital/token');
export default async function UpdateEditorBooks(idEditor,idLivro){
    try {
        let myHeaders = new Headers();  
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "editores_id": idEditor,
            "livro_id": idLivro,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/editores_responsaveis_livros', requestOptions);
        const result = await (response.ok && response.json());
        console.log('Result UpdateEditorBooks:', result);
        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em UpdateEditorBooks: ' + error);
        return false;
    }
}