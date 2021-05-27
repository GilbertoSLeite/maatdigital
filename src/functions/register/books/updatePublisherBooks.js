let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function UpdateGraduationAuthor(    
    idAutor,
    idGraduacaoAutor,
){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "autores_id": idAutor,
            "graduacoes_id": idGraduacaoAutor,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/graduacao_autores', requestOptions);
        const result = await response.json();
        result.status ?  situacao = Boolean(true) : situacao = Boolean(false) || console.log(result)        
    } catch (error) {
        console.error('Ocorreu um erro em UpdateGraduationAuthor: ' + error);
    };
    return situacao
};