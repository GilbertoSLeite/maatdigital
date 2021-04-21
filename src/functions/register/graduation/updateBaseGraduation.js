let token = localStorage.getItem('@maatdigital/token');
let situacao;
export default async function UpdateBaseGraduation(id, graduacao){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "nome_graduacao": graduacao,
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
        if(result.status){
            situacao = Boolean(true)
        }else {
            console.log(result);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduation: ' + error);
    };
    return situacao
};