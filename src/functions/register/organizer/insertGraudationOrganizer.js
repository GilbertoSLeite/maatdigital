let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function InsertGraduationOrganizer(    
    idOrganizador,
    idGraduacaoOrganizador,
){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "organizador_id": idOrganizador,
            "graduacoes_id": idGraduacaoOrganizador,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/graduacao_organizadores', requestOptions);
        const result = await response.json();
        if(result.status === true){
            situacao = Boolean(true)
        }else {
            console.log(result);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationOrganizer: ' + error);
    };
    return situacao
};