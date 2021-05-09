let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function InsertGraduationCover(    
    idCover,
    idGraduacaoCover,
){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "capas_id": idCover,
            "graduacoes_id": idGraduacaoCover,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/graduacao_resp_capas', requestOptions);
        const result = (response.ok && await response.json());
        (result.status ? (situacao = Boolean(true)) : (situacao = Boolean(false) || console.log(result)));
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationCover: ' + error);
    };
    return situacao
};