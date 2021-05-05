let token = localStorage.getItem('@maatdigital/token');
let situacao;
export default async function InsertGraduation(graduacao, siglaGraduacao){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "nome_graduacao": graduacao,
            "sigla_graduacao": siglaGraduacao,
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/graduacao', requestOptions);
        const result = await response.json();
        console.log(result)
        if(result.status === true){
            situacao = Boolean(true)
        }else {
            console.log(result);
            console.error(result.tipo_error);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduation: ' + error);
    };
    return situacao
};