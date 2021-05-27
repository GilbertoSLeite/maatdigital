let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function DeleteGraduationAuthor(idAutor){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const url = '/maatdigital/graduacao_autores/' + idAutor
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        (result.status ? (situacao = Boolean(true)) : (situacao = Boolean(false) || console.log(result)));
    } catch (error) {
        console.error('Ocorreu um erro em DeleteGraduationAuthor: ' + error);
    };
    return situacao
};