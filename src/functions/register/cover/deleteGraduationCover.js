let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function DeleteGraduationCover(idCover){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const url = '/maatdigital/resp_capas/' + idCover
        const response = await fetch(url, requestOptions);
        const result = (response.ok && await response.json());
        (result.status ? (situacao = Boolean(true)) : (situacao = Boolean(false) || console.log(result)));
    } catch (error) {
        console.error('Ocorreu um erro em DeleteGraduationCover: ' + error);
    };
    return situacao
};