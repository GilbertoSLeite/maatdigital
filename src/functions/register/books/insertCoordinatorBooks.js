import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const InsertCoordinatorBooks = async (idCoordinator,idLivro) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        
        const raw = JSON.stringify({
            "coordenador_id": idCoordinator,
            "livro_id": idLivro,
        });
        
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        const response = await fetch('/maatdigital/coordenadores_livros', requestOptions);
        
        const result = await (response.ok && response.json());
        
        (!BooleanValidation[result.status] && console.error('Result InsertCoordinatorBooks:', result))();
        
        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertCoordinatorBooks: ' + error);
        return false;
    }
}

export default InsertCoordinatorBooks;