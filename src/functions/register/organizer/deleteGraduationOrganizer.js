let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function DeleteGraduationOrganizer(idOrganizador){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const url = '/maatdigital/graduacao_organizadores/' + idOrganizador
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status === true){
            situacao = Boolean(true)
        }else {
            console.log(result);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em DeleteGraduationOrganizer: ' + error);
    };
    return situacao
};