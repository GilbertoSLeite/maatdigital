let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function UpdateGraduationEditor(    
    idOrganizador,
    idGraduacaoOrganizador,
){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "editor_id": idOrganizador,
            "graduacoes_id": idGraduacaoOrganizador,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/graduacao_editores', requestOptions);
        const result = await response.json();
        (result.status ? (situacao = Boolean(true)) : (situacao = Boolean(false) || console.log(result)));
    } catch (error) {
        console.error('Ocorreu um erro em UpdateGraduationEditor: ' + error);
    };
    return situacao
};