let token = localStorage.getItem('@maatdigital/token');
let situacao;
export default async function UpdateBaseGraduation(id, graduacao, siglaGraduacao){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "nome_graduacao": graduacao,
            "sigla_graduacao": siglaGraduacao,
        });

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = '/maatdigital/graduacao/' + id;
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        (result.status ? (situacao = Boolean(true)) : (situacao = Boolean(false) || console.log(result)));
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduation: ' + error);
    };
    return situacao
};