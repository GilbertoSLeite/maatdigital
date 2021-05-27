let token = localStorage.getItem('@maatdigital/token');
const boolInsert = {
    "true": true,
    "false": false,
    "undefined": false,
};
export default async function InsertOrganizerBooks(    
    idOrganizador,
    idLivro,
){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "organizador_id": idOrganizador,
            "livro_id": idLivro,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/organizadores_livros', requestOptions);
        const result = await (response.ok && response.json());
        console.log('Result InsertOrganizerBooks:', result);
        return boolInsert[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em InsertOrganizerBooks: ' + error);
    };
};