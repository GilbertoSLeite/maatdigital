let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function UpdateGraduationCoordinator(    
    idCoordinator,
    idGraduacaoCoordinator,
){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "coordenadores_id": idCoordinator,
            "graduacoes_id": idGraduacaoCoordinator,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/graduacao_coordenadores', requestOptions);
        const result = await response.json();
        if(result.status === true){
            situacao = Boolean(true)
        }else {
            console.log(result);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em UpdateGraduationCoordinator: ' + error);
    };
    return situacao
};